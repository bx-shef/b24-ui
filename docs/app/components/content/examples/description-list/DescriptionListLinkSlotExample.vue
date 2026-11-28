<script setup lang="ts">
import type { DescriptionListItem } from '@bxshefby/b24ui-nuxt'

// `to` и `target` не входят в `DescriptionListItem`; индексная сигнатура
// передаёт их, чтобы слот `#description` мог их прочитать.
const items: DescriptionListItem[] = [
  {
    label: 'Документация',
    description: 'Руководство по началу работы',
    to: '/docs/getting-started'
  },
  {
    label: 'Сайт продукта',
    description: 'Открыть на bitrix24.com',
    to: 'https://www.bitrix24.com/',
    target: '_blank'
  },
  {
    label: 'Создано',
    description: '6 октября 2024 08:37'
  }
]
</script>

<template>
  <B24DescriptionList :items="items" size="sm">
    <template #description="{ item }">
      <B24Link
        v-if="item.to"
        :to="item.to"
        :target="item.target"
      >
        {{ item.description }}
      </B24Link>
      <template v-else>
        {{ item.description }}
      </template>
    </template>
  </B24DescriptionList>
</template>
