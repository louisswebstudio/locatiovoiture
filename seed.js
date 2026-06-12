// seed.js — populate Supabase with Bestore Car sample data.
//
//   1. npm install
//   2. fill in .env.local (needs SUPABASE_SERVICE_ROLE_KEY to bypass RLS)
//   3. node seed.js
//
// Re-running wipes the agency's cars/clients/bookings and re-inserts them.

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Plain Node + dotenv does NOT auto-load .env.local (that's a Next.js feature),
// so load it explicitly, then fall back to a plain .env if present.
dotenv.config({ path: '.env.local' })
dotenv.config()

const URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!URL || !SERVICE_KEY) {
  console.error(
    '✗ Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
  )
  process.exit(1)
}

// Service-role client — bypasses RLS. Server-side only, never ship to browser.
const supabase = createClient(URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

// Fixed id so the website widget + dashboard always resolve the same agency.
// Must match window.BESTORE_AGENCY_ID in js/supabase-config.js.
const AGENCY_ID = '11111111-1111-1111-1111-111111111111'

// ── date helpers ──────────────────────────────────────────
const pad = (n) => String(n).padStart(2, '0')
const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const addDays = (d, n) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

// ── sample data ───────────────────────────────────────────
const AGENCY = {
  id: AGENCY_ID,
  name: 'Bestore Car',
  slug: 'bestore-car',
  phone: '+212 6 61 66 12 30',
  whatsapp: '212661661230',
  address: 'Avenue Arrar N°27, Tanger',
  city: 'Tanger',
  primary_color: '#C41E2A',
}

const CARS = [
  { ref_id: 2,  name: 'Dacia Sandero',   category: 'Économique', price_per_day: 320, photo_url: 'assets/images/cars/sandero.webp',        plate: '12345-أ-90', features: ['Clim', '5 places', 'Manuelle'] },
  { ref_id: 4,  name: 'Renault Clio',    category: 'Confort',    price_per_day: 420, photo_url: 'assets/images/cars/clio5.webp',          plate: '23451-ب-87', features: ['Clim', 'GPS', '5 places'] },
  { ref_id: 5,  name: 'Peugeot 208',     category: 'Confort',    price_per_day: 450, photo_url: 'assets/images/cars/p208.webp',           plate: '34512-أ-12', features: ['Clim', 'GPS', 'Bluetooth'] },
  { ref_id: 7,  name: 'Volkswagen T-Roc', category: 'SUV',       price_per_day: 600, photo_url: 'assets/images/cars/troc.webp',           plate: '45612-د-44', features: ['Clim', 'GPS', 'SUV', '5 places'] },
  { ref_id: 11, name: 'Hyundai i20',     category: 'Économique', price_per_day: 300, photo_url: 'assets/images/cars/i20.webp',            plate: '56712-ب-21', features: ['Clim', '5 places'] },
  { ref_id: 12, name: 'Skoda Octavia',   category: 'Confort',    price_per_day: 500, photo_url: 'assets/images/cars/skoda-octavia.webp',  plate: '67812-أ-65', features: ['Clim', 'GPS', 'Cuir'] },
  { ref_id: 14, name: 'Toyota Yaris',    category: 'Économique', price_per_day: 330, photo_url: 'assets/images/cars/toyota-yaris.webp',   plate: '78912-ج-33', features: ['Clim', '5 places', 'Économe'] },
  { ref_id: 15, name: 'Kia Sportage',    category: 'Luxe',       price_per_day: 700, photo_url: 'assets/images/cars/kia-sportage.webp',   plate: '89112-د-77', features: ['Clim', 'GPS', 'Cuir', 'SUV'] },
]

const CLIENTS = [
  { full_name: 'Youssef El Amrani',      phone: '+212 661-203145', email: 'y.elamrani@gmail.com',      cin: 'K456789' },
  { full_name: 'Fatima Zahra Bennani',   phone: '+212 662-887412', email: 'fz.bennani@gmail.com',      cin: 'KB112233' },
  { full_name: 'Mohammed Alaoui',        phone: '+212 663-554190', email: 'm.alaoui@outlook.com',      cin: 'K778899' },
  { full_name: 'Khadija Idrissi',        phone: '+212 664-301288', email: 'khadija.idrissi@gmail.com', cin: 'KA334455' },
  { full_name: 'Hamza Tazi',             phone: '+212 665-449023', email: 'hamza.tazi@gmail.com',       cin: 'K990011' },
  { full_name: 'Salma Berrada',          phone: '+212 667-128844', email: 'salma.berrada@gmail.com',    cin: 'KB556677' },
  { full_name: 'Omar El Fassi',          phone: '+212 668-990217', email: 'o.elfassi@yahoo.fr',         cin: 'K223344' },
  { full_name: 'Imane Chraibi',          phone: '+212 669-771503', email: 'imane.chraibi@gmail.com',    cin: 'KA667788' },
  { full_name: 'Yassine Benjelloun',     phone: '+212 661-660092', email: 'y.benjelloun@gmail.com',     cin: 'K445566' },
  { full_name: 'Nadia El Khattabi',      phone: '+212 662-334871', email: 'nadia.kh@gmail.com',         cin: 'KB778800' },
]

// [pickupOffsetFromToday, durationDays, status]
const BOOKING_PLAN = [
  [-28, 4, 'completed'], [-25, 3, 'completed'], [-21, 5, 'completed'], [-18, 2, 'completed'],
  [-14, 6, 'completed'], [-10, 3, 'completed'], [-6, 4, 'completed'],
  [-2, 5, 'active'], [-1, 4, 'active'], [0, 3, 'active'],
  [0, 2, 'confirmed'], [2, 5, 'confirmed'], [4, 3, 'confirmed'],
  [7, 4, 'pending'], [10, 6, 'pending'],
]
const TIMES = ['09:00', '10:00', '11:30', '14:00', '16:00']

// ── run ───────────────────────────────────────────────────
async function main() {
  console.log('→ Seeding Bestore Car…')

  // Wipe previous data for this agency (children first via FK cascade isn't
  // guaranteed for clients/cars set-null, so delete explicitly).
  await supabase.from('bookings').delete().eq('agency_id', AGENCY_ID)
  await supabase.from('cars').delete().eq('agency_id', AGENCY_ID)
  await supabase.from('clients').delete().eq('agency_id', AGENCY_ID)

  // Agency (upsert so the fixed id is stable across runs)
  let { error } = await supabase.from('agencies').upsert(AGENCY)
  if (error) throw error
  console.log('  ✓ agency')

  // Cars
  const { data: cars, error: carErr } = await supabase
    .from('cars')
    .insert(CARS.map((c) => ({ ...c, agency_id: AGENCY_ID })))
    .select()
  if (carErr) throw carErr
  console.log(`  ✓ ${cars.length} cars`)

  // Clients
  const { data: clients, error: cliErr } = await supabase
    .from('clients')
    .insert(CLIENTS.map((c) => ({ ...c, agency_id: AGENCY_ID })))
    .select()
  if (cliErr) throw cliErr
  console.log(`  ✓ ${clients.length} clients`)

  // Bookings
  const rows = BOOKING_PLAN.map((plan, i) => {
    const [offset, days, status] = plan
    const car = cars[i % cars.length]
    const client = clients[i % clients.length]
    const pickup = addDays(TODAY, offset)
    const ret = addDays(pickup, days)
    return {
      agency_id: AGENCY_ID,
      client_id: client.id,
      car_id: car.id,
      pickup_date: iso(pickup),
      return_date: iso(ret),
      pickup_time: TIMES[i % TIMES.length],
      total_days: days,
      total_price: days * car.price_per_day,
      deposit: car.price_per_day * 3,
      status,
      source: 'dashboard',
      notes: i % 4 === 0 ? "Livraison à l'aéroport" : null,
    }
  })
  const { data: bookings, error: bkErr } = await supabase
    .from('bookings')
    .insert(rows)
    .select()
  if (bkErr) throw bkErr
  console.log(`  ✓ ${bookings.length} bookings`)

  // Reflect active rentals on the cars
  const rentedCarIds = bookings
    .filter((b) => b.status === 'active')
    .map((b) => b.car_id)
  if (rentedCarIds.length) {
    await supabase.from('cars').update({ status: 'rented' }).in('id', rentedCarIds)
  }

  console.log('✓ Done. Open the dashboard and log in.')
}

main().catch((e) => {
  console.error('✗ Seed failed:', e.message || e)
  process.exit(1)
})
