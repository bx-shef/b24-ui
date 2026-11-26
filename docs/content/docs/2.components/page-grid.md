---
title: PageGrid
description: 'Адаптивная сетка для гибкой раскладки содержимого.'
category: page
keywords:
  - сетка страницы
  - адаптивная сетка
  - раскладка плитками
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageGrid.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-grid
---

## Использование {#usage}

Компонент PageGrid — адаптивная сетка для компонентов [PageCard](/docs/components/page-card/) и любых других элементов; число колонок автоматически меняется от 1 до 3 в зависимости от размера экрана.

::component-example
---
name: 'page-grid-example'
class: 'p-8'
---
::

Утилитные классы `col-span-*` и `row-span-*` позволяют также показать список карточек в раскладке в стиле bento.

::component-example
---
collapse: true
name: 'page-grid-bento-example'
class: 'p-8'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
