<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Slideover v-model:open="first" title="Первая боковая панель">
    <B24Button variant="subtle" label="Открыть" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <B24Slideover v-model:open="second" title="Вторая боковая панель">
        <B24Button size="lg" label="Открыть второе" color="air-primary" />

        <template #body>
          <Placeholder class="h-full" />
        </template>

        <template #footer>
          <B24Button size="sm" color="air-tertiary" label="Отмена" :normal-case="false" @click="second = false" />
        </template>
      </B24Slideover>

      <B24Button size="sm" color="air-tertiary" label="Отмена" :normal-case="false" @click="first = false" />
    </template>
  </B24Slideover>
</template>
