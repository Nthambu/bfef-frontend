# BFEF Kenya — Frontend (Sprint 1)

Angular 18 · Standalone components · CSS custom properties · No UI library

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and point it at your running NestJS API
cp .env.example .env
# Edit src/environments/environment.ts — set apiUrl to your backend

# 3. Start dev server
npm start
# → http://localhost:4200
```

Make sure your NestJS backend is running on port 3000 first:
```bash
# In your bfef-sprint1 backend folder:
npm run start:dev
```

---

## Pages delivered in Sprint 1

| Route           | Component                  | API calls                          |
|-----------------|----------------------------|------------------------------------|
| `/`             | HomeComponent              | none (static)                      |
| `/about`        | AboutComponent             | GET /public/pages                  |
| `/leadership`   | LeadershipComponent        | GET /public/leadership             |
| `/constitution` | ConstitutionComponent      | static (articles hardcoded)        |
| `/contact`      | ContactComponent           | POST /public/contact               |

---

## Folder structure

```
src/
├── app/
│   ├── app.component.ts        ← root shell (navbar + router-outlet + footer)
│   ├── app.config.ts           ← provideRouter + provideHttpClient
│   ├── app.routes.ts           ← lazy-loaded page routes
│   │
│   ├── core/
│   │   ├── models/api.models.ts        ← Page, Member, ContactFormPayload interfaces
│   │   ├── services/api.service.ts     ← all HTTP calls in one place
│   │   └── interceptors/               ← http-error.interceptor (network errors)
│   │
│   ├── pages/
│   │   ├── home/               ← hero, stats counter, programs, pullquote, trust strip
│   │   ├── about/              ← about, vision/mission, objectives, core values
│   │   ├── leadership/         ← governance facts, officials grid, board grid
│   │   ├── constitution/       ← accordion articles, sticky TOC, PDF download
│   │   └── contact/            ← reactive form, subject select, success state
│   │
│   └── shared/
│       ├── components/
│       │   ├── navbar/         ← fixed nav, scroll shadow, mobile burger
│       │   └── footer/         ← 3-column footer
│       └── directives/
│           └── scroll-reveal.directive.ts  ← IntersectionObserver fade-in
│
├── environments/
│   ├── environment.ts          ← apiUrl: http://localhost:3000/api/v1
│   └── environment.prod.ts     ← apiUrl: https://api.bfefkenya.org/api/v1
│
└── styles.css                  ← ALL design tokens + global classes (edit here first)
```

---

## Design tokens (styles.css)

All colours, fonts, spacing live as CSS custom properties on `:root`.
Change a value once → updates everywhere.

| Token          | Value     | Used for                          |
|----------------|-----------|-----------------------------------|
| `--navy`       | `#0D2137` | Primary bg, headings, nav         |
| `--amber`      | `#E8A020` | CTAs, accents, stat numbers       |
| `--green`      | `#1A6640` | Eyebrows, value card borders      |
| `--parchment`  | `#F7F4EE` | Hero bg (notebook ruled texture)  |
| `--font-display` | Playfair Display | All headings, names     |
| `--font-body`  | Inter     | Body, labels, buttons             |

---

## Key things to know before you start

### 1. API service is the only place HTTP calls live
`src/app/core/services/api.service.ts` — add any new endpoint here,
never call HttpClient directly from a component.

### 2. ScrollRevealDirective
Add `appScrollReveal` to any element and it fades in when it scrolls
into view. Add `class="fade-in-delay-1"` (1–4) to stagger siblings.

```html
<div appScrollReveal class="fade-in-delay-2">...</div>
```

### 3. Lazy loading
All pages load on demand via `loadComponent` in `app.routes.ts`.
No extra setup needed — Angular 18 handles it.

### 4. Contact form validation
Uses Angular Reactive Forms. The `isInvalid(field)` helper in
`contact.component.ts` only shows errors after the user has touched
a field — no angry red on first load.

### 5. Environment switching
`ng build --configuration production` automatically swaps
`environment.ts` → `environment.prod.ts` (Angular CLI handles this).

---

## What is NOT in Sprint 1 (comes later)

- Auth / login pages (Sprint 2+)
- Donor portal (Sprint 4)
- Donate / M-Pesa flow (Sprint 4)
- Impact stories page (Sprint 2)
- Admin dashboard (separate app or guarded routes)

---

## Updating content without a redeploy

All page text (mission, vision, about, objectives, core values) is
served from the `pages` table in your database via the API.
To update copy: edit the row in PostgreSQL or call the admin API,
no frontend redeploy needed.

Member names on the Leadership page come from the `members` table —
same deal.
