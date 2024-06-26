import { 
  pgTable,
  uuid,
  varchar,
  text, 
  timestamp 
} from 'drizzle-orm/pg-core'
import { Profile } from './profile'

export const Bookmark = pgTable('bookmark', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').notNull().references(() => Profile.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 256 }),
  url: text('url'),
  created_at: timestamp('created_at').defaultNow(), 
  updated_at: timestamp('updated_at').defaultNow(), 
})
