-- Toutes les cases imprimées sur le contrat papier ont désormais un champ
-- dans le formulaire du dashboard : voici les colonnes qui leur correspondent.
ALTER TABLE contracts
  ADD COLUMN IF NOT EXISTS client_firstname   TEXT,
  ADD COLUMN IF NOT EXISTS client_nationality TEXT,
  ADD COLUMN IF NOT EXISTS client_passport    TEXT,
  ADD COLUMN IF NOT EXISTS cin_place          TEXT,
  ADD COLUMN IF NOT EXISTS cin_date           DATE,
  ADD COLUMN IF NOT EXISTS licence_place      TEXT,
  ADD COLUMN IF NOT EXISTS passport_place     TEXT,
  ADD COLUMN IF NOT EXISTS passport_date      DATE,
  ADD COLUMN IF NOT EXISTS driver3_name       TEXT,
  ADD COLUMN IF NOT EXISTS driver3_cin        TEXT,
  ADD COLUMN IF NOT EXISTS driver3_licence    TEXT,
  ADD COLUMN IF NOT EXISTS car_type           TEXT,
  ADD COLUMN IF NOT EXISTS fuel_type          TEXT,   -- essence / diesel
  ADD COLUMN IF NOT EXISTS auto_radio         TEXT,   -- oui / non
  ADD COLUMN IF NOT EXISTS spare_wheel        TEXT,   -- oui / non
  ADD COLUMN IF NOT EXISTS return_actual_time TEXT;
