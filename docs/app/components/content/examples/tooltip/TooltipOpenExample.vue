<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Tooltip v-model:open="open" text="Открыть на GitHub">
    <B24Button label="Открыть" />
  </B24Tooltip>
</template>
