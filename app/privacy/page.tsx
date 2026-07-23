import type { Metadata } from 'next';
import { LegalPage } from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Servio',
  description:
    'How Servio collects, uses, and protects your personal information when you enquire about or book local services.',
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: '1. Who we are',
    paragraphs: [
      'Servio (“we”, “us”, “our”) operates this website and enquiry service to connect customers with verified local service professionals. This Privacy Policy explains what personal data we collect, why we collect it, and how we look after it.',
      'If you have questions about this policy or your data, email hello@servio.co.uk.',
    ],
  },
  {
    title: '2. Information we collect',
    paragraphs: [
      'We collect information you choose to give us when you submit an enquiry or contact us, including:',
    ],
    bullets: [
      'Full name',
      'Email address',
      'Phone number',
      'Service type requested and preferred date',
      'Message or job details you provide',
      'Technical data such as browser type, device information, and approximate location derived from IP address (for security and site performance)',
    ],
  },
  {
    title: '3. How we use your information',
    paragraphs: ['We use your personal data to:'],
    bullets: [
      'Process and respond to your service enquiry',
      'Match you with suitable local professionals',
      'Send confirmation or follow-up messages about your enquiry',
      'Improve our website and service quality',
      'Comply with legal obligations and protect against misuse or fraud',
    ],
  },
  {
    title: '4. Legal basis (UK GDPR)',
    paragraphs: [
      'Where UK data protection law applies, we process your data on the basis of: (a) steps needed to respond to your enquiry and take steps at your request before a contract; (b) our legitimate interests in operating and improving Servio, balanced against your rights; and (c) consent where we ask for it (for example optional marketing). You may withdraw consent at any time by contacting us.',
    ],
  },
  {
    title: '5. Sharing your information',
    paragraphs: [
      'We may share relevant enquiry details with matched service professionals so they can contact you about the job. We may also use trusted providers who help us run the site (for example hosting, email delivery, and database services). Those providers only process data on our instructions.',
      'We do not sell your personal information. We may disclose data if required by law or to protect the rights, safety, or property of Servio, our users, or others.',
    ],
  },
  {
    title: '6. Cookies and similar technologies',
    paragraphs: [
      'We use essential cookies needed for the site to work securely — for example an authentication cookie when an authorised administrator signs in to the admin portal. We do not use advertising cookies to track you across other websites.',
      'You can control cookies through your browser settings. Blocking essential cookies may prevent some features (such as admin login) from working.',
    ],
  },
  {
    title: '7. How long we keep data',
    paragraphs: [
      'We keep enquiry records for as long as needed to handle your request, resolve follow-ups, meet legal or accounting requirements, and improve our service. When data is no longer required, we delete or anonymise it.',
    ],
  },
  {
    title: '8. Data security',
    paragraphs: [
      'We use appropriate technical and organisational measures to protect personal data, including encrypted connections (HTTPS) and restricted access to admin tools. No method of transmission or storage is completely secure; if you suspect unauthorised access, contact us immediately.',
    ],
  },
  {
    title: '9. Your rights',
    paragraphs: [
      'Depending on applicable law, you may have the right to access, correct, delete, or restrict processing of your personal data, to object to certain processing, and to data portability. You may also lodge a complaint with your local data protection authority (in the UK, the Information Commissioner’s Office).',
      'To exercise your rights, email hello@servio.co.uk with enough detail for us to verify and respond to your request.',
    ],
  },
  {
    title: '10. Children’s privacy',
    paragraphs: [
      'Servio is intended for adults arranging services. We do not knowingly collect personal data from children under 16. If you believe a child has submitted information, contact us and we will delete it.',
    ],
  },
  {
    title: '11. Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Continued use of the site after updates means you accept the revised policy.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="24 July 2026"
      intro="This policy describes how Servio handles personal information when you use our website or submit a service enquiry. Please read it carefully."
      sections={sections}
    />
  );
}
