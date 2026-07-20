'use client';

import { motion } from 'framer-motion';
import { ClipboardListIcon, UserCheckIcon, ThumbsUpIcon } from 'lucide-react';
import { Section, Container } from './Section';
import { HoverLift } from '@/components/ui/interactive-card';
import { ease } from '@/lib/motion';

const steps = [
  {
    step: '1',
    icon: ClipboardListIcon,
    title: 'Describe the job',
    desc: 'Tell us what you need, where, and when. No account required — it takes about a minute.',
  },
  {
    step: '2',
    icon: UserCheckIcon,
    title: 'Review your match',
    desc: 'We send your request to verified local professionals. You hear back with clear options.',
  },
  {
    step: '3',
    icon: ThumbsUpIcon,
    title: 'Confirm the visit',
    desc: 'Pick your pro, lock in a time, and pay only after the job is done.',
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mb-12 max-w-xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            How booking works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Three clear steps. No endless phone calls, no waiting on hold.
          </p>
        </motion.div>

        <ol className="grid md:grid-cols-3 gap-5 relative" role="list">
          <div
            aria-hidden
            className="hidden md:block absolute top-[2.25rem] left-[16.5%] right-[16.5%] h-px bg-border"
          />

          {steps.map(({ step, icon: Icon, title, desc }, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease }}
              className="relative"
            >
              <HoverLift className="p-5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-accent-soft border border-primary/10 shadow-sm">
                    <Icon className="size-5 text-primary" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">Step {step}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </HoverLift>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
