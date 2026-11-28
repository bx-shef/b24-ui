---
title: Header
description: 'Шапка, которая подстраивает структуру и содержимое под размер экрана.'
category: layout
keywords:
  - шапка
  - верхняя часть сайта
  - шапка сайта
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Header.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/header/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/header
---

## Использование {#usage}

Компонент Header отрисовывает элемент `<header>`.

::tip{to="/docs/getting-started/theme/css-variables/#header"}
Высота шапки задаётся CSS-переменной `--b24ui-header-height`.
::

Слоты `left`, `default` и `right` настраивают шапку, а слоты `body` и `content` — меню шапки.

::component-example
---
collapse: true
prettier: true
name: 'header-example'
class: '!px-0 !pt-0'
overflowHidden: true
props:
  class: 'w-full'
---
::

::note
В этом примере ссылки шапки по центру отрисованы компонентом [NavigationMenu](/docs/components/navigation-menu/).
::

### Заголовок {#title}

Пропс `title` меняет заголовок шапки. По умолчанию `Bitrix24 UI`.

::component-code
---
hide:
  - class
props:
  title: 'Bitrix24 UI'
  class: 'w-full'
class: '!px-0 !pt-0'
---
::

Слот `title` позволяет добавить собственный логотип.

::tip{to="#props"}
Пропс `title` всё равно стоит указать, чтобы заменить `aria-label` ссылки по умолчанию.
::

::component-code
---
prettier: true
overflowHidden: true
hide:
  - class
props:
  class: 'w-full'
slots:
  title: |

    <Logo class="h-6 w-auto text-label" />
class: '!px-0 !pt-0'
---

#title
:logo{class="h-6 w-auto text-label"}
::

### Ссылка {#to}

Пропс `to` меняет ссылку заголовка. По умолчанию `/`.

::component-code
---
hide:
  - class
class: '!px-0 !pt-0'
props:
  to: '/docs/'
  class: 'w-full'
---
::

Слот `left` позволяет полностью заменить ссылку.

::component-code
---
prettier: true
overflowHidden: true
hide:
  - class
class: '!px-0 !pt-0'
props:
  class: 'w-full'
slots:
  left: |

    <NuxtLink to="/docs"">
      <Logo class="h-6 w-auto text-label" />
    </NuxtLink>
---

#left
::nuxt-link{to="/docs"}
:logo{class="h-6 w-auto text-label"}
::
::

### Режим {#mode}

Пропс `mode` меняет режим меню шапки. По умолчанию `slideover`.

Слот `body` заполняет тело меню (под шапкой), слот `content` — всё меню целиком.

::tip{to="#props"}
Пропс `menu` настраивает меню шапки; оно подстраивается под выбранный режим.
::

::component-example
---
collapse: true
iframe:
  height: 300px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'header-menu-example'
options:
  - name: 'mode'
    label: 'mode'
    default: 'drawer'
    items:
      - modal
      - slideover
      - drawer
props:
  class: 'w-full'
---
::

### Переключатель {#toggle}

Пропс `toggle` настраивает кнопку-переключатель, которая отображается на мобильных.

Можно передать любое свойство компонента [Button](/docs/components/button/).

::component-example
---
collapse: true
iframe:
  height: 300px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'header-toggle-example'
props:
  class: 'w-full'
---
::

### Сторона переключателя {#toggle-side}

Пропс `toggle-side` меняет сторону кнопки-переключателя. По умолчанию `left`.

::component-example
---
collapse: true
iframe:
  height: 300px;
  class: 'max-w-[1000px]'
iframeMobile: true
overflowHidden: true
name: 'header-toggle-side-example'
props:
  class: 'w-full'
---
::

## Примеры {#examples}

### С анимированным переключателем {#with-animated-toggle}

Слот `#toggle` заменяет кнопку-переключатель по умолчанию собственной анимированной иконкой-гамбургером на основе [Motion Vue](https://motion.dev/docs/vue/motion-component).

::component-example
---
collapse: true
iframe:
  height: 300px;
iframeMobile: true
overflowHidden: true
name: 'header-toggle-animated-example'
props:
  class: 'w-full'
---
::


### В `app.vue` {#within-appvue}

Используйте Header в `app.vue` или в раскладке:

```vue [app.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Components',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
  {
    label: 'REST API',
    to: 'https://apidocs.bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }
])
</script>

<template>
  <B24App>
    <B24Header>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>

      <B24NavigationMenu :items="items" />

      <template #right>
        <B24ColorModeButton />

        <B24Button
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          :icon="GitHubIcon"
          aria-label="GitHub"
        />
      </template>

      <template #body>
        <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </B24Header>

    <B24Main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </B24Main>

    <B24Footer />
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
