import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'

export const DELETE: APIRoute = async (context) => {
  // @TODO harden this!
  // @TODO check batch or bulk deletetion options
  const ids = await context.request.json()

  const deletedBookmarkIds = ids.map(async (id: string) => {
    const deletedBookmarkId: { deletedId: string }[] = await db.delete(Bookmark)
      .where(eq(Bookmark.id, (id ? id : 'none')))
      .returning({ deletedId: Bookmark.id})
    
      return deletedBookmarkId
  })

  return new Response(
    JSON.stringify(deletedBookmarkIds), {
      status: 200,
    }
  )
}
