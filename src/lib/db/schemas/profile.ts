import { 
  pgSchema, 
  pgTable,
  uuid,
  varchar,
  text, 
  timestamp 
} from 'drizzle-orm/pg-core'

const authSchema = pgSchema('auth')

export const Users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
})

export const Profile = pgTable('profile', {
  // Matches id from auth.users table in Supabase
  id: uuid('id')
    .primaryKey()
    .references(() => Users.id, { onDelete: 'cascade' }),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: varchar('email', { length: 256 }),
  created_at: timestamp('created_at').defaultNow(), 
  updated_at: timestamp('updated_at').defaultNow(), 
})
