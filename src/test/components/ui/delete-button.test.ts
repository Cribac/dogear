import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { DeleteButton } from '@/components/ui/button'

test('it renders correctly with props', async () => {
  const wrapper = mount(DeleteButton, {
    props: {
      buttonText: 'I will delete everything!!!',
    },
  })
  expect(wrapper.props().buttonText).toBe('I will delete everything!!!')
  expect(wrapper.classes()).toContain('bg-destructive')
})
