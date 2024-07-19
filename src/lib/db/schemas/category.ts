import { 
  pgTable,
  uuid,
  varchar,
  timestamp 
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { Profile } from './profile'
import { Bookmark } from './bookmark'

export const Category = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').notNull().references(() => Profile.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 256 }),
  created_at: timestamp('created_at').defaultNow(), 
  updated_at: timestamp('updated_at').defaultNow(), 
})

export const categoriesRelations = relations(Category, ({ many }) => ({
  bookmarks: many(Bookmark),
}))
