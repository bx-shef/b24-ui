---
title: ChatShimmer
description: 'Добавляет тексту эффект мерцающей загрузки.'
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatShimmer.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-shimmer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-shimmer
---

## Использование {#usage}

Компонент ChatShimmer отрисовывает элемент с анимированным мерцающим градиентом поверх текста. Обычно так показывают поток ответа или загрузку в чатах.

::note
Компоненты [`ChatTool`](/docs/components/chat-tool/) и [`ChatReasoning`](/docs/components/chat-reasoning/) используют его автоматически во время потока.
::

::tip
Если пользователь предпочитает уменьшенную анимацию, анимация отключается, а текст показывается статичным приглушённым цветом.
::

### Текст {#text}

Пропс `text` задаёт мерцающий текст.

::component-code
---
props:
  text: 'Думаю...'
---
::

### Длительность {#duration}

Пропс `duration` задаёт скорость анимации в секундах.

::component-code
---
props:
  text: 'Думаю...'
  duration: 4
---
::

### Ширина блика {#spread}

Пропс `spread` задаёт ширину блика. Фактическая ширина в пикселях считается как `text.length * spread`.

::component-code
---
props:
  text: 'Думаю...'
  spread: 5
---
::

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

## API

### Пропсы {#props}

:component-props

## Тема {#theme}

:component-theme
