-- ════════════════════════════════════════════════════════════════════
--  CONTRACTS v2 - remote signing link + client copy
--  Run in Supabase → SQL Editor AFTER migrate-contracts.sql.
-- ════════════════════════════════════════════════════════════════════
-- The agency sends the client a link  sign.html#t=<token>  (WhatsApp).
-- The contracts table stays auth-only: the public page never reads the table
-- directly, it calls the two SECURITY DEFINER functions below, which only
-- answer for a valid, non-expired token.

alter table contracts
  add column if not exists share_token uuid,
  add column if not exists share_expires timestamptz,
  add column if not exists client_signed_at timestamptz,
  add column if not exists agency_signed_at timestamptz,
  add column if not exists client_sign_ua text,        -- device used by the client
  add column if not exists client_sign_ip text,
  add column if not exists client_sign_method text,    -- draw / type
  add column if not exists agency_sign_method text;    -- draw / saved

create unique index if not exists contracts_share_token_idx
  on contracts (share_token) where share_token is not null;

-- ─── read a contract through its link ────────────────────────────────
create or replace function get_contract_by_token(p_token uuid)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'contract', to_jsonb(c) - 'share_token' - 'client_sign_ip' - 'client_sign_ua' - 'signed_by',
    'agency',   json_build_object('name', a.name, 'address', a.address, 'phone', a.phone)
  )
  from contracts c
  left join agencies a on a.id = c.agency_id
  where c.share_token = p_token
    and c.share_expires > now()
  limit 1
$$;

-- ─── client signs through the link ───────────────────────────────────
drop function if exists sign_contract_by_token(uuid, text);
drop function if exists sign_contract_by_token(uuid, text, timestamptz);
create or replace function sign_contract_by_token(p_token uuid, p_signature text, p_version timestamptz, p_method text default 'draw')
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  c contracts;
  hdrs json;
begin
  select * into c from contracts
   where share_token = p_token and share_expires > now()
   for update;

  if not found then
    raise exception 'Lien invalide ou expiré';
  end if;
  if c.status <> 'draft' or c.client_signature is not null then
    raise exception 'Ce contrat est déjà signé';
  end if;
  -- the agency edited the contract after the client opened the page
  if p_version is null or date_trunc('milliseconds', c.updated_at) <> date_trunc('milliseconds', p_version) then
    raise exception 'Le contrat a été modifié par l''agence. Rechargez la page pour lire la nouvelle version.';
  end if;
  if p_signature is null or left(p_signature, 22) <> 'data:image/png;base64,' or length(p_signature) > 500000 then
    raise exception 'Signature invalide';
  end if;

  hdrs := nullif(current_setting('request.headers', true), '')::json;

  update contracts set
    client_signature = p_signature,
    client_signed_at = now(),
    client_sign_method = case when p_method = 'type' then 'type' else 'draw' end,
    client_sign_ua   = left(hdrs ->> 'user-agent', 300),
    client_sign_ip   = split_part(hdrs ->> 'x-forwarded-for', ',', 1),
    -- agency already signed → contract is complete
    status           = case when agency_signature is not null then 'signed' else 'draft' end,
    signed_at        = case when agency_signature is not null then now() else signed_at end,
    updated_at       = now()
  where id = c.id;

  return get_contract_by_token(p_token);
end
$$;

revoke all on function get_contract_by_token(uuid) from public;
revoke all on function sign_contract_by_token(uuid, text, timestamptz, text) from public;
grant execute on function get_contract_by_token(uuid) to anon, authenticated;
grant execute on function sign_contract_by_token(uuid, text, timestamptz, text) to anon, authenticated;

-- ─── live updates in the dashboard when a client signs ───────────────
do $$ begin
  alter publication supabase_realtime add table contracts;
exception when duplicate_object then null;
end $$;

-- ─── saved agency signature (drawn once, reused on every contract) ───
-- Kept out of the public "agencies" table on purpose: only the signed-in
-- agency owner can read or change it.
create table if not exists agency_settings (
  agency_id uuid primary key references agencies(id) on delete cascade,
  agency_signature text,
  updated_at timestamptz default now()
);
alter table agency_settings enable row level security;

drop policy if exists "Agency manages own settings" on agency_settings;
create policy "Agency manages own settings"
  on agency_settings for all
  to authenticated
  using (agency_id = auth_agency_id())
  with check (agency_id = auth_agency_id());
