'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Section, Container, SectionLabel } from './Section';
import { ease } from '@/lib/motion';

const stats = [
  { value: 12000, suffix: '+',   label: 'Bookings completed',      prefix: '',  decimals: 0 },
  { value: 4.9,   suffix: '★',   label: 'Average customer rating', prefix: '',  decimals: 1 },
  { value: 15,    suffix: ' min', label: 'Average response time',   prefix: '<', decimals: 0 },
  { value: 30,    suffix: '+',   label: 'Service categories',      prefix: '',  decimals: 0 },
];

function CountUp({
  to,
  suffix,
  prefix,
  decimals = 0,
}: {
  to: number;
  suffix: string;
  prefix: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    const duration = 1400;
    const startTime = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // power3.out
      setValue(parseFloat((to * ease).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, to, decimals]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <SectionLabel>Our story</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight">
              Servio started with<br />
              <span className="gradient-text">a simple frustration.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Booking a reliable service used to mean ten phone calls, three no-shows,
                and a day of waiting. We built one clean place to enquire, get matched with
                background-checked professionals, and lock in a time that works for you.
              </p>
              <p>
                Today, Servio connects thousands of customers with trusted local experts
                across cleaning, repairs, beauty, and more — with a response time that
                actually respects your schedule.
              </p>
            </div>
          </motion.div>

          {/* Right — stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, suffix, prefix, label, decimals }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className="relative rounded-2xl border border-border bg-card p-6 overflow-hidden group"
              >
                {/* Accent blob */}
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 size-20 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"
                />
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  <CountUp to={value} suffix={suffix} prefix={prefix} decimals={decimals ?? 0} />
                </p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
