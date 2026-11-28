<script setup lang="ts">
import type { UIDataTypes, UIMessage } from 'ai'
import { isReasoningUIPart, isTextUIPart } from 'ai'
import { Markdown } from '@comark/vue'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import EarthIcon from '@bitrix24/b24icons-vue/outline/EarthIcon'

type ChatMessage = UIMessage<unknown, UIDataTypes, {
  runCommand: {
    input: { command: string }
    output: { stdout: string }
  }
}>

const messages: ChatMessage[] = [{
  id: '1',
  role: 'user',
  parts: [{ type: 'text', text: 'Почему pnpm install падает в CI?' }]
}, {
  id: '2',
  role: 'assistant',
  parts: [{
    type: 'reasoning',
    text: 'В ошибке упоминается lock-файл, поэтому нужно сравнить package.json и pnpm-lock.yaml в последнем коммите.',
    state: 'done'
  }, {
    type: 'tool-runCommand',
    toolCallId: 'call-1',
    state: 'output-available',
    input: { command: 'pnpm --version' },
    output: { stdout: '10.18.0' }
  }, {
    type: 'tool-runCommand',
    toolCallId: 'call-2',
    state: 'output-available',
    input: { command: 'git diff --stat HEAD~1 -- package.json pnpm-lock.yaml' },
    output: { stdout: 'package.json | 2 +-\n1 file changed, 1 insertion(+), 1 deletion(-)' }
  }, {
    type: 'tool-runCommand',
    toolCallId: 'call-3',
    state: 'output-error',
    input: { command: 'pnpm install --frozen-lockfile' },
    errorText: 'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json'
  }, {
    type: 'source-url',
    sourceId: 'source-1',
    url: 'https://pnpm.io/cli/install#--frozen-lockfile',
    title: 'pnpm install'
  }, {
    type: 'source-url',
    sourceId: 'source-2',
    url: 'https://pnpm.io/git#lockfiles',
    title: 'Работа с Git'
  }, {
    type: 'text',
    text: 'В последнем коммите версия в `package.json` изменена, а `pnpm-lock.yaml` не обновлён, поэтому установка с замороженным lock-файлом падает. Запустите `pnpm install` локально и закоммитьте lock-файл.',
    state: 'done'
  }]
}]

function getSources(message: ChatMessage) {
  return message.parts.filter(part => part.type === 'source-url')
}
</script>

<template>
  <B24ChatMessages :messages="messages" :should-scroll-to-bottom="false" :auto-scroll="false">
    <template #part="{ part, message }">
      <B24ChatReasoning
        v-if="isReasoningUIPart(part)"
        :text="part.text"
        :duration="5"
        :icon="CircleCheckIcon"
      />

      <B24ChatTool
        v-else-if="part.type === 'tool-runCommand'"
        :text="`${part.state === 'output-error' ? 'Не удалось выполнить' : 'Выполнено'} ${part.input?.command}`"
        :error="part.state === 'output-error'"
        :icon="CircleCheckIcon"
      >
        <ProsePre
          :copy="false"
          :b24ui="{ root: 'my-0', base: 'text-xs/5' }"
        >
          {{ part.state === 'output-error' ? part.errorText : part.output?.stdout }}
        </ProsePre>
      </B24ChatTool>

      <B24ChatTool
        v-else-if="part.type === 'source-url' && getSources(message)[0] === part"
        :text="`Использовано источников: ${getSources(message).length}`"
        :icon="EarthIcon"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="source in getSources(message)" :key="source.sourceId">
            <B24Link :to="source.url" target="_blank" class="text-sm">
              {{ source.title }}
            </B24Link>
          </li>
        </ul>
      </B24ChatTool>

      <Markdown
        v-else-if="isTextUIPart(part) && message.role === 'assistant'"
        :value="part.text"
        class="*:first:mt-0 *:last:mb-0"
      />
    </template>
  </B24ChatMessages>
</template>
