---
title: ProseCard
description: 'Заметные блоки содержимого со встроенной навигацией.'
category: components
navigation.title: Card
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Card.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/card
---

## Использование {#usage}

Markdown в слоте по умолчанию компонента `card` выделяет содержимое.

Пропсы `title`, `icon` и `color` настраивают карточку. Также можно передать любые свойства компонента [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link).

::component-code{slug="card" prose}
---
hide:
  - class
ignore:
  - target
props:
  class: 'my-0 w-96'
  title: Startup
  color: air-primary
  to: 'https://www.bitrix24.com/prices/'
  target: '_blank'
slots:
  default: Best suited for small teams, startups and agencies with up to 5 developers.
---

Best suited for small teams, startups and agencies with up to 5 developers.
::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
