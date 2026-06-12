# Bestore Car — Supabase backend

The website + dashboard now read/write a real Supabase backend instead of
`localStorage`. **All existing HTML/CSS/JS pages are unchanged in structure** —
only the data layer was swapped.

Until you fill in real Supabase keys, the site automatically runs on a built-in
**local demo** (localStorage), so every page keeps working exactly as before.

---

## What changed

| File | Role |
|------|------|
| `schema.sql` | Tables + RLS + realtime. Run once in the Supabase SQL editor. |
| `lib/supabase.js` | Canonical Supabase client (ESM, `process.env`) — for Node / a future bundler. |
| `lib/db.js` | Canonical data layer (the brief's exact function signatures). |
| `seed.js` | Node script that inserts the sample data (`node seed.js`). |
| `js/supabase-config.js` | **Public** browser config (URL + anon key + agency id). Edit this. |
| `js/supabase-client.js` | Builds `window.sbClient` from the CDN build + the config. |
| `js/bookly-data.js` | Browser data layer (`window.BooklyDB`) used by the dashboard & widget. Has a Supabase driver **and** a localStorage fallback driver. |
| `dashboard.html` | Now loads data via `BooklyDB`, with live realtime refresh. |
| `js/booking-widget.js` | Saves a `pending` booking to Supabase before opening WhatsApp (non-blocking). |

> **Note on architecture:** this is a static site (no build step), so the
> browser pages load `@supabase/supabase-js` from a CDN and read public config
> from `js/supabase-config.js`. The npm package + `process.env` style from the
> brief is preserved in `lib/*` and `seed.js`, which run under Node. If you move
> the project to Next.js/Vite later, `lib/supabase.js` and `lib/db.js` are ready
> to use as-is.

---

## Setup — do this to go live

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier).

2. **Run the schema.** Supabase dashboard → SQL Editor → New query → paste the
   contents of `schema.sql` → Run.

3. **Copy your keys** into config (Supabase → Project Settings → API):
   - `js/supabase-config.js` → set `url` and `anonKey` (these are public/safe).
   - `.env.local` → set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
     and `SUPABASE_SERVICE_ROLE_KEY` (service role is **server-only**, for seeding).

4. **Seed the sample data** (1 agency, 8 cars, 10 clients, 15 bookings):
   ```bash
   npm install
   node seed.js
   ```

5. **Deploy to Vercel** with the env vars set (Project → Settings → Environment
   Variables). For per-agency subdomains, point `agence-slug.bookly.ma` at the
   project; the dashboard reads the agency from the subdomain
   (`location.hostname.split('.')[0]`) and falls back to `BESTORE_AGENCY_SLUG`
   on localhost / preview URLs.

---

## Authentication

The dashboard logs in with **Supabase Auth** (email + password) when Supabase is
configured, and falls back to the demo password gate (`bestore2024`) only when
it isn't. Create a dashboard user per agency:

```bash
node create-agency-user.js owner@bestore-car.ma "StrongPass123!" 11111111-1111-1111-1111-111111111111
```

The script stamps `user_metadata.agency_id`, so on login the dashboard
auto-loads that agency's data.

## ⚠️ Security note — RLS (read before production)

`schema.sql` currently ships with permissive **"Demo anon" RLS policies** so the
publishable key can read/write. Now that Auth is in place, tighten this:

1. Enable the auth-based policies (commented at the bottom of `schema.sql`) — the
   helper reads `agency_id` from the signed-in user's JWT.
2. Drop the four "Demo anon" policies.
3. For best security, move `agency_id` from `user_metadata` to `app_metadata`
   (users can't edit `app_metadata`).

Until you do that, any holder of the publishable key can read/write — fine for a
single-operator demo, not for real multi-tenant isolation.

---

## Multi-tenant: onboarding a new agency

1. Insert a row in `agencies` (unique `slug`).
2. Insert their `cars` (set `ref_id` if the public widget should pre-select them).
3. Point `their-slug.bookly.ma` at the same deployment.
4. The same `dashboard.html` initializes itself from the subdomain — no per-client
   code. (For the public website's booking widget, set `window.BESTORE_AGENCY_ID`
   / config per client build.)

---

## Verifying locally

Served statically (e.g. the dev server in `.claude/launch.json`), with **demo
fallback** active (placeholder keys):

- Dashboard renders 4 KPI cards, 8 fleet cars, 15 bookings, working stats charts.
- Create / confirm / cancel booking, edit car, and contracts all work.
- The public booking widget adds a `source: website`, `status: pending` booking
  (visible in the dashboard) just before opening WhatsApp — and never blocks it.

Once real keys are in `js/supabase-config.js`, the exact same pages use Supabase,
and the dashboard's overview/bookings refresh live via realtime when a new
website inquiry arrives (toast: *"Nouvelle réservation reçue!"*).
