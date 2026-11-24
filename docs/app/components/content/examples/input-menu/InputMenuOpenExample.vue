<script setup lang="ts">
const open = ref(false)
const items = ref(['Настройки CRM', 'Реквизиты моей компании', 'Права доступа'])
const value = ref('Реквизиты моей компании')

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24InputMenu v-model="value" v-model:open="open" :items="items" />
</template>
