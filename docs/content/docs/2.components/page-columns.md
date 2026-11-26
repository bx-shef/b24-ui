---
title: PageColumns
description: 'Адаптивная многоколоночная раскладка для размещения содержимого рядом.'
category: page
keywords:
  - колонки страницы
  - многоколоночная раскладка
  - колоночная вёрстка
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageColumns.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-columns
---

## Использование {#usage}

Компонент PageColumns показывает содержимое в адаптивной многоколоночной раскладке. Он хорошо работает с компонентами [PageCard](/docs/components/page-card/) и любыми другими элементами: на мобильных это одна колонка, на больших экранах — несколько.

::component-example
---
collapse: true
name: 'page-columns-example'
class: 'p-8'
---
::

::note
Каждый дочерний элемент слота оборачивается в `div` со слотом темы `item`. Вертикальный отступ между элементами — это `padding-bottom` обёртки (`pb-8`, у последней `pb-0`), а не `margin`: WebKit (Safari) переносит margin в следующую колонку, и колонка может остаться пустой. Меняйте отступ через `b24ui.item`, а не через `space-y-*` у `class`.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
