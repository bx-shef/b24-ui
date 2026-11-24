<script lang="ts" setup>
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import { useTimeAgo } from '@vueuse/core'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const items = [{
  username: 'Имя сотрудника',
  date: '2025-05-24T14:58:55Z',
  action: 'открыл(а) это',
  avatar: {
    src: '/b24ui/avatar/employee.png',
    loading: 'lazy' as const
  }
}, {
  username: 'Имя сотрудника',
  date: '2025-05-26T19:30:14+02:00',
  action: 'отметил(а) этот pull request как готовый к проверке',
  icon: RocketIcon
}, {
  username: 'Имя ассистента',
  date: '2025-05-27T11:01:20Z',
  action: 'прокомментировал(а) это',
  description: 'Я внёс несколько правок, скажите, что думаете! Обновил дизайн, убрал лишние div и использовал компонент Avatar для индикатора, так как он уже поддерживает иконки.',
  avatar: {
    src: '/b24ui/avatar/assistant.png',
    loading: 'lazy' as const
  }
}, {
  username: 'Имя сотрудника',
  date: '2025-05-27T11:01:20Z',
  action: 'прокомментировал(а) это',
  description: 'Отлично! Хорошо, что всё почистили.',
  avatar: {
    src: '/b24ui/avatar/employee.png',
    loading: 'lazy' as const
  }
}, {
  username: 'Имя ассистента',
  date: '2025-05-27T11:01:20Z',
  action: 'слил(а) это',
  icon: MoreMIcon
}] satisfies TimelineItem[]
</script>

<template>
  <B24Timeline
    :items="items"
    size="xs"
    :b24ui="{
      date: 'float-end ms-1',
      description: 'px-3 py-2 ring ring-(--ui-color-g-glass-grey-bg-2) mt-2 rounded-md text-description'
    }"
    class="w-[384px]"
  >
    <template #title="{ item }">
      <span>{{ item.username }}</span>
      <span class="font-normal text-label">&nbsp;{{ item.action }}</span>
    </template>

    <template #date="{ item }">
      {{ useTimeAgo(new Date(item.date)) }}
    </template>
  </B24Timeline>
</template>
