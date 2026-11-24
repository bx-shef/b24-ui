---
title: PinInput
description: 'Компонент для ввода PIN-кода.'
category: form
keywords:
  - otp
  - one-time password
  - verification code
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PinInput.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/pin-input
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/pin-input
  - label: PinInput
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/pin-input
---

## Использование {#usage}

Директива `v-model` управляет значением PinInput.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: []
---
::

Пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: ['1','2','3']
---
::

### Тип {#type}

Пропс `type` меняет тип поля ввода. По умолчанию `text`.

::component-code
---
items:
  type:
    - text
    - number
props:
  type: 'number'
---
::

::note
При `type`, равном `number`, принимаются только цифры.
::

### Маска {#mask}

Пропс `mask` скрывает вводимые символы, как в поле пароля.

::component-code
---
prettier: true
ignore:
  - placeholder
  - defaultValue
props:
  mask: true
  defaultValue: ['1','2','3','4','5']
---
::

### OTP {#otp}

Пропс `otp` включает поддержку одноразовых паролей (OTP). На мобильных устройствах код из SMS или буфера обмена подставляется автоматически, есть и автодополнение.

::component-code
---
props:
  otp: true
---
::

### Длина {#length}

Пропс `length` меняет число полей ввода.

::component-code
---
props:
  length: 6
---
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера.

::component-code
---
props:
  placeholder: '○'
---
::

### Разделитель {#separator}

Пропс `separator` вставляет разделитель между группами полей. Число означает, что разделитель ставится после каждого N-го поля.

::component-code
---
ignore:
  - placeholder
props:
  length: 6
  separator: 3
  placeholder: '○'
---
::

Можно передать и массив позиций, чтобы вставить разделители после определённых полей.

::component-code
---
prettier: true
ignore:
  - placeholder
  - length
  - separator
props:
  length: 7
  separator: [3, 4]
  placeholder: '○'
---
::

### Цвет {#color}

Пропс `color` меняет цвет кольца, когда PinInput в фокусе.

::component-code
---
ignore:
  - placeholder
props:
  color: 'air-primary'
  highlight: true
  placeholder: '○'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Размер {#size}

Пропс `size` меняет размер PinInput.

::component-code
---
ignore:
  - placeholder
props:
  size: xl
  placeholder: '○'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает PinInput.

::component-code
---
ignore:
  - placeholder
props:
  disabled: true
  placeholder: '○'
---
::

### Без границы {#no-border}

Пропс `noBorder` убирает у PinInput все границы (кольца).

::component-code
---
ignore:
  - placeholder
props:
  noBorder: true
  highlight: true
  size: xl
  placeholder: '○'
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у PinInput все границы (кольца), кроме нижней.

::component-code
---
ignore:
  - placeholder
props:
  underline: true
  highlight: true
  size: xl
  placeholder: '○'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет PinInput.

::component-code
---
ignore:
  - placeholder
props:
  rounded: true
  highlight: true
  size: xl
  placeholder: '○'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

## Примеры {#examples}

### Со слотом separator {#with-separator-slot}

Слот `separator` меняет внешний вид разделителя.

::component-example
---
name: 'pin-input-separator-slot-example'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `inputsRef`{lang="ts-type"} | `Ref<ComponentPublicInstance[]>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
