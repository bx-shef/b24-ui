<script setup lang="ts">
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const items: TimelineItem[] = [{
  date: '15 марта 2025',
  title: 'Старт проекта',
  icon: RocketIcon,
  value: 'kickoff'
}, {
  date: '22 марта 2025',
  title: 'Этап проектирования',
  icon: SignIcon,
  value: 'design'
}, {
  date: '29 марта 2025',
  title: 'Спринт разработки',
  icon: MoreMIcon,
  value: 'development'
}, {
  date: '5 апреля 2025',
  title: 'Тестирование и развёртывание',
  icon: InfoIcon,
  value: 'deployment'
}]
</script>

<template>
  <B24Timeline
    :items="items"
    :default-value="2"
    :b24ui="{ item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] rtl:even:translate-x-[calc(100%-2rem)] even:text-end' }"
    class="translate-x-[calc(50%-1rem)] rtl:-translate-x-[calc(50%-1rem)]"
  />
</template>
