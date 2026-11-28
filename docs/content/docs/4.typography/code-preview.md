---
title: ProseCodePreview
description: 'Фрагмент кода рядом с результатом: документация становится нагляднее.'
category: components
navigation.title: CodePreview
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CodePreview.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/code-preview
---

## Использование {#usage}

Компонент `code-preview` показывает любое содержимое с живым предпросмотром, а исходный код выводится через слот `code`.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full" label="Предпросмотр"}

::code-preview{class="[&>div]:*:my-0"}
`inline code`

#code

```mdc
`inline code`
```

::

#code

````mdc
::code-preview
`inline code`

#code
```mdc
`inline code`
```
::
````

::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
