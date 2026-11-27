import { describe, it, expect } from 'vitest'
import { Comment, Fragment, createVNode, defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import PageColumns from '../../src/runtime/components/PageColumns.vue'
import { flattenSlot } from '../../src/runtime/utils/vnode'

describe('PageColumns', () => {
  renderEach(PageColumns, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'xl:columns-4' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])

  it('wraps every slot node in an item with padding instead of space-y', async () => {
    const wrapper = await mountSuspended(PageColumns, {
      slots: {
        default: () => [
          h('article', 'one'),
          [h('article', 'two'), h('article', 'three')]
        ]
      }
    })

    const items = Array.from((wrapper.element as HTMLElement).children)
    expect(items).toHaveLength(3)
    for (const item of items) {
      expect(item.className).toContain('pb-8')
      expect(item.className).toContain('last:pb-0')
      expect(item.children).toHaveLength(1)
    }
    expect(wrapper.element.className).not.toContain('space-y')
  })

  it('keys stay unique across fragments and keep their place behind a v-if', () => {
    const a = h(Fragment, { key: 'a' }, [h('div', { key: 1 }), h('div', { key: 2 })])
    const b = h(Fragment, { key: 'b' }, [h('div', { key: 1 }), h('div', { key: 2 })])
    const keys = flattenSlot([a, b, h('div')]).map(item => item.key)
    expect(new Set(keys).size).toBe(keys.length)

    const shown = flattenSlot([h('div'), h('p')]).map(item => item.key)
    const hidden = flattenSlot([createVNode(Comment, null, 'v-if'), h('p')]).map(item => item.key)
    expect(hidden.at(-1)).toBe(shown.at(-1))
  })

  it('does not remount a card when a v-if above it toggles', async () => {
    let mounted = 0
    const Card = defineComponent({
      setup() {
        onMounted(() => {
          mounted++
        })
        return () => h('div', 'card')
      }
    })
    const show = ref(true)
    const wrapper = await mountSuspended(PageColumns, {
      slots: { default: () => [show.value ? h('div', 'top') : createVNode(Comment, null, 'v-if'), h(Card)] }
    })
    expect(mounted).toBe(1)
    show.value = false
    await nextTick()
    show.value = true
    await nextTick()
    expect(mounted).toBe(1)
    wrapper.unmount()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageColumns, {
      slots: {
        default: () => 'Default slot'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
