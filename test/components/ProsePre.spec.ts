import { describe, it, expect, vi, afterEach } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProsePre from '../../src/runtime/components/prose/Pre.vue'

// bx-shef/b24-ui#100: after a copy the button changed only its icon, so a screen
// reader heard nothing, and `tabindex="-1"` kept keyboard users away from it.
describe('ProsePre copy button', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  async function mountPre() {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { write: vi.fn().mockResolvedValue(undefined), writeText: vi.fn().mockResolvedValue(undefined) }
    })
    // `useClipboard` writes a ClipboardItem, which happy-dom does not provide.
    vi.stubGlobal('ClipboardItem', class { constructor(public items: Record<string, unknown>) {} })
    return mountSuspended(ProsePre, { props: { code: 'const a = 1' }, slots: { default: () => 'const a = 1' } })
  }

  it('is reachable from the keyboard', async () => {
    const wrapper = await mountPre()
    const button = wrapper.find('[data-slot="copy"]')
    expect(button.attributes('tabindex')).toBeUndefined()
  })

  it('announces the copy and changes its label, then returns to the initial state', async () => {
    const wrapper = await mountPre()
    const button = wrapper.find('[data-slot="copy"]')
    const live = () => wrapper.find('[aria-live="polite"]')

    expect(button.attributes('aria-label')).toBe('Copy code to clipboard')
    expect(live().text()).toBe('')

    await button.trigger('click')

    await vi.waitFor(() => expect(live().text()).toBe('Copied'))
    expect(wrapper.find('[data-slot="copy"]').attributes('aria-label')).toBe('Copied')

    // useClipboard resets `copied` after 1500 ms.
    await vi.waitFor(() => expect(live().text()).toBe(''), { timeout: 3000 })

    expect(wrapper.find('[data-slot="copy"]').attributes('aria-label')).toBe('Copy code to clipboard')
    expect(live().text()).toBe('')
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountPre()
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
