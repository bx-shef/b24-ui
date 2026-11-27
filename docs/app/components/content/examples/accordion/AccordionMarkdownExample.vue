<script setup lang="ts">
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items = [
  {
    label: 'Начало работы с Битрикс24',
    icon: SmartActivityIcon,
    content: 'Битрикс24 — **онлайн-сервис** с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе AI.'
  },
  {
    label: 'Основные возможности Битрикс24',
    icon: FeedbackIcon,
    content: '[Битрикс24](https://www.bitrix24.com/) — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
  },
  {
    label: 'Тарифы облачного Битрикс24',
    icon: RocketIcon,
    content: 'Битрикс24 — `онлайн-сервис` для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
  }
]
</script>

<template>
  <B24Accordion
    type="multiple"
    :items="items"
    :unmount-on-hide="false"
    :default-value="['3']"
    :b24ui="{
      trigger: 'text-base',
      body: 'text-base text-description'
    }"
  >
    <template #body="{ item }">
      <MDC :value="item.content" unwrap="p" />
    </template>
  </B24Accordion>
</template>
