'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Let modals / overflow panels scroll with the mouse wheel
      allowNestedScroll: true,
      prevent: (node) =>
        node instanceof HTMLElement &&
        (node.hasAttribute('data-lenis-prevent') ||
          !!node.closest('[data-slot="dialog-content"]') ||
          !!node.closest('[data-slot="dialog-overlay"]') ||
          !!node.closest('[role="dialog"]')),
    });
    lenisRef.current = lenis;

    function onDialogScrollLock(e: Event) {
      const locked = (e as CustomEvent<{ locked?: boolean }>).detail?.locked;
      if (locked) lenis.stop();
      else lenis.start();
    }
    window.addEventListener('lenis-dialog-lock', onDialogScrollLock);

    return () => {
      window.removeEventListener('lenis-dialog-lock', onDialogScrollLock);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/* Scroll progress bar — thin line at top */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      bar!.style.transform = `scaleX(${progress})`;
    }

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      aria-hidden="true"
      style={{ transformOrigin: 'left' }}
    />
  );
}
