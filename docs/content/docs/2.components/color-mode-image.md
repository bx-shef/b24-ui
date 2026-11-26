---
title: ColorModeImage
description: 'Элемент изображения с разными источниками для светлой и тёмной темы.'
category: color-mode
keywords:
  - изображение по теме
  - картинка для тёмной темы
  - логотип по теме
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/color-mode/ColorModeImage.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/color-mode
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/color-mode-image
---

## Использование {#usage}

::framework-only
#nuxt
Если установлен [`@nuxt/image`](/docs/getting-started/integrations/image), ColorModeImage использует компонент `<NuxtImg>`, иначе — обычный `img`.
::

::component-code{prefix="color-mode"}
---
prettier: true
ignore:
  - width
  - height
  - light
  - dark
props:
  light: 'https://github.com/bitrix24.png'
  dark: 'https://github.com/bitrix-tools.png'
  width: 200
  height: 200
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
