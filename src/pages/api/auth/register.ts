import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'
import { getJsonResponse } from '@/lib/connectivity'
import { hasRegistration } from '@/app.config'

export const POST: APIRoute = async ({ request, redirect }) => {
  if (hasRegistration) {
    const formData = await request.formData()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) {
      return getJsonResponse(400, 'Email and password are required')
    }

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      return getJsonResponse(500, error.message)
    }
  }

  // Redirect to the sign in page
  return redirect('/signin')
}
