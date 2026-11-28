---
title: Footer
description: 'Адаптивный подвал для копирайта, ссылок и дополнительной информации.'
category: layout
keywords:
  - подвал
  - нижняя часть страницы
  - копирайт
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Footer.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/footer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/footer
---

## Использование {#usage}

Компонент Footer отрисовывает элемент `<footer>`.

Слоты `left`, `default` и `right` настраивают содержимое подвала.

::component-example
---
prettier: true
collapse: true
name: 'footer-example'
class: '!p-0'
props:
  class: 'w-full'
---
::

::note
В этом примере ссылки подвала по центру отрисованы компонентом [NavigationMenu](/docs/components/navigation-menu/).
::

::tip{to="/docs/components/footer-columns/"}
Список ссылок внутри слота `top` можно вывести компонентом `FooterColumns`.
::

## Примеры {#examples}

### В `app.vue` {#within-appvue}

Используйте Footer в `app.vue` или в раскладке:

```vue [app.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-b24/Bitrix24Icon'

const items: NavigationMenuItem[] = [
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
]
</script>

<template>
  <B24App>
    <B24Header />

    <B24Main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </B24Main>

    <B24Separator type="dashed" class="h-px" />

    <B24Footer>
      <template #left>
        <ProseP small accent="less">
          Copyright © {{ new Date().getFullYear() }}
        </ProseP>
      </template>

      <B24NavigationMenu :items="items" variant="link" />

      <template #right>
        <B24Button
          color="air-selection"
          :icon="Bitrix24Icon"
          to="https://apidocs.bitrix24.com"
          target="_blank"
          aria-label="Bitrix24 REST API"
        />
        <B24Button
          :icon="GitHubIcon"
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </B24Footer>
  </B24App>
</template>
```

::note
В этом примере рамку над подвалом добавляет компонент [Separator](/docs/components/separator/).
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
