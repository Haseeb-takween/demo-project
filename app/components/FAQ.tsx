'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section, Container } from './Section';
import { ease } from '@/lib/motion';

const faqs = [
  {
    q: 'How does booking work?',
    a: 'Submit an enquiry with what you need, where, and when. We match you with verified local professionals. You review your options, choose a fit, and confirm — no phone tag.',
  },
  {
    q: 'How quickly will I hear back?',
    a: 'Most enquiries receive a response during business hours the same day. Timing depends on the service and your area.',
  },
  {
    q: 'Are the professionals verified?',
    a: 'Yes. Every professional passes ID checks, proof of insurance, qualification verification where relevant, and a review by our team before taking bookings.',
  },
  {
    q: 'Can I reschedule or cancel?',
    a: 'Yes. You can reschedule or cancel up to 24 hours before the appointment at no charge. For last-minute changes, contact support or your matched professional.',
  },
  {
    q: 'How is pricing decided?',
    a: 'Prices are set by professionals based on the job details you provide. You see a clear estimate before confirming. For complex jobs, the pro may assess before a final quote.',
  },
];

export function FAQ() {
  return (
    <Section id="faq" className="bg-card border-y border-border">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="lg:col-span-4"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight text-balance">
              Common questions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-pretty max-w-sm">
              Still unsure? Send an enquiry — we reply within one business day.
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-dialog'))}
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Contact us directly
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06, ease }}
            className="lg:col-span-8"
          >
            <Accordion className="flex flex-col gap-3">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border bg-background transition-[border-color,box-shadow] duration-200 hover:border-primary/30 data-open:border-primary/40 data-open:shadow-[0_8px_24px_-12px_rgba(13,148,136,0.22)]"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between gap-4 border-0 px-5 py-4 text-left text-[0.9375rem] font-semibold text-foreground rounded-xl shadow-none hover:bg-transparent hover:text-primary hover:no-underline focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0 sm:px-6 sm:py-5 **:data-[slot=accordion-trigger-icon]:ml-0 **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-primary">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="border-0 px-5 pb-5 pt-0 sm:px-6">
                    <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
