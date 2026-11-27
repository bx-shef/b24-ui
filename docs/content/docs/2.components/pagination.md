---
title: Pagination
description: 'Навигационный компонент с кнопками или ссылками для постраничного вывода.'
category: navigation
keywords:
  - pager
  - page navigation
  - пагинация
  - постраничная навигация
  - переключение страниц
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Pagination.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/pagination
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/pagination
  - label: Pagination
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/pagination
---

## Использование {#usage}

Пропс `default-page` или директива `v-model:page` управляет текущей страницей.

::component-code
---
external:
  - page
model:
  - page
ignore:
  - page
  - total
props:
  page: 5
  total: 100
---
::

::note
Pagination использует [`Button`](/docs/components/button/) для отображения страниц; пропсы [`color`](#color) и [`size`](#size) задают их стиль.
::

### Всего {#total}

Пропс `total` задаёт общее число элементов в списке.

::component-code
---
external:
  - page
model:
  - page
props:
  page: 5
  total: 100
---
::

### Элементов на странице {#items-per-page}

Пропс `items-per-page` задаёт число элементов на странице. По умолчанию `10`.

::component-code
---
ignore:
  - page
external:
  - page
model:
  - page
props:
  page: 5
  itemsPerPage: 20
  total: 100
---
::

### Число соседних страниц {#sibling-count}

Пропс `sibling-count` задаёт, сколько соседних страниц показывать. По умолчанию `2`.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
props:
  page: 5
  siblingCount: 1
  total: 100
---
::

### Крайние страницы {#show-edges}

Пропс `show-edges` всегда показывает многоточие, первую и последнюю страницы. По умолчанию `false`.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
props:
  page: 5
  showEdges: true
  siblingCount: 1
  total: 100
---
::

### Кнопки управления {#show-controls}

Пропс `show-controls` показывает кнопки «первая», «предыдущая», «следующая» и «последняя». По умолчанию `true`.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
props:
  page: 5
  showControls: false
  showEdges: true
  total: 100
---
::

### Цвет {#color}

Пропс `color` задаёт цвет неактивных элементов управления. По умолчанию `air-secondary-no-accent`.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
items:
  color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
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
  page: 5
  color: air-tertiary-no-accent
  total: 100
---
::

### Цвет активной страницы {#active-color}

Пропс `active-color` задаёт цвет активного элемента управления. По умолчанию `air-primary`.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
items:
  activeColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
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
  page: 5
  activeColor: air-primary-copilot
  total: 100
---
::

### Размер {#size}

Пропс `size` задаёт размер элементов управления. По умолчанию `md`.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
items:
  size:
    - xss
    - xs
    - sm
    - md
    - lg
    - xl
props:
  page: 5
  size: xl
  total: 100
---
::

### Отключение {#disabled}

Пропс `disabled` отключает элементы управления пагинацией.

::component-code
---
ignore:
  - page
  - total
external:
  - page
model:
  - page
props:
  page: 5
  total: 100
  disabled: true
---
::

## Примеры {#examples}

### Со ссылками {#with-links}

Пропс `to` превращает кнопки в ссылки. Передайте функцию, которая принимает номер страницы и возвращает маршрут.

::component-example
---
name: 'pagination-links-example'
---
::

::note
В этом примере к адресу добавлен хеш `#with-links`, чтобы страница не прокручивалась вверх.
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
