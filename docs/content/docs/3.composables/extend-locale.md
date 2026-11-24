---
title: extendLocale
description: 'Утилита для расширения существующей локали собственными переводами.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/defineLocale.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/extend-locale
---

## Использование {#usage}

Автоимпортируемая утилита `extendLocale` настраивает существующую локаль: переопределяет отдельные свойства или сообщения.

```vue
<script setup lang="ts">
import { en } from '@bitrix24/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  locale: 'en-AU',
  messages: {
    commandPalette: {
      placeholder: 'Search a component...'
    }
  }
})
</script>

<template>
  <B24App :locale="locale">
    <NuxtPage />
  </B24App>
</template>
```

Это пригодится, если нужно:
- создать региональный вариант языка (например, `en-AU` на основе `en`);
- переопределить отдельные переводы, не описывая локаль целиком;
- настроить подписи компонентов под своё приложение.

::tip{to="/docs/getting-started/integrations/i18n/"}
Подробнее об интернационализации — в документации по **интеграции i18n**.
::

## API

`extendLocale<M>(locale: Locale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): Locale<M>`{lang="ts-type"}

Расширяет существующую локаль переданными параметрами, объединяя сообщения рекурсивно.

#### Параметры {#parameters}

::field-group

  ::field{name="locale" type="Locale<M>" required}
  Базовая локаль, которую расширяем. Импортируется из `@bitrix24/b24ui-nuxt/locale`.
  ::

  ::field{name="options" type="Partial<DefineLocaleOptions<DeepPartial<M>>>" required}
  Свойства, которые нужно переопределить:

    ::collapsible
  
      ::field-group
  
        ::field{name="name" type="string"}
        Переопределяет отображаемое название локали.
        ::
  
        ::field{name="code" type="string" required}
        Код локали из [Bitrix24](https://apidocs.bitrix24.com/api-reference/sale/status-lang/sale-status-lang-get-list-langs.html).
        ::
  
        ::field{name="locale" type="string"}
        Переопределяет ISO-код локали (например, `'en-GB'`, `'fr-CA'`).
        ::
  
        ::field{name="dir" type="'ltr' | 'rtl'"}
        Переопределяет направление текста локали.
        ::
  
        ::field{name="messages" type="DeepPartial<M>"}
        Частичный объект с переводами, который объединяется с базовой локалью. Укажите только те сообщения, которые нужно переопределить.
        ::
      ::
    ::
  ::
::

**Возвращает:** новый объект `Locale<M>` с объединёнными свойствами.

## Пример {#example}

Пример расширения английской локали до австралийского варианта:

```vue
<script setup lang="ts">
import { en } from '@bitrix24/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  name: 'English (Australia)',
  locale: 'en-AU',
  messages: {
    colorMode: {
      dark: 'Dark',
      light: 'Light',
      system: 'System'
    },
    selectMenu: {
      search: 'Search…',
      noData: 'No results found',
      noMatch: 'No matching results'
    }
  }
})
</script>

<template>
  <B24App :locale="locale">
    <NuxtPage />
  </B24App>
</template>
```

::note
`extendLocale` объединяет сообщения рекурсивно, поэтому достаточно указать только переопределяемые. Остальные наследуются от базовой локали.
::
