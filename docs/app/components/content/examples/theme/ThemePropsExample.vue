<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
</script>

<template>
  <B24Theme
    :props="{
      button: { color: 'air-boost', size: 'lg' },
      tooltip: { delayDuration: 0, arrow: true }
    }"
  >
    <div class="flex items-center gap-2">
      <B24Tooltip text="Наследует delayDuration из темы">
        <B24Button label="Наведите на меня" />
      </B24Tooltip>
      <B24Button label="С иконкой" :icon="RocketIcon" />
      <B24Button :icon="AiStarsIcon" square />
    </div>
  </B24Theme>
</template>
