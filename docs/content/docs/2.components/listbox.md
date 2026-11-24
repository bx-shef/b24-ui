---
title: Listbox
description: 'Выбираемый список с поиском, виртуализацией и богатым отображением элементов.'
category: form
keywords:
  - option list
  - picker
  - selection
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Listbox.vue
  - label: Listbox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/listbox
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/listbox
---

## Использование {#usage}

Директива `v-model` управляет значением Listbox, а пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - modelValue.label
  - modelValue.icon
  - modelValue.value
  - items
external:
  - items
  - modelValue
externalTypes:
  - ListboxItem[]
props:
  modelValue:
    label: 'France'
    value: 'FR'
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
    - label: 'Netherlands'
      value: 'NL'
    - label: 'Poland'
      value: 'PL'
    - label: 'Belgium'
      value: 'BE'
    - label: 'Portugal'
      value: 'PT'
    - label: 'Austria'
      value: 'AT'
  class: 'w-full'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- [`description?: string`{lang="ts-type"}](#with-description-in-items)
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: IconComponent`{lang="ts-type"}](#with-icon-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, ... }`{lang="ts-type"}

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  items:
    - label: 'France'
      description: 'The Hexagon'
      value: 'FR'
    - label: 'Germany'
      description: 'The Federal Republic'
      value: 'DE'
    - label: 'Italy'
      description: 'The Boot'
      value: 'IT'
    - label: 'Spain'
      description: 'The Bull Skin'
      value: 'ES'
  class: 'w-full'
---
::

В пропс `items` можно передать и массив массивов, чтобы показать группы элементов, разделённые между собой.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[][]
props:
  items:
    - - label: 'France'
        value: 'FR'
      - label: 'Germany'
        value: 'DE'
      - label: 'Italy'
        value: 'IT'
    - - label: 'Brazil'
        value: 'BR'
      - label: 'Argentina'
        value: 'AR'
  class: 'w-full'
---
::

### Множественный выбор {#multiple}

Пропс `multiple` разрешает выбрать несколько элементов. Тогда `v-model` становится массивом.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
  - multiple
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  multiple: true
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
  class: 'w-full'
---
::

### Ключ значения {#value-key}

Пропс `value-key` позволяет привязать одно свойство объекта вместо всего объекта. По умолчанию `undefined`.

::component-code
---
collapse: true
ignore:
  - modelValue
  - valueKey
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - ListboxItem[]
props:
  modelValue: 'FR'
  valueKey: 'value'
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
  class: 'w-full'
---
::

### Фильтр {#filter}

Пропс `filter` показывает поле фильтра или принимает объект для настройки компонента [Input](/docs/components/input/). По умолчанию `false`.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  filter:
    placeholder: 'Фильтр...'
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
    - label: 'Netherlands'
      value: 'NL'
    - label: 'Poland'
      value: 'PL'
  class: 'w-full'
---
::

### Иконка выбранного элемента {#selected-icon}

Пропс `selected-icon` меняет иконку выбранного элемента.

::component-code
---
collapse: true
ignore:
  - items
  - modelValue
  - valueKey
  - class
  - selectedIcon
cast:
  selectedIcon: 'RocketIcon'
external:
  - items
  - modelValue
externalTypes:
  - ListboxItem[]
props:
  modelValue: 'FR'
  selectedIcon: 'RocketIcon'
  valueKey: 'value'
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
  class: 'w-full'
---
::

### Размер {#size}

Пропс `size` меняет размер Listbox.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  size: xl
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
  class: 'w-full'
---
::

### Загрузка {#loading}

Пропс `loading` показывает индикатор загрузки, а пропс `loading-icon` меняет его иконку.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  loading: true
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
  class: 'w-full'
---
::

### Отключение {#disabled}

Пропс `disabled` блокирует любое взаимодействие пользователя с Listbox.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  disabled: true
  items:
    - label: 'France'
      value: 'FR'
    - label: 'Germany'
      value: 'DE'
    - label: 'Italy'
      value: 'IT'
    - label: 'Spain'
      value: 'ES'
  class: 'w-full'
---
::

## Примеры {#examples}

### С типом элемента {#with-items-type}

Свойство `type` со значением `separator` показывает разделитель между элементами, а со значением `label` — подпись.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[][]
props:
  items:
    - - type: 'label'
        label: 'Fruits'
      - label: 'Apple'
      - label: 'Banana'
      - label: 'Blueberry'
      - label: 'Grapes'
      - label: 'Pineapple'
    - - type: 'label'
        label: 'Vegetables'
      - label: 'Aubergine'
      - label: 'Broccoli'
      - label: 'Carrot'
      - label: 'Courgette'
      - label: 'Leek'
  class: 'w-full'
---
::

::note
Если `label` используется как заголовок группы, передайте массив массивов: тогда при поиске подпись исчезает вместе со своей группой.
::

### С иконкой в элементах {#with-icon-in-items}

Свойство `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри элементов.

::component-example
---
collapse: true
name: 'listbox-items-icon-example'
---
::

### С аватаром в элементах {#with-avatar-in-items}

Свойство `avatar` показывает [Avatar](/docs/components/avatar/) внутри элементов.

::component-example
---
collapse: true
name: 'listbox-items-avatar-example'
---
::

### С чипом в элементах {#with-chip-in-items}

Свойство `chip` показывает [Chip](/docs/components/chip/) внутри элементов.

::component-example
---
collapse: true
name: 'listbox-items-chip-example'
---
::

### С описанием в элементах {#with-description-in-items}

Свойство `description` показывает дополнительный текст под подписью.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - ListboxItem[]
props:
  items:
    - label: 'France'
      description: 'The Hexagon'
      value: 'FR'
    - label: 'Germany'
      description: 'The Federal Republic'
      value: 'DE'
    - label: 'Italy'
      description: 'The Boot'
      value: 'IT'
    - label: 'Spain'
      description: 'The Bull Skin'
      value: 'ES'
  class: 'w-full'
---
::

### Управление выбранными элементами {#control-selected-items}

Выбранным элементом управляют пропс `default-value` или директива `v-model`.

::component-example
---
collapse: true
name: 'listbox-model-value-example'
---
::

### Управление поисковым запросом {#control-search-term}

Директива `v-model:search-term` управляет поисковым запросом.

::component-example
---
name: 'listbox-search-term-example'
---
::

### С отключённым фильтром {#with-ignore-filter}

Пропс `ignore-filter` со значением `true` отключает внутренний поиск, и вы можете использовать собственную логику поиска.

::component-example
---
collapse: true
name: 'listbox-ignore-filter-example'
---
::

::note
В примере запросы к API откладываются через [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced).
::

### С полями фильтрации {#with-filter-fields}

Пропс `filter-fields` принимает массив полей, по которым выполняется фильтрация. По умолчанию `[labelKey]`.

::component-example
---
collapse: true
name: 'listbox-filter-fields-example'
---
::

### С виртуализацией {#with-virtualization}

Пропс `virtualize` включает виртуализацию для больших списков: булево значение или объект с параметрами вроде `{ estimateSize: 32, overscan: 12 }`.

::component-example
---
name: 'listbox-virtualize-example'
collapse: true
---
::

### Как список переноса {#as-a-transfer-list}

Два компонента Listbox с кнопками [Button](/docs/components/button/) позволяют собрать шаблон списка переноса.

::component-example
---
name: 'listbox-transfer-list-example'
collapse: true
---
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
