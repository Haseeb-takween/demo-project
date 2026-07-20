'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, ShieldCheckIcon, ClockIcon, BadgeCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

function openEnquiry(service?: string) {
  window.dispatchEvent(
    new CustomEvent('open-enquiry-dialog', {
      detail: service ? { service } : undefined,
    })
  );
}

function scrollToHow() {
  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
}

const proof = [
  { icon: BadgeCheckIcon, label: 'Verified professionals' },
  { icon: ClockIcon, label: 'Clear quotes before you book' },
  { icon: ShieldCheckIcon, label: 'Support if plans change' },
];

const slots = [
  {
    id: 'home-cleaning',
    label: 'Home cleaning',
    from: 35,
    when: 'Tomorrow · 9:00–11:00',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80',
    alt: 'Professional cleaner working in a home',
  },
  {
    id: 'repairs-handyman',
    label: 'Repairs & handyman',
    from: 50,
    when: 'Tomorrow · 14:00–16:00',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Handyman repairing fittings',
  },
  {
    id: 'gardening-outdoor',
    label: 'Gardening & outdoor',
    from: 40,
    when: 'Wed · 10:00–12:00',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80',
    alt: 'Gardener working outdoors',
  },
  {
    id: 'appliance-service',
    label: 'Appliance service',
    from: 60,
    when: 'Thu · 11:00–13:00',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80',
    alt: 'Technician servicing equipment',
  },
  {
    id: 'moving-delivery',
    label: 'Moving & delivery',
    from: 80,
    when: 'Fri · 08:00–10:00',
    image:
      'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1400&q=80',
    alt: 'Moving boxes ready for delivery',
  },
  {
    id: 'beauty-wellness',
    label: 'Beauty & wellness',
    from: 30,
    when: 'Sat · 12:00–14:00',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80',
    alt: 'Beauty and wellness treatment setting',
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const active = slots[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slots.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Servio — Trusted local services"
      className="relative isolate bg-background overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 0%, rgba(204,251,241,0.5) 0%, transparent 55%)',
        }}
      />

      {/* Chrome-safe: padding-driven height, not flex-centered 100dvh */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center">
          <div className="lg:col-span-6 max-w-xl flex flex-col gap-6 sm:gap-7">
            <h1
              className="font-display font-bold text-foreground tracking-tight text-balance m-0"
              style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.35rem)', lineHeight: 1.15 }}
            >
              Trusted local help, without the phone calls.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md text-pretty m-0">
              Tell us what you need. We connect you with a verified local professional
              and confirm a time that works for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => openEnquiry(active.id)} size="lg" className="w-full sm:w-auto">
                Request a service
                <ArrowRightIcon className="size-4" data-icon="inline-end" aria-hidden />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToHow}
                className="w-full sm:w-auto h-12 text-base font-medium border-border bg-card"
              >
                How booking works
              </Button>
            </div>

            <ul
              className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2 pt-1"
              role="list"
            >
              {proof.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="size-4 text-primary shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 relative w-full">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-muted shadow-[0_20px_50px_-24px_rgba(13,148,136,0.4)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={active.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 524px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent"
              />

              {/* Multi-service availability card */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 rounded-xl bg-card border border-border p-4 shadow-[0_12px_32px_-12px_rgba(15,33,29,0.35)]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground m-0">Next available</p>
                  <div className="flex items-center gap-1" role="tablist" aria-label="Service previews">
                    {slots.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={s.label}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index ? 'w-4 bg-primary' : 'w-1.5 bg-border hover:bg-primary/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + '-meta'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-display font-semibold text-foreground text-base mb-3 m-0">
                      {active.when}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate m-0">{active.label}</p>
                        <p className="text-xs text-muted-foreground m-0 mt-0.5">
                          From £{active.from} · Verified pro
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openEnquiry(active.id)}
                        className="shrink-0 inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                      >
                        Book
                        <ArrowRightIcon className="size-3" aria-hidden />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground m-0">
              Cleaning · Repairs · Beauty · Appliances · Moving · Garden
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
