import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Category } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const PUT: APIRoute = async (context) => {
  try {
    const { id } = context.params
    const formData = await context.request.formData()
    const name = formData.get('name')?.toString()
  
    const editedCategoryId: { editedId: string }[] = await db.update(Category)
      .set({
        name,
      })
      .where(eq(Category.id, (id ? id : 'none')))
      .returning({ editedId: Category.id})
  
    return new Response(
      JSON.stringify(editedCategoryId), {
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
