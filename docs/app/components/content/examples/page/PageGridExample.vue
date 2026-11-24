<script setup lang="ts">
import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
import CrmLettersIcon from '@bitrix24/b24icons-vue/outline/CrmLettersIcon'
import TaskIcon from '@bitrix24/b24icons-vue/outline/TaskIcon'

const cards = ref([
  {
    title: 'Онлайн-пространство для всей команды',
    description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 помогает командам работать эффективно и слаженно где угодно — дома, в офисе или в дороге.',
    icon: CopilotIcon,
    to: 'https://www.bitrix24.com/tools/communications/'
  },
  {
    title: 'Бесплатная CRM для вашего бизнеса',
    description: 'Продавайте больше, лучше и быстрее с Bitrix24 — единой платформой для всех ваших задач.',
    icon: CrmLettersIcon,
    to: 'https://www.bitrix24.com/tools/crm/'
  },
  {
    title: 'Бесплатная система управления задачами для вашего бизнеса',
    description: 'Ставьте задачи, управляйте сроками, собирайте отчёты, отслеживайте KPI и ведите проекты откуда угодно.',
    icon: TaskIcon,
    to: 'https://www.bitrix24.com/tools/tasks_and_projects/'
  }
])
</script>

<template>
  <B24PageGrid>
    <B24PageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    />
  </B24PageGrid>
</template>
