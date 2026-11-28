<script setup lang="ts">
import type { TimelineItem } from '@bxshefby/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const items = [{
  date: '15 марта 2025',
  title: 'Старт проекта',
  subtitle: 'Инициация проекта',
  description: 'Запустили проект и согласовали работу команды. Определили вехи проекта и распределили ресурсы.',
  icon: RocketIcon,
  value: 'kickoff'
}, {
  date: '22 марта 2025',
  title: 'Этап проектирования',
  description: 'Исследование пользователей и дизайн-воркшопы. Созданы вайрфреймы и прототипы для тестирования.',
  icon: SignIcon,
  value: 'design'
}, {
  date: '29 марта 2025',
  title: 'Спринт разработки',
  description: 'Разработка фронтенда и бэкенда. Реализованы основные функции и интеграции с API.',
  icon: MoreMIcon,
  value: 'development',
  slot: 'development' as const,
  developers: [
    {
      src: 'https://github.com/bitrix-tools.png',
      loading: 'lazy' as const
    }, {
      src: 'https://github.com/bitrix24.png',
      loading: 'lazy' as const
    }
  ]
}, {
  date: '5 апреля 2025',
  title: 'Тестирование и развёртывание',
  description: 'Тестирование и оптимизация производительности. Приложение выложено в продакшн.',
  icon: InfoIcon,
  value: 'deployment'
}] satisfies TimelineItem[]
</script>

<template>
  <B24Timeline :items="items" :default-value="2" class="w-[384px]">
    <template #development-title="{ item }">
      <div class="flex items-center gap-1">
        <span>{{ item.title }}</span>

        <B24AvatarGroup size="2xs">
          <B24Avatar v-for="(developer, index) of item.developers" :key="index" v-bind="developer" />
        </B24AvatarGroup>
      </div>
    </template>
  </B24Timeline>
</template>
