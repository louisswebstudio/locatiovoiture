-- ════════════════════════════════════════════════════════════════════
--  CONTRACTS - rental contracts with digital signatures
--  Run once in Supabase → SQL Editor.
-- ════════════════════════════════════════════════════════════════════
-- A contract can be linked to a booking (website / dashboard) or stand alone
-- (walk-in client). Client + car details are stored as a snapshot, so a signed
-- contract never changes when the client or car record is edited later.

create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  number bigint generated always as identity,        -- shown as BC-YYYY-0001
  status text default 'draft',                       -- draft / signed / closed

  -- renter
  client_name text not null,
  client_phone text,
  client_email text,
  client_cin text,                                   -- CIN or passport
  client_birth_date date,
  client_address text,
  licence_no text,
  licence_date date,

  -- second driver (optional)
  driver2_name text,
  driver2_cin text,
  driver2_licence text,

  -- vehicle
  car_id uuid references cars(id) on delete set null,
  car_name text,
  car_plate text,

  -- period
  pickup_date date not null,
  pickup_time text,
  pickup_place text,
  return_date date not null,
  return_time text,
  return_place text,

  -- pricing (MAD)
  price_per_day integer,
  total_days integer,
  total_price integer,
  deposit integer,
  payment_method text,                               -- especes / carte / virement / cheque
  amount_paid integer,

  -- vehicle state at departure
  km_out integer,
  fuel_out text,
  damages_out text,

  -- vehicle state at return (closing)
  km_in integer,
  fuel_in text,
  damages_in text,
  extra_fees integer,
  closed_at timestamptz,

  notes text,
  terms text,                                        -- terms snapshot at signing

  -- signatures (PNG data URLs)
  client_signature text,
  agency_signature text,
  signed_at timestamptz,
  signed_by text,                                    -- dashboard user email

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists contracts_agency_idx  on contracts (agency_id, created_at desc);
create index if not exists contracts_booking_idx on contracts (booking_id);

-- ─── Security: only the signed-in agency owner can see its contracts ──
-- Contracts hold ID numbers and signatures, so unlike the demo tables they are
-- NOT open to the anon key. Access requires Supabase Auth (dashboard login).
create or replace function auth_agency_id() returns uuid
  language sql stable as $$
    select nullif(
      coalesce(
        current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata'  ->> 'agency_id',
        current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'agency_id',
        ''),
      '')::uuid
  $$;

alter table contracts enable row level security;

drop policy if exists "Agency manages own contracts" on contracts;
create policy "Agency manages own contracts"
  on contracts for all
  to authenticated
  using (agency_id = auth_agency_id())
  with check (agency_id = auth_agency_id());
