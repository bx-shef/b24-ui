---
title: ProseTabs
description: 'Связанная информация во вкладках для удобной навигации по содержимому.'
category: components
navigation.title: Tabs
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Tabs.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/tabs
---

## Использование {#usage}

Компоненты `tabs` и `tabs-item` показывают [Tabs](/docs/components/tabs/) в содержимом.

::code-preview{class="[&>div]:*:my-0"}

:::tabs{class="w-full"}

:::tabs-item{label="Код"}

```mdc
::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::
```

:::

:::tabs-item{label="Предпросмотр"}

::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::

:::

:::

#code

````mdc
::tabs

:::tabs-item{label="Код"}

```mdc
::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::
```

:::

:::tabs-item{label="Предпросмотр"}

::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::

:::

::
````

::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

::component-theme{prose}
---
extra:
  - tabsItem
---
::
