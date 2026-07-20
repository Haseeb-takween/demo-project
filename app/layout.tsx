import type { Metadata } from 'next';
import { Archivo, Source_Sans_3, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { LenisProvider, ScrollProgressBar } from './components/LenisProvider';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Servio — Trusted Local Services, Booked Simply',
  description:
    'Tell us what you need. We connect you with verified local professionals and confirm a convenient time. Home cleaning, repairs, beauty and more.',
  keywords: ['service booking', 'home cleaning', 'handyman', 'beauty services', 'local services UK'],
  openGraph: {
    title: 'Servio — Trusted Local Services, Booked Simply',
    description: 'Request a service. Get matched with a verified local professional. Confirm your visit.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LenisProvider>
          <ScrollProgressBar />
          {children}
          <Toaster richColors position="top-right" />
        </LenisProvider>
      </body>
    </html>
  );
}
