---
title: CommandPalette
description: 'Командная палитра с поиском на базе Fuse.js: быстрый нечёткий поиск по тексту.'
category: navigation
keywords:
  - command menu
  - cmdk
  - spotlight
  - global search
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/CommandPalette.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/command-palette
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/command-palette
  - label: Fuse.js
    avatar:
      src: /b24ui/avatar/fuse.svg
    to: https://fusejs.io/
    target: _blank
  - label: Listbox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/listbox
---

## Использование {#usage}

Директива `v-model` управляет значением CommandPalette, а пропс `default-value` задаёт начальное значение, если состоянием управлять не нужно.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - class
external:
  - groups
  - modelValue
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  modelValue: {}
  autofocus: false
  groups:
    - id: 'users'
      label: 'Пользователи'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
            loading: lazy
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
            loading: lazy
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
            loading: lazy
  class: 'flex-1'
---
::

::tip{to="#control-selected-items"}
Выбранные элементы можно отслеживать и через событие `@update:model-value`.
::

### Группы {#groups}

CommandPalette фильтрует группы и ранжирует подходящие команды по релевантности по мере ввода. Поиск мгновенный и динамический, что упрощает поиск команд. Пропс `groups` — массив объектов со свойствами:

- `id: string`{lang="ts-type"}
- `label?: string`{lang="ts-type"}
- `slot?: string`{lang="ts-type"}
- `items?: CommandPaletteItem[]`{lang="ts-type"}
- [`ignoreFilter?: boolean`{lang="ts-type"}](#with-ignore-filter)
- [`postFilter?: (searchTerm: string, items: T[]) => T[]`{lang="ts-type"}](#with-post-filtered-items)
- `highlightedIcon?: IconComponent`{lang="ts-type"}

::caution
У каждой группы должен быть `id`, иначе группа игнорируется.
::

В каждой группе есть массив `items` — объекты, описывающие команды. У элемента могут быть свойства:

- `prefix?: string`{lang="ts-type"}
- `label?: string`{lang="ts-type"}
- `suffix?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `chip?: ChipProps`{lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{lang="ts-type"}
- `active?: boolean`{lang="ts-type"}
- `loading?: boolean`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `placeholder?: string`{lang="ts-type"}
- `children?: CommandPaletteItem[]`{lang="ts-type"}
- `labelHtml?: string`{lang="ts-type"}
- `suffixHtml?: string`{lang="ts-type"}
- `descriptionHtml?: string`{lang="ts-type"}
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelPrefix?: ClassNameValue, itemLabelBase?: ClassNameValue, itemLabelSuffix?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue, itemTrailingHighlightedIcon?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props): `to`, `target` и другие.

::caution
`labelHtml`, `suffixHtml` и `descriptionHtml` вставляются через `v-html`. Обычно палитра сама вычисляет их по совпадению с поиском: всё экранируется, найденный фрагмент оборачивается в `<mark>`. Значение, заданное вручную, этот шаг пропускает и отрисовывается как сырой HTML. Очищайте всё, что приходит из CMS, API или от пользователей, прежде чем передавать сюда.
::

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - class
external:
  - groups
  - modelValue
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  modelValue: {}
  autofocus: false
  groups:
    - id: 'users'
      label: 'Пользователи'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
            loading: lazy
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
            loading: lazy
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
            loading: lazy
  class: 'flex-1'
---
::

::tip{to="#with-children-in-items"}
Чтобы создать подменю, элемент может содержать массив `children` с такими же свойствами:
::

### Множественный выбор {#multiple}

Пропс `multiple` разрешает выбрать несколько элементов.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - multiple
  - class
external:
  - groups
  - modelValue
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  multiple: true
  autofocus: false
  modelValue: []
  groups:
    - id: 'users'
      label: 'Пользователи'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
            loading: lazy
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
            loading: lazy
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
            loading: lazy
  class: 'flex-1'
---
::

::caution
Передавайте в пропс `default-value` или в директиву `v-model` массив.
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` меняет текст плейсхолдера.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  placeholder: 'Найти приложение...'
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

### Размер {#size}

Пропс `size` меняет размер CommandPalette.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  size: 'xl'
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

### Иконка {#icon}

Пропс `icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) в поле ввода.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - icon
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
cast:
  icon: 'RocketIcon'
class: '!p-0'
props:
  autofocus: false
  icon: 'RocketIcon'
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

### Иконка выбранного элемента {#selected-icon}

Пропс `selected-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) выбранного элемента.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - multiple
  - class
  - selectedIcon
external:
  - groups
  - modelValue
externalTypes:
  - CommandPaletteGroup[]
cast:
  selectedIcon: 'RocketIcon'
class: '!p-0'
props:
  multiple: true
  autofocus: false
  modelValue:
    - label: 'Bitrix24'
      suffix: 'bitrix24'
      avatar:
        src: 'https://github.com/bitrix24.png'
        loading: lazy
  selectedIcon: 'RocketIcon'
  groups:
    - id: 'users'
      label: 'Пользователи'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
            loading: lazy
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
            loading: lazy
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
            loading: lazy
  class: 'flex-1'
---
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) справа у элементов с подменю.

::component-code
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - groups
  - class
  - trailingIcon
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
cast:
  trailingIcon: 'RocketIcon'
class: '!p-0'
props:
  autofocus: false
  trailingIcon: 'RocketIcon'
  groups:
    - id: 'actions'
      items:
        - label: 'Поделиться'
          children:
            - label: 'Почта'
            - label: 'Копировать'
            - label: 'Ссылка'
  class: 'flex-1'
---
::

### Загрузка {#loading}

Пропс `loading` показывает в CommandPalette иконку загрузки.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  loading: true
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

### Закрытие {#close}

Пропс `close` показывает кнопку [Button](/docs/components/button/), которая закрывает CommandPalette.

::tip
По нажатию на кнопку закрытия срабатывает событие `update:open`.
::

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - close
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  close: true
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

Кнопку можно настроить любым свойством компонента [Button](/docs/components/button/).

::component-code
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - close.color
  - close.rounded
  - close.size
  - groups
  - class
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  close:
    color: air-primary
    rounded: true
    size: md
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

### Иконка закрытия {#close-icon}

Пропс `close-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки закрытия.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - closeIcon
  - icon
cast:
  closeIcon: 'RocketIcon'
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  close: true
  closeIcon: 'RocketIcon'
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

### Кнопка «Назад» {#back}

Пропс `back` настраивает кнопку «Назад», которая показывается при переходе в подменю, или скрывает её (значение `false`).

Кнопку можно настроить любым свойством компонента [Button](/docs/components/button/).

::component-code
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - back.color
  - groups
  - class
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  back:
    color: air-primary
  groups:
    - id: 'actions'
      items:
        - label: 'Поделиться'
          children:
            - label: 'Почта'
            - label: 'Копировать'
            - label: 'Ссылка'
  class: 'flex-1'
---
::

### Иконка кнопки «Назад» {#back-icon}

Пропс `back-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки «Назад».

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - back
  - backIcon
cast:
  backIcon: 'RocketIcon'
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  back: true
  backIcon: 'RocketIcon'
  groups:
    - id: 'actions'
      items:
        - label: 'Поделиться'
          children:
            - label: 'Почта'
            - label: 'Копировать'
            - label: 'Ссылка'
  class: 'flex-1'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает CommandPalette.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - class
external:
  - groups
externalTypes:
  - CommandPaletteGroup[]
class: '!p-0'
props:
  autofocus: false
  disabled: true
  groups:
    - id: 'apps'
      items:
        - label: 'Календарь'
        - label: 'Музыка'
        - label: 'Карты'
  class: 'flex-1'
---
::

## Примеры {#examples}

### Управление выбранными элементами {#control-selected-items}

Выбранными элементами можно управлять через пропс `default-value` или директиву `v-model`, через поле `onSelect` у каждого элемента или через событие `@update:model-value`.

::component-example
---
collapse: true
name: 'command-palette-select-example'
class: '!p-0'
props:
  autofocus: false
---
::

::tip
Пропс `value-key` выбирает поле элемента, которое используется как значение вместо самого объекта. Пропс `by` сравнивает объекты по полю, а не по ссылке.
::

### Управление поисковым запросом {#control-search-term}

Директива `v-model:search-term` управляет поисковым запросом.

::component-example
---
collapse: true
name: 'command-palette-search-term-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
В этом примере событие `@update:model-value` сбрасывает поисковый запрос при выборе элемента.
::

### Вложенные элементы {#with-children-in-items}

Иерархические меню создаются свойством `children` у элементов. Если у элемента есть `children`, он автоматически показывает шеврон, и по нему можно перейти в подменю.

::component-example
---
collapse: true
prettier: true
name: 'command-palette-items-children-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
При переходе в подменю:
- поисковый запрос сбрасывается;
- в поле ввода появляется кнопка «Назад»;
- к предыдущей группе можно вернуться клавишей :kbd{value="backspace"}.
::

### Элементы из API {#with-fetched-items}

Элементы можно получать из API и использовать в CommandPalette.

::component-example
---
collapse: true
name: 'command-palette-fetch-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
В этом примере `useLazyFetch` с `server: false` загружает данные на клиенте и не блокирует первую отрисовку. Состояние загрузки проверяет и `pending`, и `idle`, чтобы индикатор загрузки показывался до запроса и во время него.
::

### Игнорирование фильтра {#with-ignore-filter}

Поле `ignoreFilter` со значением `true` у группы отключает встроенный поиск, и вы используете свою логику поиска.

::component-example
---
collapse: true
name: 'command-palette-ignore-filter-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
В этом примере [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) откладывает вызовы API. Состояние загрузки проверяет и `pending`, и `idle`, чтобы индикатор загрузки показывался до запроса и во время него.
::

::tip
Пропс `ignore-filter` со значением `true` отключает встроенный поиск сразу для всех групп. Группа может вернуть его, указав `ignoreFilter: false`.
::

### Фильтрация после поиска {#with-post-filtered-items}

Поле `postFilter` у группы фильтрует элементы после поиска.

::component-example
---
collapse: true
name: 'command-palette-post-filter-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
Начните вводить текст, и появятся элементы более высокого уровня.
::

### Свои настройки Fuse {#with-custom-fuse-search}

Пропс `fuse` переопределяет параметры [useFuse](https://vueuse.org/integrations/useFuse). По умолчанию они такие:

```ts
{
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: ['label', 'description', 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}
```

::tip
`fuseOptions` — параметры [Fuse.js](https://www.fusejs.io/), `resultLimit` — максимальное число результатов, а `matchAllWhenSearchEmpty` — булево значение: показывать все элементы, если поисковый запрос пуст.
::

Например, `{ fuseOptions: { includeMatches: true } }`{lang="ts-type"} подсвечивает искомый текст в элементах.

::component-example
---
collapse: true
name: 'command-palette-fuse-example'
class: '!p-0'
props:
  autofocus: false
---
::

### Виртуализация {#with-virtualization}

Пропс `virtualize` включает виртуализацию для больших списков: булево значение или объект с параметрами вроде `{ estimateSize: 32, overscan: 12 }`.

::warning{to="https://github.com/unovue/reka-ui/issues/1885" target="_blank"}
При включении все группы сводятся в один список из-за ограничения Reka UI.
::

::component-example
---
collapse: true
name: 'command-palette-virtualize-example'
class: '!p-0'
props:
  autofocus: false
---
::

### Внутри Popover {#within-a-popover}

CommandPalette можно использовать внутри содержимого [Popover](/docs/components/popover/).

::component-example
---
collapse: true
name: 'popover-command-palette-example'
props:
  autofocus: false
---
::

### Внутри Modal {#within-a-modal}

CommandPalette можно использовать внутри содержимого [Modal](/docs/components/modal/).

::component-example
---
collapse: true
name: 'modal-command-palette-example'
props:
  autofocus: false
---
::

::note
В этом примере `useLazyFetch` с `immediate: false` загружает данные только при открытии Modal.
::

### Внутри Drawer {#within-a-drawer}

CommandPalette можно использовать внутри содержимого [Drawer](/docs/components/drawer/).

::component-example
---
collapse: true
name: 'drawer-command-palette-example'
props:
  autofocus: false
---
::

::note
В этом примере `useLazyFetch` с `immediate: false` загружает данные только при открытии Drawer.
::

### Отслеживание состояния открытия {#listen-open-state}

Если задан пропс `close`, на нажатие кнопки можно реагировать событием `update:open`.

::component-example
---
collapse: true
name: 'command-palette-open-example'
props:
  autofocus: false
---
::

::note
Это удобно, например, когда CommandPalette находится внутри [`Modal`](/docs/components/modal/).
::

### Слот footer {#with-footer-slot}

Слот `#footer` добавляет свой контент внизу CommandPalette: например, подсказку по горячим клавишам или дополнительные действия.

::component-example
---
collapse: true
name: 'command-palette-footer-slot-example'
class: '!p-0'
props:
  autofocus: false
---
::

### Свой слот {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент или группу.

Вам будут доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}

- `#{{ group.slot }}`{lang="ts-type"}
- `#{{ group.slot }}-leading`{lang="ts-type"}
- `#{{ group.slot }}-label`{lang="ts-type"}
- `#{{ group.slot }}-trailing`{lang="ts-type"}

::component-example
---
collapse: true
name: 'command-palette-custom-slot-example'
class: '!p-0'
props:
  autofocus: false
---
::

::tip{to="#slots"}
Слоты `#item`, `#item-leading`, `#item-label` и `#item-trailing` настраивают сразу все элементы.
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
