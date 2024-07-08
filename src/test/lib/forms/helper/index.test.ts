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

test('buildFormData() with profileId', () => {
  const data = {
    foo: 'hello',
    bar: 'world',
  }
  const formData = buildFormData(data, '12345')

  assert(formData instanceof FormData)

  expect(formData.get('foo')).eq('hello')
  expect(formData.get('bar')).eq('world')
  expect(formData.get('profileId')).eq('12345')
})
