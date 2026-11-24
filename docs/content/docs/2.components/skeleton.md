---
title: Skeleton
description: 'Заглушка-плейсхолдер на время загрузки содержимого.'
category: element
keywords:
  - shimmer
  - ghost loader
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Skeleton.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/skeleton
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/skeleton
---

## Использование {#usage}

Skeleton без настроек показывает плейсхолдер.

:component-example{name="skeleton-example"}

### Акцент {#accent}

Пропс `accent` меняет вариант Skeleton.

::component-example
---
name: 'skeleton-accent-example'
---
::

## Примеры {#examples}

### Пример посложнее {#something-more-complex}

Пример индикатора загрузки для формы создания задачи.

::component-example
---
name: 'skeleton-task-example'
collapse: true
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
