import Link from 'next/link';
import { Container } from './Section';
import { BrandMark } from './BrandMark';

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#about', label: 'Why us' },
  { href: '/#testimonials', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      <Container className="py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center mb-4"
              aria-label="Servio home"
            >
              <BrandMark wordmarkClassName="text-sm" />
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mb-3">
              Trusted local services, booked simply. Verified professionals across cleaning,
              repairs, beauty, and more.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold text-foreground mb-3">Navigate</p>
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Legal & contact</p>
            <ul className="flex flex-col gap-2" role="list">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="mailto:hello@servio.co.uk"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  hello@servio.co.uk
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Admin portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Servio. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
