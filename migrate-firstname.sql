-- Le formulaire de contrat sépare désormais Nom et Prénom.
-- Le contrat imprimait déjà une ligne « Prénom » : elle a enfin sa colonne.
ALTER TABLE contracts
ADD COLUMN IF NOT EXISTS client_firstname TEXT;
