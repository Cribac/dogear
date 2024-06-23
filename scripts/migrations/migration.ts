import { migrate } from 'drizzle-orm/postgres-js/migrator'
import db from '../../src/lib/db/db'

const migrateDatabase = async (): Promise<void> => {
  console.log('🚀 Starting database migration...')
  try {
    await migrate(db, {
      migrationsFolder: 'migrations'
    })
    console.log('🎉 Database migration complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database migration failed!')
    console.error(error)
    process.exit(1)
  }
}

migrateDatabase()
