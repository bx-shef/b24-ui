---
title: ChatPromptSubmit
description: 'Кнопка отправки запроса в чате: сама учитывает статус.'
category: chat
keywords:
  - отправка запроса
  - кнопка отправки в чате
  - остановка ответа
links:
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatPromptSubmit.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-prompt-submit
---

## Использование {#usage}

Компонент ChatPromptSubmit используется внутри [ChatPrompt](/docs/components/chat-prompt/) для отправки запроса. Он сам обрабатывает разные значения `status` и управляет чатом.

Он расширяет компонент [Button](/docs/components/button/), поэтому ему можно передать любое свойство: `color`, `size` и другие.

::code-preview

#default
:b24-chat-prompt-submit

#code

```vue
<template>
  <B24ChatPrompt>
    <B24ChatPromptSubmit />
  </B24ChatPrompt>
</template>
```

::

::note
Его можно разместить и в слоте `footer` компонента [`ChatPrompt`](/docs/components/chat-prompt/).
::

### Готов {#ready}

При статусе `ready`{lang="ts-type"} пропсы `color` и `icon` настраивают кнопку. По умолчанию:

- `color="primary"`{lang="ts-type"}
- `icon="ArrowTopLIcon"`{lang="ts-type"}

::component-code
---
prettier: true
items:
  color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  color: 'air-primary'
---
::

### Отправлено {#submitted}

При статусе `submitted`{lang="ts-type"} пропсы `submitted-color` и `submitted-icon` настраивают кнопку. По умолчанию:

- `submittedColor="air-secondary-no-accent"`{lang="ts-type"}
- `submittedIcon="StopLIcon"`{lang="ts-type"}

::note
По нажатию на кнопку возникает событие `stop`.
::

::component-code
---
prettier: true
ignore:
  - status
items:
  submittedColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  submittedColor: 'air-secondary-no-accent'
  status: 'submitted'
---
::

### Поток ответа {#streaming}

При статусе `streaming`{lang="ts-type"} пропсы `streaming-color` и `streaming-icon` настраивают кнопку. По умолчанию:

- `streamingColor="air-secondary-accent-2"`{lang="ts-type"}
- `streamingIcon="StopLIcon"`{lang="ts-type"}

::note
По нажатию на кнопку возникает событие `stop`.
::

::component-code
---
prettier: true
ignore:
  - status
items:
  streamingColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  streamingColor: 'air-secondary-accent-2'
  status: 'streaming'
---
::

### Ошибка {#error}

При статусе `error`{lang="ts-type"} пропсы `error-color` и `error-icon` настраивают кнопку. По умолчанию:

- `errorColor="air-primary-alert"`{lang="ts-type"}
- `errorIcon="RefreshIcon"`{lang="ts-type"}

::note
По нажатию на кнопку возникает событие `reload`.
::

::component-code
---
prettier: true
ignore:
  - status
items:
  errorColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  errorColor: 'air-primary-alert'
  status: 'error'
---
::

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
