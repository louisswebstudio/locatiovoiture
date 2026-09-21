// scripts/import-fleet.js - load Bestore Car's real fleet into Supabase.
//
// Cars are matched on ref_id, so running this again updates instead of
// duplicating. Cars with price 0 or no photo stay hidden on the public
// website (see getCars in js/bookly-data.js) but are usable in the dashboard.
//
// Usage:
//   node scripts/import-fleet.js              # add / update the 26 real cars
//   node scripts/import-fleet.js --prune      # also delete demo cars not in this list
//
// Needs SUPABASE_SERVICE_ROLE_KEY in .env.local (server-only).

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })
dotenv.config()

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const AGENCY_ID = '11111111-1111-1111-1111-111111111111' // Bestore Car

const AC = 'Clim', SEATS = '5 places', AUTO = 'Automatique', MAN = 'Manuelle'

// price_per_day: 0 = "à définir" (the agency sets it in the dashboard)
// photo_url: null = no photo yet
export const FLEET = [
  // ─── Économique ───
  { ref_id: 20, name: 'Opel Corsa',              category: 'Économique', price_per_day: 300, photo_url: null,                                    features: [MAN, AC, SEATS] },
  { ref_id: 21, name: 'Hyundai i10',             category: 'Économique', price_per_day: 0,   photo_url: 'assets/images/cars/i10.webp',           features: [AUTO, AC, SEATS] },
  { ref_id: 11, name: 'Hyundai i20',             category: 'Économique', price_per_day: 0,   photo_url: 'assets/images/cars/i20.webp',           features: [AUTO, AC, SEATS] },
  { ref_id: 22, name: 'Dacia Logan',             category: 'Économique', price_per_day: 0,   photo_url: null,                                    features: [MAN, AC, SEATS] },
  { ref_id: 23, name: 'Renault Clio 5 2025',     category: 'Économique', price_per_day: 0,   photo_url: 'assets/images/cars/clio5.webp',         features: [AC, SEATS] },

  // ─── Confort / berlines ───
  { ref_id: 5,  name: 'Peugeot 208',             category: 'Confort',    price_per_day: 0,   photo_url: 'assets/images/cars/p208.webp',          features: [MAN, AC, SEATS] },
  { ref_id: 25, name: 'Peugeot 208 Hybride',     category: 'Confort',    price_per_day: 0,   photo_url: 'assets/images/cars/p208.webp',          features: [AUTO, 'Hybride', AC] },
  { ref_id: 24, name: 'Hyundai Accent 2025',     category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AC, SEATS] },
  { ref_id: 26, name: 'Seat Ibiza FR',           category: 'Confort',    price_per_day: 0,   photo_url: 'assets/images/cars/seat-ibiza.webp',    features: [AC, SEATS] },
  { ref_id: 27, name: 'Seat Leon FR',            category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AC, SEATS] },
  { ref_id: 28, name: 'Cupra Leon 2025',         category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, SEATS] },
  { ref_id: 29, name: 'Volkswagen Golf 8.5 2026',category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, SEATS] },
  { ref_id: 30, name: 'Audi A3 2025',            category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, SEATS] },
  { ref_id: 31, name: 'Mercedes Classe A',       category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, SEATS] },
  { ref_id: 32, name: 'BMW Série 1 2026',        category: 'Confort',    price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, SEATS] },

  // ─── SUV ───
  { ref_id: 33, name: 'Hyundai Tucson',          category: 'SUV',        price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'SUV'] },
  { ref_id: 34, name: 'Dacia Duster',            category: 'SUV',        price_per_day: 0,   photo_url: 'assets/images/cars/duster.webp',        features: [MAN, AC, 'SUV'] },
  { ref_id: 35, name: 'Dacia Duster Automatique',category: 'SUV',        price_per_day: 0,   photo_url: 'assets/images/cars/duster.webp',        features: [AUTO, AC, 'SUV'] },
  { ref_id: 7,  name: 'Volkswagen T-Roc',        category: 'SUV',        price_per_day: 0,   photo_url: 'assets/images/cars/troc.webp',          features: [AC, 'SUV', SEATS] },
  { ref_id: 36, name: 'Volkswagen Tiguan 2025',  category: 'SUV',        price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'SUV'] },
  { ref_id: 37, name: 'Audi Q3 2026',            category: 'SUV',        price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'SUV'] },
  { ref_id: 38, name: 'Cupra Formentor 2025',    category: 'SUV',        price_per_day: 0,   photo_url: 'assets/images/cars/cupra-formentor.webp',features: [AUTO, AC, 'SUV'] },

  // ─── Luxe / premium ───
  { ref_id: 39, name: 'Audi RS3 2026',           category: 'Luxe',       price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'Sport'] },
  { ref_id: 40, name: 'Porsche Macan',           category: 'Luxe',       price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'SUV'] },
  { ref_id: 41, name: 'Range Rover Sport 2025',  category: 'Luxe',       price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'SUV'] },
  { ref_id: 42, name: 'Volkswagen Touareg 2025', category: 'Luxe',       price_per_day: 0,   photo_url: null,                                    features: [AUTO, AC, 'SUV'] },
]

if (!URL || !SERVICE_KEY) {
  console.error('✗ Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const prune = process.argv.includes('--prune')
const supabase = createClient(URL, SERVICE_KEY, { auth: { persistSession: false } })

async function main() {
  const { data: existing, error: readErr } = await supabase
    .from('cars').select('id, ref_id, name, plate, status').eq('agency_id', AGENCY_ID)
  if (readErr) throw readErr

  const byRef = new Map(existing.map((c) => [c.ref_id, c]))
  let added = 0, updated = 0

  for (const car of FLEET) {
    const row = {
      agency_id: AGENCY_ID,
      ref_id: car.ref_id,
      name: car.name,
      category: car.category,
      price_per_day: car.price_per_day,
      photo_url: car.photo_url,
      features: car.features,
    }
    const found = byRef.get(car.ref_id)
    if (found) {
      // keep the plate and status the agency already set
      const { error } = await supabase.from('cars').update(row).eq('id', found.id)
      if (error) throw error
      updated++
      console.log(`  ~ ${car.name}`)
    } else {
      const { error } = await supabase.from('cars').insert({ ...row, status: 'available' })
      if (error) throw error
      added++
      console.log(`  + ${car.name}`)
    }
  }

  const keep = new Set(FLEET.map((c) => c.ref_id))
  const extra = existing.filter((c) => !keep.has(c.ref_id))

  if (extra.length && prune) {
    for (const c of extra) {
      const { error } = await supabase.from('cars').delete().eq('id', c.id)
      if (error) throw error
      console.log(`  - ${c.name} (supprimée)`)
    }
  }

  console.log(`\n✓ ${added} ajoutées, ${updated} mises à jour, ${FLEET.length} voitures au total`)
  if (extra.length && !prune) {
    console.log(`\n⚠ ${extra.length} voiture(s) hors liste toujours présente(s) : ${extra.map((c) => c.name).join(', ')}`)
    console.log('  Relancez avec --prune pour les supprimer.')
  }
  const todo = FLEET.filter((c) => !c.price_per_day || !c.photo_url)
  console.log(`\n${todo.length} voiture(s) à compléter (prix et/ou photo) avant publication sur le site :`)
  todo.forEach((c) => console.log(`  · ${c.name} - ${!c.price_per_day ? 'prix manquant' : ''}${!c.price_per_day && !c.photo_url ? ' + ' : ''}${!c.photo_url ? 'photo manquante' : ''}`))
}

// Only import/update when run directly - importing FLEET from another script
// must never write to the database.
const runDirectly = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop())
if (runDirectly) {
  main().catch((e) => { console.error('✗ Error:', e.message || e); process.exit(1) })
}
