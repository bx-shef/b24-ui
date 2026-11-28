---
title: PageFeature
description: 'Компонент для показа основных возможностей вашего приложения.'
category: page
keywords:
  - возможности продукта
  - преимущества
  - список фич
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageFeature.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-feature
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-feature
---

## Использование {#usage}

Компонент PageFeature используется компонентом [PageSection](/docs/components/page-section/) для показа [возможностей](/docs/components/page-section/#features).

### Заголовок {#title}

Пропс `title` задаёт заголовок возможности.

::component-code
---
hide:
  - class
props:
  title: 'Тема'
  class: 'w-96'
---
::

::tip
Заголовок по умолчанию отрисовывается как `div`. Чтобы отрисовать его как заголовок, передайте в пропс `as` объект, например `:as="{ title: 'h3' }"`{lang="ts-type"}. Корневой элемент задаётся так же: `:as="{ root: 'section', title: 'h3' }"`{lang="ts-type"}.
::

### Описание {#description}

Пропс `description` задаёт описание возможности.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
props:
  title: 'Тема'
  description: 'Настройте Bitrix24 UI.'
  class: 'w-96'
---
::

### Иконка {#icon}

Пропс `icon` задаёт иконку возможности.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Тема'
  description: 'Настройте Bitrix24 UI.'
  icon: 'RocketIcon'
  class: 'w-96'
---
::

### Ссылка {#link}

Можно передать любое свойство компонента [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), например `to`, `target`, `rel` и другие.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
  - target
cast:
  icon: 'RocketIcon'
props:
  title: 'Тема'
  description: 'Настройте Bitrix24 UI.'
  icon: 'RocketIcon'
  to: '/docs/getting-started/theme/design-system/'
  target: _blank
  class: 'w-96'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию возможности. По умолчанию `horizontal`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  orientation: 'vertical'
  title: 'Тема'
  description: 'Настройте Bitrix24 UI.'
  icon: 'RocketIcon'
  class: 'w-96'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
