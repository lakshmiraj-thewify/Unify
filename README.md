# Unify Wi-Fi — website

Marketing site for **Unify Wi-Fi**, the Cloud RADIUS & ISP Management Platform for MikroTik
operators, WISPs and LCOs. Ships to `https://unify.thewify.com`.

Unify is a sibling to [thewify.com](https://thewify.com) and
[guestwifi.thewify.com](https://guestwifi.thewify.com): same house style, deliberately distinct
product identity.

**Content source of truth:** `UNIFY_WIFI_APPROVED_BLUEPRINT.pdf` (manager-approved). Structure,
copy, stats, pricing state and section order come from that document and are not reinterpreted here.

## Status

**Phase 1 of 10 complete.** Foundation only — the homepage is a `noindex` placeholder until Phase 2.

| Phase | Scope                                            | State      |
| ----- | ------------------------------------------------ | ---------- |
| 1     | Scaffold, tokens, fonts, UI primitives, shell    | done       |
| 2     | Header / footer / hero / hero console / hardware | done       |
| 3     | Pillars, trust stats, how it works               | done       |
| 4     | Features, ISP solutions                          | done       |
| 5     | Savings calculator, business model, test tooling | done       |
| 6     | Architecture, FAQ, closing CTA                   | done       |
| 7     | `/pricing`, `/blog`, `/contact`                  | done       |
| 8     | Interactions + integration interfaces            | in progress |
| 9     | Responsive refinement                            | queued     |
| 10    | A11y, performance, SEO, CSP, JSON-LD, final QA   | queued     |

Each phase is reviewed and approved before the next begins.

## Stack

- **Next.js 16.3.4** App Router, React 19.2 — server components by default
- **TypeScript 6.0.3**, `strict: true`
- **Tailwind CSS 4.3.3** — CSS-first, tokens in `@theme` inside `app/globals.css`
- `lucide-react` icons, `clsx` + `tailwind-merge` (`cn()`)
- Fonts self-hosted at build time via `next/font/google`

No UI kit, no animation library, no state library, no CMS. Dependencies are pinned to exact
versions — every addition needs a reason that is written down.

## Getting started

Requires Node 22 or newer.

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

`.env.local` is optional in Phase 1 — nothing reads a credential yet. Every key in `.env.example`
is empty on purpose; see [Integrations](#integrations).

## Scripts

| Script                 | Does                                    |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Dev server on `http://localhost:3000`   |
| `npm run build`        | Production build                        |
| `npm start`            | Serve the production build              |
| `npm run typecheck`    | `tsc --noEmit`                          |
| `npm run lint`         | ESLint (flat config)                    |
| `npm run format`       | Prettier write                          |
| `npm run format:check` | Prettier check — what CI runs           |
| `npm run verify`       | typecheck → lint → build, in that order |

## Structure

```
app/
  globals.css          design tokens + base layer — the visual contract
  layout.tsx           html/body shell, fonts, metadata, skip link
  page.tsx             PLACEHOLDER — Phase 2 replaces it
  design-system/       internal, noindex: every token and variant on one page
components/
  ui/                  primitives: button, card, badge, stat, section, …
  layout/              shell pieces
  brand/               logo + mark (PROVISIONAL — see Q1)
content/               structured copy and config, separate from components
lib/                   cn, formatters, seo helper, link types
```

## Conventions

**Tokens, not values.** Colours, radii, shadows, easings and container widths are declared once in
`app/globals.css`. If a hex code appears in a component, that is a bug. The palette is a closed
semantic contract: `primary` for action, `signal` for live/real-time only, `navy` for structural
dark, `ok`/`warn`/`danger` for status and never for decoration.

**Type scale.** Exported class-string maps in `components/ui/typography.ts`, not `--text-*` theme
tokens — a token like `text-h2` is classified as a text _colour_ by `tailwind-merge` and gets
silently dropped when combined with one.

**Layout.** `Container` owns the gutter and max width; `Section` owns the vertical rhythm, band
tone and hairline. No section sets its own `max-w-*` / `px-*` pair.

**Numbers.** Set `data-numeric=""` on any element containing a figure. `globals.css` applies mono
with tabular figures so digit widths never shift. Format through `lib/format.ts` (`en-IN`
grouping) — never inline `toLocaleString`.

**Motion.** `Reveal` uses one `IntersectionObserver` and CSS. Its hidden start state is gated
behind `@media (scripting: enabled)`, so a visitor or crawler without JS sees content immediately
rather than a blank page. `prefers-reduced-motion` is honoured globally.

**Focus.** One `:focus-visible` rule site-wide, coloured by the `--focus-ring` variable. Dark
sections re-point it to cyan. Components never override it.

**Links.** `Button` and `Card` take either an internal `href` (typed from `next/link`) or
`href` + `external`, never both. The external branch always emits `rel="noopener noreferrer"`.

## Do not invent

Facts the blueprint references but does not specify are typed as `Provided<T> = T | null` in
`content/types.ts`. `null` is the only allowed representation. Where one is rendered, the UI shows
a dashed `pending` badge instead of a plausible-looking value.

Every one is tagged with a greppable marker:

```bash
grep -rn "PENDING(" content lib components app
```

Open at the end of Phase 1: pricing tier amounts, calculator assumption rates, five of six hardware
setup times, blog article bodies, the "MikroTik Certified" claim, the 99.99% vs 99.9% uptime
discrepancy between the blueprint and thewify.com, phone / WhatsApp / street address, the Sign In
destination, and Privacy / Terms copy.

## Integrations

`.env.example` documents the full surface — email, Google Calendar, WhatsApp, rate limiting,
analytics — with every value empty and every provider marked PROPOSED. The contract, enforced from
Phase 8: **credentials present → the feature runs live and the UI says so; credentials absent → the
feature runs in DEMO mode, the UI says so, and nothing is presented as a real delivery.**

## Deviations from the approved plan

- **Next.js 16.3.4**, not 15 — 16 is current stable; no plan detail depended on 15.
- **TypeScript 6.0.3**, not 7.x — `typescript-eslint` peers `<6.1.0`, so 7 would break linting.
- **ESLint 9.39.5** — `eslint-config-next@16.3.4` pulls plugins that cap at `^9`. npm prints a
  deprecation warning for 9.x; ESLint 10 has to wait for those plugins.
- **`typedRoutes: true`** enabled in Phase 7 (not Phase 10) — the full route tree
  (`/`, `/pricing`, `/blog`, `/contact`, `/legal/privacy`, `/legal/terms`) was complete at
  that point, so there was no reason to wait.
- **No test tooling yet** — Phase 5, per the approved plan, with the first logic worth testing.
- **Logo and favicon are provisional** geometric stand-ins, isolated to
  `components/brand/unify-logo.tsx` and `app/icon.svg` so the real asset is a one-file swap.
- **`zod@3.25.67`** added in Phase 8 — server-side validation for the contact and demo-booking
  API routes. Pinned to an exact version per the project convention. The alternative (manual
  validation) would be more code with worse error messages and no type inference.
