'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
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

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('lenis-dialog-lock', onDialogScrollLock);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/* Scroll progress bar — thin indigo line at top */
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
