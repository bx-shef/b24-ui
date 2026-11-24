---
title: ContextMenu
description: 'Всплывающее меню, которое открывается по правому щелчку на элементе и показывает доступные действия.'
category: overlay
keywords:
  - right click menu
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ContextMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/context-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/context-menu
  - label: ContextMenu
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/context-menu
---

## Использование {#usage}

Поместите в слот по умолчанию ContextMenu любой контент и щёлкните по нему правой кнопкой, чтобы открыть меню.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
external:
  - items
externalTypes:
  - ContextMenuItem[][]
props:
  items:
    - - label: Оформление
        children:
          - label: Системная
          - label: Светлая
          - label: Тёмная
    - - label: Показать боковую панель
        kbds:
          - meta
          - s
      - label: Показать панель инструментов
        kbds:
          - shift
          - meta
          - d
      - label: Свернуть закреплённые вкладки
        disabled: true
    - - label: Обновить страницу
      - label: Очистить cookie и обновить
      - label: Очистить кэш и обновить
      - type: separator
      - label: Разработчик
        children:
          - - label: Исходный код
              kbds:
                - meta
                - shift
                - u
            - label: Инструменты разработчика
              kbds:
                - option
                - meta
                - i
            - label: Просмотр кода элемента
              kbds:
                - option
                - meta
                - c
          - - label: Консоль JavaScript
              kbds:
                - option
                - meta
                - j
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) bg-default text-(length:--ui-font-size-sm) aspect-video w-72">
      Щёлкните правой кнопкой здесь
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) bg-default text-(length:--ui-font-size-sm) aspect-video w-72"}[Щёлкните правой кнопкой здесь]
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{lang="ts-type"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{lang="ts-type"}](#with-checkbox-items)
- [`color?: ContextMenu['color']"`{lang="ts-type"}](#with-color-items)
- [`checked?: boolean`{lang="ts-type"}](#with-checkbox-items)
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- [`onUpdateChecked?: (checked: boolean) => void`{lang="ts-type"}](#with-checkbox-items)
- `children?: ContextMenuItem[] | ContextMenuItem[][]`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props): `to`, `target` и другие.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
  - b24ui.content
external:
  - items
externalTypes:
  - ContextMenuItem[][]
props:
  items:
    - - label: Оформление
        children:
          - label: Системная
          - label: Светлая
          - label: Тёмная
    - - label: Показать боковую панель
        kbds:
          - meta
          - s
      - label: Показать панель инструментов
        kbds:
          - shift
          - meta
          - d
      - label: Свернуть закреплённые вкладки
        disabled: true
    - - label: Обновить страницу
      - label: Очистить cookie и обновить
      - label: Очистить кэш и обновить
      - type: separator
      - label: Разработчик
        children:
          - - label: Исходный код
              kbds:
                - meta
                - shift
                - u
            - label: Инструменты разработчика
              kbds:
                - option
                - meta
                - i
            - label: Просмотр кода элемента
              kbds:
                - option
                - meta
                - c
          - - label: Консоль JavaScript
              kbds:
                - option
                - meta
                - j
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Щёлкните правой кнопкой здесь
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-default aspect-video w-72"}[Щёлкните правой кнопкой здесь]
::

::note
Чтобы получить отдельные группы элементов, передайте в `items` массив массивов.
::

::tip
Чтобы создать вложенное меню, элемент может содержать массив `children` с такими же свойствами, как у `items`. Вложенным меню можно управлять через свойства `open`, `defaultOpen` и `content`.
::

### Модальный режим {#modal}

Пропс `modal` определяет, блокирует ли ContextMenu взаимодействие с контентом вне меню. По умолчанию `true`.

::component-code
---
prettier: true
ignore:
  - items
  - b24ui.content
external:
  - items
externalTypes:
  - ContextMenuItem[]
props:
  modal: false
  items:
    - label: Системная
    - label: Светлая
    - label: Тёмная
  b24ui:
    content: 'w-48'
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Щёлкните правой кнопкой здесь
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-default aspect-video w-72"}[Щёлкните правой кнопкой здесь]
::

### Отключение {#disabled}

Пропс `disabled` отключает ContextMenu.

::component-code
---
collapse: true
prettier: true
ignore:
  - items
  - b24ui.content
external:
  - items
externalTypes:
  - ContextMenuItem[]
props:
  disabled: true
  items:
    - label: Системная
    - label: Светлая
    - label: Тёмная
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-default aspect-video w-72">
      Щёлкните правой кнопкой здесь
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-default aspect-video w-72"}[Щёлкните правой кнопкой здесь]
::

## Примеры {#examples}

### С чекбоксами {#with-checkbox-items}

Свойство `type` со значением `checkbox` вместе со свойствами `checked` и `onUpdateChecked` управляет отмеченным состоянием элемента.

::component-example
---
collapse: true
name: 'context-menu-checkbox-items-example'
---
::

::note
Чтобы состояние `checked` у элементов было реактивным, оберните массив `items` в `computed`.
::

### С цветом {#with-color-items}

Свойство `color` выделяет отдельные элементы цветом.

::component-example
---
name: 'context-menu-color-items-example'
collapse: true
---
::

### Управление состоянием открытия :badge{label="2.15+" class="align-text-top"} {#control-open-state}

Состоянием открытия управляет директива `v-model:open`. Если меню открыто программно, оно привязывается к триггеру, а не к курсору.

::component-example
---
collapse: true
name: 'context-menu-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) ContextMenu переключается клавишей :kbd{value="O"}.
::

### Свой слот {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент.

Вам будут доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}

::component-example
---
name: 'context-menu-custom-slot-example'
collapse: true
---
::

::tip{to="#slots"}
Слоты `#item`, `#item-leading`, `#item-label` и `#item-trailing` настраивают сразу все элементы.
::

### Извлечение сочетаний клавиш {#extract-shortcuts}

Утилита [extractShortcuts](/docs/composables/extract-shortcuts/) автоматически определяет сочетания клавиш из элементов меню со свойством `kbds`. Она обходит меню рекурсивно и возвращает объект, совместимый с [defineShortcuts](/docs/composables/define-shortcuts/).

```vue
<script setup lang="ts">
const items = [
  [{
    label: 'Show Sidebar',
    kbds: ['meta', 'S'],
    onSelect() {
      console.log('Show Sidebar clicked')
    }
  }, {
    label: 'Show Toolbar',
    kbds: ['shift', 'meta', 'D'],
    onSelect() {
      console.log('Show Toolbar clicked')
    }
  }, {
    label: 'Collapse Pinned Tabs',
    disabled: true
  }], [{
    label: 'Refresh the Page'
  }, {
    label: 'Clear Cookies and Refresh'
  }, {
    label: 'Clear Cache and Refresh'
  }, {
    type: 'separator' as const
  }, {
    label: 'Developer',
    children: [[{
      label: 'View Source',
      kbds: ['option', 'meta', 'U'],
      onSelect() {
        console.log('View Source clicked')
      }
    }, {
      label: 'Developer Tools',
      kbds: ['option', 'meta', 'I'],
      onSelect() {
        console.log('Developer Tools clicked')
      }
    }], [{
      label: 'Inspect Elements',
      kbds: ['option', 'meta', 'C'],
      onSelect() {
        console.log('Inspect Elements clicked')
      }
    }], [{
      label: 'JavaScript Console',
      kbds: ['option', 'meta', 'J'],
      onSelect() {
        console.log('JavaScript Console clicked')
      }
    }]]
  }]
]

defineShortcuts(extractShortcuts(items))
</script>
```

::note
В этом примере сочетания :kbd{value="meta"} :kbd{value="S" class="ms-px"}, :kbd{value="shift"} :kbd{value="meta" class="ms-px"} :kbd{value="D" class="ms-px"}, :kbd{value="option"} :kbd{value="meta" class="ms-px"} :kbd{value="U" class="ms-px"}, :kbd{value="option"} :kbd{value="meta" class="ms-px"} :kbd{value="I" class="ms-px"}, :kbd{value="option"} :kbd{value="meta" class="ms-px"} :kbd{value="C" class="ms-px"} и :kbd{value="option"} :kbd{value="meta" class="ms-px"} :kbd{value="J" class="ms-px"} вызывают функцию `select` соответствующего элемента.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
