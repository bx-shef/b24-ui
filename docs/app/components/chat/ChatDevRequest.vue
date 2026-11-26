<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { DEV_REQUEST_URL, isDevRequestKind } from '~~/shared/devRequest'

/**
 * Карточка «Запрос на разработку» под ответом чата. Текст — только текстом (не разметкой), адрес формы —
 * константа окна, а не поле из ответа сервера. Ничего не отправляет: форму открывает пользователь.
 */
const props = defineProps<{
  summary: string
  kind: string
  /** Карточка появилась в этом ответе (а не восстановлена из сохранённой беседы): только тогда считаем показ. */
  announce?: boolean
}>()

const { track } = useAnalytics()
const { copy, copied } = useClipboard({ copiedDuring: 2000 })

const kind = computed(() => isDevRequestKind(props.kind) ? props.kind : 'question')

onMounted(() => {
  if (props.announce) {
    track('Dev Request Suggested', { kind: kind.value })
  }
})

function openForm() {
  track('Dev Request Form Opened', { kind: kind.value })
}
</script>

<template>
  <B24Card variant="outline" class="my-2" :b24ui="{ body: 'p-3 flex flex-col gap-3' }">
    <p class="text-sm font-medium">
      Запрос на разработку
    </p>
    <p class="text-sm/6 whitespace-pre-wrap break-words" data-dev-request-summary>
      {{ summary }}
    </p>
    <div class="flex flex-wrap gap-2">
      <B24Button
        size="sm"
        color="air-secondary-no-accent"
        :label="copied ? 'Скопировано' : 'Скопировать текст'"
        @click="copy(summary)"
      />
      <B24Button
        size="sm"
        label="Открыть форму"
        :to="DEV_REQUEST_URL"
        target="_blank"
        rel="noopener"
        @click="openForm"
      />
    </div>
  </B24Card>
</template>
