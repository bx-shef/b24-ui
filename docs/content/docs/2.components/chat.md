---
title: Chat
description: 'Разработка чат-интерфейсов на основе AI: потоковые ответы, рассуждения и вызов инструментов.'
category: chat
index: true
links:
  - label: AI SDK
    avatar:
      src: https://github.com/vercel.png
    to: https://ai-sdk.dev/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat
---

Bitrix24 UI даёт набор компонентов для чат-интерфейсов на основе AI. Они работают с [Vercel AI SDK](https://ai-sdk.dev/): потоковые ответы, рассуждения, вызов инструментов и не только.

## Компоненты {#components}

| Компонент | Описание |
| --- | --- |
| [ChatAttachment](/docs/components/chat-attachment/) | Файл, прикреплённый к запросу или сообщению, с состояниями загрузки. |
| [ChatMessages](/docs/components/chat-messages/) | Прокручиваемый список сообщений с автопрокруткой и индикатором загрузки. |
| [ChatMessage](/docs/components/chat-message/) | Отдельное сообщение с аватаром, действиями и слотами. |
| [ChatPrompt](/docs/components/chat-prompt/) | Улучшенное многострочное поле для отправки запросов. |
| [ChatPromptSubmit](/docs/components/chat-prompt-submit/) | Кнопка отправки, которая сама учитывает статус. |
| [ChatReasoning](/docs/components/chat-reasoning/) | Сворачиваемый блок с рассуждениями AI. |
| [ChatTool](/docs/components/chat-tool/) | Сворачиваемый блок со статусом вызова инструмента AI. |
| [ChatShimmer](/docs/components/chat-shimmer/) | Мерцание текста для состояний потока. |
| [ChatPalette](/docs/components/chat-palette/) | Обёртка-раскладка для чата в модальных окнах и шторках. |

## Установка {#installation}

Компоненты Chat рассчитаны на работу с [Vercel AI SDK](https://ai-sdk.dev/), точнее — с композаблом [`useChat`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat), который управляет состоянием чата и потоковыми ответами. Примеры на этой странице написаны для AI SDK v7.

Установите нужные зависимости:

::code-group{sync="pm"}

```bash [pnpm]
pnpm add ai @ai-sdk/vue
```

```bash [yarn]
yarn add ai @ai-sdk/vue
```

```bash [npm]
npm install ai @ai-sdk/vue
```

```bash [bun]
bun add ai @ai-sdk/vue
```

::

## Настройка сервера {#server-setup}

Создайте серверный API-эндпоинт, который обрабатывает запросы чата через [`streamText`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text). Доступ к моделям AI через единую точку входа даёт [Vercel AI Gateway](https://vercel.com/ai-gateway):

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages)
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

### Рассуждения {#reasoning}

Чтобы включить [рассуждения](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#reasoning), настройте `providerOptions` для своего провайдера ([Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#reasoning), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai#thinking), [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#reasoning)):

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    providerOptions: {
      anthropic: {
        thinking: {
          type: 'adaptive'
        },
        effort: 'low'
      },
      google: {
        thinkingConfig: {
          includeThoughts: true,
          thinkingLevel: 'low'
        }
      },
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

### Поиск в интернете {#web-search}

У некоторых провайдеров есть встроенные инструменты поиска в интернете: [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#web-search-tool), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google#google-search), [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#web-search-tool).

::code-group

```ts [Anthropic]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      web_search: anthropic.tools.webSearch_20260209({})
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

```ts [Google]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { google } from '@ai-sdk/google'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: 'google/gemini-3-flash',
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      google_search: google.tools.googleSearch({})
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

```ts [OpenAI]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { openai } from '@ai-sdk/openai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: 'openai/gpt-5-nano',
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      web_search: openai.tools.webSearch({})
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

::

### Вызов инструментов через MCP {#tool-calling-with-mcp}

Расширьте возможности чат-бота вызовом инструментов через [Model Context Protocol (MCP)](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools) из `@ai-sdk/mcp`. MCP позволяет AI выполнять динамические действия, например искать по документации или запускать собственные задачи, чтобы отвечать точнее и по делу.

Для начала установите пакет MCP:

:::code-group

```bash [npm]
npm install @ai-sdk/mcp
```

```bash [pnpm]
pnpm add @ai-sdk/mcp
```

```bash [yarn]
yarn add @ai-sdk/mcp
```

:::

Затем настройте серверный эндпоинт на использование инструментов MCP:

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, isStepCount, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createMCPClient } from '@ai-sdk/mcp'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const httpClient = await createMCPClient({
    transport: { type: 'http', url: 'https://your-app.com/mcp' }
  })
  try {
    const tools = await httpClient.tools()

    const result = streamText({
      model: 'anthropic/claude-sonnet-5.5',
      maxOutputTokens: 10000,
      instructions: 'You are a helpful assistant. Use your tools to search for relevant information before answering questions.',
      messages: await convertToModelMessages(messages),
      stopWhen: isStepCount(6),
      tools,
      onEnd: async () => {
        await httpClient.close()
      },
      onError: async (error) => {
        console.error(error)
        await httpClient.close()
      }
    })

    const stream = toUIMessageStream({ stream: result.stream })
    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    // Закрываем клиент MCP, если настройка не удалась до начала потока
    await httpClient.close()
    throw error
  }
})
```

::tip

Доступ к модели AI через единую точку входа можно получить и через [провайдер DeepSeek](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek):

Установите нужные зависимости:

::code-group{sync="pm"}

```bash [pnpm]
pnpm add ai @ai-sdk/deepseek @ai-sdk/vue
```

```bash [yarn]
yarn add ai @ai-sdk/deepseek @ai-sdk/vue
```

```bash [npm]
npm install ai @ai-sdk/deepseek @ai-sdk/vue
```

```bash [bun]
bun add ai @ai-sdk/deepseek @ai-sdk/vue
```

::

Создайте серверный API-эндпоинт:

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const result = streamText({
    model: deepseek('deepseek-reasoner'), // или 'deepseek-chat'
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages)
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

**Рассуждения**

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const result = streamText({
    model: deepseek('deepseek-reasoner'), // или 'deepseek-chat'
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

**Вызов инструментов (MCP)**

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, isStepCount, smoothStream, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createMCPClient } from '@ai-sdk/mcp'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  if (!messages || !Array.isArray(messages)) {
    throw createError({ status: 400, message: 'Invalid or missing messages array.' })
  }

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const httpClient = await createMCPClient({
    transport: { type: 'http', url: 'https://your-app.com/mcp' }
  })
  try {
    const tools = await httpClient.tools()

    const result = streamText({
      model: deepseek('deepseek-reasoner'), // или 'deepseek-chat'
      maxOutputTokens: 10000,
      instructions: 'You are a helpful assistant. Use your tools to search for relevant information before answering questions.',
      messages: await convertToModelMessages(messages),
      experimental_transform: smoothStream(),
      stopWhen: isStepCount(6),
      tools,
      onEnd: async () => {
        await httpClient.close()
      },
      onError: async (error) => {
        console.error(error)
        await httpClient.close()
      }
    })

    const stream = toUIMessageStream({ stream: result.stream })
    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    // Закрываем клиент MCP, если настройка не удалась до начала потока
    await httpClient.close()
    throw error
  }
})
```

::

## Настройка клиента {#client-setup}

Композабл `useChat` из `@ai-sdk/vue` управляет состоянием чата и подключается к вашему серверному эндпоинту:

```vue
<script setup lang="ts">
import { isReasoningUIPart, isTextUIPart, isToolUIPart, getToolName } from 'ai'
import { useChat } from '@ai-sdk/vue'
import { isPartStreaming, isToolStreaming } from '@bitrix24/b24ui-nuxt/utils/ai'

const input = ref('')

const { messages, status, error, sendMessage, regenerate, stop } = useChat({
  onError(error) {
    console.error(error)
  }
})

function onSubmit() {
  sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24ChatMessages
    :messages="messages"
    :status="status"
  >
    <template #part="{ part, index, message, streaming }">
      <B24ChatReasoning
        v-if="isReasoningUIPart(part)"
        :text="part.text"
        :streaming="isPartStreaming(part, streaming)"
      >
        <MDC
          :value="part.text"
          :cache-key="`reasoning-${message.id}-${index}`"
          class="*:first:mt-0 *:last:mb-0"
        />
      </B24ChatReasoning>

      <B24ChatTool
        v-else-if="isToolUIPart(part)"
        :text="getToolName(part)"
        :streaming="isToolStreaming(part, streaming)"
        :error="part.state === 'output-error'"
      />

      <MDC
        v-else-if="isTextUIPart(part) && message.role === 'assistant'"
        :value="part.text"
        :cache-key="`${message.id}-${index}`"
        class="*:first:mt-0 *:last:mb-0"
      />
    </template>
  </B24ChatMessages>

  <B24ChatPrompt
    v-model="input"
    :status="status"
    :error="error"
    @submit="onSubmit"
  >
    <B24ChatPromptSubmit
      :status="status"
      @stop="stop()"
      @reload="regenerate()"
    />
  </B24ChatPrompt>
</template>
```

::note
В этом примере компонент `MDC` из [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc) отрисовывает сообщения как Markdown. Bitrix24 UI поставляет готовые стилизованные prose-компоненты, поэтому содержимое оформляется автоматически.
::

::note
Слот `#part` вызывается для каждой части сообщения с `part`, её `index` и `message`. Часть, которую слот не отрисовал (как текст пользователя выше), выводится по умолчанию. Чтобы отрисовать сообщение целиком самостоятельно, используйте слот `#content`.
::

### Queued messages :badge{label="Soon" class="align-text-top"}

The AI SDK doesn't queue messages: calling `sendMessage` during a response starts a second request next to the current one. With `status`, `B24ChatPrompt` ignores submits while the chat is `submitted` or `streaming`. To let users send their next message anyway, leave it off, keep the text in a queue and send it once the chat is `ready` again:

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useChat } from '@ai-sdk/vue'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const input = ref('')
const queue = ref<string[]>([])

const { status, error, sendMessage, regenerate, stop } = useChat()

function sendNext() {
  const text = queue.value.shift()
  if (text) {
    sendMessage({ text })
  }
}

function onSubmit() {
  queue.value.push(input.value)
  input.value = ''

  if (status.value !== 'submitted' && status.value !== 'streaming') {
    sendNext()
  }
}

watch(status, (value) => {
  if (value === 'ready') {
    sendNext()
  }
})
</script>

<template>
  <B24ChatPrompt v-model="input" :error="error" @submit="onSubmit">
    <template v-if="queue.length" #header>
      <ul class="flex flex-col gap-1 w-full">
        <li v-for="(text, index) in queue" :key="index" class="flex items-center gap-2 text-sm text-(--ui-color-base-1)">
          <span class="truncate flex-1">{{ text }}</span>
          <B24Button
            :icon="CrossMIcon"
            color="air-tertiary-no-accent"
            size="xs"
            :aria-label="`Remove ${text} from queue`"
            @click="queue.splice(index, 1)"
          />
        </li>
      </ul>
    </template>

    <B24ChatPromptSubmit :status="status" @stop="stop()" @reload="regenerate()" />
  </B24ChatPrompt>
</template>
```

After an `error`, the prompt is disabled and the queue waits until the user reloads the failed response. Stopping the response sends the next queued message right away.
