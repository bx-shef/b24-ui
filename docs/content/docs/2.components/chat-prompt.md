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

### Файлы {#files}

Директива `v-model:files` позволяет пользователю прикреплять файлы. Их можно вставить в поле или перетащить на промпт, и каждый файл показывается над полем как [ChatAttachment](/docs/components/chat-attachment/) с кнопкой удаления. Слот `#footer` получает функцию `open`, чтобы выбрать файлы кнопкой.

::component-example
---
collapse: true
name: 'chat-prompt-files-example'
---
::

::tip
Пропс `attachment` настраивает вложения, например `{ variant: 'thumbnail', size: 'xl' }`{lang="ts-type"} для превью картинок; слот `#files` позволяет отрисовать их самостоятельно.
::

::note
Пропс `accept` ограничивает типы файлов, а `multiple` со значением `false` оставляет один файл. Форма отправляется с файлами, даже если поле пустое. Пока файл тянут над промптом, у корня стоит `data-dragging="true"`, его можно оформить через `data-[dragging=true]:`.
::

::tip
Утилита `toFileUIParts` из `@bitrix24/b24ui-nuxt/utils/ai` превращает файлы в data URL для AI SDK, а слот `#files` компонента [ChatMessages](/docs/components/chat-messages/) выводит их в беседе.

```vue
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { toFileUIParts } from '@bitrix24/b24ui-nuxt/utils/ai'

const input = ref('')
const files = ref<File[]>([])

const { messages, status, sendMessage } = useChat()

async function onSubmit() {
  const text = input.value
  const submitted = files.value

  input.value = ''
  files.value = []

  const parts = await toFileUIParts(submitted)
  sendMessage(text.trim() ? { text, files: parts } : { files: parts })
}
</script>

<template>
  <B24ChatMessages :messages="messages" :status="status">
    <template #files="{ parts }">
      <B24ChatAttachment
        v-for="(part, index) in parts"
        :key="index"
        :name="part.filename"
        :type="part.mediaType"
        :url="part.url"
      />
    </template>
  </B24ChatMessages>

  <B24ChatPrompt v-model="input" v-model:files="files" @submit="onSubmit">
    <B24ChatPromptSubmit :status="status" />
  </B24ChatPrompt>
</template>
```
::

### Очередь {#queue} :badge{label="Soon" class="align-text-top"}

Директива `v-model:queue` ставит в очередь сообщения, отправленные, пока чат в статусе `submitted` или `streaming`, вместо того чтобы игнорировать их. Очередь показывается панелью над промптом: пользователь может отправить сообщение сразу, вернуть его в поле для правки или удалить. Событие `send` срабатывает, когда сообщение выбрано для немедленной отправки, после того как оно переместилось в начало очереди. Пока в поле есть сообщение для очереди, [ChatPromptSubmit](/docs/components/chat-prompt-submit) внутри него ставит сообщение в очередь, а не останавливает ответ.

::component-example
---
collapse: true
name: 'chat-prompt-queue-example'
---
::

::tip{to="#with-queued-messages"}
Отправка сообщений из очереди остаётся за вами, рецепт с AI SDK — в примере **С очередью сообщений**.
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

### С очередью сообщений {#with-queued-messages} :badge{label="Soon" class="align-text-top"}

AI SDK не ставит сообщения в очередь: вызов `sendMessage` во время ответа запускает второй запрос рядом с текущим. С пропсом `status` `B24ChatPrompt` игнорирует отправку, пока чат в статусе `submitted` или `streaming`. Чтобы сохранить такие сообщения, привяжите `v-model:queue`: промпт покажет очередь панелью над собой, где пользователь может отправить сообщение сразу, изменить или удалить его, а следующее вы отправляете, когда чат снова станет `ready`.

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ChatPromptQueueItem } from '@bitrix24/b24ui-nuxt'
import { useChat } from '@ai-sdk/vue'

const input = ref('')
const queue = ref<ChatPromptQueueItem[]>([])

const { status, error, sendMessage, regenerate, stop } = useChat()

function onSubmit() {
  sendMessage({ text: input.value })
  input.value = ''
}

function sendNext() {
  const item = queue.value.shift()
  if (item) {
    sendMessage({ text: item.text })
  }
}

watch(status, (value) => {
  if (value === 'ready') {
    sendNext()
  }
})

// Сообщение, выбранное для немедленной отправки, стоит в начале очереди
function onSend() {
  if (status.value === 'submitted' || status.value === 'streaming') {
    stop()
  } else {
    sendNext()
  }
}
</script>

<template>
  <B24ChatPrompt
    v-model="input"
    v-model:queue="queue"
    :status="status"
    :error="error"
    @submit="onSubmit"
    @send="onSend"
  >
    <B24ChatPromptSubmit :status="status" @stop="stop()" @reload="regenerate()" />
  </B24ChatPrompt>
</template>
```

После `error` промпт отключается, а очередь ждёт, пока пользователь не перезапустит неудавшийся ответ. Остановка ответа сразу отправляет следующее сообщение из очереди.

::note
При подтверждении инструментов ответ, который ждёт решения пользователя, тоже имеет статус `ready`. Пропускайте `sendNext`, пока у последнего сообщения есть часть в состоянии `approval-requested`: новое сообщение оставит подтверждение без ответа.
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
| `open()`{lang="ts-type"} | `void`{lang="ts-type"} |

## Тема {#theme}

:component-theme
