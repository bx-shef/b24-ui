<script setup lang="ts">
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
</script>

<template>
  <B24ChatMessage
    id="1"
    :avatar="{
      icon: RobotIcon
    }"
    :parts="[
      {
        type: 'text',
        text: 'Bitrix24 UI предлагает несколько возможностей для создания AI-чат-ботов, включая компоненты ChatMessage, ChatMessages и ChatPrompt. Рекомендуется использовать класс Chat из AI SDK, оформлять сообщения с помощью вариантов и применять встроенные действия для работы с сообщениями. Компоненты полностью настраиваются: они поддерживают темы и адаптивный дизайн.'
      }
    ]"
    role="assistant"
  />
</template>
