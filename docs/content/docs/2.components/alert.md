---
title: Alert
description: 'Оповещение, которое привлекает внимание пользователя.'
category: element
keywords:
  - notice
  - inline notification
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Alert.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/alert
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/alert
---

## Использование {#usage}

### Заголовок {#title}

Пропс `title` задаёт заголовок Alert.

::component-code
---
prettier: true
props:
  title: Внимание!
---
::

### Описание {#description}

Пропс `description` задаёт описание Alert.

::component-code
---
prettier: true
props:
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - title
  - description
  - avatar.src
  - avatar.size
  - avatar.loading
props:
  avatar.src: '/b24ui/avatar/employee.png'
  avatar.size: 'xs'
  avatar.loading: 'lazy'
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
---
::

### Цвет {#color}

Пропс `color` меняет цвет Alert.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
  - close
cast:
  icon: 'RocketIcon'
props:
  color: 'air-primary'
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
  icon: 'RocketIcon'
  close: true
---
::

### Инверсия {#inverted}

Пропс `inverted` инвертирует цвет Alert.

::warning
Доступно только для цветов `air-primary*`.
::

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
  - close
cast:
  icon: 'RocketIcon'
props:
  inverted: true
  color: 'air-primary'
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
  icon: 'RocketIcon'
  close: true
---
::

### Размер {#size}

Пропс `size` меняет размер Alert.

::component-code
---
prettier: true
ignore:
 - title
 - description
 - icon
cast:
  icon: 'RocketIcon'
props:
  size: 'md'
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
  icon: 'RocketIcon'
---
::

### Закрытие {#close}

Пропс `close` показывает [кнопку](/docs/components/button/), которой закрывают Alert.

::tip
По нажатию на кнопку закрытия возникает событие `update:open`.
::

::component-code
---
prettier: true
ignore:
  - title
  - description
  - close
  - color
props:
  close: true
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
---
::

Для настройки кнопки передайте любое свойство компонента [Button](/docs/components/button/).

::component-code
---
prettier: true
ignore:
  - title
  - description
  - close.color
  - color
props:
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
  close:
    color: 'air-secondary-accent-2'
    class: 'rounded-full'
---
::

### Действия {#actions}

Пропс `actions` добавляет в Alert действия — [кнопки](/docs/components/button/).

::component-code
---
prettier: true
ignore:
  - title
  - description
  - actions
  - color
props:
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
  actions:
    - label: Действие 1
    - label: Действие 2
      color: 'air-primary'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Alert.

::component-code
---
prettier: true
ignore:
  - title
  - actions
  - color
props:
  title: Внимание!
  description: Мы сразу сообщим менеджеру, что сделка не продвигается.
  orientation: horizontal
  actions:
    - label: Действие 1
    - label: Действие 2
      color: 'air-primary'
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
