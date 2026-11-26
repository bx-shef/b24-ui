<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-columns'
import type { ComponentConfig } from '../types/tv'

type PageColumns = ComponentConfig<typeof theme, AppConfig, 'pageColumns'>

export interface PageColumnsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: PageColumns['slots']
}

export interface PageColumnsSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import { useComponentProps } from '../composables/useComponentProps'
import { flattenSlot } from '../utils/vnode'

const _props = defineProps<PageColumnsProps>()
const slots = defineSlots<PageColumnsSlots>()

const props = useComponentProps('pageColumns', _props)

const appConfig = useAppConfig() as PageColumns['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.pageColumns || {}) })())
</script>

<template>
  <Primitive :as="props.as" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <div
      v-for="(node, index) in flattenSlot(slots.default?.())"
      :key="node.key ?? index"
      :class="b24ui.item({ class: props.b24ui?.item })"
    >
      <component :is="node" />
    </div>
  </Primitive>
</template>
