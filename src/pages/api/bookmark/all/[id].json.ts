import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'
import { Category } from '@/lib/db/schemas'

export const GET: APIRoute = async (context) => {
  // @TODO harden this!
  const { id } = context.params

  const bookmarks = await db
    .select({
      id: Bookmark.id,
      name: Bookmark.name,
      url: Bookmark.url,
      profileId: Bookmark.profileId,
      created_at: Bookmark.created_at,
      updated_at: Bookmark.updated_at,
      category_id: Bookmark.categoryId,
      category_name: Category.name
    })
    .from(Bookmark)
    .where(eq(Bookmark.profileId, (id ? id : 'none'))) // jeeebus creebus hacky whacky
    .innerJoin(Category, eq(Bookmark.categoryId, Category.id))
    .orderBy(Bookmark.created_at)

  return new Response(
    JSON.stringify(bookmarks), {
      status: 200,
    }
  )
}
