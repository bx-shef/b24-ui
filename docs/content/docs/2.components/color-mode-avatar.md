---
title: ColorModeAvatar
description: 'Avatar, который сам меняет изображение в зависимости от текущей темы (светлая или тёмная).'
category: color-mode
keywords:
  - аватар по теме
  - аватар для тёмной темы
  - смена изображения по теме
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/color-mode/ColorModeAvatar.vue
  - label: Avatar
    to: /docs/components/avatar/
    iconName: Bitrix24Icon
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/color-mode
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/color-mode-avatar
---

## Использование {#usage}

Компонент ColorModeAvatar расширяет компонент [Avatar](/docs/components/avatar/), поэтому ему можно передать любое свойство: `size`, `icon` и другие.

Пропсы `light` и `dark` задают источники изображения для светлой и тёмной темы.

::component-code{prefix="color-mode"}
---
ignore:
  - light
  - dark
props:
  light: 'https://github.com/vuejs.png'
  dark: 'https://github.com/nuxt.png'
---
::

::note
Переключайте светлую и тёмную тему, чтобы увидеть разные изображения: :b24-color-mode-select{size="sm"}
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<img>`.
::
