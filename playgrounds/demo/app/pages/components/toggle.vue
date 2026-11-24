<script setup lang="ts">
import theme from '#build/b24ui/button'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const multipleAttrs = reactive({
  color: ['air-secondary-no-accent' as const],
  activeColor: ['air-primary' as const],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  loading: false
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const pressed = ref(true)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="multipleAttrs.color"
        class="w-44"
        :items="airColors"
        placeholder="Color"
        multiple
        size="xs"
      />
      <B24Select
        v-model="multipleAttrs.activeColor"
        class="w-44"
        :items="airColors"
        placeholder="Active color"
        multiple
        size="xs"
      />
      <B24Select
        v-model="multipleAttrs.size"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
        size="xs"
      />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" size="xs" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-70' }">
      <B24Toggle v-model="pressed" label="Bold" v-bind="{ ...singleAttrs, ...props }" />
      <B24Toggle label="Not pressed" v-bind="{ ...singleAttrs, ...props }" />
      <B24Toggle :default-value="true" label="Pressed" v-bind="{ ...singleAttrs, ...props }" />
      <B24Toggle
        v-model="pressed"
        :icon="BoldIcon"
        aria-label="Toggle bold"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24Toggle
        :icon="BoldIcon"
        label="Icon"
        v-bind="{ ...singleAttrs, ...props }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
