'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Container } from './Section';
import { ease } from '@/lib/motion';

const serviceOptions = [
  { id: 'home-cleaning', label: 'Home Cleaning', from: 35, to: 120 },
  { id: 'repairs-handyman', label: 'Repairs & Handyman', from: 50, to: 200 },
  { id: 'beauty-wellness', label: 'Beauty & Wellness', from: 30, to: 150 },
  { id: 'appliance-service', label: 'Appliance Service', from: 60, to: 250 },
  { id: 'moving-delivery', label: 'Moving & Delivery', from: 80, to: 400 },
  { id: 'gardening-outdoor', label: 'Gardening', from: 40, to: 180 },
];

const timingOptions = [
  { id: 'asap', label: 'As soon as possible' },
  { id: 'week', label: 'This week' },
  { id: 'fortnight', label: 'Next 2 weeks' },
  { id: 'flexible', label: "I'm flexible" },
];

export function ServiceFinder() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null);

  const activeService = serviceOptions.find((s) => s.id === selectedService);
  const showEstimate = activeService && selectedTiming;

  function openEnquiry() {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-dialog', {
        detail: { service: selectedService },
      })
    );
  }

  return (
    <Section className="bg-background">
      <Container>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="mb-8"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
              What do you need?
            </h2>
            <p className="text-muted-foreground">
              Pick a service and timing for a quick price guide, then continue to your enquiry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06, ease }}
            className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-[0_1px_2px_rgba(15,33,29,0.04),0_12px_28px_-14px_rgba(15,33,29,0.12)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_8px_28px_-10px_rgba(13,148,136,0.22),8px_12px_0_-6px_rgba(13,148,136,0.06)]"
          >
            <div className="mb-7">
              <p className="text-sm font-medium text-foreground mb-3">1. Choose your service</p>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedService(id === selectedService ? null : id)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-[transform,box-shadow,background-color,border-color,color] duration-200 ${
                      selectedService === id
                        ? 'bg-primary text-primary-foreground border-primary shadow-[0_4px_14px_rgba(13,148,136,0.3)] scale-[1.02]'
                        : 'bg-background text-foreground border-border hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="mb-7 overflow-hidden"
                >
                  <p className="text-sm font-medium text-foreground mb-3">2. When do you need it?</p>
                  <div className="flex flex-wrap gap-2">
                    {timingOptions.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedTiming(id === selectedTiming ? null : id)}
                        className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-[transform,box-shadow,background-color,border-color,color] duration-200 ${
                          selectedTiming === id
                            ? 'bg-primary text-primary-foreground border-primary shadow-[0_4px_14px_rgba(13,148,136,0.3)] scale-[1.02]'
                            : 'bg-background text-foreground border-border hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showEstimate && activeService && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease }}
                  className="rounded-lg bg-accent-soft border border-primary/15 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Typical price range</p>
                    <p className="font-display text-2xl font-bold text-foreground">
                      £{activeService.from} – £{activeService.to}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Guide only · Final price confirmed before booking
                    </p>
                  </div>
                  <Button
                    onClick={openEnquiry}
                    className="w-full sm:w-auto"
                  >
                    Continue to enquiry
                    <ArrowRightIcon className="size-4" data-icon="inline-end" aria-hidden />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedService && (
              <p className="text-xs text-muted-foreground">
                Select a service above to see a price guide
              </p>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
