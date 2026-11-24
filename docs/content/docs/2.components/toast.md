---
title: Toast
description: 'Короткое сообщение, которое сообщает пользователю информацию или результат действия.'
category: overlay
keywords:
  - notification
  - snackbar
  - flash message
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toast.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/toast
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/toast
  - label: Toast
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/toast
---

## Использование {#usage}

Композабл [useToast](/docs/composables/use-toast/) показывает уведомление в приложении.

::component-example
---
collapse: true
prettier: true
name: 'toast-example'
---
::

::warning
Оберните приложение в компонент [`App`](/docs/components/app/): он использует наш компонент [`Toaster`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toaster.vue), а тот — компонент [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) из Reka UI.
::

::tip{to="/docs/components/app/#props"}
Пропс `toaster` компонента `App` показывает, как настроить Toaster глобально.
::

### Заголовок {#title}

Поле `title` в методе `toast.add` показывает заголовок.

::component-example
---
options:
  - name: 'title'
    label: 'title'
    default: 'Ой! Что-то пошло не так.'
name: 'toast-title-example'
---
::

### Описание {#description}

Поле `description` в методе `toast.add` показывает описание.

::component-example
---
options:
  - name: 'title'
    label: 'title'
    default: 'Ой! Что-то пошло не так.'
  - name: 'description'
    label: 'description'
    default: 'Возникла проблема с вашим запросом.'
name: 'toast-description-example'
---
::

### Иконка {#icon}

Поле `icon` в методе `toast.add` показывает [иконку](https://bitrix24.github.io/b24icons/icons/).

::component-example
---
name: 'toast-icon-example'
---
::

### Аватар {#avatar}

Поле `avatar` в методе `toast.add` показывает [Avatar](/docs/components/avatar/).

::component-example
---
name: 'toast-avatar-example'
---
::

### Цвет {#color}

Поле `color` в методе `toast.add` меняет цвет уведомления.

::component-example
---
options:
  - name: 'color'
    label: 'color'
    default: air-primary-success
    items:
      - air-primary
      - air-primary-success
      - air-primary-alert
      - air-primary-copilot
      - air-primary-warning
      - air-secondary
name: 'toast-color-example'
---
::

### Закрытие {#close}

Поле `close` настраивает кнопку закрытия [Button](/docs/components/button/) или скрывает её (значение `false`).

::component-example
---
name: 'toast-close-example'
---
::

### Иконка закрытия {#close-icon}

Поле `closeIcon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки закрытия.

::component-example
---
name: 'toast-close-icon-example'
---
::

### Действия {#actions}

Поле `actions` добавляет уведомлению кнопки действий [Button](/docs/components/button/).

::component-example
---
options:
  - name: 'description'
    label: 'description'
    default: 'Возникла проблема с вашим запросом.'
name: 'toast-actions-example'
---
::

### Длительность {#duration}

Поле `duration` в методе `toast.add` задаёт, как долго уведомление остаётся на экране (в миллисекундах). По умолчанию `5000`.

::tip
Значение `0` в поле `duration` оставляет уведомление открытым, пока его не закроют вручную.
::

::component-example
---
options:
  - name: 'duration'
    label: 'duration'
    default: 0
    items:
      - 0
      - 1000
      - 3000
      - 5000
name: 'toast-duration-example'
---
::

### Прогресс {#progress}

Поле `progress` настраивает полосу [Progress](/docs/components/progress/) или скрывает её (значение `false`).

::tip
По умолчанию полоса Progress наследует цвет уведомления, но его можно переопределить полем `progress.color`.
::

::component-example
---
name: 'toast-progress-example'
---
::

### Ориентация {#orientation}

Поле `orientation` в методе `toast.add` меняет ориентацию уведомления.

::component-example
---
options:
  - name: 'orientation'
    label: 'orientation'
    default: 'horizontal'
    items:
      - horizontal
      - vertical
name: 'toast-orientation-example'
---
::

## Примеры {#examples}

::note{to="/docs/components/app/"}
Bitrix24 UI предоставляет компонент **App**, который оборачивает приложение и задаёт глобальные настройки.
::

### Глобальная позиция {#change-global-position}

Пропс `toaster.position` компонента [App](/docs/components/app/#props) меняет позицию уведомлений.

```vue [app.vue]
<script setup lang="ts">
const toaster = { position: 'bottom-right' }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-position-example
::

### Глобальная длительность {#change-global-duration}

Пропс `toaster.duration` компонента [App](/docs/components/app/#props) меняет длительность уведомлений.

```vue [app.vue]
<script setup lang="ts">
const toaster = { duration: 5000 }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-duration-example
::

### Глобальный максимум {#change-global-max}

Пропс `toaster.max` компонента [App](/docs/components/app/#props) меняет максимальное число уведомлений, показываемых одновременно.

```vue [app.vue]
<script setup lang="ts">
const toaster = { max: 3 }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-max-example
::

### Стопка уведомлений {#stacked-toasts}

Пропс `toaster.expand` со значением `false` в компоненте [App](/docs/components/app/#props) показывает уведомления стопкой (по мотивам [Sonner](https://sonner.emilkowal.ski/)).

```vue [app.vue]
<script setup lang="ts">
const toaster = { expand: false }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::tip
При наведении на уведомления стопка разворачивается, а таймер уведомлений ставится на паузу.
::

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-expand-example
::

### Дедупликация уведомлений {#deduplicated-toasts}

Если вызвать `toast.add` с уже существующим `id`, существующее уведомление пульсирует, а дубликат не создаётся.

::component-example
---
collapse: true
name: 'toast-duplicate-example'
---
::

### С обратным вызовом {#with-callback}

Поле `onUpdateOpen` задаёт обратный вызов, который выполняется при закрытии уведомления (по истечении времени или по действию пользователя).

::component-example
---
collapse: true
name: 'toast-callback-example'
---
::

### С промисом :badge{label="Soon" class="align-text-top"} {#with-promise}

Метод `toast.promise` показывает уведомление загрузки, которое обновляется, когда промис выполнен или отклонён.

::component-example
---
collapse: true
name: 'toast-promise-example'
---
::

### С HTML-содержимым {#with-html-content}

[Функция отрисовки `h()`](https://vuejs.org/api/render-function.html#h) в полях `title` или `description` отрисовывает HTML-элементы или компоненты Vue с произвольным оформлением.

::component-example
---
collapse: true
name: 'toast-html-example'
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
| `height`{lang="ts-type"} | `Ref<number>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
