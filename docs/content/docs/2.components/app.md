---
title: App
description: 'Оборачивает приложение и даёт глобальные настройки и дополнительные возможности.'
category: layout
keywords:
  - обёртка приложения
  - глобальные настройки
  - корневой компонент
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/App.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/app
---

## Использование {#usage}

Компонент использует [ConfigProvider](https://reka-ui.com/docs/utilities/config-provider) из Reka UI, чтобы передать всем компонентам глобальную конфигурацию:

- Все примитивы наследуют общее направление чтения.
- Можно менять поведение прокрутки страницы при блокировке `body`.
- Больше настроек, которые не дают содержимому «прыгать».

Кроме того, он использует [ToastProvider](https://reka-ui.com/docs/components/toast#provider) и [TooltipProvider](https://reka-ui.com/docs/components/tooltip#provider) для глобальных уведомлений и подсказок.

Разместите его в корне приложения:

```vue [app.vue]
<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
Как сменить локаль приложения пропсом `locale` — в руководстве. Локаль задаёт и формат даты и времени в компонентах Calendar, InputDate и InputTime.
:::

#vue
:::tip{to="/docs/getting-started/integrations/i18n/vue/#locale"}
Как сменить локаль приложения пропсом `locale` — в руководстве. Локаль задаёт и формат даты и времени в компонентах Calendar, InputDate и InputTime.
:::
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots
