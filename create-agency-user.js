// create-agency-user.js - run once per client you onboard.
//
// Creates a Supabase Auth user (the agency owner's dashboard login) and stamps
// their agency_id into user_metadata, so the dashboard auto-loads the right
// agency after they sign in.
//
// Usage:
//   node create-agency-user.js <email> <password> <agency_id>
//
// Example (Bestore Car - agency_id matches seed.js / supabase-config.js):
//   node create-agency-user.js owner@bestore-car.ma "StrongPass123!" 11111111-1111-1111-1111-111111111111
//
// Needs SUPABASE_SERVICE_ROLE_KEY in .env.local (admin API, server-only).

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })
dotenv.config()

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const DEFAULT_AGENCY_ID = '11111111-1111-1111-1111-111111111111' // Bestore Car

const [email, password, agencyIdArg] = process.argv.slice(2)
const agencyId = agencyIdArg || DEFAULT_AGENCY_ID

if (!URL || !SERVICE_KEY) {
  console.error('✗ Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}
if (!email || !password) {
  console.error('Usage: node create-agency-user.js <email> <password> [agency_id]')
  process.exit(1)
}

const supabase = createClient(URL, SERVICE_KEY, { auth: { persistSession: false } })

async function main() {
  console.log(`→ Creating dashboard user ${email} for agency ${agencyId}…`)
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip the confirmation email - they can log in immediately
    user_metadata: { agency_id: agencyId },
  })
  if (error) {
    console.error('✗ Failed:', error.message)
    process.exit(1)
  }
  console.log('✓ User created:', data.user.id)
  console.log('  email:    ', data.user.email)
  console.log('  agency_id:', data.user.user_metadata.agency_id)
  console.log('\nThey can now log in at /dashboard with this email + password.')
}

main().catch((e) => { console.error('✗ Error:', e.message || e); process.exit(1) })
