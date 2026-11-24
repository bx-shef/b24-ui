---
title: useOverlay
description: 'Композабл для программного управления оверлеями в App.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useOverlay.ts
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/modal
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/use-overlay
---

## Использование {#usage}

Автоимпортируемый композабл `useOverlay` программно управляет компонентами [Modal](/docs/components/modal/), [Slideover](/docs/components/slideover/) и [Drawer](/docs/components/drawer/).

::component-example
---
name: 'use-overlay-example'
---
::

- `useOverlay` создан через `createSharedComposable`, поэтому состояние оверлеев общее для всего приложения.

::note
Чтобы получить значение из оверлея, дождитесь `overlay.open()`. Это работает, только если **компонент оверлея вызывает событие `close`**. Подробности — в примере ниже.
::

## API

`useOverlay()`{lang="ts-type"}

Композабл `useOverlay` даёт методы для глобального управления оверлеями. Каждый созданный оверлей возвращает экземпляр со своими методами.

### create()

`create(component: T, options?: OverlayOptions<ComponentProps<T>>): OverlayInstance<T>`{lang="ts-type"}

Создаёт оверлей и возвращает его экземпляр-фабрику.

#### Параметры {#parameters}

::field-group

  ::field{name="component" type="T" required}
  Компонент оверлея, который нужно отрисовать.
  ::

  ::field{name="options" type="OverlayOptions"}
  Настройки оверлея.

    ::collapsible

      ::field-group
        ::field{name="defaultOpen" type="boolean"}
        Открыть оверлей сразу после создания. По умолчанию `false`.
        ::
    
        ::field{name="props" type="ComponentProps"}
        Необязательный объект пропсов для отрисованного компонента.
        ::
    
        ::field{name="destroyOnClose" type="boolean"}
        Удаляет оверлей из памяти при закрытии. По умолчанию `false`.
        ::
      ::
    ::
  ::
::

### open()

`open(id: symbol, props?: ComponentProps<T>): OpenedOverlay<T>`{lang="ts-type"}

Открывает оверлей по его `id`.

#### Параметры {#parameters-1}

::field-group
  ::field{name="id" type="symbol" required}
  Идентификатор оверлея.
  ::

  ::field{name="props" type="ComponentProps<T>"}
  Необязательный объект пропсов для отрисованного компонента.
  ::
::

### close()

`close(id: symbol, value?: any): void`{lang="ts-type"}

Закрывает оверлей по его `id`.

#### Параметры {#parameters-2}

::field-group
  ::field{name="id" type="symbol" required}
  Идентификатор оверлея.
  ::

  ::field{name="value" type="any"}
  Значение, с которым выполняется промис оверлея.
  ::
::

### closeAll()

`closeAll(): void`{lang="ts-type"}

Закрывает все открытые оверлеи.


### patch()

`patch(id: symbol, props: Partial<ComponentProps<T>>): void`{lang="ts-type"}

Обновляет оверлей по его `id`.

#### Параметры {#parameters-3}

::field-group
  ::field{name="id" type="symbol" required}
  Идентификатор оверлея.
  ::

  ::field{name="props" type="Partial<ComponentProps<T>>" required}
  Объект с пропсами, которые нужно обновить у отрисованного компонента.
  ::
::

### unmount()

`unmount(id: symbol): void`{lang="ts-type"}

Удаляет оверлей из DOM по его `id`.

#### Параметры {#parameters-4}

::field-group
  ::field{name="id" type="symbol" required}
  Идентификатор оверлея.
  ::
::

### isOpen()

`isOpen(id: symbol): boolean`{lang="ts-type"}

Проверяет по `id`, открыт ли оверлей.

#### Параметры {#parameters-5}

::field-group
  ::field{name="id" type="symbol" required}
  Идентификатор оверлея.
  ::
::

### overlays

`overlays: Overlay[]`{lang="ts-type"}

Список всех созданных оверлеев, хранящийся в памяти.

## API экземпляра {#instance-api}

Методы экземпляра, который возвращает `create()`.

### open()

`open(props?: ComponentProps<T>): OpenedOverlay<T>`{lang="ts-type"}

Открывает оверлей. Возвращает `OpenedOverlay` — промис, который выполняется со значением из события `close`. Тот же промис доступен как `result`, поэтому работает и `const { result } = modal.open()`.

#### Параметры {#parameters-6}

::field-group
  ::field{name="props" type="ComponentProps<T>"}
  Необязательный объект пропсов для отрисованного компонента.
  ::
::

```vue
<script setup lang="ts">
import { LazyModalExample } from '#components'

const overlay = useOverlay()

const modal = overlay.create(LazyModalExample)

function openModal() {
  modal.open({
    title: 'Welcome'
  })
}
</script>
```

### close()

`close(value?: any): void`{lang="ts-type"}

Закрывает оверлей.

#### Параметры {#parameters-7}

::field-group
  ::field{name="value" type="any"}
  Значение, с которым выполняется промис оверлея.
  ::
::

### patch()

`patch(props: Partial<ComponentProps<T>>): void`{lang="ts-type"}

Обновляет пропсы оверлея.

#### Параметры {#parameters-8}

::field-group
  ::field{name="props" type="Partial<ComponentProps<T>>" required}
  Объект с пропсами, которые нужно обновить у отрисованного компонента.
  ::
::

```vue
<script setup lang="ts">
import { LazyModalExample } from '#components'

const overlay = useOverlay()

const modal = overlay.create(LazyModalExample, {
  props: { title: 'Welcome' }
})

function openModal() {
  modal.open()
}

function updateModalTitle() {
  modal.patch({ title: 'Updated Title' })
}
</script>
```

## Примеры {#examples}

### Несколько оверлеев {#with-multiple-overlays}

Пример показывает, как управлять несколькими оверлеями и передавать данные между ними:

```vue
<script setup lang="ts">
import { ModalA, ModalB, SlideoverA } from '#components'

const overlay = useOverlay()

// Create with default props
const modalA = overlay.create(ModalA, { props: { title: 'Welcome' } })
const modalB = overlay.create(ModalB)
const slideoverA = overlay.create(SlideoverA)

const openModalA = () => {
  // Open modalA, but override the title prop
  modalA.open({ title: 'Hello' })
}

const openModalB = async () => {
  // Open modalB, and wait for its result
  const input = await modalB.open()

  // Pass the result from modalB to the slideover, and open it
  slideoverA.open({ input })
}
</script>

<template>
  <B24Button label="Open Modal" @click="openModalA" />
</template>
```

### Диалог подтверждения {#confirm-dialog}

Пример показывает, как сделать переиспользуемый диалог подтверждения с помощью собственного композабла `useConfirmDialog`, обёртки над `useOverlay`. Так можно получить диалоги под конкретные бизнес-требования и дизайн.

1. Создайте компонент `ConfirmDialog`, который при закрытии передаёт булево значение:

```vue [components/ConfirmDialog.vue]
<script lang="ts" setup>
interface ConfirmDialogProps {
  title?: string
  description?: string
}

defineProps<ConfirmDialogProps>()

const emits = defineEmits<{
  close: [value: boolean]
}>()
</script>

<template>
  <B24Modal
    :title="title"
    :description="description"
    :dismissible="false"
    :b24ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <B24Button label="Cancel" @click="emits('close', false)" />
      <B24Button label="Confirm" @click="emits('close', true)" />
    </template>
  </B24Modal>
</template>
```

2. Создайте композабл `useConfirmDialog`, возвращающий промис:

```ts [composables/useConfirmDialog.ts]
import { ConfirmDialog } from '#components'

export interface ConfirmDialogOptions {
  title: string
  description?: string
}

export const useConfirmDialog = () => {
  const overlay = useOverlay()

  return (options: ConfirmDialogOptions): Promise<boolean> => {
    const modal = overlay.create(ConfirmDialog, {
      destroyOnClose: true,
      props: options
    })

    return modal.open()
  }
}
```

3. Используйте композабл в компонентах:

```vue
<script setup lang="ts">
const confirm = useConfirmDialog()

const handleDelete = async () => {
  const confirmed = await confirm({
    title: 'Delete item',
    description: 'Are you sure you want to delete this item?'
  })

  if (confirmed) {
    console.log('Item deleted')
  }
}
</script>

<template>
  <B24Button label="Delete item" @click="handleDelete" />
</template>
```

## Особенности {#caveats}

### Provide / Inject

При программном открытии оверлеев (модальных окон, боковых панелей и т. п.) компонент оверлея получает через inject только значения компонента, в котором находится `B24App` (обычно `app.vue` или компоненты раскладки). Дело в том, что `B24App` монтирует оверлеи вне контекста страницы.

Поэтому `provide()` на страницах или в родительских компонентах напрямую не поддерживается. Чтобы передать такие значения в оверлей, лучше использовать пропсы:

```vue
<script setup lang="ts">
import { LazyModalExample } from '#components'

const overlay = useOverlay()

const providedValue = inject('valueProvidedInPage')

const modal = overlay.create(LazyModalExample, {
  props: {
    providedValue
  }
})
</script>
```
