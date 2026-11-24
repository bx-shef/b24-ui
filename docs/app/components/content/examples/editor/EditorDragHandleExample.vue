<script setup lang="ts">
const value = ref(`# Ручка перетаскивания

Наведите курсор на левую сторону блока, чтобы появилась ручка перетаскивания, и меняйте порядок блоков.`)
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-21"
  >
    <B24EditorDragHandle :editor="editor" />
  </B24Editor>
</template>
