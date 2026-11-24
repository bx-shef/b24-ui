<script setup lang="ts">
const tags = ref(['Bitrix24'])
</script>

<template>
  <B24FormField label="Теги" required>
    <B24InputTags v-model="tags" placeholder="Введите теги..." />
  </B24FormField>
</template>
