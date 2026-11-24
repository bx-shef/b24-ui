<script setup lang="ts">
import HelpIcon from '@bitrix24/b24icons-vue/main/HelpIcon'
</script>

<template>
  <B24Tooltip
    :delay-duration="100"
    :content="{ side: 'right' }"
    text="Когда исполнитель завершит задачу, она придёт к вам на проверку. Вы можете принять работу (и задача будет закрыта) или вернуть задачу на доработку."
  >
    <HelpIcon class="size-5 cursor-help" />
  </B24Tooltip>
</template>
