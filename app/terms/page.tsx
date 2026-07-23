import type { Metadata } from 'next';
import { LegalPage } from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Servio',
  description:
    'Terms and conditions for using the Servio website and service enquiry platform.',
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: '1. Agreement to these terms',
    paragraphs: [
      'By accessing or using the Servio website (“Site”) or submitting an enquiry, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the Site.',
      'Servio provides an online enquiry and matching platform that helps customers connect with independent local service professionals. Servio is not the direct provider of cleaning, repair, beauty, or other trade services unless we expressly say otherwise in writing.',
    ],
  },
  {
    title: '2. Who can use Servio',
    paragraphs: [
      'You must be at least 18 years old and able to form a binding contract to submit an enquiry. You confirm that information you provide is accurate and that you have authority to request services at the address or location you describe.',
    ],
  },
  {
    title: '3. Enquiries and bookings',
    paragraphs: [
      'Submitting an enquiry does not guarantee that a professional will be available, that a booking will be confirmed, or that a specific price will apply. Availability, quotes, and appointment details are confirmed separately with you and/or the matched professional.',
      'You are responsible for providing clear, honest job details. Misleading or incomplete information may delay or cancel matching.',
    ],
  },
  {
    title: '4. Service professionals',
    paragraphs: [
      'Professionals matched through Servio are typically independent contractors. Unless we state otherwise, any contract for the service work is between you and that professional. Servio may help coordinate introductions and communication but is not liable for the professional’s workmanship, conduct, timing, or pricing except where the law requires otherwise.',
    ],
  },
  {
    title: '5. Fees and payments',
    paragraphs: [
      'Unless separately agreed in writing, submitting an enquiry through this Site does not create a payment obligation to Servio. Any fees for the underlying service are agreed with the professional (or shown clearly before you confirm).',
    ],
  },
  {
    title: '6. Cancellations and changes',
    paragraphs: [
      'You should notify us or the matched professional as soon as possible if you need to cancel or reschedule. Reasonable notice (for example at least 24 hours where practical) helps avoid wasted travel. Cancellation or no-show policies of individual professionals may also apply once a booking is confirmed.',
    ],
  },
  {
    title: '7. Acceptable use',
    paragraphs: [
      'You agree not to:',
    ],
    bullets: [
      'Use the Site for unlawful, harmful, or fraudulent purposes',
      'Submit false, abusive, or spam enquiries',
      'Attempt to disrupt, scrape, or reverse-engineer the Site',
      'Access admin or restricted areas without authorisation',
      'Infringe others’ intellectual property or privacy rights',
    ],
  },
  {
    title: '8. Intellectual property',
    paragraphs: [
      'All branding, text, design, logos, and software on the Site belong to Servio or our licensors. You may not copy, modify, or redistribute Site content for commercial purposes without our prior written consent.',
    ],
  },
  {
    title: '9. Disclaimer',
    paragraphs: [
      'The Site is provided on an “as is” and “as available” basis. We aim for reliable uptime and accurate information but do not warrant that the Site will be uninterrupted, error-free, or that any particular professional will meet your expectations. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.',
    ],
  },
  {
    title: '10. Limitation of liability',
    paragraphs: [
      'Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be limited under applicable law.',
      'Subject to that, Servio is not liable for indirect, incidental, special, or consequential losses, or for loss of profits, data, or goodwill arising from your use of the Site or from services performed by third-party professionals. Our total liability arising from your use of the Site is limited to the greater of £50 or the fees (if any) you paid to Servio for the specific matter giving rise to the claim.',
    ],
  },
  {
    title: '11. Indemnity',
    paragraphs: [
      'You agree to indemnify and hold Servio harmless from claims, losses, and expenses (including reasonable legal fees) arising from your misuse of the Site, your breach of these terms, or your interactions with service professionals, except to the extent caused by our proven negligence or wilful misconduct.',
    ],
  },
  {
    title: '12. Privacy',
    paragraphs: [
      'Personal data collected through the Site is handled as described in our Privacy Policy. By using the Site you acknowledge that policy.',
    ],
  },
  {
    title: '13. Changes',
    paragraphs: [
      'We may update these Terms & Conditions periodically. The “Last updated” date will change when we do. Continued use of the Site after changes constitutes acceptance of the updated terms.',
    ],
  },
  {
    title: '14. Governing law',
    paragraphs: [
      'These terms are governed by the laws of England and Wales. Courts of England and Wales have exclusive jurisdiction, except that consumers may also bring claims in their local courts where mandatory consumer law allows.',
    ],
  },
  {
    title: '15. Contact',
    paragraphs: [
      'For questions about these terms, email hello@servio.co.uk.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="24 July 2026"
      intro="These terms govern your use of the Servio website and enquiry service. Please read them together with our Privacy Policy."
      sections={sections}
    />
  );
}
