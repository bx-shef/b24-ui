<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

const items = ref([
  {
    label: 'Строка 1.1',
    description: 'Описание 1.1',
    icon: SignIcon
  },
  {
    label: 'Строка 1.2',
    description: 'Описание 1.2',
    avatar: {
      icon: PersonIcon
    }
  },
  {
    description: 'Описание 1.3',
    icon: SignIcon
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
