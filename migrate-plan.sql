-- Per-agency plan: which dashboard modules the agency sees.
--   'full'      : the whole SaaS dashboard (default)
--   'contracts' : contracts only (+ online requests and fleet, which contracts need)
-- Switching an agency later is a single UPDATE, no deploy and no data change.

ALTER TABLE agencies
ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'full'
  CHECK (plan IN ('full', 'contracts'));

-- AYM Rent Car (Aymen) : contracts only for now.
UPDATE agencies SET plan = 'contracts' WHERE slug = 'bestore-car';

-- To give him the full dashboard later:
-- UPDATE agencies SET plan = 'full' WHERE slug = 'bestore-car';
