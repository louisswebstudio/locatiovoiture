-- ════════════════════════════════════════════════════════════════════
--  BESTORE CAR — Supabase schema
--  Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--  Safe to re-run: uses "if not exists" / "drop policy if exists".
-- ════════════════════════════════════════════════════════════════════

-- ─── Extensions ───────────────────────────────────────────────────────
create extension if not exists "pgcrypto";  -- for gen_random_uuid()

-- ─── AGENCIES (multi-tenant: one row per client you onboard) ──────────
create table if not exists agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,          -- e.g. "bestore-car"
  phone text,
  address text,
  city text,
  whatsapp text,
  logo_url text,
  primary_color text default '#C41E2A',
  created_at timestamptz default now()
);

-- ─── CARS ─────────────────────────────────────────────────────────────
create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade,
  ref_id integer,                     -- stable small id used by the public booking widget
  name text not null,
  category text,                      -- Économique / Confort / SUV / Luxe
  price_per_day integer not null,     -- in MAD
  photo_url text,
  plate text,
  status text default 'available',    -- available / rented / maintenance
  features jsonb,                     -- ["GPS", "Clim", "5 places"]
  created_at timestamptz default now()
);
create unique index if not exists cars_agency_ref_idx on cars (agency_id, ref_id);

-- ─── CLIENTS ──────────────────────────────────────────────────────────
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade,
  full_name text not null,
  phone text,
  email text,
  cin text,                           -- Moroccan ID number
  notes text,
  created_at timestamptz default now()
);
-- needed for the upsert "onConflict: phone,agency_id" used in db.js
create unique index if not exists clients_agency_phone_idx
  on clients (agency_id, phone) where phone is not null;

-- ─── BOOKINGS ─────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade,
  client_id uuid references clients(id) on delete set null,
  car_id uuid references cars(id) on delete set null,
  pickup_date date not null,
  return_date date not null,
  pickup_time text,
  total_days integer,
  total_price integer,                -- in MAD
  deposit integer,
  status text default 'pending',      -- pending / confirmed / active / completed / cancelled
  notes text,
  source text default 'dashboard',    -- dashboard / website / whatsapp
  created_at timestamptz default now()
);
create index if not exists bookings_agency_idx  on bookings (agency_id);
create index if not exists bookings_pickup_idx  on bookings (agency_id, pickup_date);

-- ════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════════════
alter table agencies enable row level security;
alter table cars     enable row level security;
alter table clients  enable row level security;
alter table bookings enable row level security;

-- ─── Public read of agency branding (dashboard/website need this) ─────
drop policy if exists "Public can read agencies" on agencies;
create policy "Public can read agencies"
  on agencies for select using (true);

-- ─── Public read of cars (website visitors browse the fleet) ──────────
drop policy if exists "Public can view cars" on cars;
create policy "Public can view cars"
  on cars for select using (true);

-- ─── Public can create a booking + its client (website widget) ────────
-- The WhatsApp booking widget runs with the anon key and inserts a
-- pending lead before opening WhatsApp.
drop policy if exists "Public can create bookings" on bookings;
create policy "Public can create bookings"
  on bookings for insert with check (status = 'pending' and source = 'website');

drop policy if exists "Public can upsert clients" on clients;
create policy "Public can upsert clients"
  on clients for insert with check (true);

-- ════════════════════════════════════════════════════════════════════
--  DEMO / ANON DASHBOARD ACCESS  ⚠️  READ THIS
-- ════════════════════════════════════════════════════════════════════
-- The current dashboard.html is gated by a hard-coded password and talks to
-- Supabase with the *anon* key (there is no Supabase Auth yet). The policies
-- below let that anon key fully manage data, scoped per agency. This is fine
-- for a demo / single-operator setup but is NOT secure multi-tenant isolation
-- — any anon visitor could read/write any agency's rows.
--
-- FOR PRODUCTION: migrate the dashboard login to Supabase Auth (each agency
-- owner signs in; store their agency_id in app_metadata), DROP the four demo
-- policies below, and enable the auth-based policies in the commented block
-- at the bottom of this file.

drop policy if exists "Demo anon manage cars"     on cars;
drop policy if exists "Demo anon manage clients"  on clients;
drop policy if exists "Demo anon manage bookings" on bookings;
drop policy if exists "Demo anon read clients"    on clients;

create policy "Demo anon manage cars"
  on cars for all using (true) with check (true);

create policy "Demo anon read clients"
  on clients for select using (true);

create policy "Demo anon manage clients"
  on clients for update using (true) with check (true);

create policy "Demo anon manage bookings"
  on bookings for all using (true) with check (true);

-- ════════════════════════════════════════════════════════════════════
--  PRODUCTION (Supabase Auth) POLICIES — keep commented until you add Auth
-- ════════════════════════════════════════════════════════════════════
-- create-agency-user.js stores agency_id in user_metadata. The helper below
-- reads agency_id from EITHER app_metadata (preferred — users can't edit it) or
-- user_metadata (what the onboarding script currently sets), so the policies
-- work with the current setup. For stronger security, move agency_id to
-- app_metadata (set via the admin API) and drop the user_metadata fallback.
--
-- create or replace function auth_agency_id() returns uuid
--   language sql stable as $$
--     select nullif(
--       coalesce(
--         current_setting('request.jwt.claims', true)::jsonb
--           -> 'app_metadata' ->> 'agency_id',
--         current_setting('request.jwt.claims', true)::jsonb
--           -> 'user_metadata' ->> 'agency_id',
--         ''),
--       '')::uuid
--   $$;
--
-- create policy "Agency manages own cars"
--   on cars for all
--   using (agency_id = auth_agency_id())
--   with check (agency_id = auth_agency_id());
--
-- create policy "Agency manages own clients"
--   on clients for all
--   using (agency_id = auth_agency_id())
--   with check (agency_id = auth_agency_id());
--
-- create policy "Agency manages own bookings"
--   on bookings for all
--   using (agency_id = auth_agency_id())
--   with check (agency_id = auth_agency_id());

-- ─── Realtime: let the dashboard subscribe to booking changes ─────────
alter publication supabase_realtime add table bookings;
