'use client';

import { motion } from 'framer-motion';
import {
  SparklesIcon,
  WrenchIcon,
  HeartIcon,
  ZapIcon,
  TruckIcon,
  LeafIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { Section, Container } from './Section';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { containerVariants, ease } from '@/lib/motion';

const services = [
  {
    icon: SparklesIcon,
    title: 'Home Cleaning',
    desc: 'Deep cleans, regular visits, and end-of-tenancy tidy-ups.',
    featured: true,
  },
  {
    icon: WrenchIcon,
    title: 'Repairs & Handyman',
    desc: 'Leaks, fittings, flat-packs — same-week help when you need it.',
    featured: false,
  },
  {
    icon: LeafIcon,
    title: 'Gardening & Outdoor',
    desc: 'Lawn care, jet-washing, and seasonal tidy-ups.',
    featured: false,
  },
  {
    icon: HeartIcon,
    title: 'Beauty & Wellness',
    desc: 'At-home or salon bookings for treatments that fit your day.',
    featured: false,
  },
  {
    icon: ZapIcon,
    title: 'Appliance Service',
    desc: 'Boilers, white goods, and smart-home fixes handled fast.',
    featured: false,
  },
  {
    icon: TruckIcon,
    title: 'Moving & Delivery',
    desc: 'Local removals and single-item deliveries without the hassle.',
    featured: false,
  },
];

function openEnquiry() {
  window.dispatchEvent(new CustomEvent('open-enquiry-dialog'));
}

function ServiceBody({
  icon: Icon,
  title,
  desc,
  compact = false,
}: {
  icon: typeof SparklesIcon;
  title: string;
  desc: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-start gap-3 px-4 py-4">
        <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent-soft shrink-0 transition-transform duration-300 group-hover/icard:scale-110 group-hover/icard:rotate-3">
          <Icon className="size-4 text-primary" aria-hidden />
        </span>
        <div>
          <h3 className="font-display font-semibold text-sm text-foreground mb-0.5">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft mb-4 transition-transform duration-300 group-hover/icard:scale-110 group-hover/icard:-rotate-3">
        <Icon className="size-5 text-primary" aria-hidden />
      </span>
      <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Enquire
        <ArrowRightIcon
          className="size-3.5 transition-transform duration-300 group-hover/icard:translate-x-1"
          aria-hidden
        />
      </span>
    </div>
  );
}

export function Services() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <Section id="services" className="bg-card border-y border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mb-12 max-w-xl"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Services you can book today
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Pick a category, send an enquiry, and we will match you with a verified local professional.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {[...featured, ...rest.slice(0, 2)].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
              }}
            >
              <InteractiveCard onClick={openEnquiry} aria-label={`Enquire about ${title}`}>
                <ServiceBody icon={icon} title={title} desc={desc} />
              </InteractiveCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {rest.slice(2).map(({ icon, title, desc }) => (
            <InteractiveCard
              key={title}
              onClick={openEnquiry}
              aria-label={`Enquire about ${title}`}
              className="rounded-lg"
            >
              <ServiceBody icon={icon} title={title} desc={desc} compact />
            </InteractiveCard>
          ))}
        </motion.div>

        <p className="text-sm text-muted-foreground mt-8">
          Don&apos;t see your service?{' '}
          <button
            onClick={openEnquiry}
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Send an enquiry anyway
          </button>
        </p>
      </Container>
    </Section>
  );
}
