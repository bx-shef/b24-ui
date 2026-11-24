<script setup lang="ts">
import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'
import CrmLettersIcon from '@bitrix24/b24icons-vue/outline/CrmLettersIcon'
import TaskIcon from '@bitrix24/b24icons-vue/outline/TaskIcon'
import HrAutomationIcon from '@bitrix24/b24icons-vue/main/HrAutomationIcon'

const cards = ref([
  {
    title: 'Онлайн-пространство для всей команды',
    description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 помогает командам работать эффективно и слаженно где угодно — дома, в офисе или в дороге.',
    icon: CopilotIcon,
    to: 'https://www.bitrix24.com/tools/communications/',
    class: 'lg:col-span-2',
    image: {
      path: '/b24ui/assets/demo/communications-main.png.webp',
      width: 363,
      height: 152
    },
    orientation: 'horizontal' as const,
    variant: 'filled' as const
  },
  {
    title: 'Бесплатная CRM для вашего бизнеса',
    description: 'Продавайте больше, лучше и быстрее с Bitrix24 — единой платформой для всех ваших задач.',
    icon: CrmLettersIcon,
    to: 'https://www.bitrix24.com/tools/crm/',
    variant: 'tinted-no-accent' as const
  },
  {
    title: 'Бесплатная система управления задачами для вашего бизнеса',
    description: 'Ставьте задачи, управляйте сроками, собирайте отчёты, отслеживайте KPI и ведите проекты откуда угодно.',
    icon: TaskIcon,
    to: 'https://www.bitrix24.com/tools/tasks_and_projects/',
    variant: 'tinted-no-accent' as const
  },
  {
    title: 'HR-менеджмент и автоматизация бизнес-процессов',
    description: 'Упорядочьте рабочие процессы, автоматизируйте бизнес-процессы и ведите данные сотрудников по-взрослому.',
    icon: HrAutomationIcon,
    to: 'https://www.bitrix24.com/tools/hr_automation/',
    image: {
      path: '/b24ui/assets/demo/hr_automation-main.png.webp',
      width: 362,
      height: 184
    },
    class: 'lg:col-span-2',
    orientation: 'horizontal' as const,
    variant: 'tinted' as const,
    reverse: true
  }
])
</script>

<template>
  <B24PageGrid>
    <B24PageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    >
      <img
        v-if="card.image"
        :src="card.image.path"
        :width="card.image.width"
        :height="card.image.height"
        :alt="card.title"
        class="w-full"
      >
    </B24PageCard>
  </B24PageGrid>
</template>
