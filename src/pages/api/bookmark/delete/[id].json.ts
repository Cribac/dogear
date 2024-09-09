import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const DELETE: APIRoute = async (context) => {
  const { id } = context.params

  if (!id || id === 'undefined') {
    return getJsonResponse(400)
  }

  try {
    const deletedBookmarkId: { deletedId: string }[] = await db.delete(Bookmark)
      .where(eq(Bookmark.id, id))
      .returning({ deletedId: Bookmark.id})
  
    return new Response(
      JSON.stringify(deletedBookmarkId), {
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
