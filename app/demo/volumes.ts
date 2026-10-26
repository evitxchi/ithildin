/* Options for the demo form's volume select. Must match the check constraint on
   demo_requests.volume in Supabase, or inserts with that value are rejected. */
export const VOLUMES = [
  'Fewer than 5 depositions a month',
  '5 to 15 depositions a month',
  '15 to 40 depositions a month',
  'More than 40 depositions a month',
]
