import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const PUT: APIRoute = async (context) => {
  const { id } = context.params

  if (!id || id === 'undefined') {
    return getJsonResponse(400)
  }

  try {
    const formData = await context.request.formData()
    const url = formData.get('url')?.toString()
    const name = formData.get('name')?.toString()
    const categoryId = formData.get('categoryId')?.toString()
  
    const editedBookmarkId: { editedId: string }[] = await db.update(Bookmark)
      .set({
        url,
        name,
        categoryId
      })
      .where(eq(Bookmark.id, id))
      .returning({ editedId: Bookmark.id})
  
    return new Response(
      JSON.stringify(editedBookmarkId), {
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
