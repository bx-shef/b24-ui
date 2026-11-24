<script setup lang="ts">
const items = ref(['Бэклог', 'К выполнению', 'В работе', 'Готово'])
const value = ref('')
</script>

<template>
  <B24InputMenu
    v-model="value"
    mode="autocomplete"
    :items="items"
    :content="{ hideWhenEmpty: true }"
    placeholder="Введите статус..."
  />
</template>
