'use client';

import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { Section, Container } from './Section';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { ease } from '@/lib/motion';

const testimonials = [
  {
    name: 'Ayesha K.',
    location: 'Manchester',
    service: 'Deep clean',
    initials: 'AK',
    quote:
      'Booked a deep clean on Friday evening. The cleaner arrived Saturday at 9am and the flat was spotless.',
  },
  {
    name: 'James R.',
    location: 'London',
    service: 'Boiler repair',
    initials: 'JR',
    quote:
      'Boiler packed in on a Tuesday night. An engineer was confirmed by Wednesday morning and sorted by lunchtime.',
  },
  {
    name: 'Priya M.',
    location: 'Birmingham',
    service: 'Beauty',
    initials: 'PM',
    quote:
      'Needed a last-minute facial before a wedding weekend. Matched with a brilliant therapist within minutes.',
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mb-12 max-w-xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            What customers say
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Real bookings, real outcomes — from cleaning to repairs across the UK.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ name, location, service, initials, quote }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease }}
            >
              <InteractiveCard className="h-full">
                <div className="flex flex-col p-6 h-full">
                  <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <StarIcon
                        key={si}
                        className="size-3.5 fill-amber-500 text-amber-500 transition-transform duration-300 group-hover/icard:scale-110"
                        style={{ transitionDelay: `${si * 40}ms` }}
                        aria-hidden
                      />
                    ))}
                  </div>

                  <blockquote className="flex-1 text-sm text-foreground leading-relaxed mb-6">
                    &ldquo;{quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="size-9 rounded-full bg-accent-soft flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/icard:scale-105">
                      <span className="text-xs font-bold text-primary">{initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        {service} · {location}
                      </p>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
