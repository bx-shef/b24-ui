---
title: DropdownMenu
description: 'Контекстное меню действий, которое открывается по щелчку на элементе.'
category: overlay
keywords:
  - menu
  - context menu
  - actions
  - выпадающее меню
  - контекстное меню
  - действия
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DropdownMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/dropdown-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dropdown-menu
  - label: DropdownMenu
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dropdown-menu
---

## Использование {#usage}

Поместите в слот по умолчанию DropdownMenu компонент [Button](/docs/components/button/) или любой другой.

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
  - DropdownMenuItem[][]
props:
  items:
    - - label: Bitrix24
        avatar:
          src: 'https://github.com/bitrix24.png'
          loading: lazy
        type: label
    - - label: Профиль
      - label: Оплата
      - label: Настройки
        kbds:
          - ','
      - label: Горячие клавиши
    - - label: Команда
        filter:
          placeholder: 'Найти участника...'
        children:
          - - label: Bitrix24
              avatar:
                src: 'https://github.com/bitrix24.png'
                loading: lazy
            - label: Bitrix
              avatar:
                src: 'https://github.com/bitrix-tools.png'
                loading: lazy
      - label: Пригласить пользователей
        children:
          - - label: Почта
            - label: Сообщение
          - - label: Ещё
              children:
                - label: Импорт из Slack
                - label: Импорт из Trello
                - label: Импорт из Asana
      - label: Новая команда
        kbds:
          - meta
          - n
    - - label: GitHub
        to: 'https://github.com/bitrix24/b24ui'
        target: _blank
      - label: Поддержка
        to: '/docs/components/dropdown-menu/'
      - label: API
        disabled: true
    - - label: Выйти
        color: air-primary-alert
        kbds:
          - shift
          - meta
          - q
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{lang="ts-type"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{lang="ts-type"}](#with-checkbox-items)
- [`color?: "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-copilot" | "air-primary-warning" `{lang="ts-type"}](#with-color-items)
- [`checked?: boolean`{lang="ts-type"}](#with-checkbox-items)
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- [`onUpdateChecked?: (checked: boolean) => void`{lang="ts-type"}](#with-checkbox-items)
- `children?: DropdownMenuItem[] | DropdownMenuItem[][]`{lang="ts-type"}
- [`filter?: boolean | InputProps`{lang="ts-type"}](#with-filter-items)
- `filterFields?: string[]`{lang="ts-type"}
- `ignoreFilter?: boolean`{lang="ts-type"}
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
  - DropdownMenuItem[][]
props:
  items:
    - - label: Bitrix24
        avatar:
          src: 'https://github.com/bitrix24.png'
          loading: lazy
        type: label
    - - label: Профиль
      - label: Оплата
      - label: Настройки
        kbds:
          - ','
      - label: Горячие клавиши
    - - label: Команда
      - label: Пригласить пользователей
        children:
          - - label: Почта
            - label: Сообщение
          - - label: Ещё
              children:
                - label: Импорт из Slack
                - label: Импорт из Trello
                - label: Импорт из Asana
      - label: Новая команда
        kbds:
          - meta
          - n
    - - label: GitHub
        to: 'https://github.com/bitrix24/b24ui'
        target: _blank
      - label: Поддержка
        to: '/docs/components/dropdown-menu/'
      - label: API
        disabled: true
    - - label: Выйти
        kbds:
          - shift
          - meta
          - q
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

::note
Чтобы получить отдельные группы элементов, передайте в `items` массив массивов.
::

::tip
Чтобы создать вложенное меню, элемент может содержать массив `children` с такими же свойствами, как у `items`. Вложенным меню можно управлять через свойства `open`, `defaultOpen` и `content`.
::

### Содержимое {#content}

Пропс `content` управляет отрисовкой содержимого DropdownMenu: например, его `align` или `side`.

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
  - DropdownMenuItem[]
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  items:
    - label: Профиль
    - label: Оплата
    - label: Настройки
  content:
    align: start
    side: bottom
    sideOffset: 8
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

### Фильтр {#filter}

Пропс `filter` показывает внутри DropdownMenu поле фильтра. По умолчанию `false`.

::note{to="#with-ignore-filter"}
Пропс `ignore-filter` отключает встроенный поиск, и вы используете свою логику поиска.
::

::note{to="#with-filter-fields"}
Пропс `filter-fields` задаёт поля, по которым идёт фильтрация. По умолчанию используется пропс `labelKey`.
::

Поле фильтра можно настроить любым свойством компонента [Input](/docs/components/input/).

::component-code
---
prettier: true
collapse: true
ignore:
  - filter
  - items
  - content.align
  - b24ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[]
props:
  items:
    - label: Профиль
    - label: Оплата
    - label: Настройки
    - label: Команда
    - label: Пригласить пользователей
    - label: Новая команда
  filter: true
  content:
    align: start
  b24ui:
    content: 'w-48'
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

::tip{to="#with-filter-items"}
Фильтр можно включить и в отдельных вложенных меню: для этого используйте поле `filter` у элементов с `children`.
::

### Стрелка {#arrow}

Пропс `arrow` показывает у DropdownMenu стрелку.

::component-code
---
prettier: true
collapse: true
ignore:
  - arrow
  - items
  - b24ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[]
props:
  arrow: true
  items:
    - label: Профиль
    - label: Оплата
    - label: Настройки
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

### Модальный режим {#modal}

Пропс `modal` определяет, блокирует ли DropdownMenu взаимодействие с контентом вне меню. По умолчанию `true`.

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
  - DropdownMenuItem[]
props:
  modal: false
  items:
    - label: Профиль
    - label: Оплата
    - label: Настройки
  b24ui:
    content: 'w-48'
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

### Отключение {#disabled}

Пропс `disabled` отключает DropdownMenu.

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
  - DropdownMenuItem[]
props:
  disabled: true
  items:
    - label: Профиль
    - label: Оплата
    - label: Настройки
  b24ui:
    content: 'w-48'
slots:
  default: |

    <B24Button label="Открыть" />
---

:b24-button{label="Открыть"}
::

## Примеры {#examples}

### С чекбоксами {#with-checkbox-items}

Свойство `type` со значением `checkbox` вместе со свойствами `checked` и `onUpdateChecked` управляет отмеченным состоянием элемента.

::component-example
---
collapse: true
name: 'dropdown-menu-checkbox-items-example'
---
::

::note
Чтобы состояние `checked` у элементов было реактивным, оберните массив `items` в `computed`.
::

### С цветом {#with-color-items}

Свойство `color` выделяет отдельные элементы цветом.

::component-example
---
collapse: true
name: 'dropdown-menu-color-items-example'
---
::

### С фильтром во вложенных меню {#with-filter-items}

Свойство `filter` у элементов с `children` показывает поле фильтра внутри вложенного меню.

::component-example
---
collapse: true
name: 'dropdown-menu-filter-items-example'
---
::

### Управление состоянием открытия {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
collapse: true
name: 'dropdown-menu-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) DropdownMenu открывается и закрывается клавишей :kbd{value="O"}.
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
collapse: true
name: 'dropdown-menu-custom-slot-example'
---
::

::tip{to="#slots"}
Слоты `#item`, `#item-leading`, `#item-label` и `#item-trailing` настраивают сразу все элементы.
::

### С переключателем в элементах {#with-switch-in-items}

Свойство `slot` со слотом `#{{ slot }}-trailing` показывает внутри элемента [Switch](/docs/components/switch/).

::component-example
---
collapse: true
name: 'dropdown-menu-switch-items-example'
---
::

### Игнорирование фильтра {#with-ignore-filter}

Если используется пропс `filter` или поле `filter` у элементов с `children`, пропс `ignore-filter` со значением `true` отключает встроенный поиск, и вы используете свою логику поиска.

::component-example
---
collapse: true
name: 'dropdown-menu-ignore-filter-example'
---
::

::note
В этом примере [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) откладывает вызовы API. Загрузка отложена через `immediate: false`, поэтому пока меню не открыто, запросов нет.
::

### Поля фильтра {#with-filter-fields}

Если используется пропс `filter` или поле `filter` у элементов с `children`, пропс `filter-fields` задаёт массив полей, по которым идёт фильтрация. По умолчанию `[labelKey]`.

::component-example
---
collapse: true
name: 'dropdown-menu-filter-fields-example'
---
::

### Ширина содержимого по триггеру {#with-trigger-content-width}

Чтобы растянуть содержимое на всю ширину кнопки, добавьте класс `w-(--reka-dropdown-menu-trigger-width)` в `b24ui.content`, а классы `min-w-(--reka-dropdown-menu-trigger-width) w-(--reka-dropdown-menu-trigger-width)` — в слот `b24ui.viewport`.

::component-example
---
collapse: true
name: 'dropdown-menu-content-width-example'
---
::

### Извлечение сочетаний клавиш {#extract-shortcuts}

Утилита [extractShortcuts](/docs/composables/extract-shortcuts/) автоматически определяет сочетания клавиш из элементов меню со свойством `kbds`. Она обходит меню рекурсивно и возвращает объект, совместимый с [defineShortcuts](/docs/composables/define-shortcuts/).
```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'

const items: DropdownMenuItem[] = [{
  label: 'Invite users',
  children: [{
    label: 'Invite by email',
    kbds: ['meta', 'e'],
    onSelect() {
      console.log('Invite by email clicked')
    }
  }, {
    label: 'Invite by link',
    kbds: ['meta', 'i'],
    onSelect() {
      console.log('Invite by link clicked')
    }
  }]
}, {
  label: 'New team',
  kbds: ['meta', 'n'],
  onSelect() {
    console.log('New team clicked')
  }
}]

defineShortcuts(extractShortcuts(items))
</script>
```

::note
В этом примере сочетания :kbd{value="meta"} :kbd{value="E" class="ms-px"}, :kbd{value="meta"} :kbd{value="I" class="ms-px"} и :kbd{value="meta"} :kbd{value="N" class="ms-px"} вызывают функцию `select` соответствующего элемента.
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
