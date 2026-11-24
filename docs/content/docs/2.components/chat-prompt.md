---
title: ChatPrompt
description: 'Улучшенный Textarea для отправки запросов в чатах с AI.'
category: chat
links:
  - label: Textarea
    to: /docs/components/textarea/
    iconName: Bitrix24Icon
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatPrompt.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-prompt
---

## Использование {#usage}

Компонент ChatPrompt отрисовывает элемент `<form>` и расширяет компонент [Textarea](/docs/components/textarea/), поэтому ему можно передать любое свойство: `icon`, `placeholder`, `autofocus` и другие.

::code-preview

:::b24-chat-prompt
---
variant: 'outline'
---

#default
::::b24-chat-prompt-submit
---
color: 'air-primary'
class: 'rounded-full'
---
::::

#footer
::::b24-select
---
placeholder: 'Выберите модель'
modelValue: 'deepseek'
size: 'sm'
items:
  - label: 'BitrixGPT 5'
    value: 'bitrix-gpt-5'
  - label: 'Claude Opus 5.5'
    value: 'claude-opus-5.5'
  - label: 'Gemini 3 Pro'
    value: 'gemini-3-pro'
  - label: 'GPT-5'
    value: 'gpt-5'
  - label: 'DeepSeek'
    value: 'deepseek'
---
::::

:::

::

::note
ChatPrompt обрабатывает такие события:

- Форма отправляется по :kbd{value="enter"} или по нажатию на кнопку отправки. Если задать `submit-on-enter` значение `false`, форма отправляется по :kbd{value="ctrl"} + :kbd{value="enter"} (или :kbd{value="cmd"} + :kbd{value="enter"} в macOS), а :kbd{value="enter"} вставляет перенос строки.
- Пока `status` равен `submitted` или `streaming`, форма не отправляется, поэтому :kbd{value="enter"} во время ответа не отправит второе сообщение.
- По :kbd{value="escape"} поле теряет фокус и возникает событие `close`.
::

### Вариант {#variant}

Пропс `variant` меняет стиль поля ввода. По умолчанию — `outline`.

::component-code
---
hide:
  - autofocus
props:
  variant: 'tinted'
  autofocus: false
---
::

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

### Как отправная точка {#as-a-starting-point}

ChatPrompt можно взять за основу интерфейса чата.

```vue [pages/index.vue] {2,4,8-15,24,25}
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'

const input = ref('')

const { messages, status, sendMessage } = useChat()

async function onSubmit() {
  sendMessage({ text: input.value })

  // После первого сообщения переходим на страницу чата
  if (messages.value.length === 1) {
    await navigateTo('/chat')
  }
}
</script>

<template>
  <B24DashboardPanel>
    <template #body>
      <B24Container>
        <h1>How can I help you today?</h1>
  
        <B24ChatPrompt v-model="input" :status="status" @submit="onSubmit">
          <B24ChatPromptSubmit :status="status" />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24DashboardPanel>
</template>
```

### Распознавание речи {#speech-recognition}

Композабл [useSpeechRecognition](/docs/composables/use-speech-recognition/) добавляет распознавание речи на основе [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

::component-example
---
collapse: true
class: '!p-0'
border: false
name: 'chat-prompt-speech-recognition-example'
---
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<textarea>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `textareaRef`{lang="ts-type"} | `Ref<HTMLTextAreaElement \| null>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
