<script lang="ts">
import type { ToggleGroupRootProps, ToggleGroupRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/toggle-group'
import type { ButtonProps, ButtonSlots } from './Button.vue'
import type { LinkPropsKeys } from './Link.vue'
import type { AcceptableValue, GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type ToggleGroup = ComponentConfig<typeof theme, AppConfig, 'toggleGroup'>

export interface ToggleGroupItem extends Omit<ButtonProps, Exclude<LinkPropsKeys, 'activeClass' | 'inactiveClass'> | 'type' | 'loadingAuto' | 'depth' | 'activeDepth'> {
  /**
   * A unique value for the item. Defaults to the index.
   */
  value?: AcceptableValue
  [key: string]: any
}

export interface ToggleGroupProps<T extends ToggleGroupItem = ToggleGroupItem> extends Pick<ToggleGroupRootProps, 'type' | 'modelValue' | 'defaultValue' | 'disabled' | 'loop' | 'rovingFocus' | 'name' | 'required'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items?: T[]
  /**
   * The color of the items when not pressed.
   * @defaultValue 'air-secondary-no-accent'
   */
  color?: ButtonProps['color']
  /**
   * The color of the pressed items.
   * @defaultValue 'air-primary'
   */
  activeColor?: ButtonProps['color']
  size?: ButtonProps['size']
  /**
   * The orientation the items are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: ToggleGroup['variants']['orientation']
  /**
   * Attach the items together, like in a FieldGroup.
   * @defaultValue false
   */
  attached?: boolean
  /**
   * The key used to get the value from the item.
   * @defaultValue 'value'
   */
  valueKey?: GetItemKeys<T>
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  class?: any
  b24ui?: ToggleGroup['slots']
}

export interface ToggleGroupEmits extends ToggleGroupRootEmits {
  change: [event: Event]
}

type SlotProps<T extends ToggleGroupItem> = (props: { item: T, index: number, pressed: boolean, b24ui: Parameters<NonNullable<ButtonSlots['default']>>[0]['b24ui'] }) => VNode[]

export interface ToggleGroupSlots<T extends ToggleGroupItem = ToggleGroupItem> {
  leading?: SlotProps<T>
  default?: SlotProps<T>
  trailing?: SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends ToggleGroupItem">
import { computed, provide, useId } from 'vue'
import { ToggleGroupRoot, ToggleGroupItem as RToggleGroupItem } from 'reka-ui'
import { defu } from 'defu'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { fieldGroupInjectionKey, useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { get, omit } from '../utils'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'

const _props = withDefaults(defineProps<ToggleGroupProps<T>>(), {
  type: 'single',
  orientation: 'horizontal',
  rovingFocus: true,
  loop: true,
  valueKey: 'value' as never,
  labelKey: 'label' as never
})
const emits = defineEmits<ToggleGroupEmits>()
const slots = defineSlots<ToggleGroupSlots<T>>()

const props = useComponentProps<ToggleGroupProps<T>>('toggleGroup', _props)

const appConfig = useAppConfig() as ToggleGroup['AppConfig']

const rootProps = useForwardProps(props, ['as', 'type', 'modelValue', 'defaultValue', 'loop', 'rovingFocus', 'orientation', 'required'], emits)

const { id: _id, name, size: formFieldSize, color: formFieldColor, disabled: formFieldDisabled, labelId, ariaAttrs, emitFormChange, emitFormInput } = useFormField<ToggleGroupProps<T>>(_props, { bind: false })
const id = _id.value ?? useId()

const { size: fieldGroupSize } = useFieldGroup<ToggleGroupProps<T>>(_props)

// The defaults live here rather than in `withDefaults`, so `useFormField` doesn't return them over `<B24Theme :props>`
// eslint-disable-next-line vue/no-dupe-keys
const color = computed(() => formFieldColor.value ?? props.color ?? 'air-secondary-no-accent')
// eslint-disable-next-line vue/no-dupe-keys
const activeColor = computed(() => props.activeColor ?? 'air-primary')
// eslint-disable-next-line vue/no-dupe-keys
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size)

const disabled = computed(() => formFieldDisabled.value ?? props.disabled)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.toggleGroup || {}) })({
  orientation: props.orientation,
  attached: Boolean(props.attached)
}))

// The theme rounds attached items itself, so a wrapping FieldGroup must not reach the item buttons
provide(fieldGroupInjectionKey, computed(() => ({
  size: undefined,
  orientation: undefined,
  noSplit: undefined
})))

function getValue(item: T, index: number) {
  return get(item, props.valueKey as string) ?? String(index)
}

function getButtonProps(item: T): ButtonProps {
  return defu({
    ...omit(item as ToggleGroupItem, ['value', 'disabled', 'label', 'class', props.valueKey as string, props.labelKey as string]),
    label: get(item, props.labelKey as string)
  }, {
    color: color.value,
    activeColor: activeColor.value,
    size: size.value
  })
}

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <ToggleGroupRoot
    :id="id"
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :name="disabled ? undefined : name"
    :disabled="disabled"
    :aria-labelledby="($attrs['aria-labelledby'] as string | undefined) ?? ($attrs['aria-label'] ? undefined : labelId)"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <RToggleGroupItem
      v-for="(item, index) in props.items"
      :key="getValue(item, index)"
      v-slot="{ pressed }"
      :value="getValue(item, index)"
      :disabled="item.disabled"
      as-child
    >
      <B24Button
        v-bind="getButtonProps(item)"
        :active="pressed"
        data-slot="item"
        :class="b24ui.item({ class: [props.b24ui?.item, item.class] })"
      >
        <template v-if="!!slots.leading" #leading="{ b24ui: buttonUi }">
          <slot name="leading" :item="item" :index="index" :pressed="pressed" :b24ui="buttonUi" />
        </template>
        <template v-if="!!slots.default" #default="{ b24ui: buttonUi }">
          <slot :item="item" :index="index" :pressed="pressed" :b24ui="buttonUi" />
        </template>
        <template v-if="!!slots.trailing" #trailing="{ b24ui: buttonUi }">
          <slot name="trailing" :item="item" :index="index" :pressed="pressed" :b24ui="buttonUi" />
        </template>
      </B24Button>
    </RToggleGroupItem>
  </ToggleGroupRoot>
</template>
