// TODO drizzle-kit errors out while trying to import this
// import config from '../astro.config.mjs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const {
  APP_API_SECRET,
  APP_API_SALT,
  APP_API_PHRASE,
  PUBLIC_APP_API_TOKEN,
  PUBLIC_SUPABASE_API_URL,
  PUBLIC_SUPABASE_DB_URL,
  PUBLIC_SUPABASE_KEY,
  PUBLIC_ENABLE_REGISTRATION
} = import.meta.env || process.env

const APP_API_TOKEN = PUBLIC_APP_API_TOKEN
const DB_URL = PUBLIC_SUPABASE_DB_URL
const DB_API_URL = PUBLIC_SUPABASE_API_URL
const DB_KEY = PUBLIC_SUPABASE_KEY

const hasRegistration = PUBLIC_ENABLE_REGISTRATION === 'true'
const site = 'http://localhost:4321'// config.site

export {
  APP_API_SECRET,
  APP_API_SALT,
  APP_API_PHRASE,
  APP_API_TOKEN,
  DB_URL,
  DB_API_URL,
  DB_KEY,
  hasRegistration,
  site
}
