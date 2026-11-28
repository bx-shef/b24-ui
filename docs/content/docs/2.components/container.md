---
title: Container
description: 'Контейнер для центрирования контента и ограничения его максимальной ширины.'
category: layout
keywords:
  - контейнер
  - центрирование содержимого
  - максимальная ширина
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Container.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/container
---

## Использование {#usage}

Слот по умолчанию центрирует контент и ограничивает его ширину.

::tip{to="/docs/getting-started/theme/css-variables/#container"}
Максимальная ширина задаётся CSS-переменной `--b24ui-container-width`.
::

::component-example
---
name: 'container-example'
props:
  class: 'w-full'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
