import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/lib/db/schemas'
import { DB_URL } from '@/app.config'

const client = postgres(DB_URL, { max: 1 })

export const db = drizzle(client, {
  schema,
  logger: true
})

export default db;
