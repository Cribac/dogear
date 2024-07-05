const responses: Record<number, string> = {
  200: 'OK',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
}

function getJsonResponse(status: number, message?: string): Response {
  return new Response(
    JSON.stringify({
      message: message ?? responses[status],
    }),
    { status },
  )
}

export { getJsonResponse }
