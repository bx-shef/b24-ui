---
title: LocaleSelect
description: 'Select для переключения между локалями.'
category: i18n
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/locale/LocaleSelect.vue
  - label: SelectMenu
    to: /docs/components/select-menu/
    iconName: Bitrix24Icon
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/locale-select
---

## Использование {#usage}

Компонент LocaleSelect расширяет [SelectMenu](/docs/components/select-menu/), поэтому ему можно передать любое свойство, например `color`, `size` и другие.

::framework-only
#nuxt
::note{to="/docs/getting-started/integrations/i18n/nuxt/"}
Компонент предназначен для работы с системой **i18n**. Подробнее — в руководстве.
::

#vue
::note{to="/docs/getting-started/integrations/i18n/vue/"}
Компонент предназначен для работы с системой **i18n**. Подробнее — в руководстве.
::

::

::warning
Флаги отображаются символами Unicode, поэтому вид может отличаться: например, Microsoft Edge в Windows показывает вместо флага код ISO 3166-1 alpha-2, так как в шрифтах ОС нет значков флагов.
::

### Локали {#locales}

Пропс `locales` принимает массив локалей из `@bitrix24/b24ui-nuxt/locale`.

::component-example
---
name: 'locale-select-example'
---
::

Можно передать только те локали, которые нужны вашему приложению:

```vue
<script setup lang="ts">
import { en, es, ru, tr, ar } from '@bitrix24/b24ui-nuxt/locale'

const locale = ref('en')
</script>

<template>
  <B24LocaleSelect v-model="locale" :locales="[en, es, ru, tr, ar]" />
</template>
```

### Динамическая локаль {#dynamic-locale}

::framework-only
#nuxt
::div
Использование с Nuxt i18n:

```vue
<script setup lang="ts">
import { de, en, fr } from '@bitrix24/b24ui-nuxt/locale'

const { locale, setLocale } = useI18n()
</script>

<template>
  <B24LocaleSelect
    :model-value="locale"
    :locales="[de, en, fr]"
    @update:model-value="setLocale($event)"
  />
</template>
```

::

#vue
::div
Использование с Vue i18n:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { de, en } from '@bitrix24/b24ui-nuxt/locale'

const { locale, setLocale } = useI18n()
</script>

<template>
  <B24LocaleSelect
    :model-value="locale"
    :locales="[de, en]"
    @update:model-value="setLocale($event)"
  />
</template>
```

::

::

## API

### Пропсы {#props}

:component-props
