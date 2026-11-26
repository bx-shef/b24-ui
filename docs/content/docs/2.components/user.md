---
title: User
description: 'Компонент для показа данных пользователя: имени, описания и фото профиля.'
category: data
keywords:
  - profile
  - person
  - account
  - пользователь
  - карточка пользователя
  - имя и фото
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/User.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/user
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/user
---

## Использование {#usage}

### Имя {#name}

Пропс `name` показывает имя пользователя.

::component-code
---
props:
  name: 'Иван Петров'
---
::

### Описание {#description}

Пропс `description` показывает описание пользователя.

::component-code
---
props:
  name: 'Иван Петров'
  description: 'Инженер-программист'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает компонент [Avatar](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
  - avatar.loading
props:
  name: 'Иван Петров'
  description: 'Инженер-программист'
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
---
::

::collapsible{name="все свойства аватара"}

::component-props
---
name: Avatar
ignore:
  - size
  - as
---
::

::

### Цвет {#color}

Пропс `color` тонирует вложенный [Avatar](/docs/components/avatar/). Значение `avatar.color`, отличное от `undefined`, переопределяет его.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
items:
  color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-primary-no-accent
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
  name: 'Иван Петров'
  description: 'Инженер-программист'
  avatar:
    src: '/b24ui/avatar/employee.png'
  color: 'air-primary-alert'
---
::

### Чип {#chip}

Пропс `chip` показывает компонент [Chip](/docs/components/chip/).

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
items:
  chip.color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-warning
    - air-primary-copilot
    - air-secondary
    - air-secondary-accent
    - air-secondary-accent-1
    - air-tertiary
  chip.position:
    - top-left
    - top-right
    - bottom-left
    - bottom-right
props:
  name: 'Иван Петров'
  description: 'Инженер-программист'
  avatar:
    src: '/b24ui/avatar/employee.png'
  chip:
    color: 'primary'
    position: top-right
---
::

::collapsible{name="все свойства чипа"}

::component-props
---
name: Chip
ignore:
  - as
  - size
  - standalone
---
::

::

### Размер {#size}

Пропс `size` меняет размер аватара и текста пользователя.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
  - chip
props:
  name: 'Иван Петров'
  description: 'Инженер-программист'
  avatar:
    src: '/b24ui/avatar/employee.png'
  chip: true
  size: xl
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию. По умолчанию `horizontal`.

::component-code
---
prettier: true
ignore:
  - avatar.src
props:
  orientation: 'vertical'
  name: 'Иван Петров'
  description: 'Инженер-программист'
  avatar:
    src: '/b24ui/avatar/employee.png'
---
::

### Ссылка {#link}

Можно передать любое свойство компонента [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), например `to`, `target`, `rel` и другие.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
  - target
props:
  to: 'https://github.com/bitrix24'
  target: '_blank'
  name: 'Имя пользователя'
  description: 'Описание пользователя'
  avatar:
    src: 'https://github.com/bitrix24.png'
---
::

::note
Компонент `NuxtLink` наследует все остальные атрибуты, которые вы передали компоненту `User`.
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
