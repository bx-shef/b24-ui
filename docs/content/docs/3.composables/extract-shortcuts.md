---
title: extractShortcuts
description: 'Утилита для извлечения горячих клавиш из пунктов меню.'
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/defineShortcuts.ts
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/composables/extract-shortcuts
---

## Использование {#usage}

Автоимпортируемая утилита `extractShortcuts` задаёт горячие клавиши по пунктам меню. Она извлекает сочетания из компонентов вроде [DropdownMenu](/docs/components/dropdown-menu/), [ContextMenu](/docs/components/context-menu/) или [CommandPalette](/docs/components/command-palette/), у пунктов которых задано `kbds`.

```vue
<script setup lang="ts">
const items = [{
  label: 'Save',
  kbds: ['meta', 'S'],
  onSelect() {
    save()
  }
}, {
  label: 'Copy',
  kbds: ['meta', 'C'],
  onSelect() {
    copy()
  }
}]

defineShortcuts(extractShortcuts(items))
</script>
```

::tip{to="/docs/composables/define-shortcuts/"}
Подробнее о горячих клавишах — в документации композабла **defineShortcuts**.
::

## API

`extractShortcuts(items: any[] | any[][], separator?: '_' | '-'): ShortcutsConfig`{lang="ts-type"}

Извлекает горячие клавиши из массива пунктов меню и возвращает конфигурацию, совместимую с `defineShortcuts`.

#### Параметры {#parameters}

::field-group

  ::field{name="items" type="any[] | any[][]" required}
  Массив пунктов меню (или вложенных массивов) с описанием сочетаний. У каждого пункта могут быть такие свойства:

    ::collapsible
  
      ::field-group
  
        ::field{name="kbds" type="string[]"}
        Массив клавиш, из которых состоит сочетание (например, `['meta', 'S']`).
        ::
  
        ::field{name="onSelect" type="() => void"}
        Функция, которая вызывается при срабатывании сочетания.
        ::
  
        ::field{name="onClick" type="() => void"}
        Запасная функция (используется, если `onSelect` не задан).
        ::
  
        ::field{name="children" type="any[]"}
        Вложенные пункты меню, из которых сочетания извлекаются рекурсивно.
        ::
  
        ::field{name="items" type="any[]"}
        Альтернативное свойство для вложенных пунктов меню.
        ::
      ::
    ::
  ::

  ::field{name="separator" type="'_' | '-'"}
  Разделитель клавиш. `'_'` — для комбинаций (например, `meta_k`), `'-'` — для последовательностей (например, `g-d`). По умолчанию `'_'`.
  ::
::

**Возвращает:** объект `ShortcutsConfig`, который можно сразу передать в `defineShortcuts`.

## Примеры {#examples}

### Вложенные пункты {#with-nested-items}

Утилита рекурсивно обходит свойства `children` и `items` и извлекает сочетания из вложенных меню.

```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'

const items: DropdownMenuItem[][] = [[{
  label: 'Edit',
  kbds: ['E'],
  onSelect() {
    edit()
  }
}, {
  label: 'Duplicate',
  kbds: ['D'],
  onSelect() {
    duplicate()
  }
}], [{
  label: 'Invite users',
  children: [[{
    label: 'Invite by email',
    kbds: ['meta', 'E'],
    onSelect() {
      inviteByEmail()
    }
  }, {
    label: 'Invite by link',
    kbds: ['meta', 'I'],
    onSelect() {
      inviteByLink()
    }
  }]]
}], [{
  label: 'Delete',
  kbds: ['meta', 'backspace'],
  onSelect() {
    remove()
  }
}]]

defineShortcuts(extractShortcuts(items))
</script>

<template>
  <B24DropdownMenu :items="items">
    <B24Button label="Actions" />
  </B24DropdownMenu>
</template>
```

### Последовательности клавиш {#with-key-sequences}

Параметр `separator` создаёт последовательности клавиш вместо комбинаций.

```vue
<script setup lang="ts">
const items = [{
  label: 'Go to Dashboard',
  kbds: ['G', 'D'],
  onSelect() {
    navigateTo('/dashboard')
  }
}, {
  label: 'Go to Settings',
  kbds: ['G', 'S'],
  onSelect() {
    navigateTo('/settings')
  }
}]

// Разделитель '-' создаёт последовательности: 'g-d', 'g-s'
defineShortcuts(extractShortcuts(items, '-'))
</script>
```
