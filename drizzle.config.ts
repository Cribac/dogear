import { defineConfig } from 'drizzle-kit'
import { DB_URL } from '@/app.config'

if (!DB_URL) {
  console.error('🔴 Cannot find database url')
}

export default defineConfig({
  schema: './src/lib/db/schemas/*',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL
  },
  verbose: true,
  strict: true,
})
