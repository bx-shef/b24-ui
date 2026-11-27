<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import { useSortable } from '@vueuse/integrations/useSortable'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items = shallowRef<AccordionItem[]>([
  {
    label: 'Начало работы с Битрикс24',
    icon: SmartActivityIcon,
    content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе AI.'
  },
  {
    label: 'Основные возможности Битрикс24',
    icon: FeedbackIcon,
    content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
  },
  {
    label: 'Тарифы облачного Битрикс24',
    icon: RocketIcon,
    content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
  }
])

const accordion = useTemplateRef<HTMLElement>('accordion')

useSortable(accordion, items, {
  animation: 150
})
</script>

<template>
  <B24Accordion ref="accordion" :items="items" />
</template>
