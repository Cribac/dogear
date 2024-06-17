import { assert, expect, test } from 'vitest'
import { buildFormData } from '@/lib/forms/helper'

test('buildFormData()', () => {
  const formData = buildFormData({
    foo: 'hello',
    bar: 'world',
  })

  assert(formData instanceof FormData)

  expect(formData.get('foo')).eq('hello')
  expect(formData.get('bar')).eq('world')
})
