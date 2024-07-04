import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'
import { db } from '@/lib/db/db'
import { Bookmark } from '@/lib/db/schemas'

export const POST: APIRoute = async ({ request }) => {
  // @TODO - refactor this to be more DRY
  try {
    const formData = await request.formData()
    const url = formData.get('url')?.toString()
    const name = formData.get('name')?.toString()
    if (!url || !name) {
      return new Response(
        JSON.stringify({
          message: 'Url and name are required',
        }),
        { status: 400 },
      )
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

    return new Response(
      JSON.stringify({
        message: 'All fine and dandy',
      }),
      { status: 200 },
    )
    
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'FATAL ERROR: ' + error,
      }),
      { status: 500 },
    )
  }
}
