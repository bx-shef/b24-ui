---
title: Kbd
description: 'Элемент kbd для обозначения ввода с клавиатуры.'
category: element
keywords:
  - keyboard shortcut
  - hotkey
  - keybinding
  - клавиша
  - горячие клавиши
  - сочетание клавиш
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Kbd.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/kbd
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/kbd
---

## Использование {#usage}

Слот по умолчанию задаёт значение Kbd.

::component-code
---
slots:
  default: K
---
::

### Значение {#value}

Пропс `value` задаёт значение Kbd.

::component-code
---
props:
  value: K
---
::

В пропс `value` можно передавать специальные клавиши, которые обрабатываются композаблом [`useKbd`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useKbd.ts). Например, клавиша `meta` отображается как `⌘` в macOS и как `Ctrl` на других платформах.

::component-code
---
props:
  value: meta
items:
  value:
    - meta
    - win
    - command
    - shift
    - ctrl
    - option
    - alt
    - enter
    - delete
    - backspace
    - escape
    - tab
    - capslock
    - arrowup
    - arrowright
    - arrowdown
    - arrowleft
    - pageup
    - pagedown
    - home
    - end
---
::

### Акцент {#accent}

Пропс `accent` меняет вариант Kbd.

::component-code
---
props:
  accent: accent
slots:
  default: K
---
::

### Размер {#size}

Пропс `size` меняет размер Kbd.

::component-code
---
props:
  size: lg
slots:
  default: K
---
::

## Примеры {#examples}

### Пропс `class` {#class-prop}

Пропс `class` переопределяет базовые стили Badge.

::component-code
---
props:
  class: 'text-(--ui-color-copilot-accent-primary) dark:text-(--ui-color-accent-main-warning) font-(--ui-font-weight-bold) rounded-full'
  accent: accent
slots:
  default: K
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
