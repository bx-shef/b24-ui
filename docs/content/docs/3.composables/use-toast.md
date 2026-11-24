---
title: useToast
description: 'Композабл для показа уведомлений (toast) в приложении.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useToast.ts
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/toast
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/use-toast
---

## Использование {#usage}

Автоимпортируемый композабл `useToast` показывает уведомления [Toast](/docs/components/toast/).

::component-example
---
name: 'use-toast-example'
---
::

- Состоянием уведомлений `useToast` управляет через `useState` из Nuxt, поэтому оно реактивно во всём приложении.
- По умолчанию одновременно показывается не больше 5 уведомлений. Если новое уведомление превышает этот предел, самое старое удаляется автоматически. Предел меняется пропсом `toaster.max` компонента [`App`](/docs/components/app#props).
- Уведомление удаляется из состояния с задержкой 200 мс, чтобы успела отработать анимация исчезновения.

::warning
Оберните приложение в компонент [`App`](/docs/components/app/): он использует наш компонент [`Toaster`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toaster.vue), а тот — компонент [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) из Reka UI.
::

::tip{to="/docs/components/toast/"}
Как настроить внешний вид и поведение уведомлений — в документации компонента **Toast**.
::

## API

`useToast()`{lang="ts-type"}

Композабл `useToast` даёт методы для глобального управления уведомлениями.

### add()

`add(toast: Partial<Toast>): Toast`{lang="ts-type"}

Добавляет новое уведомление.

#### Параметры {#parameters}

::field-group

  ::field{name="toast" type="Partial<Toast>" required}
  Частичный объект `Toast` со следующими свойствами:

    ::collapsible

      ::field-group
        ::field{name="id" type="string | number"}
        Уникальный идентификатор уведомления. Если не указан, генерируется автоматически. Повторное использование существующего id объединяет данные с этим уведомлением вместо добавления нового.
        ::
      
        ::field{name="open" type="boolean"}
        Открыто ли уведомление. По умолчанию `true`.
        ::
  
        ::field{name="title" type="string | VNode | (() => VNode)"}
        Заголовок уведомления.
        ::
  
        ::field{name="description" type="string | VNode | (() => VNode)"}
        Описание уведомления.
        ::
  
        ::field{name="icon" type="IconComponent"}
        Иконка уведомления.
        ::
  
        ::field{name="avatar" type="AvatarProps"}
        Аватар уведомления. См. [Avatar](/docs/components/avatar/#props).
        ::
  
        ::field{name="color" type="string"}
        Цвет уведомления. По умолчанию `air-secondary`.
        ::
  
        ::field{name="orientation" type="'horizontal' | 'vertical'"}
        Расположение содержимого и действий относительно друг друга. По умолчанию `vertical`.
        ::
  
        ::field{name="close" type="boolean | Omit<ButtonProps, LinkPropsKeys>"}
        Настраивает кнопку закрытия или скрывает её (значение `false`). По умолчанию `true`.
        ::
  
        ::field{name="closeIcon" type="IconComponent"}
        Иконка кнопки закрытия.
        ::
  
        ::field{name="actions" type="ButtonProps[]"}
        Действия в уведомлении. См. [Button](/docs/components/button/#props).
        ::
  
        ::field{name="progress" type="boolean | Pick<ProgressProps, 'color' | 'b24ui'>"}
        Настраивает индикатор прогресса или скрывает его (значение `false`). По умолчанию `true`.
        ::
  
        ::field{name="duration" type="number"}
        Время в миллисекундах до автоматического закрытия уведомления. По умолчанию `5000`. Значение `0` оставляет уведомление открытым, пока его не закроют вручную. Можно задать и глобально в компоненте [`App`](/docs/components/app/).
        ::
  
        ::field{name="onClick" type="(toast: Toast) => void"}
        Функция, которая вызывается при клике на уведомление.
        ::
  
        ::field{name="onUpdateOpen" type="(open: boolean) => void"}
        Функция, которая вызывается при изменении состояния открытости. Удобна, чтобы выполнить действие при закрытии уведомления (по таймеру или вручную).
        ::

        ::field{name="type" type="'foreground' | 'background'"}
        Как уведомление озвучивают вспомогательные технологии. `background` подходит для уведомлений, которые не являются результатом прямого действия пользователя.
        ::

        ::field{name="as" type="any"}
        Элемент или компонент, которым отрисовывается уведомление. По умолчанию `li`.
        ::
      ::
    ::
  ::
::

**Возвращает:** полный добавленный объект `Toast`.

```vue
<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Success',
    description: 'Your action was completed successfully.',
    color: 'air-primary-success'
  })
}
</script>
```

### update()

`update(id: string | number, toast: Omit<Partial<Toast>, 'id'>): void`{lang="ts-type"}

Обновляет существующее уведомление.

#### Параметры {#parameters-1}

::field-group
  ::field{name="id" type="string | number" required}
  Уникальный идентификатор обновляемого уведомления.
  ::

  ::field{name="toast" type="Omit<Partial<Toast>, 'id'>" required}
  Частичный объект `Toast` с обновляемыми свойствами. `id` изменить нельзя, уведомление открывается заново, а `duration` сбрасывается, если не передать его снова.
  ::
::

```vue
<script setup lang="ts">
const toast = useToast()

function updateToast(id: string | number) {
  toast.update(id, {
    title: 'Updated Toast',
    description: 'This toast has been updated.'
  })
}
</script>
```

### promise() :badge{label="Soon" class="align-text-top"}

`promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T>`{lang="ts-type"}

Показывает уведомление загрузки, пока промис не завершён, и обновляет его, когда промис выполнен или отклонён.

#### Параметры {#parameters-promise}

::field-group
  ::field{name="promise" type="Promise<T>" required}
  Отслеживаемый промис.
  ::

  ::field{name="options" type="ToastPromiseOptions<T>" required}
  Уведомление для каждого состояния. Состояние — частичный объект `Toast` или строка, которая становится заголовком.

    ::collapsible

      ::field-group
        ::field{name="loading" type="string | Partial<Toast>"}
        Уведомление, пока промис не завершён. Показывает иконку `loading` из словаря иконок и остаётся открытым до завершения промиса.
        ::

        ::field{name="success" type="string | Partial<Toast> | ((data: T) => string | Partial<Toast>)"}
        Уведомление при выполнении промиса. Функция получает результат промиса. Если не задано, уведомление закрывается.
        ::

        ::field{name="error" type="string | Partial<Toast> | ((error: unknown) => string | Partial<Toast>)"}
        Уведомление при отклонении промиса. Функция получает ошибку. Если не задано, уведомление закрывается.
        ::
      ::
    ::
  ::
::

**Возвращает:** переданный промис, поэтому его результат можно ждать через `await`.

```vue
<script setup lang="ts">
const toast = useToast()

async function save() {
  await toast.promise($fetch('/api/save', { method: 'POST' }), {
    loading: 'Saving...',
    success: { title: 'Saved', color: 'air-primary-success' },
    error: (error: any) => ({ title: error.message, color: 'air-primary-alert' })
  })
}
</script>
```

### remove()

`remove(id: string | number): void`{lang="ts-type"}

Удаляет уведомление.

#### Параметры {#parameters-2}

::field-group
  ::field{name="id" type="string | number" required}
  Уникальный идентификатор удаляемого уведомления.
  ::
::

```vue
<script setup lang="ts">
const toast = useToast()

function removeToast(id: string | number) {
  toast.remove(id)
}
</script>
```

### clear()

`clear(): void`{lang="ts-type"}

Удаляет все уведомления.

```vue
<script setup lang="ts">
const toast = useToast()

function clearAllToasts() {
  toast.clear()
}
</script>
```

### toasts

`toasts: Ref<Toast[]>`{lang="ts-type"}

Реактивный массив всех текущих уведомлений.

```vue
<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <div>
    <pre>{{ toasts }}</pre>
  </div>
</template>
```
