import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Category } from '@/lib/db/schemas'

export const DELETE: APIRoute = async (context) => {
  // @TODO harden this!
  // @TODO check batch or bulk deletetion options
  const ids = await context.request.json()

  const deletedCategoryIds = ids.map(async (id: string) => {
    const deletedCategoryId: { deletedId: string }[] = await db.delete(Category)
      .where(eq(Category.id, (id ? id : 'none')))
      .returning({ deletedId: Category.id})
    
      return deletedCategoryId
  })

  return new Response(
    JSON.stringify(deletedCategoryIds), {
      status: 200,
    }
  )
}
