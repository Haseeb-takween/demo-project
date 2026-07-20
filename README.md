# Servio — Service Enquiry & Booking

Landing page and enquiry system for **Servio**, a fictional local-services booking demo. Visitors browse services, send an enquiry, get a confirmation email, and admins manage submissions in a protected dashboard.

**Live demo:** [Add your deployed URL]  
**Repository:** https://github.com/Haseeb-takween/demo-project

---

## Features

### Marketing site (`/`)
- Full landing page: hero, services, how it works, benefits, testimonials, FAQ, service finder, CTA
- Enquiry modal (Zod + React Hook Form) with service presets from the hero / finder
- Smooth scrolling (Lenis), motion (Framer Motion), teal brand UI (shadcn/ui + Tailwind)
- Redirect to `/thank-you` after a successful submission

### Public enquiry flow
- Fields: full name, email, phone, service type, preferred date, message
- Client-side validation and loading / success states
- Confirmation email to the submitter via Gmail SMTP

### Admin panel (`/admin/login` → `/admin`)
- Email / password login
- JWT in an HTTP-only cookie (1-hour session)
- Dashboard of submissions (newest first)
- Mark as **Reviewed**
- Logout clears the session; unauthenticated users are sent to login via `proxy.ts`

---

## Tech stack

| Area | Stack |
|------|--------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui (Base UI), Lucide, Sonner |
| Motion | Framer Motion, Lenis |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| Data | MongoDB Atlas + Mongoose |
| Email | Nodemailer + Gmail SMTP |
| Auth | jsonwebtoken (JWT) |
| Package manager | pnpm |

---

## Project structure

```
service_enquiry-_and_booking_system/
├── app/
│   ├── page.tsx                 # Servio landing page
│   ├── layout.tsx               # Root layout, fonts, toaster
│   ├── globals.css              # Design tokens + utilities
│   ├── components/              # Landing sections + enquiry dialog
│   ├── thank-you/page.tsx       # Post-submission page
│   ├── admin/
│   │   ├── login/page.tsx       # Admin login
│   │   └── page.tsx             # Admin dashboard
│   ├── api/
│   │   ├── submit/route.ts      # POST — create submission + email
│   │   ├── health/route.ts
│   │   └── admin/
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       └── submissions/
│   │           ├── route.ts     # GET — list
│   │           └── [id]/route.ts # PATCH / DELETE
│   ├── favicon.ico / icon.png / apple-icon.png
│   └── ...
├── components/ui/               # Shared UI primitives
├── lib/
│   ├── auth.ts                  # JWT helpers
│   ├── db/index.ts              # MongoDB connection
│   ├── email.ts                 # Nodemailer transporter
│   ├── motion.ts                # Shared motion easing / variants
│   └── utils.ts                 # cn() helper
├── models/submission.ts         # Mongoose schema
├── proxy.ts                     # Protects /admin routes
└── .env.local                   # Secrets (not committed)
```

---

## Environment variables

Create a `.env.local` in the project root:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_strong_random_secret
```

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `EMAIL_USER` | Gmail address for confirmation emails |
| `EMAIL_PASS` | Gmail [App Password](https://support.google.com/accounts/answer/185833) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | JWT signing secret — use a long random string in production |

---

## Getting started

### Prerequisites
- Node.js 18+
- pnpm
- MongoDB Atlas cluster
- Gmail account with an App Password

### Install and run

```bash
git clone https://github.com/Haseeb-takween/demo-project.git
cd demo-project
pnpm install
```

Add `.env.local` (see above), then:

```bash
pnpm dev
```

| Surface | URL |
|---------|-----|
| Landing + enquiry | http://localhost:3000 |
| Thank you | http://localhost:3000/thank-you |
| Admin login | http://localhost:3000/admin/login |

### Production build

```bash
pnpm build
pnpm start
```

---

## How to test

1. Open http://localhost:3000 and click **Request a service** (or Book from the hero card).
2. Submit a valid enquiry and confirm redirect to `/thank-you`.
3. Check the inbox for the confirmation email.
4. Sign in at `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
5. Confirm the submission appears; mark it reviewed.
6. Log out and confirm you are returned to the login page.

---

## API routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/submit` | Public | Create submission + send confirmation email |
| `POST` | `/api/admin/login` | Public | Admin login — sets JWT cookie |
| `POST` | `/api/admin/logout` | Public | Clears JWT cookie |
| `GET` | `/api/admin/submissions` | Admin | List submissions |
| `PATCH` | `/api/admin/submissions/[id]` | Admin | Mark reviewed (and related updates) |
| `DELETE` | `/api/admin/submissions/[id]` | Admin | Delete a submission |
| `GET` | `/api/health` | Public | Health check |

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add the same env vars from `.env.local` in the Vercel project settings.
4. Deploy:
   - Site: `https://your-app.vercel.app/`
   - Admin: `https://your-app.vercel.app/admin/login`

---

## Known limitations

- Single admin account (env-based; no password reset)
- Admin session expires after 1 hour
- No email to admin on new enquiries
- Dashboard has no pagination, search, or filters
- No rate limiting or CAPTCHA on the public form
- Servio branding and copy are for demo / portfolio use

---

## Author

**Haseeb Sajjad** — [Haseeb-takween](https://github.com/Haseeb-takween)
