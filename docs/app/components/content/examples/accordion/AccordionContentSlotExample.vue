<script setup lang="ts">
import type { AccordionItem } from '@bxshefby/b24ui-nuxt'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items: AccordionItem[] = [
  {
    label: 'Начало работы с Битрикс24',
    icon: SmartActivityIcon
  },
  {
    label: 'Основные возможности Битрикс24',
    icon: FeedbackIcon
  },
  {
    label: 'Тарифы облачного Битрикс24',
    icon: RocketIcon
  }
]
</script>

<template>
  <B24Accordion :items="items">
    <template #content="{ item }">
      <p class="pb-3.5 text-(length:--ui-font-size-sm) text-description">
        Это панель <b>{{ item.label }}</b>.
      </p>
    </template>
  </B24Accordion>
</template>
