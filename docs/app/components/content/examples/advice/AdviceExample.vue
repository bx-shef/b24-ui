<script setup lang="ts">
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'
</script>

<template>
  <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
    <B24Advice
      :avatar="{
        src: '/b24ui/avatar/assistant.png',
        loading: 'lazy' as const
      }"
    >
      <span>Как правило, инструкции по добавлению SAML-приложения и указанию ACS URL и SP Entity ID есть в технической документации Microsoft Azure. </span>
      <B24Link to="https://github.com/bitrix24/b24ui/" target="_blank" is-action>
        Подробнее
      </B24Link>
    </B24Advice>
    <B24Advice
      angle="top"
      :avatar="{
        src: '/b24ui/avatar/employee.png',
        loading: 'lazy' as const
      }"
    >
      <div class="flex flex-col items-start justify-between gap-1.5">
        <div class="font-(--ui-font-weight-bold)">
          Справочная информация
        </div>
        <div>Как правило, инструкции по добавлению SAML-приложения и указанию ACS URL и SP Entity ID есть в технической документации Microsoft Azure.</div>
        <div class="mt-2 flex flex-row flex-wrap items-start justify-between gap-2">
          <B24Button size="xs" color="air-primary" label="Действие 1" />
          <B24Button size="xs" color="air-secondary-accent-2" label="Действие 2" />
          <B24Button size="xs" color="air-tertiary" :icon="DotsIcon" />
        </div>
      </div>
    </B24Advice>
  </div>
</template>
