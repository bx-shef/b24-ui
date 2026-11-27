---
title: ProseCollapsible
description: 'Блок содержимого, который плавно сворачивается и разворачивается.'
category: components
navigation.title: Collapsible
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Collapsible.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/collapsible
---

## Использование {#usage}

Компонент `collapsible` показывает [Collapsible](/docs/components/collapsible/) в содержимом.

::code-preview{class="[&>div]:*:w-full [&>div]:*:my-0"}

::collapsible

| Пропс   | По умолчанию | Тип                   |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |

::

#code

```mdc
::collapsible

| Пропс   | По умолчанию | Тип                   |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |

::
```

::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
