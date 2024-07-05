import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/responses'

export const POST: APIRoute = async ({ request }) => {
  // @TODO - refactor this to be more DRY
  try {
    const formData = await request.formData()
    const url = formData.get('url')?.toString()
    const name = formData.get('name')?.toString()
    if (!url || !name) {
      return getJsonResponse(400, 'Url and name are required')
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (user?.id) {
      await db
        .insert(Bookmark)
        .values({
          url,
          name,
          profileId: user.id,
        })
    }

    return getJsonResponse(200)
    
  } catch (error) {
    let response = getJsonResponse(500)
    if (error instanceof Error) {
      response = getJsonResponse(500, error.message)
    }
    return response
  }
}
