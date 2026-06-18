# Blue Mesa Pools & Spas

Marketing site for Blue Mesa Pools & Spas — a custom pool & spa builder serving
El Paso and the 915 area. Static-first, mobile-first, built to capture leads.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · Vercel.
No database. The only server surface is the lead form handler.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in LEADS_WEBHOOK_URL (see below)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

## Lead capture

Consultation submissions flow through a swappable sink so we can move from
Google Sheets to GoHighLevel later without touching the form or route:

```
<ConsultForm/>  →  POST /api/lead  →  getLeadSink().capture()  →  Google Sheet row
```

- The route (`app/api/lead/route.ts`) validates + normalizes the phone, runs a
  honeypot check and a per-IP rate limit, then calls the sink.
- `SheetsSink` (`lib/leads/sink.ts`) POSTs the lead to a Google Apps Script web
  app. **The form is fully built and tested** — it goes live the moment
  `LEADS_WEBHOOK_URL` is set.

### Stand up the Google Sheet (required to receive leads)

Follow **[docs/google-apps-script.md](docs/google-apps-script.md)**:
create the sheet, paste the `doPost` script, deploy as a web app, then set
`LEADS_WEBHOOK_URL` to the `/exec` URL — locally in `.env.local` and in Vercel.

### Migrating to GoHighLevel later

Implement `GHLSink` against the `LeadSink` interface and change the one line in
`lib/leads/index.ts`. Form, route, and validation are untouched.

## Deploy (Vercel)

1. Import the repo into Vercel (framework auto-detected as Next.js).
2. Set env var `LEADS_WEBHOOK_URL`.
3. Add the custom domain `bluemesapoolandspa.com`.
4. Deploy, then submit the form once in production to confirm a row lands.

## Confirm before public launch  [BRAND INPUT]

- **Domain:** brief says `bluemesapoolandspa.com`; the flyer footer says
  `bluemesapools.com`. Confirm which is registered. Set in `lib/site.ts`.
- **Phone:** `+1 (915) 229-1558` — confirm it can receive both calls and texts.
- **Logo:** an SVG/vector of the wordmark would keep it crisp at all sizes
  (currently the supplied PNG is used in the header; a vector mesa mark is used
  for the favicon/footer/OG).
- **Photography:** the hero, "why," and gallery use clearly-labeled placeholder
  imagery. Swap in real project photos (search the code for `TODO(photography)`).
- **Business details for SEO:** street address, hours, and social links to
  enrich the `LocalBusiness` schema in `components/seo/LocalBusinessJsonLd.tsx`.

## Notes

- Brand tokens and fonts live in `app/globals.css` (Tailwind v4 `@theme`).
- Scroll reveals are CSS scroll-driven animations: content is visible by default
  and enhances where supported, so nothing ever renders blank without JS.
