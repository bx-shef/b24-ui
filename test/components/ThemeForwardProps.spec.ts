import { describe, expect, test } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Theme from '../../src/runtime/components/Theme.vue'
import ChatPromptSubmit from '../../src/runtime/components/ChatPromptSubmit.vue'

// Components that forward their props to a nested `B24Button` through the local
// `useForwardProps` (AGENTS.md, "Reka UI props"). reka-ui's own `useForwardProps`
// filters by `vm.vnode.props`, so a value that only comes from `<B24Theme :props>`
// would never reach the button. Each case checks that a themed value yields exactly
// the markup of the same value passed explicitly, and differs from the default.
describe('Theme :props through useForwardProps', () => {
  async function classesOf(template: string, components: Record<string, any>) {
    const wrapper = await mountSuspended({ components: { Theme, ...components }, template })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    const classes = button.classes().sort()
    wrapper.unmount()
    return classes
  }

  test('ChatPromptSubmit forwards a themed `size` to its button', async () => {
    const components = { ChatPromptSubmit }
    const themed = await classesOf(`<Theme :props="{ chatPromptSubmit: { size: 'xs' } }"><ChatPromptSubmit /></Theme>`, components)
    const explicit = await classesOf(`<ChatPromptSubmit size="xs" />`, components)
    const bare = await classesOf(`<ChatPromptSubmit />`, components)

    expect(themed).toEqual(explicit)
    expect(themed).not.toEqual(bare)
  })
})
