import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'

export const DELETE: APIRoute = async (context) => {
  // @TODO harden this!
  const { id } = context.params

  const deletedBookmarkId: { deletedId: string }[] = await db.delete(Bookmark)
    .where(eq(Bookmark.id, (id ? id : 'none')))
    .returning({ deletedId: Bookmark.id})

  return new Response(
    JSON.stringify(deletedBookmarkId), {
      status: 200,
    }
  )
}
