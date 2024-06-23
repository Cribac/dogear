import { createClient } from '@supabase/supabase-js'
import { DB_API_URL, DB_KEY } from '@/config'

export const supabase = createClient(
  DB_API_URL,
  DB_KEY
)
