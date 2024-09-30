import type { APIRoute } from 'astro'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark, Category } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const GET: APIRoute = async (context) => {
  const { id } = context.params

  if (!id || id === 'undefined') {
    return getJsonResponse(400)
  }

  try {
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
      .where(eq(Bookmark.profileId, id))
      .innerJoin( // join to get category_name, category_id
        Category,
        eq(Bookmark.categoryId, Category.id)
      )
      .orderBy(desc(Bookmark.created_at))
  
    return new Response(
      JSON.stringify(bookmarks), {
        status: 200,
      }
    )
  } catch (error) {
    let response = getJsonResponse(500)
    if (error instanceof Error) {
      response = getJsonResponse(500, error.message)
    }
    return response
  }
}
