---
title: ContentSearchButton
description: 'Готовая кнопка, которая открывает модальное окно поиска по контенту.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentSearchButton.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-search-button
---

::warning{to="/docs/getting-started/integrations/content/"}
Компонент доступен, только если установлен модуль `@nuxt/content`.
::

## Использование {#usage}

Компонент ContentSearchButton открывает модальное окно [ContentSearch](/docs/components/content-search/).

:component-code{prefix="content"}

Компонент расширяет [Button](/docs/components/button/), поэтому ему можно передать любое свойство: `color`, `size` и другие.

::component-code{prefix="content"}
---
ignore:
  - color
props:
  color: 'air-primary'
---
::

::note{to="#collapsed"}
По умолчанию кнопка имеет `color="air-secondary-no-accent"`, если не свёрнута, и `color="air-tertiary-no-accent"`, если свёрнута.
::

### Свёрнутая кнопка {#collapsed}

Пропс `collapsed` показывает подпись кнопки и [клавиши](#kbds). По умолчанию `true`.

::component-code{prefix="content"}
---
prettier: true
props:
  collapsed: false
---
::

### Клавиши {#kbds}

Пропс `kbds` показывает на кнопке клавиши. По умолчанию `['meta', 'K']`{lang="ts-type"}, как сочетание клавиш компонента [ContentSearch](/docs/components/content-search/#shortcut).

::component-code{prefix="content"}
---
prettier: true
ignore:
  - kbds
props:
  collapsed: false
  kbds:
    - 'alt'
    - 'O'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
