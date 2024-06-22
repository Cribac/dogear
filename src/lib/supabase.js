import { createClient } from '@supabase/supabase-js'
import { DB_URL, DB_KEY } from '@/config'

export const supabase = createClient(
  DB_URL,
  DB_KEY
)
