---
title: useConfetti
description: Производительная анимация конфетти в браузере
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useConfetti.ts
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/confetti
  - label: canvas-confetti
    iconName: GitHubIcon
    to: https://github.com/catdad/canvas-confetti
---

## Использование {#usage}

Автоимпортируемый композабл `useConfetti` управляет `canvas-confetti` из кода.

```vue
<script setup lang="ts">
const confetti = useConfetti()
</script>
```

- `useConfetti` создан через `createSharedComposable`, поэтому один и тот же `canvas-confetti` используется во всём приложении.

::caution
`canvas-confetti` работает с DOM, поэтому код должен выполняться только на клиенте.
::

## API

`fire(options?: confetti.Options) => Promise<undefined> | null`{lang="ts-type"}

Запускает конфетти.

```vue
<script setup lang="ts">
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}
</script>
```

`create(canvas?: HTMLCanvasElement, options?: GlobalOptions) => CreateTypes`{lang="ts-type"}

Создаёт экземпляр функции конфетти, который рисует на заданном canvas.

Нужен, когда требуется передать свои параметры конфетти.

```vue
<script setup lang="ts">
const confetti = useConfetti()

function fireConfettiWithOptions(): void {
  confetti.create()
  confetti.fire({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}
</script>
```

Либо так — со своим canvas.

```vue {4,8,17}
<script setup lang="ts">
import { ref } from 'vue'
  
const myCanvas = ref<HTMLCanvasElement | undefined>()
const confetti = useConfetti()

function fireAtPlace(): void {
  const confettiInstance = confetti.create(myCanvas.value, { resize: true })
  confettiInstance({
    spread: 70
  })
}
</script>
<template>
  <B24Button label="custom canvas" color="link" depth="dark" @click.stop="fireAtPlace" />
  <div>
    <canvas ref="myCanvas" class="h-64 w-1/2" />
  </div>
</template>
```

## Пример {#example}

Полные примеры использования композабла `useConfetti`:

### Простое использование {#simple-use}

::component-example
---
collapse: true
name: 'use-confetti-example'
---
::

### С параметрами {#with-some-options}

::component-example
---
collapse: true
name: 'use-confetti-some-options-example'
---
::

### В заданном месте {#at-custom-place}

::component-example
---
collapse: true
name: 'use-confetti-custom-place-example'
---
::
