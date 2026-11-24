---
title: ColorPicker
description: 'Компонент выбора цвета.'
category: form
keywords:
  - colour picker
  - swatch
  - hex
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ColorPicker.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/color-picker
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/color-picker
---

## Использование {#usage}

Директива `v-model` управляет значением ColorPicker.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: '#00C16A'
---
::

Пропс `default-value` задаёт начальное значение, если состоянием управлять не нужно.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: '#00BCD4'
---
::

### Формат RGB {#rgb-format}

Пропс `format` со значением `rgb` задаёт значение ColorPicker в формате RGB.

::component-code
---
prettier: true
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: rgb
  modelValue: 'rgb(0, 193, 106)'
---
::

### Формат HSL {#hsl-format}

Пропс `format` со значением `hsl` задаёт значение ColorPicker в формате HSL.

::component-code
---
prettier: true
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: hsl
  modelValue: 'hsl(153, 100%, 37.8%)'
---
::

### Формат CMYK {#cmyk-format}

Пропс `format` со значением `cmyk` задаёт значение ColorPicker в формате CMYK.

::component-code
---
prettier: true
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: cmyk
  modelValue: 'cmyk(100%, 0%, 45.08%, 24.31%)'
---
::

### Формат CIELab {#cielab-format}

Пропс `format` со значением `lab` задаёт значение ColorPicker в формате CIELab.

::component-code
---
prettier: true
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: lab
  modelValue: 'lab(68.88% -60.41% 32.55%)'
---
::

### Троттлинг {#throttle}

Пропс `throttle` задаёт частоту обновления значения ColorPicker.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  throttle: 100
  modelValue: '#00C16A'
---
::

### Размер {#size}

Пропс `size` задаёт размер ColorPicker.

::component-code
---
prettier: true
props:
  size: lg
---
::

### Отключение {#disabled}

Пропс `disabled` отключает ColorPicker.

::component-code
---
prettier: true
props:
  disabled: true
---
::

## Примеры {#examples}

### Выбор цвета в выпадающем окне {#as-a-color-chooser}

Чтобы собрать выбор цвета, используйте компоненты [Button](/docs/components/button/) и [Popover](/docs/components/popover/).

::component-example
---
name: 'color-picker-chooser-example'
---
::

## API

### Пропсы {#props}

:component-props

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
