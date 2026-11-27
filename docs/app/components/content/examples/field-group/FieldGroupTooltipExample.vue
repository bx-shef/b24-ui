<script setup lang="ts">
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
</script>

<template>
  <B24FieldGroup>
    <B24Input placeholder="Введите токен" />

    <B24Tooltip text="Копировать в буфер обмена">
      <B24Button
        :icon="MoreMIcon"
      />
    </B24Tooltip>
  </B24FieldGroup>
</template>
