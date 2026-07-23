import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ServiceFinder } from './components/ServiceFinder';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { DialogController } from './components/DialogController';

export const metadata: Metadata = {
  title: 'Servio — Trusted Local Services, Booked Simply',
  description:
    'Tell us what you need. We connect you with verified local professionals and confirm a convenient time. No endless phone calls.',
  keywords: ['service booking', 'home cleaning', 'handyman', 'beauty', 'local services UK', 'Servio'],
  openGraph: {
    title: 'Servio — Trusted Local Services, Booked Simply',
    description: 'Request a service. Get matched with a verified local professional. Confirm your visit.',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm"
        >
          Skip to main content
        </Link>

        <Hero />
        <Services />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <FAQ />
        <ServiceFinder />
        <CTA />
      </main>
      <Footer />
      <DialogController />
    </>
  );
}
