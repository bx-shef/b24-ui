---
title: Error
description: 'Готовый компонент ошибки с поддержкой NuxtError.'
category: layout
keywords:
  - страница ошибки
  - ошибка 404
  - экран ошибки
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Error.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/404
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/error
---

## Использование {#usage}

Компонент Error отрисовывает элемент `<main>`, который вместе с компонентом [SidebarLayout](/docs/components/sidebar-layout/) создаёт раскладку на всю доступную высоту окна.

### Ошибка {#error}

Пропс `error` показывает сообщение об ошибке.

::framework-only
#nuxt
::note{to="https://nuxt.com/docs/guide/directory-structure/error" target="_blank"}
Чаще всего пропс `error` приходит в файл `error.vue`.
::
::

::component-code
---
hide:
  - class
prettier: true
props:
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
---
::

::tip
По умолчанию сообщение о статусе отрисовывается как `h1`. Чтобы изменить тег, передайте в пропс `as` объект: например, `:as="{ statusMessage: 'h2' }"`{lang="ts-type"}. Так же можно задать корневой элемент: `:as="{ root: 'div', statusMessage: 'h2' }"`{lang="ts-type"}.
::

### Иконка {#icon}

Пропс `icon` показывает иконку над кодом статуса.

::component-code
---
prettier: true
hide:
- class
ignore:
  - icon
cast:
  icon: 'RocketIcon'
ignore:
  - error.status
  - error.statusText
  - error.message
props:
  icon: 'RocketIcon'
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/) над кодом статуса (используется, только если не задан `icon`).

::component-code
---
prettier: true
hide:
  - class
ignore:
  - avatar.src
  - error.status
  - error.statusText
  - error.message
props:
  avatar:
    src: 'https://github.com/bitrix24.png'
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
---
::

### Цвет {#color}

Пропс `color` окрашивает вложенный [аватар](/docs/components/avatar/). Явно заданный `avatar.color` перекрывает это значение по умолчанию.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - avatar.src
  - error.status
  - error.statusText
  - error.message
items:
  color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-primary-no-accent
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  color: 'air-primary-alert'
  avatar:
    src: 'https://github.com/bitrix24.png'
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
---
::

Слот `#leading` показывает свой элемент, например логотип.

::component-code
---
hide:
  - class
prettier: true
ignore:
  - error.status
  - error.statusText
  - error.message
props:
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
slots:
  leading: |

    <img src="https://github.com/bitrix24.png" alt="Bitrix24" class="size-10 rounded-full">
---
#leading
:img{src="https://github.com/bitrix24.png" alt="Bitrix24" class="size-10 rounded-full"}
::

### Кнопка очистки {#clear}

Пропс `clear` настраивает кнопку очистки или скрывает её (значение `false`).

Кнопку можно настроить любым свойством компонента [Button](/docs/components/button/).

::component-code
---
prettier: true
hide:
  - class
ignore:
  - error.status
  - error.statusText
  - error.message
  - clear.color
  - clear.size
  - clear.icon
  - clear.class
cast:
  clear: 'ComponentWithIcon'
props:
  clear:
    color: 'air-primary-alert'
    size: xl
    icon: 'RocketIcon'
    class: 'rounded-full'
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
---
::

### Перенаправление {#redirect}

Пропс `redirect` перенаправляет пользователя на другую страницу при нажатии на кнопку очистки. По умолчанию `/`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - error.status
  - error.statusText
  - error.message
props:
  redirect: '/docs/getting-started/'
  error:
    status: 404
    statusText: 'Страница не найдена'
    message: 'Страницы, которую вы ищете, не существует.'
  class: '!min-h-96'
---
::

## Примеры {#examples}

### В `error.vue` {#within-errorvue}

Используйте компонент Error в `error.vue`:

```vue [error.vue]{13}
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <B24App>
    <B24SidebarLayout :use-light-content="false">

      <B24Error :error="error" />

    </B24SidebarLayout>
  </B24App>
</template>
```

::tip
Чтобы раскладка и возможности совпадали, можно повторить код `app.vue` в файле `error.vue`. Пример: <https://github.com/bitrix24/b24ui/blob/main/docs/app/error.vue>
::

::note
Подробнее об обработке ошибок — в [документации Nuxt](https://nuxt.com/docs/getting-started/error-handling#error-page). При использовании `nuxt generate` рекомендуем добавить `fatal: true` в вызов `createError`, чтобы страница ошибки точно отобразилась:

```vue [pages/\[...slug\\].vue]
<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}
</script>
```

::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
