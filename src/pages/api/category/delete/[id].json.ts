import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Category } from '@/lib/db/schemas'

export const DELETE: APIRoute = async (context) => {
  // @TODO harden this!
  const { id } = context.params

  const deletedCategoryId: { deletedId: string }[] = await db.delete(Category)
    .where(eq(Category.id, (id ? id : 'none')))
    .returning({ deletedId: Category.id})

  return new Response(
    JSON.stringify(deletedCategoryId), {
      status: 200,
    }
  )
}
