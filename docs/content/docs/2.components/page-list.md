---
title: PageList
description: 'Вертикальный список для расположения элементов содержимого друг под другом.'
category: page
keywords:
  - вертикальный список
  - список элементов страницы
  - лента элементов
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageList.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-list
---

## Использование {#usage}

Компонент PageList — гибкий способ показать содержимое вертикальным списком. Он подходит для стопки компонентов [PageCard](/docs/components/page-card/) и любых других элементов, с необязательными разделителями между ними.

::component-example
---
collapse: true
name: 'page-list-example'
props:
  class: 'w-full'
---
::

### Разделитель {#divide}

Пропс `divide` добавляет разделитель между всеми дочерними элементами.

::component-example
---
collapse: true
name: 'page-list-divide-example'
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
