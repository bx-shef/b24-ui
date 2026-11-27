<script setup lang="ts">
import type { ListboxItem } from '@bxshefby/b24ui-nuxt'

const items = ref<ListboxItem[]>([
  {
    label: 'Ошибка',
    chip: {
      color: 'air-primary-alert'
    }
  },
  {
    label: 'Функция',
    chip: {
      color: 'air-primary-success'
    }
  },
  {
    label: 'Улучшение',
    chip: {
      color: 'air-primary'
    }
  }
])
</script>

<template>
  <B24Listbox :items="items" />
</template>
