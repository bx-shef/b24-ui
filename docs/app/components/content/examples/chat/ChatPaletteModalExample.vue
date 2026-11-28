<script setup lang="ts">
import type { ChatMessageProps } from '@bxshefby/b24ui-nuxt'
import { isPartStreaming } from '@bxshefby/b24ui-nuxt/utils/ai'
import { Markdown } from '@comark/vue'
import shiki from '@comark/vue/plugins/shiki'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const messages = ref<ChatMessageProps[]>([{
  id: '1',
  role: 'user',
  parts: [{ type: 'text', text: 'Что такое Bitrix24 UI?' }]
}, {
  id: '2',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Bitrix24 UI — библиотека Vue-компонентов на основе Reka UI, Tailwind CSS и Tailwind Variants. В ней 130+ доступных компонентов для создания современных веб-приложений.' }]
}])
const input = ref('')

// Статичная демонстрация: ничего никуда не отправляется. Замените это вызовом своего эндпоинта.
function reply(text: string) {
  messages.value.push(
    { id: `${Date.now()}-user`, role: 'user', parts: [{ type: 'text', text }] },
    { id: `${Date.now()}-assistant`, role: 'assistant', parts: [{ type: 'text', text: 'Это статичная демонстрация, поэтому ничего не покидает страницу. Чтобы получать настоящие ответы, подключите поле ввода к своему эндпоинту — как это сделать, показано на странице Chat.' }] }
  )
}

function onSubmit() {
  if (!input.value.trim()) return

  reply(input.value)

  input.value = ''
}

const b24ui = {
  prose: {
    p: { base: 'my-2 leading-6' },
    li: { base: 'my-0.5 leading-6' },
    ul: { base: 'my-2' },
    ol: { base: 'my-2' },
    h1: { base: 'text-xl my-2' },
    h2: { base: 'text-lg my-2' },
    h3: { base: 'text-base my-2' },
    h4: { base: 'text-sm my-2' },
    pre: { root: 'my-2' },
    table: { root: 'my-2' },
    hr: { base: 'my-2' }
  }
}
</script>

<template>
  <B24Modal open :b24ui="{ content: 'p-0 pt-0 sm:max-w-[786px] sm:h-[448px]' }">
    <template #content>
      <B24Theme :b24ui="b24ui">
        <B24ChatPalette>
          <B24ChatMessages
            :messages="messages"
            status="ready"
            :user="{ side: 'left', variant: 'message', avatar: { src: '/b24ui/avatar/employee.png', loading: 'lazy' as const }, b24ui: { text: 'leading-6' } }"
            :assistant="{ icon: RobotIcon }"
          >
            <template #part="{ part, message, streaming }">
              <Markdown
                v-if="part.type === 'text' && message.role === 'assistant'"
                :value="part.text"
                :streaming="isPartStreaming(part, streaming)"
                :plugins="[shiki()]"
                class="*:first:mt-0 *:last:mb-0"
              />
            </template>
          </B24ChatMessages>

          <template #prompt>
            <B24ChatPrompt
              v-model="input"
              :icon="SearchIcon"
              variant="plain"
              @submit="onSubmit"
            >
              <B24ChatPromptSubmit status="ready" />
            </B24ChatPrompt>
          </template>
        </B24ChatPalette>
      </B24Theme>
    </template>
  </B24Modal>
</template>
