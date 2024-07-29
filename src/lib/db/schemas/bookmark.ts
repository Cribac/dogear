import { 
  pgTable,
  uuid,
  varchar,
  text, 
  timestamp
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { Profile } from './profile'
import { Category } from './category'

export const Bookmark = pgTable('bookmark', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').notNull().references(() => Profile.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').references(() => Category.id),
  name: varchar('name', { length: 256 }),
  url: text('url'),
  created_at: timestamp('created_at').defaultNow(), 
  updated_at: timestamp('updated_at').defaultNow(), 
})

export const bookmarksRelations = relations(Bookmark, ({ one }) => ({
  category: one(Category, { 
    fields: [ Bookmark.categoryId ], 
    references: [ Category.id ]
  }),
}))
