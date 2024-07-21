import type { APIRoute } from 'astro'
import { db } from '@/lib/db/db'
import { Category } from '@/lib/db/schemas'
import { getJsonResponse } from '@/lib/connectivity'

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name')?.toString()
    
    const profileId = formData.get('profileId')?.toString()

    if (!name) {
      return getJsonResponse(400, 'Name is required')
    }

    if (profileId) {
      const res = await db
        .insert(Category)
        .values({
          name,
          profileId,
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
