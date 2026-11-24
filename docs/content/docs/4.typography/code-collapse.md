---
title: ProseCodeCollapse
description: 'Сворачиваемые длинные блоки кода экономят место на странице.'
category: components
navigation.title: CodeCollapse
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/CodeCollapse.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/code-collapse
---

## Использование {#usage}

Компонент `code-collapse` превращает блок кода в сворачиваемый.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

::code-collapse{class="[&>div]:my-0"}

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@theme static {
  --font-sans: 'Public Sans', sans-serif;

  --breakpoint-3xl: 1920px;

  --color-green-50: #EFFDF5;
}
```

::

#code

````mdc
::code-collapse

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@bitrix24/b24ui-nuxt";

@theme static {
  --font-sans: 'Public Sans', sans-serif;

  --breakpoint-3xl: 1920px;

  --color-green-50: #EFFDF5;
}
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
