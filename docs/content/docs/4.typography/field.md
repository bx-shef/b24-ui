---
title: ProseField
description: 'Подробная документация настраиваемых элементов API.'
category: components
navigation.title: Field
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Field.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/field
---

## Использование {#usage}

Поле, пропс или параметр для показа в содержимом.

::code-preview
::field{name="name" type="string" required class="w-full"}
`description` можно задать пропсом или в слоте по умолчанию — с полной поддержкой **markdown**.
::

#code

```mdc
::field{name="name" type="string" required}
`description` можно задать пропсом или в слоте по умолчанию — с полной поддержкой **markdown**.
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
