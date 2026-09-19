# CertWinX — Ultra-Premium Business & Government Services Platform

A premium, motion-rich, fully responsive multi-page web application for CertWinX Private Limited.

**Tagline:** Aapki Tarakki Ka Saathi — Bharosa Aapka, Jimmedari Humari

---

## Stack

- **React 18 + Vite**
- **GSAP + ScrollTrigger + SplitText** — scroll-driven animations
- **Lenis** — smooth inertia scrolling
- **Tailwind CSS** — light luxury theme (warm white + premium blue + gold)
- **React Router 6** — multi-page routing
- **React Helmet Async** — SEO
- **Lucide React** — icons

---

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Configuration

Contact details live in `src/data/config.js` and can be overridden via `.env`:

```
VITE_WHATSAPP_NUMBER=918128931029
VITE_PHONE_NUMBER=+91 81289 31029
VITE_EMAIL=info@certwinx.com
VITE_OFFICE_ADDRESS=7-A Khodiyar Nagar, Near Shivam Gas Agency, Chandlodia, Ahmedabad – 382481, Gujarat, India
VITE_WORKING_HOURS=Monday–Saturday, 9:00 AM–6:00 PM
VITE_WEBSITE=www.certwinx.com
```

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Home (Hero, TrustStrip, BusinessNeeds, FeaturedServices, SchemeFinder, WhyCertWinX, 80-IAC, Process, Stats, CTA) |
| `/about` | About |
| `/services` | Service directory with search + filters |
| `/services/:slug` | Service detail |
| `/certifications` | Certifications |
| `/startup` | Startup support |
| `/msme` | MSME support |
| `/funding` | Funding options |
| `/schemes` | Government scheme finder |
| `/schemes/:slug` | Scheme detail |
| `/eligibility` | 7-step eligibility wizard |
| `/eligibility/results` | Rule-based results |
| `/consultation` | Book consultation |
| `/resources` | Resource categories |
| `/blog` | Articles |
| `/case-studies` | Verified case studies only |
| `/contact` | Contact + enquiry form |
| `/privacy-policy`, `/terms`, `/refund-policy`, `/disclaimer`, `/cookie-policy` | Legal |
| `/admin` | Admin dashboard (demo password: `certwinx-demo`) |

---

## Motion System

- `SplitTextReveal` — line-by-line clip reveal
- `MagneticButton` — cursor-follow elastic hover
- `CustomCursor` — desktop only, difference blend
- `TiltCard` — 3D perspective tilt
- `HorizontalScroll` — pinned horizontal section
- `Marquee` — infinite ticker
- `CounterNumber` — scroll-triggered numbers
- `ParallaxLayer`, `RevealOnScroll` — scroll utilities
- `ProcessPinned` — 7-step scrub reveal
- `ScrollProgress` — top progress bar

`prefers-reduced-motion` is respected across all hooks.

---

## Data & CMS-Ready

- `src/data/services.js` — 22 services
- `src/data/schemes.js` — 8 government schemes
- `src/data/eligibilityRules.js` — rule engine (`evaluateEligibility`)
- `src/data/config.js` — contact + WhatsApp

All are plain JS — easy to migrate to a CMS/backend.

---

## Important Business Rules

- No fabricated testimonials, awards, partnerships or success rates
- No guaranteed approvals, funding or tax exemptions
- Scheme data must include **official source** and **last verified** date
- Clear distinction between CertWinX assistance and government decisions

The disclaimer shown in the footer applies across the site.

---

## Admin

`/admin` — demo password: `certwinx-demo`
Frontend scaffold only. Connect to a backend for leads, CMS and eligibility rules.

---

## License

Proprietary — © CertWinX Private Limited.