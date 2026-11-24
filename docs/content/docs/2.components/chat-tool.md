---
title: ChatTool
description: 'Раскрывающийся раздел: показывает, вызван ли инструмент AI и в каком он состоянии.'
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatTool.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-tool
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-tool
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
---

## Использование {#usage}

Компонент ChatTool отрисовывает сворачиваемый блок со статусом вызова инструмента AI, например «Searching components» или «Reading documentation». Если задан слот по умолчанию, блок сворачивается и раскрывает вывод инструмента.

::component-example
---
collapse: true
prettier: true
name: 'chat-tool-example'
---
::

::tip
Если результат приходит позже, ставьте `v-if` на сам слот, а не на его содержимое: слот, который ничего не рисует, всё равно делает блок раскрываемым — с пустой панелью.

```vue
<template>
  <B24ChatTool :text="getToolName(part)" :streaming="isToolStreaming(part)">
    <template v-if="part.state === 'output-available'" #default>
      <pre>{{ part.output }}</pre>
    </template>
  </B24ChatTool>
</template>
```
::

### Текст {#text}

Пропс `text` задаёт текст статуса инструмента.

::component-code
---
hide:
  - class
props:
  text: 'Поиск компонентов выполнен'
  class: 'w-60'
---
::

### Суффикс {#suffix}

Пропс `suffix` показывает дополнительный текст после основной подписи.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  text: 'Чтение компонента'
  suffix: 'Button'
  class: 'w-60'
---
::

### Поток {#streaming}

Пропс `streaming` показывает, что инструмент сейчас работает. Текст мерцает.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'Ищем компоненты...'
  class: 'w-60'
---
::

::tip
Утилита `isToolStreaming` из `@bitrix24/b24ui-nuxt/utils/ai` определяет, выполняется ли ещё часть с вызовом инструмента. Передайте ей слот-пропс `streaming` компонента [ChatMessages](/docs/components/chat-messages/#slots), чтобы она остановилась вместе с чатом.
::

### Мерцание {#shimmer}

Во время потока подпись триггера использует компонент [`ChatShimmer`](/docs/components/chat-shimmer/). Пропс `shimmer` настраивает его `duration` и `spread`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'Ищем компоненты...'
  shimmer:
    duration: 2
    spread: 2
  class: 'w-60'
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) рядом с триггером.

::component-code
---
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  text: 'Поиск компонентов выполнен'
  class: 'w-60'
---
::

### Загрузка {#loading}

Пропс `loading` показывает индикатор загрузки, а пропс `loading-icon` задаёт его иконку.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  loading: true
  text: 'Ищем компоненты...'
  class: 'w-60'
---
::

### Иконка загрузки {#loading-icon}

Пропсы `use-clock` и `use-wait` показывают разные иконки загрузки.

Пропс `loading-icon` задаёт иконку загрузки.

::component-code
---
hide:
  - class
  - loadingIcon
ignore:
  - text
  - loadingIcon
cast:
  loadingIcon: 'RocketIcon'
props:
  loading: true
  loadingIcon: 'RocketIcon'
  text: 'Ищем компоненты...'
  class: 'w-60'
---
::

::component-code
---
hide:
  - class
ignore:
  - text
props:
  loading: true
  useWait: true
  useClock: false
  text: 'Ищем компоненты...'
  class: 'w-60'
---
::

### Ошибка {#error}

Пропс `error` показывает, что вызов инструмента завершился ошибкой, например когда состояние части — `output-error`.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  error: true
  text: 'Не удалось найти компоненты'
  class: 'w-60'
---
::

### Иконка ошибки {#error-icon}

Пропс `error-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) ошибки.

::component-code
---
hide:
  - class
  - errorIcon
ignore:
  - text
  - errorIcon
cast:
  errorIcon: 'RocketIcon'
props:
  error: true
  errorIcon: 'RocketIcon'
  text: 'Не удалось найти компоненты'
  class: 'w-60'
---
::

### Шеврон {#chevron}

Пропс `chevron` меняет положение иконки-шеврона.

::note
Если у `chevron` значение `leading` и задан `icon`, иконка заменяется шевроном при наведении и в раскрытом состоянии.
::

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  chevron: leading
  icon: 'RocketIcon'
  text: 'Поиск компонентов выполнен'
  class: 'w-60'
slots:
  default: |

    Вывод инструмента
---
::

### Иконка шеврона {#chevron-icon}

Пропс `chevron-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) шеврона.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - chevronIcon
cast:
  chevronIcon: 'RocketIcon'
props:
  chevronIcon: 'RocketIcon'
  text: 'Поиск компонентов выполнен'
  class: 'w-60'
slots:
  default: |

    Вывод инструмента
---
::

### Вариант {#variant}

Пропс `variant` меняет внешний вид. По умолчанию — `inline`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  variant: card
  text: 'Поиск компонентов выполнен'
  icon: 'RocketIcon'
  chevron: trailing
  class: 'w-60'
slots:
  default: |

    Вывод инструмента
---
::

### Действия {#actions}

Пропс `actions` показывает под триггером список [кнопок](/docs/components/button/). Это удобно для инструментов, которым перед запуском нужно подтверждение пользователя.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
  - variant
  - actions
cast:
  icon: 'RocketIcon'
props:
  actions:
    - label: 'Разрешить'
    - label: 'Отклонить'
      color: air-secondary
  text: 'Выполнить команду в терминале'
  variant: card
  icon: 'RocketIcon'
  class: 'w-60'
slots:
  default: |

    $ pnpm run lint
---
::

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

### С веб-поиском {#with-web-search}

Некоторые провайдеры предлагают встроенные инструменты веб-поиска: [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#web-search-tool), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google#google-search), [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#web-search-tool). Их вызовы приходят на клиент как части-инструменты, поэтому отрисовываются компонентом ChatTool, как любой другой инструмент.

Каждый инструмент берётся из пакета своего провайдера, поэтому установите нужный: `@ai-sdk/anthropic`, `@ai-sdk/google` или `@ai-sdk/openai`.

::code-group

```ts [Anthropic]
import { defineEventHandler, readBody } from 'nuxt/server'
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
import { defineEventHandler, readBody } from 'nuxt/server'
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
import { defineEventHandler, readBody } from 'nuxt/server'
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { openai } from '@ai-sdk/openai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: 'openai/gpt-5.6-luna',
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

### С инструментами MCP {#with-mcp-tools}

Пакет `@ai-sdk/mcp` даёт чат-боту инструменты сервера [Model Context Protocol (MCP)](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools): например, поиск по документации или собственные задачи перед ответом.

Установите пакет MCP:

::code-group{sync="pm"}

```bash [pnpm]
pnpm add @ai-sdk/mcp
```

```bash [yarn]
yarn add @ai-sdk/mcp
```

```bash [npm]
npm install @ai-sdk/mcp
```

```bash [bun]
bun add @ai-sdk/mcp
```

::

Затем передайте инструменты MCP в `streamText` в серверном обработчике:

```ts [server/api/chat.post.ts]
import { defineEventHandler, readBody } from 'nuxt/server'
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
      tools
    })

    const stream = toUIMessageStream({
      stream: result.stream,
      // Вызывается, когда поток закончился: завершился, упал или был остановлен
      onEnd: async () => {
        await httpClient.close()
      }
    })
    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    // Закрываем клиент MCP, если подготовка упала до начала потока
    await httpClient.close()
    throw error
  }
})
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
