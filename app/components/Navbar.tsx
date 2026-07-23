'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useScroll, useTransform, motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BrandMark } from './BrandMark';

const links = [
  { href: '/#services', label: 'Services', id: 'services' },
  { href: '/#how-it-works', label: 'How it works', id: 'how-it-works' },
  { href: '/#about', label: 'Why us', id: 'about' },
  { href: '/#testimonials', label: 'Reviews', id: 'testimonials' },
  { href: '/#faq', label: 'FAQ', id: 'faq' },
];

function openEnquiry() {
  window.dispatchEvent(new CustomEvent('open-enquiry-dialog'));
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const borderOpacity = useTransform(scrollY, [30, 80], [0, 1]);

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50" aria-label="Site navigation">
      <motion.div
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        style={{ opacity: bgOpacity }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
        aria-hidden
      />

      <nav className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Servio home">
          <BrandMark interactive />
        </Link>

        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {links.map(({ href, label, id }) => {
            const active = activeSection === id;
            return (
              <li key={href}>
                <Link
                  href={href}
                  data-active={active ? 'true' : undefined}
                  className={`nav-link-underline px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md ${
                    active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            onClick={openEnquiry}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Request a service
          </Button>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <button
                  aria-label="Open menu"
                  className="md:hidden size-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="mt-8">
                <ul className="flex flex-col gap-1" role="list">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setSheetOpen(false)}
                        className="flex px-4 py-3 text-base font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 px-4">
                  <Button
                    onClick={() => {
                      openEnquiry();
                      setSheetOpen(false);
                    }}
                    className="w-full"
                  >
                    Request a service
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
