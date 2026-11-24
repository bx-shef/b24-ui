---
title: ProseFieldGroup
description: 'Логически связанные поля в группе для полной документации API.'
category: components
navigation.title: FieldGroup
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/FieldGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/field-group
---

## Использование {#usage}

Объединяет поля в список.

::code-preview

::field-group{class="my-0"}

  ::field{name="analytics" type="boolean"}
  По умолчанию `false`. Включает аналитику для проекта.
  ::

  ::field{name="blob" type="boolean"}
  По умолчанию `false`. Включает blob-хранилище для статических ресурсов: изображений, видео и т. п.
  ::

  ::field{name="cache" type="boolean"}
  По умолчанию `false`. Включает кеш-хранилище для кеширования ответов серверных маршрутов и функций через `cachedEventHandler` и `cachedFunction` из Nitro
  ::

  ::field{name="database" type="boolean"}
  По умолчанию `false`. Включает SQL-базу данных для хранения данных приложения.
  ::

::

#code

```mdc
::field-group
  ::field{name="analytics" type="boolean"}
    По умолчанию `false`. Включает аналитику для проекта.
  ::

  ::field{name="blob" type="boolean"}
    По умолчанию `false`. Включает blob-хранилище для статических ресурсов: изображений, видео и т. п.
  ::

  ::field{name="cache" type="boolean"}
    По умолчанию `false`. Включает кеш-хранилище для кеширования ответов серверных маршрутов и функций через `cachedEventHandler` и `cachedFunction` из Nitro
  ::

  ::field{name="database" type="boolean"}
    По умолчанию `false`. Включает SQL-базу данных для хранения данных приложения.
  ::
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
