type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function fetchResponse (url: string, method: FetchMethod, token: string, body?: BodyInit) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    },
    ...(body && { body }),
  })
  
  return response
}

export default fetchResponse
