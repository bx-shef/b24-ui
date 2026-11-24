---
title: ProseCardGroup
description: 'Карточки в гибкой сетке для структурированного и читаемого содержимого.'
category: components
navigation.title: CardGroup
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CardGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/card-group
---

## Использование {#usage}

Компонент `card-group` объединяет компоненты `card` в сетку.

::code-preview

:::card-group{class="w-full my-0"}

::card
---
title: Цены
to: https://www.bitrix24.com/prices/
target: _blank
---
Тарифы и цены Bitrix24
::

::card
---
title: Вебинары
to: https://www.bitrix24.com/webinars/
target: _blank
---
Наши вебинары охватывают широкий круг тем и бесплатно доступны на нескольких языках.
::

::card
---
title: Bitrix24 REST API
to: https://apidocs.bitrix24.com/
target: _blank
---
Инструмент для создания интеграций, автоматизации процессов и настройки пользовательских сценариев в Bitrix24
::

::card
---
title: Bitrix24 UI-Kit
to: https://bitrix24.github.io/b24ui/
target: _blank
---
Документация `@bitrix24/b24ui`.
::

:::

#code

```mdc
::card-group

::card
---
title: Цены
to: https://www.bitrix24.com/prices/
target: _blank
---
Тарифы и цены Bitrix24
::

::card
---
title: Вебинары
to: https://www.bitrix24.com/webinars/
target: _blank
---
Наши вебинары охватывают широкий круг тем и бесплатно доступны на нескольких языках.
::

::card
---
title: Bitrix24 REST API
to: https://apidocs.bitrix24.com/
target: _blank
---
Инструмент для создания интеграций, автоматизации процессов и настройки пользовательских сценариев в Bitrix24
::

::card
---
title: Bitrix24 UI-Kit
to: https://bitrix24.github.io/b24ui/
target: _blank
---
Документация `@bitrix24/b24ui`.
::

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
