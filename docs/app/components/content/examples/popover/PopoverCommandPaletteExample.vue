<script setup lang="ts">
import type { CommandPaletteItem } from '@bxshefby/b24ui-nuxt'
import TagIcon from '@bitrix24/b24icons-vue/outline/TagIcon'

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
      color: 'air-primary'
    }
  }
] satisfies CommandPaletteItem[])

const label = ref([])
</script>

<template>
  <B24Popover :content="{ side: 'right', align: 'start' }">
    <B24Button
      :icon="TagIcon"
      label="Выберите метки"
    />

    <template #content>
      <B24CommandPalette
        v-model="label"
        :multiple="true"
        placeholder="Найдите метки..."
        :groups="[{ id: 'labels', items }]"
        :b24ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }"
      />
    </template>
  </B24Popover>
</template>
