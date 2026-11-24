---
title: useDevice
description: Определяет текущую платформу (мобильное или десктопное приложение Bitrix24, веб) и размер экрана по контрольным точкам Tailwind.
links:
  - label: useDevice
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useDevice.ts
  - label: plugin Platform
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/plugins/platform.ts
---

## Использование {#usage}

Композабл автоматически импортируется в Nuxt. Он объединяет определение платформы из плагина Bitrix с реактивными запросами размера экрана.

```vue
<script setup lang="ts">
const { isBitrixMobile, screen } = useDevice()
</script>
```

- Платформа определяется по заголовку `User‑Agent`{lang="ts-type"} и общая для всего приложения через `useState`{lang="ts-type"}.
- Флаги размера экрана построены на `useMediaQuery`{lang="ts-type"} из VueUse и реактивно обновляются при изменении области просмотра.

::note
На сервере флаги размера экрана по умолчанию равны `false`{lang="ts-type"}. Гидратация проходит корректно: в итоге значения подставляет клиент.
::

## API

Композабл возвращает объект со следующими свойствами:

### Платформа {#platform}

| Свойство | Тип | Описание |
|---|---|---|
| `platform`{lang="ts-type"} | `Readonly<{ name?: PlatformName, version?: string }>`{lang="ts-type"} | Исходное состояние платформы (только чтение)  |
| `version`{lang="ts-type"} | `ComputedRef<string \| undefined>`{lang="ts-type"} | Строка версии приложения Bitrix (если доступна) |
| `isWeb`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | `true` в обычном веб-браузере |
| `isBitrixMobile`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | `true` внутри мобильного приложения Bitrix24  |
| `isBitrixDesktop`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | `true` внутри десктопного приложения Bitrix24 |

### Экран {#screen}

Объект `screen` содержит реактивные флаги для каждой контрольной точки Tailwind (xs, sm, md, lg, xl, 2xl) и несколько удобных сокращений.

| Свойство | Тип | Описание |
|-------------------|--------------------------|-------------------------------------------------------------------------|
| `screen.current`{lang="ts-type"} | `ComputedRef<ScreenSize>`{lang="ts-type"} | Наименьшая активная контрольная точка: `'2xl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'` |
| `screen.xs`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина < 640px |
| `screen.sm`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 640px |
| `screen.md`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 768px |
| `screen.lg`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 1024px  |
| `screen.xl`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 1280px  |
| `screen['2xl']`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 1536px  |
| `screen.isMobile`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина < 768px (псевдоним `!screen.md`)  |
| `screen.isTablet`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина от 768px до 1023px (псевдоним `screen.md && !screen.lg`)  |
| `screen.isDesktop`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 1024px (псевдоним `screen.lg`)  |
| `screen.isLargeDesktop`{lang="ts-type"} | `ComputedRef<boolean>`{lang="ts-type"} | Ширина ≥ 1536px (псевдоним `screen['2xl']`) |

## Примеры {#example}

### Базовое использование: платформа и мобильный экран {#basic-usage-platform-and-mobile-screen}

::component-example
---
collapse: false
name: 'use-device-example'
---
::

### Условная отрисовка по текущей контрольной точке {#conditional-rendering-based-on-current-breakpoint}

::component-example
---
collapse: false
name: 'use-device-current-breakpoint-example'
---
::

### Флаги экрана в логике шаблона {#using-screen-flags-in-template-logic}

::component-example
---
collapse: false
name: 'use-device-screen-flags-in-template-logic-example'
---
::

### Вместе с классами Tailwind CSS {#combine-with-tailwind-css-classes}

[Плагин](https://github.com/bitrix24/b24ui/blob/main/src/runtime/plugins/platform.ts) уже добавляет тегу `<html>` атрибуты `data-platform` и `data-version`, поэтому в шаблонах можно сразу использовать [варианты Tailwind](https://github.com/bitrix24/b24ui/blob/09b6f208a51d85703770ac599b742c844259a0b3/src/runtime/index.css#L10) вроде `bitrix-mobile:`.

::component-example
---
collapse: false
name: 'use-device-with-tailwind-example'
---

## Примечания {#notes}

- Платформа определяется плагином Bitrix. Если плагин не установлен, `platform.name`{lang="ts-type"} будет `undefined`{lang="ts-type"}.
- Флаги размера экрана основаны на **контрольных точках Tailwind по умолчанию**. Изменить их нельзя.
- Все флаги размера экрана — `ComputedRef<boolean>`{lang="ts-type"}: их можно использовать прямо в шаблоне, и они реактивны.
