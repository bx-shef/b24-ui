---
title: FooterColumns
description: 'Набор колонок со ссылками для навигации и информации в подвале.'
category: navigation
keywords:
  - footer links
  - sitemap
  - columns
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FooterColumns.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/footer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/footer-columns
---

## Использование {#usage}

Компонент FooterColumns отрисовывает список колонок для вашего Footer.

Используйте его в слоте `top` компонента [Footer](/docs/components/footer/):

```vue {3-7}
<template>
  <B24Footer>
    <template #top>
      <B24Container>
        <B24FooterColumns />
      </B24Container>
    </template>
  </B24Footer>
</template>
```

### Колонки {#columns}

Пропс `columns` — массив объектов со свойствами:

- `label: string`{lang="ts-type"}
- `children?: FooterColumnLink[]`{lang="ts-type"}

Каждая колонка содержит массив `children` с объектами-ссылками. У ссылки могут быть свойства:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props), например `to`, `target` и другие.

::component-example
---
prettier: true
name: 'footer-columns-example'
class: 'p-8'
props:
  class: 'w-full'
---
::

::tip
Подпись колонки по умолчанию отрисовывается как `h3`. Чтобы изменить тег, передайте в пропс `as` объект, например `:as="{ label: 'h4' }"`{lang="ts-type"}. Корневой элемент задаётся так же: `:as="{ root: 'div', label: 'h4' }"`{lang="ts-type"}.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
