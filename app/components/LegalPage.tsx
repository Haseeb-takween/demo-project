import Link from 'next/link';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Container } from './Section';
import { DialogController } from './DialogController';

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16">
        <div className="border-b border-border bg-bg-subtle/60">
          <Container className="py-12 md:py-16">
            <p className="text-xs font-medium uppercase tracking-wide text-primary mb-3">
              Legal
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </Container>
        </div>

        <Container className="py-10 md:py-14">
          <article className="max-w-3xl space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="text-sm md:text-base leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc space-y-2 pl-5 text-sm md:text-base leading-relaxed text-muted-foreground">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="text-sm text-muted-foreground border-t border-border pt-8">
              Questions? Contact us at{' '}
              <Link
                href="mailto:hello@servio.co.uk"
                className="text-primary underline-offset-2 hover:underline"
              >
                hello@servio.co.uk
              </Link>
              {' · '}
              <Link
                href="/"
                className="text-primary underline-offset-2 hover:underline"
              >
                Back to home
              </Link>
            </p>
          </article>
        </Container>
      </main>
      <Footer />
      <DialogController />
    </>
  );
}
