import { defineMiddleware } from 'astro:middleware'
import { supabase } from '@/lib/supabase'
import { getJsonResponse } from '@/lib/responses'

export const onRequest = defineMiddleware(async (context , next) => {
  const response = await next()
  const { pathname } = context.url
  const allowedRoutes = [
    '/', 
    '/signin',
    '/register',
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/register',
  ]

  if (!allowedRoutes.includes(pathname)) {
    let token = null
    const requestHeaders = context.request.headers.get('Authorization')
  
    if (requestHeaders) {
      token = requestHeaders.replace('Bearer', '').trim()
    }
  
    const { data: { session } } = await supabase.auth.getSession()

    if (token && session?.access_token !== undefined && (token === session?.access_token)) {
      return response
    } else {
      return getJsonResponse(401)
    }
  }

  return response
})
