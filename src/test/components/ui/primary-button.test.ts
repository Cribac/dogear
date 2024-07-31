import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { PrimaryButton } from '@/components/ui/button'

test('it renders correctly with props', async () => {
  const wrapper = mount(PrimaryButton, {
    props: {
      type: 'submit',
      size: 'lg',
    },
  })
  expect(wrapper.props().type).toBe('submit')
  expect(wrapper.props().size).toBe('lg')
  expect(wrapper.classes()).toContain('bg-ctp-teal')
  expect(wrapper.classes()).toContain('hover:bg-ctp-green')
})
