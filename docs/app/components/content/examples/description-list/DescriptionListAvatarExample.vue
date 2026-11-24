<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

const items = ref([
  {
    label: 'Строка 1.1',
    description: 'Описание 1.1',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Строка 1.2',
    description: 'Описание 1.2',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      loading: 'lazy' as const
    }
  },
  {
    description: 'Описание 1.3',
    avatar: {
      src: 'https://github.com/bitrix24.png',
      loading: 'lazy' as const
    }
  }
] satisfies DescriptionListItem[])
</script>

<template>
  <B24DescriptionList
    legend="Информация о кандидате"
    text="Личные данные и заявка."
    :items="items"
  />
</template>
