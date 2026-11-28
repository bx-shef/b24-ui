<script setup lang="ts">
const items = ref(['Настройки CRM', 'Реквизиты моей компании', 'Права доступа'])
const selected = ref('Реквизиты моей компании')
</script>

<template>
  <B24InputMenu
    v-model="selected"
    :items="items"
    open-on-focus
  />
</template>
