# Landing Page — DESIGN UPGRADE Prompt (Service Enquiry & Booking System)

> **Context for the AI:** The landing page is already built and functional (Next.js 16, React 19, Tailwind v4, shadcn/ui, MongoDB; enquiry form POSTs to `/api/submit` → redirects to `/thank-you`). **Do NOT touch the backend, the `/api/submit` route, the admin panel, or the form's data fields/logic.** This pass is **purely a design + motion upgrade** of the public home page. Elevate it from "good template" to **award-worthy** (Awwwards / SaaS-agency quality). Use the available design, accessibility, and UX-copy skills. Work section by section.
>
> **What this project actually is (important):** This is a **standalone portfolio / showcase demo** — a self-contained service-enquiry & booking website with its OWN fictional brand. It is **NOT** the Takween Digital platform and must **not** reference Takween Digital anywhere. The real purpose is to **demonstrate to potential clients/agencies that we can design & build custom, high-end booking websites**. So the design and copy must look like a real, polished product a client would proudly launch — this quality IS the sales pitch.
>
> **Brand for this demo:** Invent/use a clean, unique brand name for the fictional booking business — e.g. **"Servio"** (tagline: *"Book trusted local services in 60 seconds."*). If you prefer, use another single-word name like *BookNest, SwiftServe, Zenbook, Servly* — keep it consistent across every section (logo, copy, footer, meta). Do not use my real name or Takween Digital. All copy (headline, about, services, testimonials, FAQ) must be written uniquely for THIS fictional service brand.

---

## 0. Motion & Tooling Setup (do this first)

Add on top of the existing stack:

- `pnpm add gsap @gsap/react lenis` — GSAP + ScrollTrigger for scroll-driven storytelling, `useGSAP()` for React-19-safe cleanup, **Lenis** for buttery smooth-scroll (this alone makes the whole page feel premium).
- Keep **Framer Motion** for React UI states (modal, drawer, hover/tap, `whileInView` reveals). **Rule: never animate the same element with both libraries.** GSAP = scroll timelines & pinning; Framer = component-level interactions.
- Register `ScrollTrigger`; sync it with Lenis (`lenis.on('scroll', ScrollTrigger.update)`).
- Global easing standard: `power3.out`, durations **0.4–0.8s** (fast = premium, slow = amateur). Add a shared `ease` + `duration` token so everything feels consistent.
- **Respect `prefers-reduced-motion`** everywhere: wrap GSAP timelines in `gsap.matchMedia()` and disable scrubbing/parallax for those users.
- Lazy-load heavy GSAP sections; animate **transform/opacity only** (no layout-shifting properties) to protect Core Web Vitals.

## Design language (apply globally — 2026 trends)

- **LIGHT / WHITE background is the base** — clean, bright, airy. Primary background near-white (`#FFFFFF` / `#FAFAFB`), with light off-white/very-pale-accent section bands for rhythm. **Do NOT use a dark/black background.** (A dark theme can exist only as an optional toggle — but white is the default and the whole palette is built around it.)
- **Accent color built for a white bg:** pick ONE confident accent that pops on white — e.g. electric indigo `#4F46E5`, or a fresh teal/emerald — used for CTAs, links, highlights, and gradient accents. Text is near-black (`#0A0A0B` / slate-900) on white for strong contrast; secondary text in slate-500/600. Keep it minimal: white + one accent + neutrals.
- **Animated background (subtle, cool, but light):** the white bg should feel alive, not flat — use ONE of: a soft **animated mesh/aurora gradient in pale accent tints** drifting slowly, a faint **moving dot/line grid**, subtle **floating blurred blobs** in pastel accent, or an **interactive gradient blob that follows the cursor**. Keep it low-opacity and behind content so text stays crisp. Add a very light grain/noise overlay for texture.
- **Oversized, confident typography** + generous whitespace. Display font (Geist / Clash Display / Inter Tight) for headings in near-black, clean body font. Strong type scale (hero headline ~clamp(3rem, 8vw, 7rem)).
- **Glassmorphism (light variant)** on floating elements (navbar, cards on hover) — white glass: `backdrop-blur` + semi-white fill + thin light border + soft shadow.
- Rounded-2xl/3xl corners, **soft light shadows** (not heavy), consistent 8px spacing grid, reusable `<Section>` wrapper.
- **One message → one primary CTA → one next step** per section. Every section funnels toward the enquiry modal.
- Tokenize colors/spacing/radii as CSS variables — no scattered hex values.

---

## Unique content / copy direction (write for the fictional brand "Servio")

Write all copy fresh for this fictional service-booking brand — **no lorem ipsum, no Takween Digital, no generic filler.** Sample direction (rewrite/improve, don't copy verbatim):

- **Hero headline:** "Book trusted local services in 60 seconds." **Subhead:** "From home cleaning to repairs and beauty — enquire once, get matched with vetted pros, and confirm your slot. No calls, no waiting."
- **About section (make it unique & story-driven):** "Servio started with a simple frustration — booking a reliable service shouldn't mean ten phone calls and a day of waiting. We built one clean place to enquire, get matched with background-checked professionals, and lock in a time that works for you. Today Servio connects thousands of customers with trusted local experts across cleaning, repairs, beauty, and more." Pair with stats: *12k+ bookings · 4.9★ avg rating · under 15-min response · 30+ service types.*
- **Services (6 unique categories):** Home Cleaning · Repairs & Handyman · Beauty & Wellness · Appliance Service · Moving & Delivery · Gardening & Outdoor — each with a one-line benefit.
- **Why choose us:** Vetted & background-checked pros · Transparent upfront pricing · Reschedule anytime · Instant confirmation.
- **Testimonials:** 4–6 realistic, specific quotes with names, city, and the service used (e.g. "Booked a deep clean Friday night, cleaner arrived Saturday 9am — flawless." — *Ayesha K., Manchester*).
- **FAQ:** How does booking work? · How fast will I hear back? · Are the professionals verified? · Can I reschedule or cancel? · What areas do you cover? · How is pricing decided?
- **Footer tagline:** "Servio — trusted services, booked in seconds." Include a subtle, tasteful line that this is a demo/portfolio build only if you want (optional), but keep the brand experience real.

---

# SECTION-BY-SECTION SPEC

For each: **what to add · how to build it · the micro-interaction touch.**

## 1. Sticky Navbar
**What:** Glass navbar, transparent at top → frosted `backdrop-blur` + hairline border + subtle shadow after ~60px scroll. Brand mark (left), anchor links (center), **"Get Started"** primary button + theme toggle + "Sign in" ghost link → `/admin/login` (right). Mobile = shadcn `Sheet`.
**How:** Framer Motion `useScroll` to fade in the background/border. `Sheet` slides in with staggered link reveal.
**Micro-interactions:** nav links get an **animated underline that draws left→right** on hover; active-section link auto-highlights via ScrollTrigger; "Get Started" has a **magnetic pull** (button nudges toward cursor within ~40px) + soft glow; theme toggle **morphs** sun↔moon; logo mark does a tiny rotate/scale on hover.

## 2. Hero
**What:** One bold value headline (e.g. "Book any service in under 60 seconds"), one-line subhead, **primary CTA "Get Started"** (opens enquiry modal) + secondary "See how it works" (smooth-scrolls). Trust strip below (★ rating, "500+ bookings", "24/7 support"). Right/background = animated hero visual (mesh-gradient aurora or a floating glass "booking card" mockup — a real product preview beats abstract art per 2026 trends).
**How:** GSAP timeline on load: **kinetic type** — headline splits into words/chars and staggers up with blur→sharp. Aurora background animates slowly (GSAP or CSS). Parallax layers react to mouse move. Trust numbers **count up** when in view.
**Micro-interactions:** CTA has hover scale + traveling gradient sheen + a gentle idle pulse when it first enters view; secondary CTA arrow **slides right** on hover; floating hero card tilts with cursor (3D `rotateX/Y`); a small animated scroll-cue bounces at the bottom.

## 3. Logos / "Trusted by" Strip
**What:** A credibility marquee of client/partner/tech logos (or "As featured in"). Instant trust — a top 2026 conversion pattern.
**How:** Infinite horizontal marquee (GSAP `xPercent` loop or CSS), seamless wrap, greyscale logos.
**Micro-interactions:** marquee **pauses on hover**; hovered logo goes **greyscale → full color + slight lift**; edges fade out with a mask gradient.

## 4. Services / What We Offer (card grid)
**What:** 6 bookable service categories. Each card: icon, title, one-line benefit, "Enquire" link.
**How:** shadcn `Card` grid, `whileInView` **staggered** entrance (fade + rise). Bento-style layout (mixed card sizes) reads more premium than a uniform grid.
**Micro-interactions:** on hover — card lifts, border lights up with the accent, a **spotlight/gradient follows the cursor** across the card surface (radial-gradient tracking `mousemove`), and the icon does a small bounce/draw animation. Non-hovered cards dim slightly to focus attention.

## 5. How It Works — PINNED SCROLL (the hero moment)
**What:** The booking journey **Enquire → Confirm → Get Serviced** as a cinematic pinned section. This is the single biggest "wow" upgrade.
**How:** **GSAP ScrollTrigger pin** the section; as the user scrolls, scrub through the 3 steps — each step's visual/mockup swaps in, text updates, and a **progress line "draws"** (`strokeDashoffset`/`pathLength` tied to scroll progress). Numbered badges fill with accent as reached.
**Micro-interactions:** step number **counts/fills** on activation; connecting line draws in sync with scroll; each step card scales up when active & dims when passed; subtle parallax between text and mockup layers.

## 6. Why Choose Us / Benefits
**What:** 3–4 differentiators (fast response, verified providers, transparent pricing, easy rescheduling) with icons + short copy.
**How:** Alternating left/right rows or a feature grid; each reveals on scroll with a slight directional slide.
**Micro-interactions:** animated line-icons that **draw themselves** on view; on hover, a soft accent glow blooms behind the icon; number/stat chips count up.

## 7. Pricing / "Book a Slot" Teaser
**What:** Even a simple "Starting from…" or 2–3 plan cards drives booking intent. Highlight one "Most popular" plan.
**How:** shadcn `Card`s with a monthly/annual `Switch` toggle; popular card is visually elevated with an accent ring + badge.
**Micro-interactions:** toggling the price **animates the number rolling** to the new value; popular card has a slow **animated gradient border**; CTA on each card opens the enquiry modal with that service preselected.

## 8. Testimonials
**What:** Social proof carousel — avatar, name, role, ★ rating, quote. Optionally a standout "big quote" feature card.
**How:** Draggable + auto-advancing marquee (GSAP loop or Framer drag) that **pauses on hover/drag**. Cards use glassmorphism.
**Micro-interactions:** stars **animate in one-by-one** when a card enters view; drag has inertia/snap; active card is brighter/scaled, neighbors dimmed; quote marks subtly float.

## 9. Stats / About
**What:** Short mission line + a bold animated stats strip (bookings completed, avg response time, satisfaction %, cities served).
**How:** Big numbers **count up** via ScrollTrigger; a decorative gradient/mesh element parallaxes behind.
**Micro-interactions:** counters ease-out to final value; a thin underline sweeps under the section heading on reveal; percentage stats can fill a subtle radial/bar as they count.

## 10. FAQ
**What:** 5–6 questions that kill booking hesitation (response time, pricing, cancellation, coverage area, payment).
**How:** shadcn `Accordion`, one-open-at-a-time, smooth height animation.
**Micro-interactions:** the +/− icon **rotates/morphs** on toggle; answer text fades+slides in; the open item gets a soft accent left-border.

## 10b. Interactive Service Finder / Instant-Quote (NEW — engagement magnet)
**What:** A small interactive widget: user picks a service (pills), picks a date, optionally a slider (e.g. home size / hours), and sees an **instant "estimated from £X" + "typical response < 15 min"** result — then a "Continue to enquiry" button that opens the modal pre-filled. This is the 2026 "10–15s micro-demo" pattern that converts better than a plain "book a call".
**How:** Client-side only (no backend change) — simple estimate logic in state; on "Continue", pass the chosen service into the enquiry modal. Framer Motion for pill/selection transitions.
**Micro-interactions:** pills **spring-select** with a filling accent background; the estimate number **rolls/counts** to the new value on each change; slider thumb has a soft glow + live tooltip; result card fades/scales in; a tiny confetti or check pulse when a valid combo is set.

## 10c. Coverage / "Where we serve" (NEW — trust + reach)
**What:** A light stylized map or city grid showing service areas, with animated pins/dots and a live-feeling "just booked in …" ticker.
**How:** SVG map or a grid of city chips; GSAP staggers the pins dropping in; the ticker cycles recent-booking strings.
**Micro-interactions:** pins **drop + bounce** and pulse a soft ring on view; hovering a city highlights it + shows count; the "just booked" ticker slides new items up with a fade.

## 10d. Trust micro-blocks (GLOBAL — place near every CTA)
**What (research-backed):** Don't isolate proof in one testimonials block. Put **small trust signals right where hesitation happens** — under the hero CTA, beside the pricing button, and inside the enquiry modal.
**How:** tiny inline rows — ★ rating + "12k+ bookings", "Verified & background-checked pros", "No payment to enquire", secure/lock icon in the modal.
**Micro-interactions:** subtle fade-up on view; the lock/verified icon does a small draw-in; rating stars twinkle once.

## 11. Final CTA Band
**What:** Full-width band — "Ready to book? Get started in 60 seconds" + big **Get Started** button (reuses enquiry modal). On the white page this can be the ONE place you use a soft **accent-tinted gradient panel** (pale indigo/teal, still light) to make it stand out — or a filled accent card with rounded corners floating on the white bg.
**How:** Slowly drifting pale-accent gradient inside the panel; headline reveals with kinetic type on scroll.
**Micro-interactions:** background gradient slowly shifts; button magnetic + sheen; optional cursor-reactive pale gradient blob following the mouse across the band.

## 12. Footer
**What:** Brand + one-liner, quick links, contact, socials, newsletter input, copyright, theme toggle.
**How:** Clean multi-column; reveals on scroll.
**Micro-interactions:** social icons lift + tint on hover; newsletter input shows an **animated checkmark** on submit; links get the same draw-underline as the navbar.

---

## The Enquiry Modal (visual polish only — keep existing fields & submit logic)
- shadcn `Dialog` with a smooth spring open (scale+fade), backdrop blur, focus trap, ESC to close.
- Floating/animated labels, focus rings in the accent color, inline validation with **animated checkmark on valid** and gentle shake on error.
- Submit button: idle → **loading spinner** → **success checkmark draw** before redirecting to `/thank-you`. Keep it fully keyboard-accessible.

## Global micro-interaction layer (nice-to-have)
- Custom cursor / cursor-follower dot that grows over interactive elements (disable on touch).
- Scroll progress bar at the very top.
- Section headings reveal with a consistent kinetic-type treatment so the page feels cohesive.
- Page-load: a quick, tasteful intro (logo mask reveal) — keep under ~1s.

## Quality bar
- Fully responsive (375 / 768 / 1440), mobile-first; **disable pinning/parallax on small screens** and fall back to simple fades.
- WCAG AA: semantic HTML, alt text, contrast, `focus-visible` rings, keyboard operable, `prefers-reduced-motion` honored.
- 60fps, no layout shift, Lighthouse perf ≥ 90. Lazy-load GSAP-heavy sections.
- Real, benefit-driven UX copy — **no lorem ipsum**.

## Deliverables
1. Design-upgraded section components in `app/components/` (Navbar, Hero, Logos, Services, HowItWorks, Benefits, Pricing, Testimonials, Stats, FAQ, CtaBand, Footer, EnquiryDialog).
2. GSAP/Lenis setup + a shared motion-tokens file.
3. Theme tokens (dark + light) in Tailwind/CSS variables.
4. A short note listing shadcn components, GSAP plugins, and commands used.

Build it section by section, keep it clean and production-ready, and make it genuinely stunning.

---

# DEVELOPER HANDOFF SPEC (build to these exact specs)

Follow relevance → confidence → effort ordering, and treat the tables below as the source of truth. Reference **tokens, not raw values**.

## Design tokens (light theme — white base)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-subtle` | `#FAFAFB` | Alternating section bands |
| `--surface` | `rgba(255,255,255,0.7)` | Glass cards / navbar |
| `--border` | `#EAEAEC` | Hairlines, card borders |
| `--text` | `#0A0A0B` | Headings, primary text |
| `--text-muted` | `#5B6370` | Secondary text |
| `--accent` | `#4F46E5` | CTAs, links, highlights |
| `--accent-soft` | `#EEF0FF` | Pale accent fills, tints |
| `--radius` | `20px` (`--radius-lg` 28px) | Cards, buttons, modal |
| `--shadow` | `0 8px 30px rgba(16,24,40,0.08)` | Card/float shadow |
| `--space` | 8px base scale (8/16/24/40/64/96) | Rhythm |
| `--font-display` | Geist / Inter Tight, 600–700 | Headings |
| `--font-body` | Inter, 400–500 | Body |
| `--h1` | clamp(3rem, 8vw, 7rem) / 1.05 | Hero headline |
| `--section-y` | clamp(64px, 10vw, 120px) | Vertical section padding |
| `--ease` | `cubic-bezier(0.16,1,0.3,1)` (power3.out) | Global easing |
| `--dur` | 0.5s (micro 0.2s) | Global duration |

## Components (shadcn + custom)
| Component | Variant | Props / notes |
|-----------|---------|----------------|
| Button | primary / ghost / outline | `size`, `magnetic`, `loading`; primary = accent fill + sheen |
| Navbar | transparent / solid | scroll-state via `useScroll`; mobile = `Sheet` |
| Card | service / testimonial / pricing | hover: lift + cursor spotlight + border glow |
| Dialog | enquiry | spring open, focus-trap, blur backdrop |
| Accordion | faq | single-open, animated height |
| Marquee | logos / testimonials | pause-on-hover, edge mask |
| StatCounter | — | `from`, `to`, `suffix`; count-up on view |
| ServiceFinder | — | pills + slider + rolling estimate |
| SectionReveal | — | wraps children, `whileInView` stagger |

## States & interactions
| Element | State | Behavior |
|---------|-------|----------|
| Primary CTA | hover | scale 1.03, gradient sheen sweep, glow |
| Primary CTA | loading | spinner, disabled, aria-busy |
| Primary CTA | success | checkmark draw → redirect `/thank-you` |
| Nav link | hover | underline draws L→R (`--dur`) |
| Nav link | active-section | accent color, auto via ScrollTrigger |
| Service card | hover | lift, cursor-tracking radial spotlight, others dim |
| Form field | focus | accent focus-ring |
| Form field | valid / error | animated check / red border + shake + message |
| Accordion | open | +→× icon rotate, answer fade-slide, accent left-border |

## Responsive behavior
| Breakpoint | Changes |
|------------|---------|
| Desktop >1024px | Full layout, pinned How-It-Works, parallax, custom cursor |
| Tablet 768–1024px | 2-col grids, reduce parallax depth |
| Mobile <768px | 1-col, **disable pinning/parallax** → simple fades, `Sheet` nav, larger tap targets (≥44px), sticky bottom "Get Started" bar |

## Edge cases
- **Long text / i18n:** headings wrap gracefully (no clipping); cards equal-height; clamp long testimonials to 4 lines with fade.
- **Slow connection:** skeletons for cards/testimonials; hero text renders first, bg animation lazy-loads.
- **No JS / reduced motion:** all content visible; animations replaced by instant/opacity states.
- **Form errors / network fail:** inline error toast, keep entered values, retry enabled.
- **Empty ticker/marquee:** hide gracefully if no data.

## Animation / motion table
| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Hero headline | load | kinetic word/char stagger, blur→sharp, rise | 0.8s | power3.out |
| Hero bg | ambient | pale mesh/aurora drift + cursor blob | loop | sine.inOut |
| Section content | in-view | fade + 24px rise, stagger 0.08s | 0.5s | power3.out |
| Nav background | scroll >60px | fade in blur + border | 0.3s | power2.out |
| How-It-Works | scroll (pinned) | scrub steps + draw progress line | scrub | linear |
| Stat counters | in-view | count-up to value | 1.2s | power1.out |
| Service card | hover | lift + spotlight follow | 0.2s | power2.out |
| Logos / testimonials | ambient | infinite marquee, pause on hover | loop | none |
| Estimate number | change | roll/count to new value | 0.4s | power1.out |
| Modal | open | scale 0.96→1 + fade, backdrop blur | 0.3s | back.out(1.4) |
| Reveal (optional) | scroll | SVG mask / staggered "blinds" reveal | scrub | linear |

Sync all ScrollTriggers with Lenis; wrap scrubbed timelines in `gsap.matchMedia()` so mobile & reduced-motion get static fallbacks.

## Accessibility notes
- Logical focus order top→bottom; visible `focus-visible` accent ring on every interactive element.
- Modal: focus trap, `Esc` closes, focus returns to trigger, `aria-modal`, labelled title.
- Accordion uses button semantics + `aria-expanded`; nav is `<nav>` with `aria-current` on active link.
- All icons decorative → `aria-hidden`; meaningful ones get labels. Images have alt text.
- Contrast ≥ 4.5:1 (accent-on-white and text checked). Honor `prefers-reduced-motion`. Tap targets ≥ 44px.
