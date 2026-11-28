<script setup lang="ts">
import theme from '#build/b24ui/toggle-group'
import buttonTheme from '#build/b24ui/button'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import AlignCenterIcon from '@bitrix24/b24icons-vue/outline/AlignCenterIcon'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'

const colors = Object.keys(buttonTheme.variants.color)
const sizes = Object.keys(buttonTheme.variants.size)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const multipleAttrs = reactive({
  color: ['air-secondary-no-accent' as const],
  activeColor: ['air-primary' as const],
  size: [buttonTheme.defaultVariants.size]
})

const singleAttrs = reactive({
  attached: false,
  disabled: false
})

const orientation = ref(orientations[0])

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const align = ref('left')
const marks = ref(['bold'])

const alignItems = [{
  'value': 'left',
  'icon': AlignLeftIcon,
  'aria-label': 'Align left'
}, {
  'value': 'center',
  'icon': AlignCenterIcon,
  'aria-label': 'Align center'
}, {
  'value': 'right',
  'icon': AlignRightIcon,
  'aria-label': 'Align right'
}]

const markItems = [{
  'value': 'bold',
  'icon': BoldIcon,
  'aria-label': 'Toggle bold'
}, {
  'value': 'italic',
  'icon': ItalicIcon,
  'aria-label': 'Toggle italic'
}, {
  'value': 'underline',
  'icon': UnderlineIcon,
  'aria-label': 'Toggle underline',
  'disabled': true
}]

const periodItems = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' }
]
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
      <B24Select v-model="orientation" class="w-44" :items="orientations" placeholder="Orientation" size="xs" />

      <B24Switch v-model="singleAttrs.attached" label="Attached" size="xs" />
      <B24Switch v-model="singleAttrs.disabled" label="Disabled" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-70' }">
      <B24ToggleGroup
        v-model="align"
        :items="alignItems"
        :orientation="orientation"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24ToggleGroup
        v-model="marks"
        type="multiple"
        :items="markItems"
        :orientation="orientation"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24ToggleGroup
        :items="periodItems"
        default-value="week"
        :orientation="orientation"
        v-bind="{ ...singleAttrs, ...props }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
