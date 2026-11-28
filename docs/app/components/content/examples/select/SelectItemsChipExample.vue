<script setup lang="ts">
import type { SelectItem, ChipProps } from '@bxshefby/b24ui-nuxt'

const items = ref([
  {
    label: 'Ошибка',
    value: 'bug',
    chip: {
      color: 'air-primary-alert'
    }
  },
  {
    label: 'Функция',
    value: 'feature',
    chip: {
      color: 'air-primary-success'
    }
  },
  {
    label: 'Улучшение',
    value: 'enhancement',
    chip: {
      color: 'air-primary-copilot'
    }
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)
</script>

<template>
  <B24Select v-model="value" :items="items" value-key="value" class="w-48">
    <template #leading="{ item, b24ui }">
      <B24Chip
        v-if="item"
        v-bind="item.chip"
        inset
        standalone
        :size="(b24ui.itemLeadingChipSize() as ChipProps['size'])"
        :class="b24ui.itemLeadingChip()"
      />
    </template>
  </B24Select>
</template>
