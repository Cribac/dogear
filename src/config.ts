const {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_KEY,
  PUBLIC_ENABLE_REGISTRATION
} = import.meta.env

const DB_URL = PUBLIC_SUPABASE_URL
const DB_KEY = PUBLIC_SUPABASE_KEY

const hasRegistration = PUBLIC_ENABLE_REGISTRATION === 'true'

export { 
  DB_URL, 
  DB_KEY, 
  hasRegistration 
}
