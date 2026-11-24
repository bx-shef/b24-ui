<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const testimonials = ref([
  {
    user: {
      name: 'Имя сотрудника',
      description: 'Менеджер по работе с клиентами',
      avatar: {
        src: '/b24ui/avatar/employee.png',
        alt: 'employee',
        loading: 'lazy' as const
      }
    },
    quote: 'Bitrix24 дал нам полную картину всех текущих проектов. Сроки задач, учёт времени и наглядное управление процессами на канбан-досках не дают ничему потеряться, и мы заметно чаще сдаём работу вовремя, а команда стала ответственнее.'
  },
  {
    user: {
      name: 'Имя ассистента',
      description: 'Генеральный директор',
      avatar: {
        src: '/b24ui/avatar/assistant.png',
        alt: 'Имя ассистента',
        loading: 'lazy' as const
      }
    },
    quote: 'CRM и инструменты маркетинговой автоматизации в Bitrix24 изменили наш процесс продаж. Мы видим каждое взаимодействие с клиентом, автоматизируем письма и эффективно сегментируем лиды — конверсия выросла, а закрытых сделок стало больше.'
  },
  {
    user: {
      name: '员工姓名',
      description: '客户关系经理',
      avatar: {
        src: '/b24ui/avatar/employee.png',
        alt: '员工姓名',
        loading: 'lazy' as const
      }
    },
    quote: 'Bitrix24 помогает всей нашей команде работать на одной многофункциональной платформе, и больше не нужно постоянно переключаться между разными программами. Это сильно экономит время и упрощает рабочие процессы.'
  },
  {
    user: {
      name: '助理姓名',
      description: '首席执行官',
      avatar: {
        src: '/b24ui/avatar/assistant.png',
        alt: '助理姓名',
        loading: 'lazy' as const
      }
    },
    quote: '借助Bitrix24强大的任务管理、分析和信息共享工具，我们为内部流程的沟通和审批创建了自动化工作流。这极大地减少了手动操作和等待时间，从而显著提升了整体工作效率。'
  }
])
</script>

<template>
  <B24PageColumns>
    <B24PageCard
      variant="filled"
      to="https://www.bitrix24.com/tools/"
      :icon="Bitrix24Icon"
      title="Bitrix24 — бесплатное онлайн-пространство для вашего бизнеса: CRM, задачи, онлайн-встречи и многое другое."
      description="Бесплатная универсальная платформа для управления командой и продажами. Bitrix24 легко встраивается во все бизнес-процессы и помогает управлять ими максимально точно и эффективно."
      :b24ui="{ leadingIcon: 'size-10' }"
    />

    <B24PageCard
      v-for="(testimonial, index) in testimonials"
      :key="index"
      variant="outline-no-accent"
      :description="testimonial.quote"
      :b24ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
    >
      <template #footer>
        <B24User v-bind="testimonial.user" size="xl" />
      </template>
    </B24PageCard>
  </B24PageColumns>
</template>
