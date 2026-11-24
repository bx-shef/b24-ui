import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Toggle from '../../src/runtime/components/Toggle.vue'
import { flushPromises } from '@vue/test-utils'
import { renderEach } from '../component-render'
import { renderForm } from '../utils/form'
import type { FormInputEvents } from '../../src/module'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'

describe('Toggle', () => {
  const props = { 'icon': BoldIcon, 'aria-label': 'Bold' }

  renderEach(Toggle, [
    // Props
    ['with label', { props: { label: 'Bold' } }],
    ['with icon', { props }],
    ['with defaultValue', { props: { ...props, defaultValue: true } }],
    ['with modelValue', { props: { ...props, modelValue: true } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with color', { props: { ...props, color: 'air-primary' } }],
    ['with activeColor', { props: { ...props, modelValue: true, activeColor: 'air-primary-success' } }],
    ['with size', { props: { ...props, size: 'xl' } }],
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with b24ui', { props: { ...props, b24ui: { leadingIcon: 'size-6' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }]
  ])

  it('toggles the pressed state on click', async () => {
    const wrapper = await mountSuspended(Toggle, { props })
    const button = wrapper.find('button')

    expect(button.attributes('aria-pressed')).toBe('false')
    await button.trigger('click')
    expect(button.attributes('aria-pressed')).toBe('true')
    expect(button.attributes('data-state')).toBe('on')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Toggle, { props })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('form integration', async () => {
    async function createForm(validateOn?: FormInputEvents[]) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (!state.value)
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotTemplate: `
        <B24FormField name="value" label="Bold">
          <B24Toggle v-model="state.value" label="Bold" />
        </B24FormField>
        `
      })
      return { wrapper, button: wrapper.find('button') }
    }

    test('validate on change works', async () => {
      const { wrapper, button } = await createForm(['change'])

      await button.trigger('click')
      await button.trigger('click')
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')
      expect(button.attributes('aria-invalid')).toBe('true')

      await button.trigger('click')
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('binds the FormField label to the button', async () => {
      const { wrapper, button } = await createForm()

      expect(wrapper.find('label').attributes('for')).toBe(button.attributes('id'))
    })
  })
})
