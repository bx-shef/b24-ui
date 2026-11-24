---
title: ProsePrompt
description: 'Готовые ИИ-промпты с копированием в один клик и интеграцией с IDE.'
category: components
navigation.title: Prompt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/prose/Prompt.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/typography/prompt
---

## Использование {#usage}

Компонент `prompt` показывает готовый ИИ-промпт, который пользователь может скопировать в буфер обмена или открыть прямо в IDE.

### Prompt :badge{label="2.15+" class="align-text-top"}

Пропс `prompt` задаёт копируемый текст, а пропс `description` — видимую подпись.

::component-code{slug="prompt" prose}
---
ignore:
  - prompt
hide:
  - class
props:
  description: Build a dashboard layout with Bitrix24 UI.
  class: 'w-full my-0'
  prompt: |
    You are a Bitrix24 UI expert. Help me build a dashboard layout with a collapsible sidebar and a sticky top navbar.

    Requirements:
    - Use `B24DashboardPanel`, `B24DashboardSidebar`, and `B24DashboardNavbar`
    - Use semantic color tokens like `bg-elevated` and `text-muted` for theming
    - The sidebar should include navigation links with icons using `B24NavigationMenu`
    - The navbar should display a search button, and a user dropdown menu
    - The layout must be fully responsive and collapse the sidebar on mobile
---
::

::note
Промпт можно записать и в слоте по умолчанию. Тогда копируется его отрисованный текст, а блочные элементы превращаются в переносы строк; чтобы скопировать текст в точности как написан, используйте пропс `prompt`.
::

### Действия {#actions}

Пропс `actions` показывает дополнительные кнопки. Кнопка `copy` показывается всегда. Доступные действия: `cursor`, `windsurf` и `claude`.

::component-code{slug="prompt" prose}
---
ignore:
  - description
  - prompt
hide:
  - class
props:
  description: Add a color mode toggle.
  actions:
    - cursor
    - claude
  class: 'w-full my-0'
  prompt: |
    Add a color mode toggle to my Nuxt app.

    Requirements:
    - Use `useColorMode` from `'@bitrix24/b24ui-nuxt/composables` to manage the current mode
    - Render a `B24Button` with `color="air-tertiary"` that cycles between `light`, `dark`, and `system` on click
    - Update the button icon dynamically: `SunIconAir` for light, `MoonIconAir` for dark, `ScreenIcon` for system
    - Add a tooltip using `B24Tooltip` that shows the current active mode
---
::

## API

### Пропсы {#props}

:component-props{prose}

### Слоты {#slots}

:component-slots{prose}

## Тема {#theme}

:component-theme{prose}
