---
title: ProseAccordion
description: 'Интерактивные переключатели для структурированной подачи содержимого.'
category: components
navigation.title: Accordion
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Accordion.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/accordion
---

## Использование {#usage}

Компоненты `accordion` и `accordion-item` показывают [Accordion](/docs/components/accordion/) в содержимом.

::code-preview{class="[&>div]:*:my-0"}

:::accordion
---
defaultValue:
  - '1'
---

::accordion-item{label="Можно ли использовать Bitrix24 UI бесплатно?"}
Да! Bitrix24 UI полностью бесплатна и распространяется с открытым исходным кодом по лицензии MIT. Все 130+ компонентов доступны каждому.
::

::accordion-item{label="Можно ли использовать Bitrix24 UI с Vue без Nuxt?"}
Да! Хотя библиотека оптимизирована для Nuxt, с отдельными проектами на Vue она отлично работает через наш плагин Vite. Начните с [руководства по установке](/docs/getting-started/installation/vue/).
::

::accordion-item{label="Готова ли Bitrix24 UI к использованию в продакшене?"}
Да! Bitrix24 UI используют в продакшене тысячи приложений: библиотека покрыта тестами, регулярно обновляется и активно поддерживается.
::

:::

#code

```mdc
::accordion
---
defaultValue:
  - '1'
---

::accordion-item{label="Можно ли использовать Bitrix24 UI бесплатно?"}
Да! Bitrix24 UI полностью бесплатна и распространяется с открытым исходным кодом по лицензии MIT. Все 130+ компонентов доступны каждому.
::

::accordion-item{label="Можно ли использовать Bitrix24 UI с Vue без Nuxt?"}
Да! Хотя библиотека оптимизирована для Nuxt, с отдельными проектами на Vue она отлично работает через наш плагин Vite. Начните с [руководства по установке](/docs/getting-started/installation/vue/).
::

::accordion-item{label="Готова ли Bitrix24 UI к использованию в продакшене?"}
Да! Bitrix24 UI используют в продакшене тысячи приложений: библиотека покрыта тестами, регулярно обновляется и активно поддерживается.
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

::component-theme{prose}
---
extra:
  - accordionItem
---
::
