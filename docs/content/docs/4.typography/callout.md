---
title: ProseCallout
description: 'Цветные панели и понятные значки выделяют важное, чтобы его легко было заметить.'
category: components
navigation.title: Callout
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Callout.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/callout
---

## Использование {#usage}

Markdown в слоте по умолчанию компонента `callout` добавляет в содержимое заметный блок с контекстом.

::component-code{slug="callout" prose}
---
props:
  class: 'w-full my-0'
hide:
  - class
slots:
  default: Это `callout` с полной поддержкой **markdown**.
---

Это `callout` с полной поддержкой **markdown**.
::

### Иконка {#icon}

Пропс `icon` показывает иконку рядом с содержимым.

::component-code{slug="callout" prose}
---
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  class: 'w-full my-0'
hide:
  - class
slots:
  default: Это `callout` с иконкой.
---

Это `callout` с иконкой.
::

### Цвет {#color}

Пропс `color` меняет цвет блока.

::component-code{slug="callout" prose}
---
ignore:
  - icon
  - color
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  color: air-primary
  class: 'w-full my-0'
hide:
  - class
slots:
  default: Это `callout` с другим цветом.
---

Это `callout` с другим цветом.
::

### Ссылка {#link}

Любые свойства компонента [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), например `to` и `target`, превращают блок в ссылку.

::component-code{slug="callout" prose}
---
hide:
  - class
ignore:
  - icon
  - color
  - target
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  to: '/docs/getting-started/installation/nuxt/'
  color: air-primary
  class: 'w-full my-0'
slots:
  default: Узнайте, как установить `@bitrix24/b24ui-nuxt` в проект.
---

Узнайте, как установить `@bitrix24/b24ui-nuxt` в проект.
::

## Сокращения {#shortcuts}

Доступны также сокращения `note`, `tip`, `warning` и `caution` с готовыми иконками и цветами.

::code-preview

:::div{class="flex flex-col gap-4 w-full"}

::note{class="w-full my-0"}
Дополнительная информация для вас.
::

::tip{class="w-full my-0"}
Полезный совет.
::

::warning{class="w-full my-0"}
Будьте осторожны: действие может привести к неожиданным последствиям.
::

::caution{class="w-full my-0"}
Это действие нельзя отменить.
::

:::

#code

```mdc
::note
Дополнительная информация.
::

::tip
Полезный совет.
::

::warning
Будьте осторожны: действие может привести к неожиданным последствиям.
::

::caution
Это действие нельзя отменить.
::
```

::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
