<script setup lang="ts">
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const items: TimelineItem[] = [{
  date: '15 марта 2025',
  title: 'Старт проекта',
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
  value: 'development'
}, {
  date: '5 апреля 2025',
  title: 'Тестирование и развёртывание',
  description: 'Тестирование и оптимизация производительности. Приложение выложено в продакшн.',
  icon: InfoIcon,
  value: 'deployment'
}]

const active = ref(0)

// Примечание: только для демонстрации, в реальном проекте так делать не стоит.
onMounted(() => {
  setInterval(() => {
    active.value = (active.value + 1) % items.length
  }, 2000)
})
</script>

<template>
  <B24Timeline v-model="active" :items="items" class="w-[384px]" />
</template>
