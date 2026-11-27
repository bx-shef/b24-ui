<script setup lang="ts">
const searchTerm = ref('o')
const items = ref(['Настройки CRM', 'Реквизиты моей компании', 'Права доступа'])
const value = ref('Реквизиты моей компании')
</script>

<template>
  <B24SelectMenu v-model="value" v-model:search-term="searchTerm" :items="items" class="w-48" />
</template>
