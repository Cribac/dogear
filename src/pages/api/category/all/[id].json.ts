import type { APIRoute } from 'astro'
import {
  eq,
  desc,
  count
} from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark, Category } from '@/lib/db/schemas'

export const GET: APIRoute = async (context) => {
  // @TODO harden this!
  const { id } = context.params

  const categories = await db
    .select({
      id: Category.id,
      name: Category.name,
      profileId: Category.profileId,
      created_at: Category.created_at,
      updated_at: Category.updated_at,
      bookmark_count: count(Bookmark.id)
    })
    .from(Category)
    .leftJoin( // join to get bookmark count
      Bookmark, 
      eq(Category.id, Bookmark.categoryId)
    )
    .where(eq(Category.profileId, (id ? id : 'none'))) // jeeebus creebus hacky whacky
    .groupBy(
      Category.id, 
      Category.name
    )
    .orderBy(desc(Category.created_at))

  return new Response(
    JSON.stringify(categories), {
      status: 200,
    }
  )
}
