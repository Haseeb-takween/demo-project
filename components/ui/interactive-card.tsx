'use client';

import { useCallback, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
  glare?: boolean;
  onClick?: () => void;
  type?: 'button';
  'aria-label'?: string;
};

/**
 * Inspired by Magic UI magic-card + glare-hover (via shadcn registry):
 * cursor spotlight, diagonal glare, and teal corner shadow lift.
 */
export function InteractiveCard({
  children,
  className,
  glare = true,
  onClick,
  type,
  'aria-label': ariaLabel,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const isButton = Boolean(onClick);

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--spot-x', '50%');
    el.style.setProperty('--spot-y', '50%');
  }, []);

  const classes = cn(
    'group/icard relative isolate overflow-hidden rounded-xl border border-border bg-card text-left',
    'transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'shadow-[0_1px_2px_rgba(15,33,29,0.04),0_8px_24px_-12px_rgba(15,33,29,0.1)]',
    'hover:-translate-y-1.5 hover:border-primary/25',
    'hover:shadow-[0_4px_8px_rgba(15,33,29,0.06),0_22px_44px_-14px_rgba(13,148,136,0.3),10px_14px_0_-6px_rgba(13,148,136,0.07)]',
    'active:translate-y-0 active:shadow-[0_2px_6px_rgba(15,33,29,0.08)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    glare &&
      "before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:opacity-0 before:content-[''] group-hover/icard:before:opacity-100 before:[background-image:linear-gradient(125deg,transparent_42%,rgba(255,255,255,0.5)_50%,transparent_58%)] before:[background-size:240%_240%] before:[background-position:130%_130%] hover:before:[background-position:-30%_-30%] before:transition-[background-position,opacity] before:duration-700 before:ease-out",
    isButton && 'cursor-pointer w-full',
    className
  );

  const style = {
    '--spot-x': '50%',
    '--spot-y': '50%',
  } as CSSProperties;

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover/icard:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--spot-x) var(--spot-y), rgba(13,148,136,0.12), transparent 55%)',
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </>
  );

  if (isButton) {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type ?? 'button'}
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={classes}
        style={style}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={classes}
      style={style}
    >
      {inner}
    </div>
  );
}

export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'shadow-[0_1px_2px_rgba(15,33,29,0.04),0_6px_16px_-10px_rgba(15,33,29,0.08)]',
        'hover:-translate-y-1 hover:border-primary/20',
        'hover:shadow-[0_6px_16px_-6px_rgba(13,148,136,0.2),6px_10px_0_-4px_rgba(13,148,136,0.06)]',
        className
      )}
    >
      {children}
    </div>
  );
}
