---
title: Avatar
description: 'Элемент img с запасным видом; поддерживает Nuxt Image.'
category: element
keywords:
  - profile picture
  - user image
  - аватар
  - фото профиля
  - картинка пользователя
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Avatar.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/avatar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/avatar
---

## Использование {#usage}

::framework-only
#nuxt
Если установлен [`@nuxt/image`](/docs/getting-started/integrations/image), Avatar использует компонент `<NuxtImg>`, иначе — обычный `img`.
::

::component-code
---
prettier: true
ignore:
  - src
  - alt
  - loading
props:
  src: '/b24ui/avatar/employee.png'
  alt: 'employee'
  loading: lazy
---
::

::note
Можно передать любое свойство HTML-элемента `<img>`: `alt`, `loading` и другие.
::

::framework-only
#nuxt
:::tip
Чтобы отказаться от `@nuxt/image`, используйте пропс `as`: `:as="{ img: 'img' }"`.
:::
::


### Источник изображения {#src}

Пропс `src` задаёт адрес изображения.

::component-code
---
prettier: true
ignore:
  - loading
props:
  src: 'https://github.com/bitrix24.png'
  loading: lazy
---
::

### Размер {#size}

Пропс `size` задаёт размер Avatar.

::component-code
---
prettier: true
ignore:
  - src
  - loading
props:
  size: 2xl
  src: '/b24ui/avatar/assistant.png'
  loading: lazy
---
::

::note
Атрибуты `width` и `height` элемента `<img>` выставляются автоматически по пропсу `size`.
::

### Иконка {#icon}

Пропс `icon` показывает запасную [иконку](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
---
::

### Текст {#text}

Пропс `text` показывает запасной текст.

::component-code
---
prettier: true
props:
  text: '+24'
  size: xl
---
::


### Альтернативный текст {#alt}

Если нет ни иконки, ни текста, запасным видом служат **инициалы** из пропса `alt`.

::component-code
---
prettier: true
props:
  alt: 'Иван Петров'
  size: xl
---
::

::note
Пропс `alt` передаётся элементу `img` как атрибут `alt`.
::

### Цвет {#color}

Пропс `color` меняет цвет Avatar.

::component-code
---
props:
  color: air-boost
  alt: 'Иван Петров'
---
::


### Чип {#chip}

Пропс `chip` показывает чип рядом с Avatar.

::component-code
---
prettier: true
ignore:
  - src
  - loading
  - chip.inset
  - chip.hideZero
props:
  src: '/b24ui/avatar/assistant.png'
  loading: lazy
  chip:
    text: '+1'
    inset: true
    hideZero: true
---
::

## Примеры {#examples}

### С подсказкой {#with-tooltip}

Компонент [Tooltip](/docs/components/tooltip/) показывает подсказку при наведении на Avatar.

:component-example{name="avatar-tooltip-example"}

### С маской {#with-mask}

CSS-маска позволяет показать Avatar не кругом, а в нестандартной форме.

:component-example{name="avatar-mask-example"}

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<img>`.
::

## Тема {#theme}

:component-theme
