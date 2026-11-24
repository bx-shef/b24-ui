---
title: Badge
description: 'Короткая метка статуса или категории.'
category: element
keywords:
  - tag
  - pill
  - label
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Badge.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/badge
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/badge
---

## Использование {#usage}

Слот по умолчанию задаёт подпись Badge.

::component-code
---
slots:
  default: Бейдж
---
::

### Подпись {#label}

Пропс `label` задаёт подпись Badge.

::component-code
---
prettier: true
props:
  label: Бейдж
---
::

Пропс `use-link` включает подчёркивание.

::component-code
---
prettier: true
props:
  label: Бейдж
  useLink: true
---
::

### Цвет {#color}

Пропс `color` меняет цвет Badge.

::component-code
---
props:
  color: 'air-primary'
slots:
  default: Бейдж
---
::

### Инверсия {#inverted}

Пропс `inverted` инвертирует цвет Badge.

::warning
Доступно только для цветов `air-primary*`.
::

::component-code
---
prettier: true
props:
  inverted: true
  color: 'air-primary'
slots:
  default: Бейдж
---
::

### Размер {#size}

Пропс `size` меняет размер Badge.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: Бейдж
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри Badge.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Бейдж
---
::

Пропс `use-close` показывает иконку закрытия.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  useClose: true
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Бейдж
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/) внутри Badge.

::component-code
---
prettier: true
ignore:
  - avatar.src
  - avatar.loading
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  size: xl
  color: 'air-primary'
slots:
  default: |

    Бейдж
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
