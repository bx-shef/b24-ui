---
title: Textarea
description: 'Многострочное поле ввода текста.'
category: form
keywords:
  - multiline
  - многострочное поле
  - текстовая область
  - поле комментария
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Textarea.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/textarea
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/textarea
---

## Использование {#usage}

Директива `v-model` управляет значением Textarea.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ''
---
::

### Строки {#rows}

Пропс `rows` задаёт число строк. По умолчанию `3`.

::component-code
---
props:
  rows: 12
---
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера.

::component-code
---
prettier: true
props:
  placeholder: 'Введите текст...'
---
::

### Автоподбор высоты {#autoresize}

Пропс `autoresize` включает автоматическое изменение высоты Textarea.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 'Это длинный текст, который автоматически меняет высоту Textarea.'
  autoresize: true
---
::

Пропс `maxrows` задаёт максимальное число строк при автоподборе высоты. При значении `0` Textarea растёт без ограничений.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 'Это длинный текст, который автоматически меняет высоту Textarea, но не больше 4 строк.'
  maxrows: 4
  autoresize: true
---
::

### Цвет {#color}

Пропс `color` меняет цвет кольца, когда Textarea в фокусе.

::component-code
---
ignore:
  - placeholder
props:
  color: air-primary-copilot
  highlight: true
  placeholder: 'Введите текст...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Тег {#tag}
Свойство `tag` показывает [Badge](/docs/components/badge/) поверх Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  tag: note
  color: air-primary-warning
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

Свойство `tagColor` задаёт цвет Badge.

::component-code
---
prettier: true
ignore:
  - placeholder
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
  tagColor: air-secondary-alert
  tag: note
  color: air-primary-warning
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  placeholder: 'Поиск...'
  rows: 1
---
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` задаёт иконку справа.

::component-code
---
prettier: true
ignore:
  - placeholder
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
props:
  trailingIcon: 'RocketIcon'
  placeholder: 'Введите email'
  rows: 1
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
  - avatar.src
  - avatar.loading
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  placeholder: 'Поиск...'
  rows: 1
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки в Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  loading: true
  placeholder: 'Поиск...'
  rows: 1
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  disabled: true
  placeholder: 'Введите текст...'
---
::

### Без отступов {#no-padding}

Пропс `noPadding` убирает у Textarea внутренние отступы.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  noPadding: true
  highlight: true
  placeholder: 'Введите текст...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Без границы {#no-border}

Пропс `noBorder` убирает у Textarea все границы (кольца).

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  noBorder: true
  highlight: true
  placeholder: 'Введите текст...'
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у Textarea все границы (кольца), кроме нижней.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  underline: true
  highlight: true
  placeholder: 'Введите текст...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  rounded: true
  highlight: true
  placeholder: 'Введите текст...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Распознавание речи {#speech-recognition}

Композабл [useSpeechRecognition](/docs/composables/use-speech-recognition/) добавляет распознавание речи через [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

::component-example
---
collapse: true
name: 'use-speech-recognition-example'
---
::

## API {#api}

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<textarea>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `textareaRef`{lang="ts-type"} | `Ref<HTMLTextAreaElement \| null>`{lang="ts-type"} |
| `autoResize`{lang="ts-type"} | `() => void`{lang="ts-type"} |

## Тема {#theme}

:component-theme
