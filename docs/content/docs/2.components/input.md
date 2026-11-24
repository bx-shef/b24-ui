---
title: Input
description: 'Поле для ввода текста.'
category: form
keywords:
  - text field
  - поле ввода
  - текстовое поле
  - инпут
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Input.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input
---

## Использование {#usage}

Директива `v-model` управляет значением Input.

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

### Тип {#type}

Пропс `type` меняет тип поля ввода. По умолчанию `text`.

Некоторые типы реализованы отдельными компонентами, например [Checkbox](/docs/components/checkbox/), [Radio](/docs/components/radio-group/), [InputNumber](/docs/components/input-number/) и другие, а часть оформлена стилями, как `file`.

::component-code
---
prettier: true
items:
  type:
    - text
    - number
    - password
    - search
    - file
props:
  type: 'file'
---
::

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types" target="_blank"}
Все доступные типы описаны на MDN Web Docs.
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера.

::component-code
---
prettier: true
props:
  placeholder: 'Поиск...'
---
::

### Цвет {#color}

Пропс `color` меняет цвет кольца, когда Input в фокусе.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  color: air-primary-warning
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Тег {#tag}

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  tag: заметка
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
  tag: заметка
  color: air-primary-warning
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Размер {#size}

Пропс `size` меняет размер Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  size: xl
  placeholder: 'Поиск...'
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри Input.

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
  size: md
  placeholder: 'Поиск...'
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
  size: md
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри Input.

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
  size: md
  placeholder: 'Поиск...'
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки в Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  loading: true
  placeholder: 'Поиск...'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  disabled: true
  placeholder: 'Поиск...'
---
::

### Без отступов {#no-padding}

Пропс `noPadding` убирает отступы у Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  noPadding: true
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Без границы {#no-border}

Пропс `noBorder` убирает у Input все границы (кольца).

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  noBorder: true
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у Input все границы (кольца), кроме нижней.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  underline: true
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  rounded: true
  highlight: true
  placeholder: 'Поиск...'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

## Примеры {#examples}

### С кнопкой очистки {#with-clear-button}

В слот `#trailing` можно поместить [Button](/docs/components/button/), который очищает Input.

::component-example
---
name: 'input-clear-button-example'
---
::

### С кнопкой копирования {#with-copy-button}

В слот `#trailing` можно поместить [Button](/docs/components/button/), который копирует значение в буфер обмена.

::component-example
---
name: 'input-copy-button-example'
---
::

### С переключателем пароля {#with-password-toggle}

В слот `#trailing` можно поместить [Button](/docs/components/button/), который переключает видимость пароля.

::component-example
---
name: 'input-password-toggle-example'
---
::

### С индикатором надёжности пароля {#with-password-strength-indicator}

Компонент [Progress](/docs/components/progress/) показывает индикатор надёжности пароля.

::component-example
---
collapse: true
name: 'input-password-strength-indicator-example'
---
::

### С ограничением длины {#with-character-limit}

Слот `#trailing` позволяет показать ограничение числа символов Input.

::component-example
---
name: 'input-character-limit-example'
---
::

### С сочетанием клавиш {#with-keyboard-shortcut}

Компонент [Kbd](/docs/components/kbd/) в слоте `#trailing` показывает сочетание клавиш Input.

::component-example
---
name: 'input-kbd-example'
---
::

::note{to="/docs/composables/define-shortcuts/"}
В этом примере композабл `defineShortcuts` переводит фокус на Input при нажатии клавиши :kbd{value="/"}.
::

### С маской {#with-mask}

Масок во встроенном виде нет, но для маски Input можно использовать библиотеки вроде [maska](https://github.com/beholdr/maska).

::component-example
---
name: 'input-mask-example'
---
::

### С плавающей подписью {#with-floating-label}

Слот `#default` позволяет добавить Input плавающую подпись.

::component-example
---
name: 'input-floating-label-example'
---
::

### Внутри FormField {#within-a-formfield}

Input можно использовать внутри компонента [FormField](/docs/components/form-field/), чтобы показывать подпись, справочный текст, признак обязательности и так далее.

::component-example
---
name: 'input-form-field-example'
---
::

::tip{to="/docs/components/form/"}
Внутри компонента **Form** он также обеспечивает валидацию и обработку ошибок.
::

### Внутри FieldGroup {#within-a-fieldgroup}

Input можно использовать внутри компонента [FieldGroup](/docs/components/field-group/), чтобы сгруппировать несколько элементов.

::component-example
---
name: 'input-field-group-example'
---
::

### Как поле номера телефона {#as-a-phone-number-input}

Input внутри [FieldGroup](/docs/components/field-group/) вместе с [SelectMenu](/docs/components/select-menu/) образует поле номера телефона с выбором кода страны.

::component-example
---
collapse: true
name: 'input-phone-number-example'
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
