---
title: defineLocale
description: 'Утилита для создания собственной конфигурации локали приложения.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/defineLocale.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/define-locale
---

## Использование {#usage}

Автоимпортируемая утилита `defineLocale` создаёт собственную локаль с вашими переводами.

```vue
<script setup lang="ts">
import type { Messages } from '@bitrix24/b24ui-nuxt'

const locale = defineLocale<Messages>({
  name: 'My custom locale',
  code: 'en',
  locale: 'en',
  dir: 'ltr',
  messages: {
    // пары «ключ — перевод»
  }
})
</script>

<template>
  <B24App :locale="locale">
    <NuxtPage />
  </B24App>
</template>
```

::tip{to="/docs/getting-started/integrations/i18n/"}
Подробнее об интернационализации — в документации по **интеграции i18n**.
::

## API

`defineLocale<M>(options: DefineLocaleOptions<M>): Locale<M>`{lang="ts-type"}

Создаёт новый объект локали по переданным параметрам.

#### Параметры {#parameters}

::field-group

  ::field{name="options" type="DefineLocaleOptions<M>" required}
  Объект конфигурации локали со следующими свойствами:

    ::collapsible
  
      ::field-group
  
        ::field{name="name" type="string" required}
        Отображаемое название локали (например, `'English'`, `'Français'`).
        ::
  
        ::field{name="code" type="string" required}
        Код локали из [Bitrix24](https://apidocs.bitrix24.com/api-reference/sale/status-lang/sale-status-lang-get-list-langs.html).
        ::
  
        ::field{name="locale" type="string" required}
        ISO-код локали (например, `'en'`, `'fr'`, `'de-AT'`).
        ::
  
        ::field{name="dir" type="'ltr' | 'rtl'"}
        Направление текста локали. По умолчанию `'ltr'`.
        ::
  
        ::field{name="messages" type="M" required}
        Объект с переводами. Для типобезопасности используйте тип `Messages` из `@bitrix24/b24ui-nuxt`.
        ::
      ::
    ::
  ::
::

**Возвращает:** объект `Locale<M>`, который можно передать в пропс `locale` компонента [App](/docs/components/app/).

## Пример {#example}

Полный пример создания собственной локали:

```vue
<script setup lang="ts">
import type { Messages } from '@bitrix24/b24ui-nuxt'

const locale = defineLocale<Messages>({
  name: 'Español',
  code: 'la',
  locale: 'es',
  dir: 'ltr',
  messages: {
    alert: {
      close: 'Cerrar'
    },
    modal: {
      close: 'Cerrar'
    },
    commandPalette: {
      back: 'Atrás',
      close: 'Cerrar',
      noData: 'Sin datos',
      noMatch: 'Sin resultados',
      placeholder: 'Escribe un comando o busca…'
    }
    // ... сообщения остальных компонентов
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
Как устроен объект с переводами, видно на примере [встроенных локалей](https://github.com/bitrix24/b24ui/tree/main/src/runtime/locale).
::
