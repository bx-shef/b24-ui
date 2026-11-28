<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Slideover
    v-model:open="open"
    title="Боковая панель с подвалом"
    description="Пригодится, когда в боковой панели нужна форма."
    :b24ui="{ footer: 'justify-between' }"
  >
    <B24Button label="Открыть" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer="{ close }">
      <div class="w-1/5 flex items-center justify-start" />
      <div class="w-full flex flex-row items-center justify-center gap-2.5">
        <B24ModalDialogClose>
          <B24Button size="lg" color="air-primary" label="Сохранить" />
        </B24ModalDialogClose>
        <B24Button size="sm" color="air-tertiary" label="Отмена" :normal-case="false" @click="close" />
      </div>
      <div class="w-1/5 flex items-center justify-end">
        <B24Button label="Полная версия" size="sm" color="air-tertiary-no-accent" />
      </div>
    </template>
  </B24Slideover>
</template>
