<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <B24Modal v-model:open="first" title="Первое модальное окно" :b24ui="{ footer: 'justify-end' }">
    <B24Button label="Открыть" />

    <template #footer>
      <B24Button label="Закрыть" @click="first = false" />

      <B24Modal v-model:open="second" title="Второе модальное окно" :b24ui="{ footer: 'justify-end' }">
        <B24Button label="Открыть второе" color="air-primary" />

        <template #footer>
          <B24Button label="Закрыть" @click="second = false" />
        </template>
      </B24Modal>
    </template>
  </B24Modal>
</template>
