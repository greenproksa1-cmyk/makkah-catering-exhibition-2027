# معرض مكة للإعاشة والتموين 2027

موقع تعريفي رسمي لمعرض مكة للإعاشة والتموين 2027 — منصة الأعمال المتخصصة في قطاع الإعاشة والضيافة وتجهيزات المطابخ، تُقام في قلب مكة المكرمة.

**Makkah Catering & Food Supply Exhibition 2027** — a bilingual (Arabic / English) marketing site for the catering, food supply and hospitality exhibition in Makkah.

---

## Event facts

| | |
|---|---|
| **Dates** | 10 – 12 January 2027 · 2 – 4 Sha'ban 1448 |
| **Venue** | Hilton Makkah Convention Hall, Makkah, Saudi Arabia |
| **Organiser** | Green Projects (قرين بروجكتس) |
| **Early-bird offer** | 30% off until 15 November 2026 — 1,600 SAR/m² instead of 2,285 SAR/m² |
| **Sectors** | Food & Beverage · Kitchen & Catering Equipment · Catering & Food Service · Cold Chain · Packaging · Technology |

---

## Features

- **Bilingual, RTL-first** — Arabic is the default locale with a full English mirror. Every string lives in the dictionary; no copy is hard-coded in components.
- **Navy + gold dark theme** — `#1F2E4D → #16213A` surfaces with `#E0B93A / #C9A227` accents, defined as design tokens in `tailwind.config.ts` and `globals.css`.
- **13 single-page sections** — hero, introduction, importance of location, idea & timing, objectives, exhibition sectors, target visitors, event experience, why exhibit, value of participation, early-bird pricing (with live calculator), partners, registration.
- **Live early-bird calculator** — enter a stand area (m²) to compare the early-bird and regular totals and see the saving.
- **Accessible interactions** — keyboard-friendly tabs, `aria-current` navigation, reduced-motion support, visible focus states.
- **Registration form** — exhibitor / visitor tabs with client-side validation and an API route at `/api/register`.
- **SEO** — per-locale metadata, Open Graph, `hreflang` alternates, JSON-LD `Event` schema, sitemap and robots.
- **Static-first** — both locales are prerendered by Next.js; no database required.

---

## Tech stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** (strict)
- **Tailwind CSS 3**
- **Framer Motion 11**
- **next/font** — Inter + IBM Plex Sans Arabic

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — it redirects to `/ar`. The English site is at `/en`.

### Production build

```bash
npm run build
npm start
```

### Type check

```bash
npm run typecheck
```

---

## Project structure

```
content/
  ar.json               # Arabic dictionary — the source of truth for the Dictionary type
  en.json               # English dictionary, structurally identical to ar.json
public/images/          # Hero, introduction and conference photography + organiser logo
src/
  app/
    (rtl)/ar/           # Arabic routes (html lang="ar" dir="rtl")
    (ltr)/en/           # English routes (html lang="en" dir="ltr")
    LandingPage.tsx     # Section composition, shared by both locales
    globals.css         # Design tokens, type scale, buttons, utilities
    api/register/       # Registration endpoint
  components/           # One component per section, plus shared UI primitives
  lib/                  # Dictionary loader, types, i18n helpers, event facts
```

---

## Editing content

All copy, dates, prices and contact details live in **`content/ar.json`** and **`content/en.json`**.

1. Keep both files structurally identical.
2. `content/ar.json` drives the TypeScript `Dictionary` type, so a new key must be added to both files.
3. Prices for the early-bird calculator are in `earlyBird.earlyPrice` and `earlyBird.regularPrice` (SAR per m²).
4. Event dates are in `event.startISO` / `event.endISO`; the countdown reads them directly.

Contact details are in `organizer`, and the venue is in `location.venueTba`.

---

## Deployment

The project deploys to Vercel with zero configuration:

```bash
vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs and JSON-LD resolve correctly. Without it, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically, then `http://localhost:3000` as a fallback.

---

## Contact

**Green Projects — قرين بروجكتس**
Phone: +966 59 0401 777
Email: contact@gren-pro.com
Web: www.greeen-pro.com

---

© 2027 Green Projects. All rights reserved.
