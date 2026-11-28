<script setup lang="ts">
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

import { useClipboard } from '@vueuse/core'

const value = ref('npx nuxt module add @bxshefby/b24ui-nuxt')

const { copy, copied } = useClipboard()
</script>

<template>
  <B24Input
    v-model="value"
    :b24ui="{ trailing: 'pe-0.5' }"
  >
    <template v-if="value?.length" #trailing>
      <B24Tooltip text="Копировать в буфер обмена" :content="{ side: 'right' }">
        <B24Button
          :b24ui="{
            leadingIcon: [copied ? 'text-(--ui-color-accent-main-success)' : 'text-(--ui-btn-color)']
          }"
          size="sm"
          color="air-tertiary-no-accent"
          :icon="copied ? CircleCheckIcon : CopyIcon"
          aria-label="Копировать в буфер обмена"
          @click="copy(value)"
        />
      </B24Tooltip>
    </template>
  </B24Input>
</template>
