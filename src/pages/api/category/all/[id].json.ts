import type { APIRoute } from 'astro'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db/db'
import { Category } from '@/lib/db/schemas'

export const GET: APIRoute = async (context) => {
  // @TODO harden this!
  const { id } = context.params

  const categories = await db
    .select()
    .from(Category)
    .where(eq(Category.profileId, (id ? id : 'none'))) // jeeebus creebus hacky whacky
    .orderBy(desc(Category.created_at))

  return new Response(
    JSON.stringify(categories), {
      status: 200,
    }
  )
}
