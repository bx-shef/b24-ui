---
title: ChatMessage
description: 'Сообщение чата с иконкой, аватаром и кнопками действий.'
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatMessage.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-message/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-message
---

## Использование {#usage}

Компонент ChatMessage отрисовывает элемент `<article>` для сообщения чата от пользователя (`user`) или ассистента (`assistant`).

::code-preview

::b24-chat-message
---
parts:
  - type: 'text'
    id: '1'
    text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
side: 'right'
variant: 'message'
role: 'user'
id: '1'
avatar:
  src: 'https://github.com/bitrix24.png'
  loading: lazy
---
::

::

::tip{to="/docs/components/chat-messages/"}
Список сообщений чата показывает компонент `ChatMessages`.
::

### Части {#parts}

Пропс `parts` показывает содержимое сообщения в формате AI SDK.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
props:
  parts:
    - type: 'text'
      id: '1'
      text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

::note
Пропс `parts` — рекомендуемый формат AI SDK. У каждой части есть `type` (например, 'text') и соответствующее содержимое.
::

### Сторона {#side}

Пропс `side` показывает сообщение слева или справа.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
props:
  side: 'right'
  parts:
    - type: 'text'
      id: '1'
      text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

::note
В компоненте [`ChatMessages`](/docs/components/chat-messages/) пропс `side` равен `left` у сообщений ассистента (`assistant`) и `right` у сообщений пользователя (`user`).
::

### Вариант {#variant}

Пропс `variant` меняет стиль сообщения.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
props:
  variant: 'message'
  parts:
    - type: 'text'
      id: '1'
      text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

::note
В компоненте [`ChatMessages`](/docs/components/chat-messages/) пропс `variant` равен `message` и у сообщений ассистента (`assistant`), и у сообщений пользователя (`user`).
::

### Цвет {#color}

Пропс `color` меняет цвет сообщения.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
  - avatar.src
  - avatar.loading
props:
  variant: 'message'
  color: 'air-primary-success'
  avatar:
    src: 'https://github.com/bitrix24.png'
    loading: lazy
  parts:
    - type: 'text'
      id: '1'
      text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) рядом с сообщением.

::component-code
---
prettier: true
ignore:
  - parts
  - side
  - variant
  - role
  - id
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  variant: 'message'
  side: 'right'
  parts:
    - type: 'text'
      id: '1'
      text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/) рядом с сообщением.

::component-code
---
prettier: true
ignore:
  - parts
  - side
  - variant
  - role
  - id
  - avatar.src
  - avatar.loading
props:
  avatar:
    src: 'https://github.com/bitrix24.png'
    loading: lazy
  variant: 'message'
  side: 'right'
  parts:
    - type: 'text'
      id: '1'
      text: 'Привет! Расскажи подробнее о создании чат-ботов с ИИ на Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

Пропс `avatar.icon` показывает иконку вместо аватара.

::component-example
---
name: "chat-message-avatar-icon-example"
class: 'overflow-y-auto'
collapse: true
---
::

### Действия {#actions}

Пропс `actions` показывает под сообщением действия, которые появляются при наведении на сообщение.

::component-code
---
prettier: true
external:
  - actions
externalTypes:
  - ButtonProps[]
ignore:
  - parts
  - actions
  - role
  - id
props:
  actions:
    - label: 'Копировать в буфер обмена'
  parts:
    - type: 'text'
      id: '1'
      text: 'Bitrix24 UI предлагает несколько возможностей для создания чат-ботов с ИИ, в том числе компоненты ChatMessage, ChatMessages и ChatPrompt. Рекомендуется использовать класс Chat из AI SDK, оформлять сообщения вариантами и применять встроенные действия для работы с сообщениями. Компоненты полностью настраиваются: есть поддержка тем и адаптивная вёрстка.'
  role: 'user'
  id: '1'
---
::

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
