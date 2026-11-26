---
title: Link
description: 'Обёртка над NuxtLink с дополнительными пропсами.'
category: navigation
keywords:
  - anchor
  - href
  - navigation
  - ссылка
  - гиперссылка
  - переход по адресу
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/link
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/link
---

## Использование {#usage}

Компонент Link — обёртка над [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), в которой используется пропс [`custom`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom). Он добавляет несколько пропсов:

- Пропс `inactive-class` задаёт класс для неактивной ссылки, а `active-class` применяется к активной.
- Пропс `exact` применяет `active-class`, когда ссылка активна и маршрут в точности совпадает с текущим.
- Пропсы `exact-query` и `exact-hash` применяют `active-class`, когда ссылка активна и query или hash в точности совпадают с текущими.
  - `exact-query="partial"` применяет `active-class`, когда ссылка активна и query совпадает с текущим частично.

Цель — предоставить тот же API, что был у NuxtLink в Nuxt 2 / Vue 2. Подробнее об этом — в руководстве Vue Router [по миграции с Vue 2](https://router.vuejs.org/guide/migration/#removal-of-the-exact-prop-in-router-link).

::note
Его используют компоненты [`Breadcrumb`](/docs/components/breadcrumb/), [`Button`](/docs/components/button/), [`ContextMenu`](/docs/components/context-menu/), [`DropdownMenu`](/docs/components/dropdown-menu/) и [`NavigationMenu`](/docs/components/navigation-menu/).
::

### Тег {#tag}

Компонент `Link` отрисовывает тег `<a>`, если передан пропс `to`, иначе — тег `<button>`. Пропс `as` меняет запасной тег.

::component-code
---
props:
  to: ''
  as: 'button'
slots:
  default: Ссылка
---
::

::note
Изменяя пропс `to`, можно посмотреть на отрисованный HTML.
::

### Стиль {#style}

По умолчанию у ссылки есть стили активного и неактивного состояний, см. раздел [#theme](#theme).

::component-code
---
props:
  to: /docs/components/link/
slots:
  default: Ссылка
---
::

::note
Измените пропс `to`, чтобы увидеть активное и неактивное состояния.
::

Это поведение можно переопределить пропсом `raw` и задать свои стили через `class`, `active-class` и `inactive-class`.

::component-code
---
ignore:
  - raw
props:
  raw: true
  to: /docs/components/link/
  activeClass: 'font-(--ui-font-weight-bold) text-(--ui-color-copilot-accent-primary)'
  inactiveClass: 'text-(--ui-color-accent-main-alert)'
slots:
  default: Ссылка
---

Ссылка
::

Пропс `is-action` помечает псевдоссылку.

::component-code
---
props:
  isAction: true
  to: /docs/components/link/
slots:
  default: Ссылка
---

Ссылка
::

::callout
Если в VSCode используется расширение [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) и нужно автодополнение для пропсов `active-class` и `inactive-class`, добавьте в `.vscode/settings.json` такие настройки:

```json [.vscode/settings.json]
{
  "tailwindCSS.classAttributes": [
    "active-class",
    "inactive-class"
  ]
}
```
::

### Локаль {#locale}

Компонент Link автоматически интегрируется с [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/), если он установлен. Внутренние ссылки локализуются хелпером `$localePath` без ручной обёртки.

```vue
<template>
  <!-- Автоматически станет /en/about или /fr/about в зависимости от текущей локали -->
  <B24Link to="/about">About</B24Link>
</template>
```

::tip
При необходимости `localePath()` или `localeRoute()` можно по-прежнему вызывать вручную.
::

::note{to="/docs/getting-started/integrations/i18n/nuxt/#dynamic-locale"}
Подробнее об интернационализации в Bitrix24 UI.
::

## API

### Пропсы {#props}

::component-props
---
ignore:
  - custom
---
::

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<a>`.
::

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
