import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, reactive } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useAppConfig } from '#imports'
import Toast from '../../../src/runtime/components/Toast.vue'
import Toaster from '../../../src/runtime/components/Toaster.vue'
import { ClientOnly } from '#components'
import CommandPalette from '../../../src/runtime/components/CommandPalette.vue'
import DropdownMenu from '../../../src/runtime/components/DropdownMenu.vue'
import ProgressGroup from '../../../src/runtime/components/ProgressGroup.vue'
import Stepper from '../../../src/runtime/components/Stepper.vue'
import Accordion from '../../../src/runtime/components/Accordion.vue'
import Button from '../../../src/runtime/components/Button.vue'
import Callout from '../../../src/runtime/components/prose/Callout.vue'
import NavigationMenu from '../../../src/runtime/components/NavigationMenu.vue'
import Listbox from '../../../src/runtime/components/Listbox.vue'
import Breadcrumb from '../../../src/runtime/components/Breadcrumb.vue'
import DescriptionList from '../../../src/runtime/components/DescriptionList.vue'
import RadioGroup from '../../../src/runtime/components/RadioGroup.vue'
import Select from '../../../src/runtime/components/Select.vue'
import Tabs from '../../../src/runtime/components/Tabs.vue'
import Theme from '../../../src/runtime/components/Theme.vue'
import icons from '../../../src/runtime/dictionary/icons'
import { isUnsafeComponent, isUnsafeContent, safeIcon } from '../../../src/runtime/utils'

// What `:icon='{...}'` in untrusted markdown or JSON is parsed into
const template = () => ({ template: '<b>{{ 7 * 191 }}</b>' })
const raw = () => ({ __v_raw: { template: '<b>{{ 7 * 191 }}</b>' } })
const vnode = () => ({ __v_isVNode: true, type: 'iframe', props: { srcdoc: '<script>1337</script>', innerHTML: '1337' }, shapeFlag: 1, children: null })
const extended = () => ({ extends: { template: '<b>{{ 7 * 191 }}</b>' } })

// A string icon resolves to a raw tag on SSR (`<img src=x onerror=…>`), `render` that is not a function throws there
const tag = () => 'img src=x onerror=alert(1)'
const badRender = () => ({ render: 'x' })

const payloads = [['template', template], ['__v_raw', raw], ['forged VNode', vnode], ['extends', extended], ['tag string', tag], ['render not a function', badRender]] as const

// Markup is parsed rather than grepped: a rejected value may still show up escaped, as the text of an attribute
const expectClean = (html: string) => {
  expect(html).not.toContain('1337')
  const doc = new DOMParser().parseFromString(html, 'text/html')
  expect(doc.querySelector('img, iframe, script, object, embed')).toBeNull()
  for (const element of doc.querySelectorAll('*')) {
    expect([...element.attributes].map(attribute => attribute.name).filter(name => name === 'srcdoc' || name.startsWith('on'))).toEqual([])
  }
}

describe('unsafe icons from markdown', () => {
  // A string or `{ render: 'x' }` in an icon prop makes Vue warn about the prop type; that is the very input under test
  beforeEach(() => {
    const original = console.warn
    vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
      if (String(args[0]).includes('Invalid prop')) return
      original(...args)
    })
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe.each(payloads)('%s', (_, make) => {
    it('is not rendered from the `icon` prop of a prose component', async () => {
      expectClean((await mountSuspended(Callout, { props: { icon: make() as any }, slots: { default: () => 'text' } })).html())
    })

    it('is not rendered from the `icon` and `trailingIcon` props of Button', async () => {
      const h1 = (await mountSuspended(Button, { props: { label: 'x', icon: make() as any, trailingIcon: make() as any } })).html()
      expectClean(h1)
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

    it('is not rendered from `app.config.b24ui.button.defaultVariants`', async () => {
      const appConfig = useAppConfig() as any
      const button = appConfig.b24ui.button
      appConfig.b24ui.button = { ...button, defaultVariants: { ...button?.defaultVariants, icon: make(), trailingIcon: make() } }
      try {
        expectClean((await mountSuspended(Button, { props: { label: 'x', trailing: true } })).html())
      } finally {
        appConfig.b24ui.button = button
      }
    })

    it.each([
      ['DropdownMenu', DropdownMenu, () => ({ open: true, portal: false, items: [[{ label: 'a', icon: make(), trailingIcon: make() }]] })],
      ['CommandPalette', CommandPalette, () => ({ groups: [{ id: 'g', label: 'g', items: [{ label: 'a', icon: make() }], highlightedIcon: make() }] })],
      ['ProgressGroup', ProgressGroup, () => ({ items: [{ label: 'a', value: 1, icon: make() }] })],
      ['Stepper', Stepper, () => ({ items: [{ title: 'a', icon: make() }] })],
      ['Listbox', Listbox, () => ({ items: [{ label: 'a', icon: make() }] })],
      ['Breadcrumb', Breadcrumb, () => ({ items: [{ label: 'a', icon: make() }] })],
      ['DescriptionList', DescriptionList, () => ({ items: [{ label: 'a', description: 'b', icon: make() }] })],
      ['RadioGroup', RadioGroup, () => ({ indicator: 'hidden', items: [{ label: 'a', value: 'a', icon: make() }] })]
    ])('is not rendered from `items[].icon` of %s', async (_n, component: any, factory) => {
      expectClean((await mountSuspended(component, { props: factory() as any })).html())
    })

    it('is not rendered from a Toast `title` and `description`', async () => {
      if (typeof make() !== 'object' || (make() as any).__v_isVNode) return // a forged VNode is indistinguishable from a real one passed by the app
      const ToastWrapper = defineComponent({
        components: { B24Toaster: Toaster, B24Toast: Toast, ClientOnly },
        setup: () => ({ duration: 2 ** 31 - 1, title: make(), description: make() }),
        template: '<B24Toaster :portal="false" :duration="duration"><ClientOnly><B24Toast :title="title" :description="description" /></ClientOnly></B24Toaster>'
      })
      expectClean((await mountSuspended(ToastWrapper)).html())
    })

    it('is not rendered through a reactive object', async () => {
      if (typeof make() !== 'object') return
      const wrapper = await mountSuspended(Button, { props: { label: 'x', icon: reactive(make() as any) as any } })
      expectClean(wrapper.html())
    })
  })

  // `resolveDynamicComponent` turns a string into a raw tag on the server, where the markup is not escaped by a DOM
  it.each([['tag string', tag], ['render not a function', badRender], ['template', template]])('renders no markup from a %s `icon` on the server', async (_, make) => {
    const html = await renderToString(h(Callout, { icon: make() as any }, () => 'text'))
    expectClean(html)
    expect(html).toContain('text')
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

  it('keeps the fallback when an icon is dropped', async () => {
    const stepper = await mountSuspended(Stepper, { props: { items: [{ title: 'a', icon: template() }, { title: 'b', icon: tag() }] } as any })
    expect(stepper.findAll('[data-slot=indicator]').map(indicator => indicator.text())).toEqual(['1', '2'])
    const tabs = await mountSuspended(Tabs, { props: { items: [{ label: 'a', icon: template(), avatar: { text: 'A' } }] } as any })
    expect(tabs.find('[data-slot=trigger]').text()).toContain('A')
    const menu = await mountSuspended(NavigationMenu, { props: { items: [{ label: 'a', icon: template(), chip: true }] } as any })
    expect(menu.html()).not.toContain('data-slot="linkLeadingChip"')
  })

  it('`safeIcon` drops only unsafe values', () => {
    expect(safeIcon(template())).toBeUndefined()
    expect(safeIcon(raw())).toBeUndefined()
    expect(safeIcon(vnode())).toBeUndefined()
    expect(safeIcon(badRender())).toBeUndefined()
    expect(safeIcon(tag())).toBeUndefined()
    expect(safeIcon('i-name')).toBeUndefined()
    expect(safeIcon(undefined)).toBeUndefined()
    expect(safeIcon(false)).toBe(false)
    const fn = () => h('svg')
    expect(safeIcon(fn)).toBe(fn)
    expect(safeIcon(icons.check)).toBe(icons.check)
  })

  it('`isUnsafeContent` leaves real VNodes and components alone', () => {
    expect(isUnsafeContent(template())).toBe(true)
    expect(isUnsafeContent(raw())).toBe(true)
    expect(isUnsafeContent(h('b', 'x'))).toBe(false)
    expect(isUnsafeContent(icons.check)).toBe(false)
    expect(isUnsafeContent('text')).toBe(false)
  })
})
