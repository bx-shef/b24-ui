---
title: ChatPalette
description: 'Интерфейс чата для показа в модальном оверлее.'
category: chat
keywords:
  - палитра чата
  - чат в модальном окне
  - AI-чат поверх страницы
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatPalette.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-palette
---

## Использование {#usage}

Компонент ChatPalette — обёртка-раскладка: [ChatMessages](/docs/components/chat-messages/) размещаются в прокручиваемой области, а [ChatPrompt](/docs/components/chat-prompt/) — в закреплённой нижней части. Так получаются цельные интерфейсы чат-ботов для модальных окон и боковых панелей.

```vue{2,8}
<template>
  <B24ChatPalette>
    <B24ChatMessages />

    <template #prompt>
      <B24ChatPrompt />
    </template>
  </B24ChatPalette>
</template>
```

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

### В модальном окне {#within-a-modal}

ChatPalette можно разместить внутри содержимого [Modal](/docs/components/modal/).

::component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'chat-palette-modal-example'
---
::

### В ContentSearch {#within-contentsearch}

ChatPalette можно показывать по условию внутри содержимого [ContentSearch](/docs/components/content-search/): интерфейс чат-бота появляется, когда пользователь выбирает элемент.

::component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'chat-palette-content-search-example'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
