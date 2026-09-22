// lib/supabase.js
// Canonical Supabase client for Node / bundler (Next.js, Vite, etc.) usage.
//
// NOTE: The current AYM Rent Car site is a *static* HTML/CSS/JS site that has no
// build step, so the browser pages do NOT import this module - they load
// @supabase/supabase-js from a CDN and read public config from
// js/supabase-config.js instead (see js/supabase-client.js).
//
// This module is kept faithful to the brief so it can be used as-is the day the
// project is moved behind a bundler / Next.js, and it is what server-side
// tooling (e.g. seed.js) can import.

import { createClient } from '@supabase/supabase-js'

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

export const supabase = createClient(url, anonKey)
