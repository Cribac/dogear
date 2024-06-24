import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const {
  PUBLIC_SUPABASE_API_URL,
  PUBLIC_SUPABASE_DB_URL,
  PUBLIC_SUPABASE_KEY,
  PUBLIC_ENABLE_REGISTRATION
} = import.meta.env || process.env

const DB_URL = PUBLIC_SUPABASE_DB_URL
const DB_API_URL = PUBLIC_SUPABASE_API_URL
const DB_KEY = PUBLIC_SUPABASE_KEY

const hasRegistration = PUBLIC_ENABLE_REGISTRATION === 'true'

export {
  DB_URL, 
  DB_API_URL, 
  DB_KEY, 
  hasRegistration 
}
