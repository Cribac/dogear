import { expect, test } from 'vitest'
import { splitEmailAddress } from '@/lib/utils'

test('splitEmailAddress() returns the correct result', async () => {
  const email = 'fooberto@testino.tld'
  const result = splitEmailAddress(email)
  expect(result).eq('ft')
})
