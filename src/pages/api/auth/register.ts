import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'
import { hasRegistration } from '@/app.config'

export const POST: APIRoute = async ({ request, redirect }) => {
  if (hasRegistration) {
    const formData = await request.formData()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: 'Email and password are required',
        }),
        { status: 400 },
      )
    }

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      return new Response(
        JSON.stringify({
          message: error.message,
        }),
        { status: 500 },
      )
    }
  }

  // Redirect to the sign in page
  return redirect('/signin')
}
