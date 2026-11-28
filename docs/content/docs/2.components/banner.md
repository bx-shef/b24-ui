---
title: Banner
description: 'Верхний баннер для важных сообщений пользователю.'
category: element
keywords:
  - announcement bar
  - top bar
  - баннер
  - верхняя плашка
  - объявление
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Banner.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/banner
---

## Использование {#usage}

### Заголовок {#title}

Пропс `title` показывает заголовок на Banner.

::component-code
---
prettier: true
class: '!p-0'
props:
  title: 'Пробный период подписки закончился. Оформите подписку, чтобы продолжить работу со всеми приложениями.'
---
::

### Иконка {#icon}

Пропс `icon` показывает иконку на Banner.

::component-code
---
prettier: true
class: '!p-0'
ignore:
  - title
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  title: 'Пробный период подписки закончился. Оформите подписку, чтобы продолжить работу со всеми приложениями.'
---
::

### Цвет {#color}

Пропс `color` меняет цвет Banner.

::component-code
---
prettier: true
class: '!p-0'
ignore:
  - icon
  - title
cast:
  icon: 'RocketIcon'
props:
  color: 'air-secondary-alert'
  icon: 'RocketIcon'
  title: 'Пробный период подписки закончился. Оформите подписку, чтобы продолжить работу со всеми приложениями.'
---
::

### Закрытие {#close}

Пропс `close` показывает [кнопку](/docs/components/button/), которой закрывают Banner. По умолчанию — `false`.

::tip
По нажатию на кнопку закрытия возникает событие `close`.
::

::component-example
---
iframe:
  style: 'height: 48px;'
overflowHidden: true
name: 'banner-example'
---
#code

```vue
<template>
  <B24Banner id="example" title="The subscription trial has ended. Subscribe to continue using all apps." close />
</template>
```

::

::note
После закрытия в локальное хранилище записывается `banner-${id}`, чтобы баннер больше не показывался. :br В примере выше это `banner-example`.
::

::caution
Чтобы закрытие сохранялось после перезагрузки страницы, укажите пропс `id`. Без явного `id` баннер скрывается только на время текущей сессии и снова появляется после перезагрузки.
::

### Иконка закрытия {#close-icon}

Пропс `close-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки закрытия.

::component-example
---
iframe:
  style: 'height: 48px;'
overflowHidden: true
name: 'banner-with-title-example'
ignore:
  - title
  - closeIcon
props:
  title: 'Пробный период подписки закончился. Оформите подписку, чтобы продолжить работу со всеми приложениями.'
  closeIcon: 'CircleCrossIcon'
---
#code

```vue
<script setup lang="ts">
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'
</script>

<template>
  <B24Banner
    title="The subscription trial has ended. Subscribe to continue using all apps."
    close
    :close-icon="CircleCrossIcon"
  />
</template>
```

::

### Действия {#actions}

Пропс `actions` добавляет в Banner действия — [кнопки](/docs/components/button/).

::component-code
---
prettier: true
class: '!p-0'
ignore:
  - title
  - actions
  - variant
external:
  - actions
externalTypes:
  - ButtonProps[]
cast:
  actions: 'ComponentWithIcon'
props:
  title: 'Пробный период подписки закончился. Оформите подписку, чтобы продолжить работу со всеми приложениями.'
  actions:
    - label: Оформить подписку
      color: 'air-primary'
      icon: 'RocketIcon'
    - label: Открыть сканер
      color: 'air-secondary-accent-2'
---
::

::note
У кнопок действий по умолчанию `color="air-secondary-no-accen"` и `size="xs"`. Эти значения можно переопределить в каждой кнопке.
::

### Ссылка {#link}

Можно передать любое свойство компонента [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link): `to`, `target`, `rel` и другие.

::component-code
---
prettier: true
class: '!p-0'
overflowHidden: true
ignore:
  - title
  - target
props:
  to: 'https://apidocs.bitrix24.com/'
  target: '_blank'
  title: 'Изучите REST API Битрикс24'
  color: 'air-primary'
---
::

::note
`NuxtLink` наследует остальные атрибуты, переданные компоненту `Banner`.
::

## Примеры {#examples}

### В `app.vue` {#within-appvue}

Banner можно разместить в `app.vue` или в раскладке:

```vue [app.vue]{3-7}
<template>
  <B24App>
    <B24Banner
      :icon="Bitrix24Icon"
      title="Explore the Bitrix24 REST API"
      to="https://apidocs.bitrix24.com/"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </B24App>
</template>
```

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
