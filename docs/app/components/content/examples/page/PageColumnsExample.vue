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
      name: 'Имя сотрудника',
      description: 'Менеджер по работе с клиентами',
      avatar: {
        src: '/b24ui/avatar/employee.png',
        alt: 'Имя сотрудника',
        loading: 'lazy' as const
      }
    },
    quote: 'Bitrix24 помогает всей нашей команде работать на одной многофункциональной платформе, и больше не нужно постоянно переключаться между разными программами. Это сильно экономит время и упрощает рабочие процессы.'
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
    quote: 'Задачи, аналитика и общий доступ к информации в Bitrix24 помогли нам автоматизировать согласования внутри компании. Ручной работы и ожидания стало заметно меньше, а команда работает быстрее.'
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
