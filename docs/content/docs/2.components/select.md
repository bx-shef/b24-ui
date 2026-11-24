---
title: Select
description: 'Поле выбора одного значения из набора вариантов.'
category: form
keywords:
  - dropdown
  - picker
  - выпадающий список
  - выбор значения
  - селект
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Select.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/select
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/select
  - label: Select
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/select
---

## Использование {#usage}

Директива `v-model` управляет значением Select, а пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Элементы {#items}

Пропс `items` принимает массив строк, чисел или булевых значений:

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

Можно передать и массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- [`value?: string`{lang="ts-type"}](#value-key)
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: IconComponent`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`color?: Select['color']`{lang="ts-type"}](#with-colors-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectItem[]
props:
  modelValue: 'backlog'
  items:
    - label: 'Backlog'
      value: 'backlog'
    - label: 'Todo'
      value: 'todo'
    - label: 'In Progress'
      value: 'in_progress'
    - label: 'Done'
      value: 'done'
  class: 'w-48'
---
::

::caution
При использовании объектов в директиве `v-model` или пропсе `default-value` нужно указывать свойство `value` объекта.
::

В пропс `items` можно передать и массив массивов.
Тип элемента `separator` задаёт разделитель.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Apple'
  items:
    - - Apple
      - Banana
      - Blueberry
      - Grapes
      - Pineapple
    - - type: 'separator'
      - Aubergine
      - Broccoli
      - Carrot
      - Courgette
      - Leek
  class: 'w-48'
---
::

### Ключ значения {#value-key}

Свойство, из которого берётся значение, меняется пропсом `value-key`. По умолчанию `value`.

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
  - SelectItem[]
props:
  modelValue: 'todo'
  valueKey: 'id'
  items:
    - label: 'Backlog'
      id: 'backlog'
    - label: 'Todo'
      id: 'todo'
    - label: 'In Progress'
      id: 'in_progress'
    - label: 'Done'
      id: 'done'
  class: 'w-48'
---
::

::tip
Слоты `#leading`, `#default` и `#trailing` получают выбранный элемент как `item`, поэтому остальные его свойства доступны, даже когда `model-value` хранит только ключ.
::

### Множественный выбор {#multiple}

Пропс `multiple` разрешает выбрать несколько элементов; выбранные элементы показываются в триггере через запятую.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - multiple
  - class
external:
  - items
  - modelValue
props:
  modelValue:
    - Backlog
    - Todo
  multiple: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::caution
В `default-value` или `v-model` нужно передать массив.
::

### Плейсхолдер {#placeholder}

Пропс `placeholder` задаёт текст плейсхолдера.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
props:
  placeholder: 'Выберите статус'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Содержимое {#content}

Пропс `content` управляет отрисовкой содержимого Select, например его `align` или `side`.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
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
  modelValue: 'Backlog'
  content:
    align: center
    side: bottom
    sideOffset: 8
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Эти параметры действуют, только когда `content.position` равен `popper` (по умолчанию).
::

### Позиция {#position}

Пропс `content.position` определяет, как содержимое Select позиционируется относительно триггера. По умолчанию `popper`: содержимое позиционируется как у остальных всплывающих окон. Значение `item-aligned` выравнивает содержимое по выбранному элементу (как в нативном меню macOS).

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
items:
  content.position:
    - item-aligned
    - popper
props:
  modelValue: 'Todo'
  content:
    position: item-aligned
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Стрелка {#arrow}

Пропс `arrow` показывает стрелку у Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - arrow
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  arrow: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Цвет {#color}

Пропс `color` меняет цвет кольца, когда Select в фокусе.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  color: air-primary-copilot
  highlight: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Тег {#tag}

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх Select.

::component-code
---
prettier: true
ignore:
  - placeholder
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  tag: note
  color: air-primary-warning
  highlight: true
  placeholder: 'Поиск...'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

Свойство `tagColor` задаёт цвет Badge.

::component-code
---
prettier: true
ignore:
  - placeholder
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
items:
  tagColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-tertiary
    - air-selection
props:
  modelValue: 'Backlog'
  tag: note
  tagColor: air-secondary-alert
  color: air-primary-warning
  highlight: true
  placeholder: 'Поиск...'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Размер {#size}

Пропс `size` меняет размер Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  size: xl
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - icon
cast:
  icon: 'RocketIcon'
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  icon: 'RocketIcon'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) справа.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  trailingIcon: 'RocketIcon'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Иконка выбранного элемента {#selected-icon}

Пропс `selected-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) выбранного элемента.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - selectedIcon
cast:
  selectedIcon: 'RocketIcon'
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  selectedIcon: 'RocketIcon'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - avatar.src
  - avatar.loading
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки в Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  loading: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  disabled: true
  placeholder: 'Выберите статус'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Без отступов {#no-padding}

Пропс `noPadding` убирает у Select внутренние отступы.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  noPadding: true
  highlight: true
  placeholder: 'Выберите статус'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Без границы {#no-border}

Пропс `noBorder` убирает у Select все границы (кольца).

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  noBorder: true
  highlight: true
  placeholder: 'Выберите статус'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает, что состояния фокуса нет.
::

### Подчёркивание {#underline}

Пропс `underline` убирает у Select все границы (кольца), кроме нижней.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  underline: true
  highlight: true
  placeholder: 'Выберите статус'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

### Скругление {#rounded}

Пропс `rounded` скругляет Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  rounded: true
  highlight: true
  placeholder: 'Выберите статус'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса.
::

## Примеры {#examples}

### С типом элемента {#with-items-type}

Свойство `type` со значением `separator` показывает разделитель между элементами, а со значением `label` — подпись.

::component-code
---
collapse: true
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectItem[]
props:
  modelValue: 'Apple'
  items:
    - type: 'label'
      label: 'Fruits'
    - Apple
    - Banana
    - type: 'separator'
    - Blueberry
    - Grapes
    - Pineapple
    - type: 'label'
      label: 'Vegetables'
    - Aubergine
    - Broccoli
    - Carrot
    - Courgette
    - Leek
  class: 'w-48'
---
::

### С цветными элементами {#with-colors-items}

Свойство `color` меняет цвет элементов.

::component-example
---
collapse: true
name: 'select-items-color-example'
---
::

### С иконкой в элементах {#with-icon-in-items}

Свойство `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри элементов.

::component-example
---
collapse: true
name: 'select-items-icon-example'
---
::

::note
В этом примере иконка вычисляется из свойства `value` выбранного элемента.
::

::tip
Слот `#leading` и его проп `item` позволяют показать иконку выбранного элемента.
::

### С аватаром в элементах {#with-avatar-in-items}

Свойство `avatar` показывает [Avatar](/docs/components/avatar/) внутри элементов.

::component-example
---
collapse: true
name: 'select-items-avatar-example'
---
::

::note
В этом примере аватар вычисляется из свойства `value` выбранного элемента.
::

::tip
Слот `#leading` и его проп `item` позволяют показать аватар выбранного элемента.
::

### С чипом в элементах {#with-chip-in-items}

Свойство `chip` показывает [Chip](/docs/components/chip/) внутри элементов.

::component-example
---
collapse: true
name: 'select-items-chip-example'
---
::

::note
В этом примере слот `#leading` берёт чип выбранного элемента из его пропа `item`.
::

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'select-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Select переключается по нажатию :kbd{value="O"}.
::

### С вращающейся иконкой {#with-rotating-icon}

Пример с вращающейся иконкой, которая показывает состояние открытия Select.

::component-example
---
name: 'select-icon-example'
---
::

### С загружаемыми элементами {#with-fetched-items}

Элементы можно загружать из API и использовать в Select.

::component-example
---
name: 'select-fetch-example'
collapse: true
---
::

::note
В примере `useLazyFetch` вызывается с `immediate: false`, поэтому данные запрашиваются только при открытии меню, а лишних запросов к API при загрузке страницы нет.
::

### С бесконечной прокруткой {#with-infinite-scroll}

Композабл [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/) подгружает данные по мере прокрутки.

::component-example
---
prettier: true
collapse: true
highlights:
  - 41
  - 51
overflowHidden: true
name: 'select-infinite-scroll-example'
---
::

::note
В примере `useLazyFetch` вызывается с `immediate: false`, поэтому данные загружаются только по мере прокрутки.
::

### С содержимым на всю ширину {#with-full-content-width}

Чтобы содержимое занимало всю ширину своих элементов, настройте слоты `b24ui.content`, `b24ui.item` и `b24ui.viewport`.

::component-example
---
name: 'select-content-width-example'
collapse: true
---
::

## API {#api}

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<button>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `triggerRef`{lang="ts-type"} | `Ref<HTMLButtonElement \| null>`{lang="ts-type"} |
| `viewportRef`{lang="ts-type"} | `Ref<HTMLDivElement \| null>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
