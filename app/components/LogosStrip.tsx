'use client';

import { Container } from './Section';

/* Placeholder brand/partner names — styled as text logos */
const logos = [
  'HomeServe', 'TaskRabbit', 'Angi', 'Bark.com',
  'Checkatrade', 'Rated People', 'TrustMark', 'MyBuilder',
];

export function LogosStrip() {
  const doubled = [...logos, ...logos];

  return (
    <div className="border-y border-border bg-bg-subtle dark:bg-muted py-6 overflow-hidden">
      <Container>
        <p className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase mb-5">
          As featured &amp; trusted alongside
        </p>
      </Container>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        <div className="flex gap-12 animate-marquee shrink-0 items-center">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="text-sm font-display font-semibold text-muted-foreground/60 dark:text-muted-foreground/40 hover:text-foreground/80 transition-colors whitespace-nowrap select-none cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
        {/* Duplicate track for seamless loop */}
        <div aria-hidden className="flex gap-12 animate-marquee shrink-0 items-center">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="text-sm font-display font-semibold text-muted-foreground/60 dark:text-muted-foreground/40 whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
