'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Section, Container } from './Section';

const stats = [
  { value: 500, suffix: '+', label: 'Projects delivered' },
  { value: 98,  suffix: '%', label: 'Client satisfaction' },
  { value: 24,  suffix: 'h', label: 'Avg. response time' },
  { value: 3,   suffix: 'x', label: 'Avg. revenue growth' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setCount(target); return; }

    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <Section id="about" className="bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
              About us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              We turn digital ideas into{' '}
              <span className="gradient-text">working products</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Takween Digital is a specialist digital agency serving small and medium businesses
              across the UK. Our team combines deep technical expertise with a clear focus on
              business outcomes — we don&apos;t just build things, we build things that work for you.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From a founder&apos;s first website to an enterprise AI chatbot, we&apos;ve partnered with
              hundreds of businesses to bring their ideas online. Every project starts with
              listening, because the right solution is always the one that fits your goals.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map(({ value, suffix, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-background p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <p
                  className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1"
                  aria-label={`${value}${suffix}`}
                >
                  <CountUp target={value} suffix={suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
