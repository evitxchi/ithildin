import { createClient } from '@supabase/supabase-js'

/* Browser client for the public forms. The publishable key is meant to ship to
   the browser: row level security only lets it insert into waitlist and
   demo_requests, never read them back. Never put the secret or service_role
   key in this file. */
const SUPABASE_URL = 'https://ipcrsevxxmvzpbajunfi.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Db7CGvo_KIytP9H2BH8iag_6ZHMuuqo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
})

/* Postgres unique_violation, returned when an email is already on the waitlist */
export const DUPLICATE = '23505'
