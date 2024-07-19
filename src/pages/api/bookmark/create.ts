import type { APIRoute } from 'astro'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    
    const url = formData.get('url')?.toString()
    const name = formData.get('name')?.toString()
    
    const profileId = formData.get('profileId')?.toString()
    const categoryId = formData.get('categoryId')?.toString()

    if (!url || !name) {
      return getJsonResponse(400, 'Url and name are required')
    }

    if (profileId) {
      const res = await db
        .insert(Bookmark)
        .values({
          url,
          name,
          profileId,
          categoryId,
        }).returning()
        
      return new Response(
        JSON.stringify(res), {
          status: 200,
        }
      )
    } else {
      return getJsonResponse(400, 'User not found')
    }
  } catch (error) {
    let response = getJsonResponse(500)
    if (error instanceof Error) {
      response = getJsonResponse(500, error.message)
    }
    return response
  }
}
