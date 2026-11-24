---
title: defineShortcuts
description: 'Композабл для назначения горячих клавиш в приложении.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/defineShortcuts.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/define-shortcuts
---

## Использование {#usage}

Автоимпортируемый композабл `defineShortcuts` задаёт горячие клавиши.

```vue
<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  meta_k: () => {
    open.value = !open.value
  }
})
</script>
```

- На платформах, отличных от macOS, сочетания подстраиваются автоматически: `meta` заменяется на `ctrl`.
- Для обработки нажатий (`keydown`) композабл использует [`useEventListener`](https://vueuse.org/core/useEventListener/) из VueUse.
- Полный список доступных клавиш — в документации API [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values). Клавишу нужно писать строчными буквами.

::tip{to="/docs/components/kbd/"}
Как показывать горячие клавиши в компонентах — в документации компонента **Kbd**.
::

## API

`defineShortcuts(config: MaybeRef<ShortcutsConfig>, options?: ShortcutsOptions): () => void`{lang="ts-type"}

Задаёт горячие клавиши приложения. Возвращает функцию, которая снимает обработчик: она нужна, если сочетания надо отключить до размонтирования компонента.

### Параметры {#parameters}

::field-group

  ::field{name="config" type="MaybeRef<ShortcutsConfig>" required}
  Объект, где ключи описывают сочетания, а значения — функции-обработчики или объекты конфигурации сочетания. Передайте `ref`, чтобы обновлять сочетания реактивно. Значение `false`, `null` или `undefined` пропускает сочетание — так его можно включать по условию.
  ::

  ::field{name="options" type="ShortcutsOptions"}
  Необязательные настройки поведения сочетаний.

    ::collapsible
  
      ::field{name="chainDelay" type="number"}
      Задержка между нажатиями, при которой сочетание считается последовательностью. По умолчанию `800`.
      ::
  
      ::field{name="layoutIndependent" type="boolean"}
      Если включено, сочетания работают одинаково в разных раскладках клавиатуры (арабской, ивритской): сравниваются физические позиции клавиш, а не символы.
      - `false` (по умолчанию): сравнение по символу через `e.key` (зависит от раскладки)
      - `true`: сравнение по физической клавише через `e.code` (не зависит от раскладки)
      ::
    ::
  ::
::

#### Описание сочетания {#shortcut-definition}

Сочетания записываются в таком формате:

- Одна клавиша: `'a'`, `'b'`, `'1'`, `'?'` и т. д.
- Комбинации клавиш: клавиши разделяются знаком `_`, например `'meta_k'`, `'ctrl_shift_f'`
- Последовательности клавиш: клавиши разделяются знаком `-`, например `'g-d'`

#### Модификаторы {#modifiers}

- `meta` / `command`: `⌘ Command` на macOS и `Ctrl` на остальных платформах
- `ctrl`: `Ctrl` на всех платформах
- `shift`: Используется для буквенных клавиш, когда нужен Shift
- `alt` / `option`: `⌥ Option` на macOS и `Alt` на остальных платформах. Сравнивается по физической позиции клавиши, потому что на macOS Option меняет символ

#### Специальные клавиши {#special-keys}

Специальные клавиши задаются такими именами.

- `escape`: срабатывает на Esc
- `enter`: срабатывает на Enter
- `arrowleft`, `arrowright`, `arrowup`, `arrowdown`: срабатывают на соответствующие стрелки
- `tab`: срабатывает на Tab
- `backspace`: срабатывает на Backspace
- `delete`: срабатывает на Delete
- `space`: срабатывает на пробел. Требует `layoutIndependent`, если не используется вместе с `alt`

#### Конфигурация сочетания {#shortcut-configuration}

Каждое сочетание задаётся функцией или объектом со следующими свойствами:

`interface ShortcutConfig { handler: (e?: KeyboardEvent) => void; usingInput?: boolean | string }`{lang="ts-type"}

#### Параметры {#parameters-1}

::field-group
  ::field{name="handler" type="() => void" required}
  Функция, которая вызывается при срабатывании сочетания.
  ::

  ::field{name="usingInput" type="boolean | string"}
  Определяет, когда сочетание срабатывает, в зависимости от фокуса в поле ввода:
  - `false` (по умолчанию): сочетание срабатывает, только если фокус не в поле ввода
  - `true`: сочетание срабатывает, даже когда фокус в любом поле ввода
  - `string`: сочетание срабатывает, только когда в фокусе поле с указанным именем
  ::
::

## Примеры {#examples}

### Базовое использование {#basic-usage}

```vue
<script setup lang="ts">
defineShortcuts({
  '?': () => openHelpModal(),
  'meta_k': () => openCommandPalette(),
  'g-d': () => navigateToDashboard()
})
</script>
```

### С учётом фокуса в поле ввода {#with-input-focus-handling}

`usingInput` запускает сочетание только при фокусе в нужном поле ввода.

```vue
<template>
  <B24Input v-model="query" name="queryInput" />
</template>

<script setup lang="ts">
const query = ref('')

defineShortcuts({
  enter: {
    usingInput: 'queryInput',
    handler: () => performSearch()
  },
  escape: {
    usingInput: true,
    handler: () => clearSearch()
  }
})
</script>
```

### Извлечение сочетаний из пунктов меню {#extracting-shortcuts-from-menu-items}

Утилита `extractShortcuts` автоматически задаёт сочетания по пунктам меню.

::tip{to="/docs/composables/extract-shortcuts/"}
Подробнее об утилите **extractShortcuts**.
::
