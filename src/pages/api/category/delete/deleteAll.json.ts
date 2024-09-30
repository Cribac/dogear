import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Category } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const DELETE: APIRoute = async (context) => {
  // @TODO check batch or bulk deletetion options
  const ids: string[] = await context.request.json()

  if (!ids) {
    return getJsonResponse(400)
  }

  try {
    const deletedCategoryIds = ids.map(async (id: string) => {
      const deletedCategoryId: { deletedId: string }[] = await db.delete(Category)
        .where(eq(Category.id, id))
        .returning({ deletedId: Category.id})
      
        return deletedCategoryId
    })
  
    return new Response(
      JSON.stringify(deletedCategoryIds), {
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
