<script setup lang="ts">
const retries = ref(0)
</script>

<template>
  <B24FormField label="Повторы" help="Укажите число попыток" required>
    <B24InputNumber v-model="retries" placeholder="Введите число повторов" />
  </B24FormField>
</template>
