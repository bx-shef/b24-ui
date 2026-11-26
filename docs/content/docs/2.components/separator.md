---
title: Separator
description: 'Разделяет содержимое по горизонтали или вертикали.'
category: element
keywords:
  - divider
  - hr
  - horizontal rule
  - разделитель
  - горизонтальная линия
  - разделительная черта
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Separator.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/separator
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/separator
  - label: Separator
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/separator
---

## Использование {#usage}

Separator без настроек просто разделяет содержимое.

::component-code
---
hideBgGrid: true
class: 'p-8'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Separator. По умолчанию `horizontal`.

::component-code
---
prettier: true
hideBgGrid: true
ignore:
  - class
class: 'p-8'
props:
  orientation: vertical
  class: 'h-48'
---
::

### Подпись {#label}

Пропс `label` показывает подпись посередине Separator.

::component-code
---
prettier: true
hideBgGrid: true
class: 'p-8'
props:
  label: 'Bitrix24 UI'
---
::

### Положение {#position}

Пропс `position` меняет положение содержимого Separator. По умолчанию `center`.

::component-code
---
ignore:
  - class
class: 'p-8'
props:
  position: start
  label: 'Привет, мир'
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) посередине Separator.

::component-code
---
prettier: true
hideBgGrid: true
class: 'p-8'
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) посередине Separator.

::component-code
---
prettier: true
hideBgGrid: true
class: 'p-8'
ignore:
  - avatar.src
  - avatar.loading
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
---
::

### Акцент {#accent}

Пропс `accent` меняет вариант Separator. По умолчанию `default`.

::component-code
---
prettier: true
class: 'p-8'
hideBgGrid: true
props:
  accent: accent
  type: solid
---
::

### Тип {#type}

Пропс `type` меняет тип Separator. По умолчанию `solid`.

::component-code
---
prettier: true
class: 'p-8'
hideBgGrid: true
props:
  type: dashed
  accent: accent
  size: thick
---
::

### Размер {#size}

Пропс `size` меняет размер Separator. По умолчанию `thin`.

::component-code
---
prettier: true
class: 'p-8'
hideBgGrid: true
props:
  size: thick
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
