'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Container, SectionLabel } from './Section';
import { ease } from '@/lib/motion';

function openEnquiry(service?: string) {
  window.dispatchEvent(new CustomEvent('open-enquiry-dialog', { detail: { service } }));
}

const plans = [
  {
    name: 'Quick Fix',
    tagline: 'One-off jobs',
    priceMonthly: 0,
    priceAnnual: 0,
    unit: 'Free to enquire',
    popular: false,
    features: [
      'Submit unlimited enquiries',
      'Up to 3 professional quotes',
      'Message your matched pro',
      'Pay only after the job',
      'Standard response time',
    ],
    cta: 'Start enquiry',
    service: 'general',
  },
  {
    name: 'Priority',
    tagline: 'Fast-tracked matching',
    priceMonthly: 4.99,
    priceAnnual: 3.99,
    unit: '/ month',
    popular: true,
    features: [
      'Everything in Quick Fix',
      '<5 min priority matching',
      'Up to 5 professional quotes',
      'Dedicated account manager',
      'Flexible rescheduling',
      'Exclusive pro availability',
    ],
    cta: 'Get Priority access',
    service: 'priority-booking',
  },
  {
    name: 'Business',
    tagline: 'For teams & landlords',
    priceMonthly: 19.99,
    priceAnnual: 14.99,
    unit: '/ month',
    popular: false,
    features: [
      'Everything in Priority',
      'Unlimited team members',
      'Multi-property management',
      'Monthly service reports',
      'Dedicated B2B account team',
      'Custom SLA agreements',
    ],
    cta: 'Contact us',
    service: 'business-enquiry',
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-14"
        >
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Always free to enquire.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Start with our free enquiry — no account, no card. Upgrade when you want
            faster matching and premium features.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-muted p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                !annual ? 'bg-background shadow text-foreground' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-1.5 ${
                annual ? 'bg-background shadow text-foreground' : 'text-muted-foreground'
              }`}
            >
              Annual
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full">
                –20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map(({ name, tagline, priceMonthly, priceAnnual, unit, popular, features, cta, service }, i) => {
            const price = annual ? priceAnnual : priceMonthly;
            const isFree = price === 0;

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  popular
                    ? 'animate-border-gradient shadow-2xl shadow-primary/15 border-primary/30'
                    : 'border-border shadow-sm'
                } bg-card`}
              >
                {popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/30">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-display font-bold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground">{tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {isFree ? (
                    <p className="font-display text-2xl font-bold text-foreground">{unit}</p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ y: 12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -12, opacity: 0 }}
                          transition={{ duration: 0.25, ease }}
                          className="font-display text-4xl font-extrabold text-foreground"
                        >
                          £{price.toFixed(2)}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm text-muted-foreground mb-1.5">{unit}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1" role="list">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckIcon className="size-4 text-primary flex-shrink-0 mt-0.5" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => openEnquiry(service)}
                  variant={popular ? 'default' : 'outline'}
                  className={`w-full font-semibold h-11 ${
                    popular ? 'btn-sheen bg-primary text-primary-foreground shadow-lg shadow-primary/25' : ''
                  }`}
                >
                  {cta}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          No card required to enquire · Cancel subscriptions anytime · All prices include VAT
        </motion.p>
      </Container>
    </Section>
  );
}
