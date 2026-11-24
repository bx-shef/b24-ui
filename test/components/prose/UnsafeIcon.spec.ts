import { describe, it, expect } from 'vitest'
import { defineComponent, h, reactive } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Accordion from '../../../src/runtime/components/Accordion.vue'
import Button from '../../../src/runtime/components/Button.vue'
import Callout from '../../../src/runtime/components/prose/Callout.vue'
import NavigationMenu from '../../../src/runtime/components/NavigationMenu.vue'
import Select from '../../../src/runtime/components/Select.vue'
import Tabs from '../../../src/runtime/components/Tabs.vue'
import Theme from '../../../src/runtime/components/Theme.vue'
import icons from '../../../src/runtime/dictionary/icons'
import { isUnsafeComponent, safeIcon } from '../../../src/runtime/utils'

// What `:icon='{...}'` in untrusted markdown or JSON is parsed into
const template = () => ({ template: '<b>{{ 7 * 191 }}</b>' })
const raw = () => ({ __v_raw: { template: '<b>{{ 7 * 191 }}</b>' } })
const vnode = () => ({ __v_isVNode: true, type: 'iframe', props: { srcdoc: '<script>1337</script>', innerHTML: '1337' }, shapeFlag: 1, children: null })
const extended = () => ({ extends: { template: '<b>{{ 7 * 191 }}</b>' } })

const payloads = [['template', template], ['__v_raw', raw], ['forged VNode', vnode], ['extends', extended]] as const

const expectClean = (html: string) => {
  expect(html).not.toContain('1337')
  expect(html).not.toMatch(/<iframe|srcdoc|onerror/)
}

describe('unsafe icons from markdown', () => {
  describe.each(payloads)('%s', (_, make) => {
    it('is not rendered from the `icon` prop of a prose component', async () => {
      expectClean((await mountSuspended(Callout, { props: { icon: make() as any }, slots: { default: () => 'text' } })).html())
    })

    it('is not rendered from the `icon` and `trailingIcon` props of Button', async () => {
      expectClean((await mountSuspended(Button, { props: { label: 'x', icon: make() as any, trailingIcon: make() as any } })).html())
      expectClean((await mountSuspended(Button, { props: { label: 'x', trailingIcon: make() as any, trailing: true } })).html())
    })

    it('is not rendered from `selectedIcon`', async () => {
      expectClean((await mountSuspended(Select, { props: { items: ['a'], modelValue: 'a', open: true, portal: false, selectedIcon: make() as any } as any })).html())
    })

    it('is not rendered from `items[].icon` of Select', async () => {
      expectClean((await mountSuspended(Select, { props: { items: [{ label: 'a', icon: make() }], open: true, portal: false } as any })).html())
    })

    it('is not rendered from `items[].icon` and `items[].trailingIcon` of Accordion', async () => {
      const wrapper = await mountSuspended(Accordion, { props: { items: [{ label: 'a', content: 'c', icon: make(), trailingIcon: make() }] } as any })
      expectClean(wrapper.html())
    })

    it('is not rendered from `items[].icon` of NavigationMenu', async () => {
      const wrapper = await mountSuspended(NavigationMenu, { props: { items: [{ label: 'a', icon: make(), trailingIcon: make(), children: [{ label: 'b', icon: make() }] }] } as any })
      expectClean(wrapper.html())
    })

    it('is not rendered from `items[].icon` of Tabs', async () => {
      expectClean((await mountSuspended(Tabs, { props: { items: [{ label: 'a', icon: make() }] } as any })).html())
    })

    it('is not rendered from `<UTheme :props>`', async () => {
      const App = defineComponent({ render: () => h(Theme, { props: { button: { icon: make() } } } as any, { default: () => h(Button, { label: 'x' }) }) })
      expectClean((await mountSuspended(App)).html())
    })

    it('is not rendered through a reactive object', async () => {
      const wrapper = await mountSuspended(Button, { props: { label: 'x', icon: reactive(make()) as any } })
      expectClean(wrapper.html())
    })
  })

  it('keeps a legitimate `icon` prop', async () => {
    expect((await mountSuspended(Button, { props: { label: 'x', icon: icons.check } })).html()).toContain('<svg')
    expect((await mountSuspended(Callout, { props: { icon: icons.check }, slots: { default: () => 'text' } })).html()).toContain('<svg')
  })

  it('keeps a legitimate `items[].icon`', async () => {
    const wrapper = await mountSuspended(Accordion, { props: { items: [{ label: 'a', content: 'c', icon: icons.check }] } })
    expect(wrapper.html()).toContain('<svg')
  })

  it('keeps a functional component as an icon', async () => {
    const icon = () => h('svg', { 'data-icon': 'fn' })
    expect((await mountSuspended(Button, { props: { label: 'x', icon } })).html()).toContain('data-icon="fn"')
  })

  it('accepts every icon of the dictionary', () => {
    for (const [name, icon] of Object.entries(icons)) {
      expect(isUnsafeComponent(icon), name).toBe(false)
      expect(safeIcon(icon), name).toBe(icon)
    }
  })

  it('`safeIcon` drops only unsafe values', () => {
    expect(safeIcon(template())).toBeUndefined()
    expect(safeIcon(raw())).toBeUndefined()
    expect(safeIcon(vnode())).toBeUndefined()
    expect(safeIcon(undefined)).toBeUndefined()
    expect(safeIcon('i-name')).toBe('i-name')
  })
})
