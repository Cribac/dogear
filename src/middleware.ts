import { defineMiddleware } from 'astro:middleware'
import { decrypt } from '@/lib/crypto'
import { getJsonResponse } from '@/lib/connectivety'
import { APP_API_PHRASE } from '@/app.config'

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
    let token = ''
    const requestHeaders = context.request.headers.get('Authorization')
  
    if (requestHeaders) {
      token = requestHeaders.replace('Bearer', '').trim()
    }
  
    const decryptedToken = decrypt(token)

    if (decryptedToken === APP_API_PHRASE) {
      return response
    } else {
      return getJsonResponse(401)
    }
  }

  return response
})
