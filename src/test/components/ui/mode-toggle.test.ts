import { expect, test} from 'vitest'
import { mount } from '@vue/test-utils'
import ModeToggle from '@/components/ui/ModeToggle.vue'

test('it renders correctly', async () => {
  const wrapper = mount(ModeToggle)
  expect(wrapper.classes()).toContain('light-toggle')
  expect(wrapper.attributes()['aria-label']).toBe('Toggle Light Mode')
})
