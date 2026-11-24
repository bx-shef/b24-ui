---
title: Countdown
description: 'Обратный отсчёт с настраиваемыми параметрами.'
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Countdown.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/countdown
---

## Использование {#usage}

Пропс `seconds` задаёт число секунд для Countdown.

::component-code
---
prettier: true
props:
  seconds: 120
---
::

### Показ минут {#show-minutes}

Свойство `show-minutes` показывает или скрывает минуты в Countdown. По умолчанию `true`.

::component-code
---
prettier: true
props:
  showMinutes: false
  seconds: 120
---
::

### Размер {#size}

Пропс `size` меняет размер Countdown.

::component-code
---
prettier: true
props:
  size: xl
  seconds: 120
---
::

### Круг {#use-circle}

Свойство `useCircle` рисует вокруг Countdown круг (`circle`).

::component-code
---
prettier: true
props:
  useCircle: true
  seconds: 120
  size: xl
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  seconds: 120
  size: xl
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - avatar.src
  - avatar.loading
cast:
  icon: 'RocketIcon'
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  seconds: 120
  size: xl
---
::

## Примеры {#examples}

### Отображаемая информация {#information-displayed}

Слот по умолчанию позволяет управлять отображаемой информацией.

::component-example
---
name: 'countdown-information-displayed-example'
collapse: true
---
::

### С интервалом {#with-interval}

Интервал отсчёта задаёт пропс `interval`.

::component-example
---
name: 'countdown-interval-example'
collapse: true
---
::

### Обработка событий отсчёта {#handling-countdown-emits}

События `start`, `end`, `abort` и `progress` позволяют реагировать на изменения отсчёта.

::component-example
---
name: 'countdown-emits-example'
collapse: true
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
