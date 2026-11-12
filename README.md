# Ghia Technologies — website

Marketing site for Ghia Technologies. *Growth, engineered.*

Next.js 16 (App Router, static export) + Tailwind CSS v4, built on the Ghia brand kit
(Ink / Paper / Ghia Volt, Inter Display + Inter + Geist Mono, signal rings).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # static HTML/CSS/JS → ./out
```

## Before launch — placeholders to replace

All in **`src/lib/site.ts`**:

| Setting | Now | Replace with |
|---|---|---|
| `url` | `https://ghiatechonlogies.com` | Set `NEXT_PUBLIC_SITE_URL` for production builds — without it the build is treated as a preview (noindex) |
| `email` | `ghiatechonologies@gmail.com` | — |
| `bookingUrl` | `/contact/` | Cal.com / Calendly link — every "Book a growth audit" / "Book a call" button uses it |
| `socials` | `#` | LinkedIn, Instagram, X, YouTube, Facebook profile URLs |

Also:
- **Enquiry form email** — see "Enquiry form" below. Until the domain is onboarded, the form shows a pre-filled
  email link instead of sending.
- `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` — placeholder legal text; have it reviewed.
- Copy assumptions to confirm (they describe how Ghia works): fixed-price audits and monthly retainer terms
  (`src/content/approach.ts`), "you own everything / no lock-in" commitments.

**Proof / results:** the brand rules allow verified figures only. No stats, testimonials or case studies are on the
site yet. Product mockups are labelled "Illustrative interface" and show no performance numbers.

## Content

Copy lives in typed data files — edit these, not the page components:

- `src/content/services.ts` — 3 main categories (`pillars`: Creative, Growth, Digital & AI) and 11 services, each
  with its own page at `/services/<slug>/`
- `src/content/solutions.ts` — the three flagship AI solutions
- `src/content/industries.ts` — industry pages
- `src/content/approach.ts` — process, engagement models, principles, FAQs
- `src/content/playbooks.ts` — articles (add an object to publish a new one)

Voice rules (from the brand guidelines): sentence case, no exclamation marks or emoji, numbers over adjectives,
verified figures only, avoid "leverage / synergy / cutting-edge / unlock / skyrocket".

## Design system

- Tokens: `src/app/globals.css` (from `ghia-tokens.json`). `.theme-ink` remaps tokens for dark bands.
- Brand components: `src/components/brand/` — `Logo`, `Mark`, `Icon` (kit icon set), `SignalRings`.
- One Volt accent per view; primary button is ink and turns Volt on hover.
- Fonts are subset WOFF2 builds of the kit fonts in `src/fonts/`; `assets/og/` holds build-time fonts for OG images.

## Motion

- **Remotion showreel** (`remotion/Reel.tsx`, 17s): edit with `npm run motion:studio`, re-render to
  `public/motion/reel.mp4` + poster with `npm run motion:render` (H.264 only — decodes everywhere).
  `HeroLoop` is kept as a composition but not used on the site. Remotion is free for individuals and companies of up to 3 people; larger teams
  need a Remotion company licence.
- **anime.js** (`src/components/motion/MotionDirector.tsx`): attribute-driven — `data-split`, `data-scramble`,
  `data-draw`, `data-stagger`, `data-scrub-words`, `data-magnetic`. Add the attribute to any element to animate it.
- **Shifting background** (hero): `src/components/motion/ShiftingGradient.tsx` — WebGL shader at ~38% resolution,
  30fps cap (12fps while scrolling), paused off-screen.
- **Guided scrolling**: `src/components/motion/SmoothScroll.tsx` (Lenis + section settle + Page Up/Down) and the
  chapter rail in `SectionRail.tsx`. Label a section with `data-section="Name"` to add it.
- **Kinetic marquee**, **custom cursor**, **card spotlight** and the **scroll progress bar** live alongside it.
- Everything respects `prefers-reduced-motion` (static posters, no animation).

## Deploy (Cloudflare)

Static assets on Cloudflare Workers — config in `wrangler.jsonc`, headers in `public/_headers`.

```bash
npx wrangler login
NEXT_PUBLIC_SITE_URL=https://your-domain npm run deploy
```

Then add the custom domain in the Cloudflare dashboard (Workers → ghia-website → Settings → Domains).

Old service URLs from the first version redirect to their new homes via `public/_redirects`.

## Enquiry form

The form (`src/components/sections/EnquiryForm.tsx`, on `/contact/` and at the end of the homepage) posts to
`POST /api/enquiry`, handled by the small Worker in `worker/index.ts`. Everything else is served straight from the
static export (`run_worker_first: ["/api/*"]`).

The Worker validates the fields, drops bots (a hidden honeypot field and a minimum fill time), and emails the
enquiry to `ENQUIRY_TO` through **Cloudflare Email Service** (the `EMAIL` binding). Replies go straight to the
visitor (`replyTo`). Service pages link to `/contact/?service=<slug>` to pre-select the service.

**To turn on sending** (once the domain is on the Cloudflare account that deploys the site):

```bash
npx wrangler email sending enable ghiatechonlogies.com   # adds the SPF/DKIM records
# then set ENQUIRY_FROM / ENQUIRY_TO in wrangler.jsonc if they change, and redeploy
```

Until then the endpoint answers `503` and the form offers a pre-filled `mailto:` link, so no enquiry is lost.

Local testing: `npm run preview` (`wrangler dev`) simulates sends and writes the email to `.wrangler/tmp/email/`
instead of delivering it. `next dev` has no Worker, so the form always shows the fallback there.
After changing bindings in `wrangler.jsonc`, regenerate types with
`npx wrangler types worker/worker-configuration.d.ts`.

