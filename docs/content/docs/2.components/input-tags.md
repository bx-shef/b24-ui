---
title: InputTags
description: 'Поле ввода тегов с интерактивными элементами-тегами.'
category: form
keywords:
  - chips input
  - multi value
  - поле тегов
  - ввод тегов
  - несколько значений
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputTags.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-tags
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-tags
  - label: InputTags
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/tags-input
---

## Использование {#usage}

Директива `v-model` управляет значением InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: ['Bitrix24']
---
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера.

::component-code
---
props:
  placeholder: 'Введите теги...'
---
::

### Максимальная длина {#max-length}

Пропс `max-length` задаёт максимальное число символов в теге.

::component-code
---
props:
  maxLength: 4
---
::

### Цвет {#color}

Пропс `color` меняет цвет кольца, когда InputTags в фокусе.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  color: 'air-primary'
  highlight: true
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Тег {#tag}

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  tag: заметка
  color: 'air-primary'
  highlight: true
---
::

Свойство `tagColor` задаёт цвет Badge.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
items:
  tagColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-tertiary
    - air-selection
props:
  modelValue: ['Bitrix24']
  tag: заметка
  tagColor: air-secondary-alert
  color: 'air-primary'
  highlight: true
---
::

### Размеры {#sizes}

Пропс `size` меняет размер InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  size: xl
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - icon
cast:
  icon: 'RocketIcon'
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  icon: 'RocketIcon'
  size: md
---
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` задаёт иконку справа.

::component-code
---
prettier: true
ignore:
  - modelValue
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  trailingIcon: 'RocketIcon'
  size: md
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - avatar.src
  - avatar.loading
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  size: md
---
::

### Иконка удаления {#delete-icon}

Пропс `delete-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) удаления в тегах.

::component-code
---
prettier: true
ignore:
  - modelValue
  - deleteIcon
external:
  - modelValue
cast:
  deleteIcon: 'RocketIcon'
props:
  modelValue: ['Bitrix24']
  deleteIcon: 'RocketIcon'
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки в InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  loading: true
---
::

### Отключение {#disabled}

Пропс `disabled` отключает InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  disabled: true
---
::

### Без границы {#no-border}

Пропс `noBorder` убирает у InputTags все границы (кольца).

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  noBorder: true
  highlight: true
  modelValue: ['Bitrix24']
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у InputTags все границы (кольца), кроме нижней.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  underline: true
  highlight: true
  modelValue: ['Bitrix24']
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  rounded: true
  highlight: true
  modelValue: ['Bitrix24']
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

## Примеры {#examples}

### Внутри FormField {#within-a-formfield}

InputTags можно использовать внутри компонента [FormField](/docs/components/form-field/), чтобы показывать подпись, справочный текст, признак обязательности и так далее.

::component-example
---
name: 'input-tags-form-field-example'
---
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<input>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `inputRef`{lang="ts-type"} | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
