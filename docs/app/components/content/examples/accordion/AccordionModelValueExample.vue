<script setup lang="ts">
import type { AccordionItem } from '@bxshefby/b24ui-nuxt'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items: AccordionItem[] = [
  {
    label: 'Начало работы с Битрикс24',
    icon: SmartActivityIcon,
    content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании.'
  },
  {
    label: 'Основные возможности Битрикс24',
    icon: FeedbackIcon,
    content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
  },
  {
    label: 'Тарифы облачного Битрикс24',
    icon: RocketIcon,
    content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы.'
  }
]

const active = ref('0')

// Примечание: только для демонстрации. Не повторяйте это в рабочем коде.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.length)
  }, 2000)
})
</script>

<template>
  <B24Accordion v-model="active" :items="items" />
</template>
