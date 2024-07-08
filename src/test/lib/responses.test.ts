import { assert, expect, test } from 'vitest'
import { getJsonResponse } from '@/lib/responses'

test('getJsonResponse()', () => {
  assert(getJsonResponse(200) instanceof Response)
  assert(getJsonResponse(400) instanceof Response)
  assert(getJsonResponse(401) instanceof Response)
  assert(getJsonResponse(500) instanceof Response)
})

test('getJsonResponse(200)', async () => {
  const response = getJsonResponse(200)
  assert(response.status === 200)
  const { message } = await response.json()
  expect(message).eq('OK')
})

test('getJsonResponse(200, customMessage)', async () => {
  const response = getJsonResponse(200, 'foo')
  const { message } = await response.json()
  expect(message).eq('foo')
})
