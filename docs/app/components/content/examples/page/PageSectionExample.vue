<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
import CrmLettersIcon from '@bitrix24/b24icons-vue/outline/CrmLettersIcon'
import TaskIcon from '@bitrix24/b24icons-vue/outline/TaskIcon'

const features = ref([
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
  <B24PageSection
    title="Bitrix24. Ваше рабочее пространство."
    description="Бесплатная универсальная платформа для управления командой и продажами. Bitrix24 легко встраивается во все бизнес-процессы и помогает управлять ими максимально точно и эффективно."
    headline="Возможности"
    :icon="RocketIcon"
    :features="features"
  />
</template>
