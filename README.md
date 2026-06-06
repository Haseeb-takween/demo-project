# Business Enquiry Form & Admin Dashboard

A full-stack enquiry management system built with Next.js. Visitors submit enquiries through a public form, receive a confirmation email, and admins log in to view and manage submissions.

**Live demo:** [Add your deployed URL]  
**Repository:** https://github.com/Haseeb-takween/demo-project

---

## Features

### Public form (`/`)
- Enquiry form with: full name, email, phone, service type, preferred date, and message
- Client-side validation and loading states
- Redirects to a thank-you page after successful submission
- Sends a confirmation email to the submitter via Gmail SMTP

### Admin panel (`/admin/login` → `/admin`)
- Secure login with email and password
- JWT stored in an HTTP-only cookie (1-hour session)
- Dashboard table showing all submissions (newest first)
- Mark submissions as **Reviewed** (row highlights green)
- Logout clears the session cookie
- Unauthenticated users are redirected to login via `proxy.ts`

---

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **MongoDB Atlas** + **Mongoose**
- **Nodemailer** + **Gmail SMTP**
- **jsonwebtoken (JWT)**
- **Tailwind CSS 4**
- **pnpm**

---

## Project structure

```
demo-project/
├── app/
│   ├── page.tsx                    # Public enquiry form
│   ├── thank-you/page.tsx          # Post-submission confirmation page
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login
│   │   └── page.tsx                # Admin dashboard
│   └── api/
│       ├── submit/route.ts         # POST — create submission + send email
│       ├── health/route.ts         # Health check
│       └── admin/
│           ├── login/route.ts      # POST — admin login
│           ├── logout/route.ts     # POST — admin logout
│           └── submissions/
│               ├── route.ts        # GET — list all submissions
│               └── [id]/route.ts   # PATCH — mark as reviewed
├── lib/
│   ├── auth.ts                     # JWT verification helper
│   ├── db/index.ts                 # MongoDB connection (cached for dev)
│   └── email.ts                    # Nodemailer transporter
├── models/
│   └── submission.ts               # Mongoose submission schema
├── proxy.ts                        # Protects /admin routes
└── .env.local                      # Environment variables (not committed)
```

---

## Environment variables

Create a `.env.local` file in the project root:

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
| `EMAIL_USER` | Gmail address used to send confirmation emails |
| `EMAIL_PASS` | Gmail [App Password](https://support.google.com/accounts/answer/185833) (not your normal Gmail password) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | Secret key for signing JWT tokens — use a long random string in production |

---

## Getting started

### Prerequisites
- Node.js 18+
- pnpm
- MongoDB Atlas cluster
- Gmail account with App Password enabled

### Install and run

```bash
git clone https://github.com/Haseeb-takween/demo-project.git
cd demo-project
pnpm install
```

Create `.env.local` with the variables above, then:

```bash
pnpm dev
```

Open:
- **Public form:** http://localhost:3000
- **Admin login:** http://localhost:3000/admin/login

### Build for production

```bash
pnpm build
pnpm start
```

---

## How to test

1. Open http://localhost:3000 and fill out the enquiry form.
2. Submit and confirm you are redirected to `/thank-you`.
3. Check the email inbox you used — a confirmation email should arrive.
4. Go to http://localhost:3000/admin/login and sign in with your `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
5. Confirm the submission appears in the dashboard table.
6. Click **Mark Reviewed** and confirm the row turns green.
7. Click **Logout** and confirm you are sent back to the login page.

---

## API routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/submit` | Public | Create a new submission and send confirmation email |
| `POST` | `/api/admin/login` | Public | Admin login — sets JWT cookie |
| `POST` | `/api/admin/logout` | Public | Clears JWT cookie |
| `GET` | `/api/admin/submissions` | Admin | List all submissions |
| `PATCH` | `/api/admin/submissions/[id]` | Admin | Mark a submission as reviewed |
| `GET` | `/api/health` | Public | Health check |

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add all environment variables from `.env.local` in the Vercel dashboard.
4. Deploy — your live URLs will be:
   - Form: `https://your-app.vercel.app/`
   - Admin: `https://your-app.vercel.app/admin/login`

---

## Known limitations

- Single admin account only (env-based login, no password reset)
- Weak JWT secret in dev — use a strong random value in production
- Admin session expires after 1 hour
- No email sent to admin on new submissions
- Phone number not shown in admin table
- Long messages truncated in the table
- No pagination, search, or filters
- No rate limiting or CAPTCHA on the form
- Duplicate email check may rely on a DB index, not the Mongoose schema

---

## Author

**Haseeb Sajjad** — [Haseeb-takween](https://github.com/Haseeb-takween)
