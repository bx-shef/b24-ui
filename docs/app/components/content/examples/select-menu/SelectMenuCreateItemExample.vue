<script setup lang="ts">
const items = ref(['Настройки CRM', 'Реквизиты моей компании', 'Права доступа'])
const value = ref('Реквизиты моей компании')

function onCreate(item: string) {
  items.value.push(item)

  value.value = item
}
</script>

<template>
  <B24SelectMenu
    v-model="value"
    create-item
    :items="items"
    class="w-48"
    @create="onCreate"
  />
</template>
