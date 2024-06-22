import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/forms/ErrorMessage.vue'

test('it renders correctly with props', async () => {
  const wrapper = mount(ErrorMessage, {
    props: {
      message: 'foo',
    },
  })
  expect(wrapper.props().message).toBe('foo')
  const elem = wrapper.find('.text-red-500')
  expect(elem.text()).toBe('foo')
})

test('it does not show an error message without props', async () => {
  const wrapper = mount(ErrorMessage)
  expect(wrapper.find('.text-red-500').exists()).toBe(false)
})
