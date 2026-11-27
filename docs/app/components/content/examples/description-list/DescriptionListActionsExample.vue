<script setup lang="ts">
import type { DescriptionListItem, ButtonProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'

const action = (color: string): ButtonProps[] => [
  {
    icon: DotsIcon,
    color: color as any,
    onClick() {
      console.log('Действие нажато')
    }
  }
]

const multipleActions = (color: string): ButtonProps[] => [
  {
    label: 'Действие',
    color: color as any,
    onClick() {
      console.log('Действие нажато')
    }
  },
  {
    label: 'Другое действие',
    color: color as any,
    onClick() {
      console.log('Другое действие нажато')
    }
  },
  {
    label: 'Ещё одно действие',
    color: color as any,
    onClick() {
      console.log('Ещё одно действие нажато')
    }
  },
  {
    label: 'И ещё одно',
    color: color as any,
    icon: SignIcon,
    onClick() {
      console.log('И ещё одно нажато')
    }
  },
  {
    label: 'Последнее',
    color: color as any,
    icon: DotsIcon,
    onClick() {
      console.log('Последнее нажато')
    }
  }
]

const items = ref([
  {
    label: 'Строка 1.1',
    description: 'Описание 1.1',
    actions: action('air-secondary-no-accent'),
    orientation: 'horizontal' as DescriptionListItem['orientation']
  },
  {
    label: 'Строка 1.2',
    description: 'Описание 1.2',
    actions: action('air-primary'),
    orientation: 'horizontal' as DescriptionListItem['orientation']
  },
  {
    label: 'Строка 1.3',
    description: 'Описание 1.3',
    actions: action('air-tertiary-no-accent'),
    orientation: 'horizontal' as DescriptionListItem['orientation']
  },
  {
    description: 'Длинное описание строки: оно показывает, как текст переносится внутри списка описаний и остаётся читаемым, даже когда занимает несколько строк подряд.',
    actions: multipleActions('default'),
    orientation: 'vertical' as DescriptionListItem['orientation']
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
