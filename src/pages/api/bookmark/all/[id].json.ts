import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'

export const GET: APIRoute = async (context) => {
  // @TODO harden this!
  const { id } = context.params

  const bookmarks = await db
    .select()
    .from(Bookmark)
    .where(eq(Bookmark.profileId, (id ? id : 'none'))) // jeeebus creebus hacky whacky
    .orderBy(Bookmark.created_at)

  return new Response(
    JSON.stringify(bookmarks), {
      status: 200,
    }
  )
}
