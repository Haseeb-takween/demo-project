'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, BanknoteIcon, CalendarCheckIcon, BellRingIcon } from 'lucide-react';
import { Section, Container } from './Section';
import { ease } from '@/lib/motion';

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Identity and insurance checks',
    desc: 'Every professional is verified before they can take bookings — ID, insurance, and a real-person review.',
  },
  {
    icon: BanknoteIcon,
    title: 'Quotes before you confirm',
    desc: 'See a clear estimate before you lock anything in. No hidden fees when the job is done.',
  },
  {
    icon: CalendarCheckIcon,
    title: 'Flexible rescheduling',
    desc: 'Life happens. Change or cancel up to 24 hours before without fees.',
  },
  {
    icon: BellRingIcon,
    title: 'Someone in your corner',
    desc: 'If a visit does not go as planned, our support team steps in to help put it right.',
  },
];

/** Free Unsplash — tradesperson at work */
const TRUST_IMAGE =
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80';

export function Benefits() {
  return (
    <Section id="about" className="bg-card border-y border-border">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight text-balance">
              Built so you can book with confidence
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
              Booking a service should not feel like a gamble. Servio exists so every customer
              gets vetted professionals, honest pricing, and a process that simply works.
            </p>

            <div className="hidden lg:block relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_16px_40px_-20px_rgba(13,148,136,0.4)]">
              <Image
                src={TRUST_IMAGE}
                alt="Verified local tradesperson at work"
                fill
                sizes="416px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="font-display text-2xl font-semibold mb-1">Pay after the job</p>
                <p className="text-sm text-white/90 text-pretty max-w-[20rem]">
                  Free to enquire. Confirm only when the quote and time feel right.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-3">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <div className="group flex gap-4 rounded-xl border border-border bg-background p-5 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_8px_24px_-10px_rgba(13,148,136,0.22),6px_10px_0_-4px_rgba(13,148,136,0.06)]">
                  <span className="flex-shrink-0 flex size-10 items-center justify-center rounded-lg bg-accent-soft transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Icon className="size-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
