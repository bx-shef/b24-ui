import { describe, it, expect, vi, afterEach } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProsePre from '../../src/runtime/components/prose/Pre.vue'

// bx-shef/b24-ui#100: after a copy the button changed only its icon, so a screen
// reader heard nothing, and `tabindex="-1"` kept keyboard users away from it.
describe('ProsePre copy button', () => {
  const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard')

  afterEach(() => {
    if (original) Object.defineProperty(navigator, 'clipboard', original)
    else delete (navigator as { clipboard?: unknown }).clipboard
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

  it('announces the copy in a live region, keeps the label, then clears it', async () => {
    const wrapper = await mountPre()
    const button = wrapper.find('[data-slot="copy"]')
    const live = () => wrapper.find('[aria-live="polite"]')

    expect(button.attributes('aria-label')).toBe('Copy code to clipboard')
    expect(live().text()).toBe('')

    await button.trigger('click')

    await vi.waitFor(() => expect(live().text()).toBe('Copied'))
    // The name stays the action, so the focused button is not re-announced.
    expect(wrapper.find('[data-slot="copy"]').attributes('aria-label')).toBe('Copy code to clipboard')

    // useClipboard resets `copied` after 1500 ms.
    await vi.waitFor(() => expect(live().text()).toBe(''), { timeout: 3000 })

    expect(live().text()).toBe('')
  })

  it('announces a second copy made while the first is still shown', async () => {
    const wrapper = await mountPre()
    const button = wrapper.find('[data-slot="copy"]')
    const live = wrapper.find('[aria-live="polite"]')
    const seen: string[] = []
    const observer = new MutationObserver(() => seen.push(live.element.textContent!.trim()))
    observer.observe(live.element, { childList: true, characterData: true, subtree: true })

    await button.trigger('click')
    await vi.waitFor(() => expect(live.text()).toBe('Copied'))
    await button.trigger('click')
    await vi.waitFor(() => expect(seen.filter(text => text === 'Copied')).toHaveLength(2))
    observer.disconnect()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountPre()
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
