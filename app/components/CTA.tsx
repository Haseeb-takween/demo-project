'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from './Section';
import { ease } from '@/lib/motion';

function openEnquiry() {
  window.dispatchEvent(new CustomEvent('open-enquiry-dialog'));
}

export function CTA() {
  return (
    <section aria-label="Request a service" className="bg-background py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="rounded-xl border border-border bg-card px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 text-center shadow-[0_1px_2px_rgba(15,33,29,0.04),0_12px_32px_-16px_rgba(15,33,29,0.12)]"
        >
          {/* Explicit flex gaps — more stable in Chrome than stacked margins */}
          <div className="mx-auto flex max-w-lg flex-col items-center gap-5 sm:gap-6">
            <h2
              className="font-display font-bold text-foreground tracking-tight text-balance m-0"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2 }}
            >
              Need something sorted?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty m-0 max-w-sm sm:max-w-md">
              Tell us the job. Get a clear reply from a verified local pro.
            </p>
            <Button onClick={openEnquiry} size="lg" className="mt-1">
              Request a service
              <ArrowRightIcon data-icon="inline-end" aria-hidden />
            </Button>
            <p className="text-xs text-muted-foreground m-0">
              Free to enquire · No card required
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
