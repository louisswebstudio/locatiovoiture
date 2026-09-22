# Deploying AYM Rent Car to Vercel

This is a **static site** (plain HTML/CSS/JS, no build step). Vercel just serves
the files; `vercel.json` adds clean routes.

## One-time deploy

```bash
npm i -g vercel      # if you don't have the CLI
vercel login
vercel --prod        # run from this folder (the one with vercel.json)
```

Vercel serves the static files and applies the routes in `vercel.json`.

## Routes (from vercel.json)

| URL                     | Serves          |
|-------------------------|-----------------|
| `yourdomain.com/`         | `index.html`    |
| `yourdomain.com/fleet`    | `fleet.html`    |
| `yourdomain.com/contact`  | `contact.html`  |
| `yourdomain.com/dashboard`| `dashboard.html`|

The dashboard lives at **`yourdomain.com/dashboard`** and is intentionally **not
linked from the public nav** - admin only. (It's protected by Supabase Auth, so
the URL being guessable is fine.)

## Environment variables (Vercel dashboard → Project → Settings → Env Vars)

Add:

| Name | Value | Used by |
|------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wyvdwidioiixczjmiaez.supabase.co` | Node tooling / future bundler |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your `sb_publishable_…` key | Node tooling / future bundler |
| `supabase_service_role_key` (Secret) | your `sb_secret_…` key | referenced by `vercel.json` `env` |

> ⚠️ **Important nuance for this static setup.** The *browser* reads the Supabase
> URL + publishable key from **`js/supabase-config.js`** (committed), because a
> static page can't read `process.env` at runtime. So the `NEXT_PUBLIC_*` env
> vars above don't change what the deployed browser uses - they exist for the
> Node scripts (`seed.js`, `create-agency-user.js`) and for the day you move to a
> bundler/Next.js. **To change the live site's keys, edit
> `js/supabase-config.js`.**
>
> The `sb_secret_…` service-role key is **server-only**. It is never bundled into
> the static output (`.vercelignore` excludes `seed.js`, `create-agency-user.js`,
> `lib/`, and `.env.local`), and there are no serverless functions reading it, so
> it is never exposed to visitors. Keep it out of `js/supabase-config.js`.

## What ships vs. what's ignored

`.vercelignore` keeps server/tooling files out of the deployment:
`.env.local`, `node_modules`, `seed.js`, `create-agency-user.js`, `lib/`, and
`*.md`. The browser still gets `js/supabase-config.js`, `js/bookly-data.js`, etc.

## Per-agency subdomains (multi-tenant)

Point `agence-slug.yourdomain.com` at the same deployment. The dashboard resolves
the agency from the signed-in user's `user_metadata.agency_id` first, then falls
back to the subdomain slug, then to the default in `js/supabase-config.js`.
