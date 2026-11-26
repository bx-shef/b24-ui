---
title: DashboardSearchButton
description: 'Готовая кнопка, которая открывает модальное окно DashboardSearch.'
category: dashboard
keywords:
  - кнопка поиска по дашборду
  - открыть поиск дашборда
  - поиск в дашборде
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSearchButton.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-search-button
---

## Использование {#usage}

Компонент DashboardSearchButton открывает модальное окно [DashboardSearch](/docs/components/dashboard-search/).

::component-code
---
ignore:
  - color
  - collapsed
props:
  collapsed: false
---
::

Компонент расширяет [Button](/docs/components/button/), поэтому ему можно передать любое свойство: `color`, `size` и другие.

::component-code
---
ignore:
  - color
  - collapsed
props:
  color: 'air-primary-success'
  collapsed: false
---
::

::note{to="#collapsed"}
По умолчанию кнопка имеет `color="air-secondary-no-accent"`, если не свёрнута, и `color="air-tertiary-no-accent"`, если свёрнута.
::

### Свёрнутая кнопка {#collapsed}

Пропс `collapsed` скрывает подпись кнопки и [клавиши](#kbds). По умолчанию `false`.

::component-code
---
props:
  collapsed: false
---
::

::tip{to="/docs/components/dashboard-sidebar/#slots"}
В компоненте **DashboardSidebar** используйте слот-проп `collapsed` напрямую.
::

### Клавиши {#kbds}

Пропс `kbds` показывает на кнопке клавиши. По умолчанию `['meta', 'K']`{lang="ts-type"}, как сочетание клавиш компонента [DashboardSearch](/docs/components/dashboard-search/#shortcut).

::component-code
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

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
