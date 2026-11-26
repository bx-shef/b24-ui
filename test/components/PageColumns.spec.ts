import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import PageColumns from '../../src/runtime/components/PageColumns.vue'

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

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageColumns, {
      slots: {
        default: () => 'Default slot'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
