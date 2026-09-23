// lib/db.js
// Canonical data layer (ESM, for Node / bundler usage). Keeps the exact
// function signatures from the brief. The static browser pages use the
// CDN-based equivalent in js/bookly-data.js (window.BooklyDB), which mirrors
// these functions but maps rows to the dashboard's view shapes.

import { supabase } from './supabase.js'

// ── helpers ───────────────────────────────────────────────
function today() {
  return new Date().toISOString().split('T')[0]
}
function daysBetween(a, b) {
  const ms = new Date(b).getTime() - new Date(a).getTime()
  return Math.max(1, Math.round(ms / 86400000))
}
function sixMonthsAgo() {
  const d = new Date()
  d.setMonth(d.getMonth() - 5)
  d.setDate(1)
  return d.toISOString()
}
function groupByMonth(rows) {
  const out = {}
  for (const r of rows) {
    const key = (r.created_at || '').slice(0, 7) // YYYY-MM
    if (!key) continue
    if (!out[key]) out[key] = { month: key, revenue: 0, count: 0 }
    out[key].revenue += r.total_price || 0
    out[key].count += 1
  }
  return Object.values(out).sort((a, b) => a.month.localeCompare(b.month))
}

// ── BOOKINGS ──────────────────────────────
export async function getBookings(agencyId, filters = {}) {
  let query = supabase
    .from('bookings')
    .select(`
      *,
      client:clients(full_name, phone, cin),
      car:cars(name, category, photo_url, plate)
    `)
    .eq('agency_id', agencyId)
    .order('created_at', { ascending: false })

  if (filters.status) query = query.eq('status', filters.status)
  if (filters.date) query = query.eq('pickup_date', filters.date)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function createBooking(booking) {
  // Find the client by phone, then update or insert (no unique constraint needed)
  const { data: existing } = await supabase
    .from('clients')
    .select('id')
    .eq('agency_id', booking.agency_id)
    .eq('phone', booking.client_phone)
    .limit(1)
    .maybeSingle()

  const { data: client } = existing
    ? await supabase.from('clients')
        .update({ full_name: booking.client_name })
        .eq('id', existing.id).select().single()
    : await supabase.from('clients')
        .insert({
          agency_id: booking.agency_id,
          full_name: booking.client_name,
          phone: booking.client_phone,
        })
        .select().single()

  const total_days = daysBetween(booking.pickup_date, booking.return_date)

  // Then create booking
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...booking,
      client_id: client?.id,
      total_days,
      total_price: (booking.price_per_day || 0) * total_days,
    })
    .select()
    .single()

  if (error) throw error

  // Update car status to 'rented' if pickup is today
  if (booking.pickup_date === today() && booking.car_id) {
    await updateCarStatus(booking.car_id, 'rented')
  }

  return data
}

export async function updateBookingStatus(id, status) {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

// ── CARS ──────────────────────────────────
export async function getCars(agencyId) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('agency_id', agencyId)
    .order('category')
  if (error) throw error
  return data
}

export async function getAvailableCars(agencyId, pickupDate, returnDate) {
  // Cars whose bookings do NOT overlap the requested window.
  // (A car with no overlapping confirmed/active booking is free.)
  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      bookings(pickup_date, return_date, status)
    `)
    .eq('agency_id', agencyId)
    .eq('status', 'available')
  if (error) throw error

  return (data || []).filter((car) => {
    const blocking = (car.bookings || []).filter(
      (b) =>
        (b.status === 'confirmed' || b.status === 'active') &&
        // overlap test: NOT (ends before pickup OR starts after return)
        !(b.return_date <= pickupDate || b.pickup_date >= returnDate)
    )
    return blocking.length === 0
  })
}

export async function updateCarStatus(carId, status) {
  const { error } = await supabase
    .from('cars')
    .update({ status })
    .eq('id', carId)
  if (error) throw error
}

// ── CLIENTS ───────────────────────────────
export async function getClients(agencyId) {
  const { data, error } = await supabase
    .from('clients')
    .select(`
      *,
      bookings(total_price, status)
    `)
    .eq('agency_id', agencyId)
  if (error) throw error
  return data
}

// ── STATS ─────────────────────────────────
export async function getMonthlyStats(agencyId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, total_price, status')
    .eq('agency_id', agencyId)
    .eq('status', 'completed')
    .gte('created_at', sixMonthsAgo())
  if (error) throw error
  return groupByMonth(data)
}

export async function getTodayStats(agencyId) {
  const t = today()

  const [pickups, returns, available] = await Promise.all([
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('agency_id', agencyId)
      .eq('pickup_date', t)
      .in('status', ['confirmed', 'active']),
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('agency_id', agencyId)
      .eq('return_date', t)
      .eq('status', 'active'),
    supabase
      .from('cars')
      .select('*', { count: 'exact', head: true })
      .eq('agency_id', agencyId)
      .eq('status', 'available'),
  ])

  return {
    pickups: pickups.count,
    returns: returns.count,
    available: available.count,
  }
}
