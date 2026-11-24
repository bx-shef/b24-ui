<script lang="ts">
import type { ToggleProps as RekaToggleProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/toggle'
import type { ButtonProps, ButtonSlots } from './Button.vue'
import type { LinkPropsKeys } from './Link.vue'
import type { ComponentConfig } from '../types/tv'

type Toggle = ComponentConfig<typeof theme, AppConfig, 'toggle'>

export interface ToggleProps extends Omit<ButtonProps, Exclude<LinkPropsKeys, 'activeClass' | 'inactiveClass'> | 'type' | 'loadingAuto' | 'color' | 'activeColor' | 'depth' | 'activeDepth'>, Pick<RekaToggleProps, 'defaultValue' | 'modelValue' | 'name' | 'required'> {
  id?: string
  /**
   * The color of the toggle when not pressed.
   * @defaultValue 'air-secondary-no-accent'
   */
  color?: ButtonProps['color']
  /**
   * The color of the toggle when pressed.
   * @defaultValue 'air-primary'
   */
  activeColor?: ButtonProps['color']
}

export interface ToggleEmits {
  'update:modelValue': [value: boolean]
  'change': [event: Event]
}

export interface ToggleSlots extends ButtonSlots {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Toggle } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFormField } from '../composables/useFormField'
import { useFieldGroup } from '../composables/useFieldGroup'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: undefined
})
const emits = defineEmits<ToggleEmits>()
const slots = defineSlots<ToggleSlots>()

const props = useComponentProps('toggle', _props)

const appConfig = useAppConfig() as Toggle['AppConfig']

const rootProps = useForwardProps(props, ['modelValue', 'defaultValue', 'required'], emits)
const buttonProps = useForwardProps(reactiveOmit(props, 'id', 'modelValue', 'defaultValue', 'disabled', 'name', 'required', 'color', 'activeColor', 'size', 'class'))

const { id, name, size: formFieldSize, color: formFieldColor, disabled: formFieldDisabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<ToggleProps>(_props)

// The defaults live here rather than in `withDefaults`, so `useFormField` doesn't return them over `<B24Theme :props>`
// eslint-disable-next-line vue/no-dupe-keys
const color = computed(() => formFieldColor.value ?? props.color ?? 'air-secondary-no-accent')
// eslint-disable-next-line vue/no-dupe-keys
const activeColor = computed(() => props.activeColor ?? 'air-primary')

const { size: fieldGroupSize } = useFieldGroup<ToggleProps>(_props)

const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size)

const disabled = computed(() => formFieldDisabled.value ?? props.disabled)

const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.toggle || {}) }))

function onUpdate(value: boolean) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <Toggle
    v-slot="{ pressed }"
    v-bind="rootProps"
    :name="disabled ? undefined : name"
    :disabled="disabled"
    as-child
    @update:model-value="onUpdate"
  >
    <B24Button
      :id="id"
      v-bind="{ ...buttonProps, ...ariaAttrs, ...$attrs }"
      :color="color"
      :active-color="activeColor"
      :size="size"
      :active="pressed"
      :class="b24ui({ class: props.class })"
    >
      <template v-for="(_, slotName) in slots" #[slotName]="slotData">
        <slot :name="slotName" v-bind="slotData" />
      </template>
    </B24Button>
  </Toggle>
</template>
