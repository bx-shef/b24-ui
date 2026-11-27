---
title: ChatReasoning
description: 'Раскрывающаяся панель с промежуточными шагами рассуждений AI.'
category: chat
keywords:
  - рассуждения AI
  - шаги размышления
  - раскрывающиеся рассуждения
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatReasoning.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-reasoning
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-reasoning
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
---

## Использование {#usage}

Компонент ChatReasoning отрисовывает сворачиваемый блок с рассуждениями AI. Он сам раскрывается во время потока ответа и сворачивается после него.

::component-example
---
collapse: true
prettier: true
name: 'chat-reasoning-example'
class: 'h-[252px]'
---
::

::note{to="/docs/composables/use-scroll-shadow/"}
Тело блока использует композабл `useScrollShadow`: при переполнении по краям появляются затухающие тени.
::

### Текст {#text}

Пропс `text` задаёт текст рассуждений. Он показывается внутри сворачиваемого блока.

::component-code
---
prettier: true
hide:
  - class
props:
  text: 'Пользователь спрашивает про компоненты Vue...'
  class: 'w-60'
---
::

### Поток :badge{label="2.15+" class="align-text-top"} {#streaming}

Пропс `streaming` показывает, что рассуждение идёт. Компонент раскрывается при начале потока и сворачивается при его окончании.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'Пользователь спрашивает про компоненты Vue...'
  class: 'w-60'
---
::

::tip
Пропс `auto-open` со значением `false` оставляет компонент свёрнутым при начале потока, а `auto-close-delay` со значением `0` оставляет его раскрытым после окончания. Если пользователь переключил блок во время потока, блок остаётся в выбранном им состоянии.
::

::tip
Утилита `isPartStreaming` из `@bxshefby/b24ui-nuxt/utils/ai` определяет, идёт ли сейчас поток для части с рассуждениями. Передайте ей слот-пропс `streaming` компонента [ChatMessages](/docs/components/chat-messages/#slots), чтобы она остановилась вместе с чатом.
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
  text: 'Пользователь спрашивает про компоненты Vue...'
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
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  text: 'Пользователь спрашивает про компоненты Vue...'
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
  text: 'Пользователь спрашивает про компоненты Vue...'
  class: 'w-60'
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
  text: 'Пользователь спрашивает про компоненты Vue...'
  class: 'w-60'
---
::

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

### С моделями с рассуждением {#with-reasoning-models}

Чтобы получать [рассуждения](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#reasoning) потоком, задайте `providerOptions` для своего провайдера ([Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#reasoning), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google#thinking), [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#reasoning)):

```ts [server/api/chat.post.ts]
import { defineEventHandler, readBody } from 'nuxt/server'
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

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
