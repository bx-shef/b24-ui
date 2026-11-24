---
title: SelectMenu
description: 'Удобный компонент выбора с поиском.'
category: form
keywords:
  - combobox
  - multi select
  - filterable select
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/SelectMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/select-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/select-menu
  - label: Combobox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/combobox
---

## Использование {#usage}

Директива `v-model` управляет значением SelectMenu, а пропс `default-value` задаёт начальное значение, когда управлять состоянием не нужно.

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

::tip
Используйте его вместо [`Select`](/docs/components/select/), чтобы получить возможности поиска и множественного выбора компонента [`Combobox`](https://reka-ui.com/docs/components/combobox) из Reka UI.
::

::note
Компонент похож на [`InputMenu`](/docs/components/input-menu/), но использует Select вместо Input, а поиск находится внутри меню.
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
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: IconComponent`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`color?: SelectMenu['color']`{lang="ts-type"}](#with-colors-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - modelValue.label
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectMenuItem[]
props:
  modelValue:
    label: 'Todo'
  items:
    - label: 'Backlog'
    - label: 'Todo'
    - label: 'In Progress'
    - label: 'Done'
  class: 'w-48'
---
::
::caution
В отличие от компонента [`Select`](/docs/components/select/), SelectMenu по умолчанию ожидает, что в директиву `v-model` или пропс `default-value` передан весь объект.
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
  - SelectMenuItem[]
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
Пропс `by` сравнивает объекты по полю, а не по ссылке, когда `model-value` — объект.
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

### Поле поиска {#search-input}

Пропс `search-input` настраивает или скрывает поле поиска (значение `false`).

Чтобы настроить его, передайте любые свойства компонента [Input](/docs/components/input/).

::component-code
---
prettier: true
ignore:
  - modelValue.label
  - searchInput.icon
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectMenuItem[]
props:
  modelValue:
    label: 'Backlog'
  searchInput:
    placeholder: 'Фильтр...'
  items:
    - label: Backlog
    - label: Todo
    - label: In Progress
    - label: Done
  class: 'w-48'
---
::

::tip
Значение `false` в пропсе `search-input` скрывает поле поиска.
::

::note
Чтобы поле поиска не получало фокус при открытии меню (например, чтобы не открывалась виртуальная клавиатура на сенсорных устройствах), используйте `:search-input="{ autofocus: false }"`.
::

### Содержимое {#content}

Пропс `content` управляет отрисовкой содержимого SelectMenu, например его `align` или `side`.

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

### Стрелка {#arrow}

Пропс `arrow` показывает стрелку у SelectMenu.

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

Пропс `color` меняет цвет кольца, когда SelectMenu в фокусе.

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

Свойство `tag` показывает [Badge](/docs/components/badge/) поверх SelectMenu.

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

Пропс `size` меняет размер SelectMenu.

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

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри SelectMenu.

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

### Очистка {#clear}

Пропс `clear` показывает кнопку очистки, когда выбрано значение.

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
  clear:
    - true
    - false
props:
  modelValue: 'Backlog'
  clear: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Иконка очистки {#clear-icon}

Пропс `clear-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки очистки.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - clearIcon
  - class
cast:
    clearIcon: 'RocketIcon'
external:
  - items
  - modelValue
items:
  clear:
    - true
    - false
props:
  modelValue: 'Backlog'
  clear: true
  clearIcon: 'RocketIcon'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-48'
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [Avatar](/docs/components/avatar/) внутри SelectMenu.

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

Пропс `loading` показывает иконку загрузки в SelectMenu.

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

Пропс `disabled` отключает SelectMenu.

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

Пропс `noPadding` убирает у SelectMenu внутренние отступы.

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

Пропс `noBorder` убирает у SelectMenu все границы (кольца).

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

Пропс `underline` убирает у SelectMenu все границы (кольца), кроме нижней.

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

Пропс `rounded` скругляет SelectMenu.

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
  - SelectMenuItem[]
props:
  modelValue: 'Apple'
  items:
    - - type: 'label'
        label: 'Fruits'
      - Apple
      - Banana
      - type: 'separator'
      - Blueberry
      - Grapes
      - Pineapple
    - - type: 'label'
        label: 'Vegetables'
      - Aubergine
      - Broccoli
      - Carrot
      - Courgette
      - Leek
  class: 'w-48'
---
::

::note
Если `label` используется как заголовок группы, передайте массив массивов: тогда при поиске подпись исчезает вместе со своей группой.
::

### С цветными элементами {#with-colors-items}

Свойство `color` меняет цвет элементов.

::component-example
---
collapse: true
name: 'select-menu-items-color-example'
---
::

### С иконкой в элементах {#with-icon-in-items}

Свойство `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри элементов.

::component-example
---
collapse: true
name: 'select-menu-items-icon-example'
---
::

::tip
Слот `#leading` позволяет показать иконку выбранного элемента.
::

### С аватаром в элементах {#with-avatar-in-items}

Свойство `avatar` показывает [Avatar](/docs/components/avatar/) внутри элементов.

::component-example
---
collapse: true
name: 'select-menu-items-avatar-example'
---
::

::tip
Слот `#leading` позволяет показать аватар выбранного элемента.
::

### С чипом в элементах {#with-chip-in-items}

Свойство `chip` показывает [Chip](/docs/components/chip/) внутри элементов.

::component-example
---
collapse: true
name: 'select-menu-items-chip-example'
---
::

::note
В этом примере слот `#leading` показывает выбранный чип.
::

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'select-menu-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) SelectMenu переключается по нажатию :kbd{value="O"}.
::

### Управление поисковым запросом {#control-search-term}

Директива `v-model:search-term` управляет поисковым запросом.

::component-example
---
name: 'select-menu-search-term-example'
---
::

### С вращающейся иконкой {#with-rotating-icon}

Пример с вращающейся иконкой, которая показывает состояние открытия SelectMenu.

::component-example
---
name: 'select-menu-icon-example'
---
::

### С созданием элемента {#with-create-item}

Пропс `create-item` позволяет пользователям добавлять собственные значения, которых нет в готовых вариантах.

::component-example
---
collapse: true
name: 'select-menu-create-item-example'
---
::

::note
По умолчанию пункт создания показывается, когда совпадений нет. Значение `always` показывает его, даже если есть похожие значения.
::

::tip{to="#emits"}
Событие `@create` обрабатывает создание элемента. В обработчик придут событие и элемент.
::

### С загружаемыми элементами {#with-fetched-items}

Элементы можно загружать из API и использовать в SelectMenu.

::component-example
---
collapse: true
name: 'select-menu-fetch-example'
---
::

::note
В примере `useLazyFetch` вызывается с `immediate: false`, поэтому данные запрашиваются только при открытии меню, а лишних запросов к API при загрузке страницы нет.
::

### С отключённым фильтром {#with-ignore-filter}

Пропс `ignore-filter` со значением `true` отключает внутренний поиск, и вы можете использовать собственную логику поиска.

::component-example
---
collapse: true
name: 'select-menu-ignore-filter-example'
---
::

::note
В примере запросы к API откладываются через [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced). Загрузка отложена через `immediate: false`, поэтому запрос не отправляется, пока меню не откроется.
::

### С полями фильтрации {#with-filter-fields}

Пропс `filter-fields` принимает массив полей, по которым выполняется фильтрация. По умолчанию `[labelKey]`.

::component-example
---
collapse: true
name: 'select-menu-filter-fields-example'
---
::

::note
В примере `useLazyFetch` вызывается с `immediate: false`, поэтому данные запрашиваются только при открытии меню, а лишних запросов к API при загрузке страницы нет.
::

### С виртуализацией {#with-virtualization}

Пропс `virtualize` включает виртуализацию для больших списков: булево значение или объект с параметрами вроде `{ estimateSize: 32, overscan: 12 }`.

::warning{to="https://github.com/unovue/reka-ui/issues/1885" target="_blank"}
При включении все группы объединяются в один список из-за ограничения Reka UI.
::

::component-example
---
prettier: true
name: 'select-menu-virtualize-example'
---
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
name: 'select-menu-infinite-scroll-example'
---
::

::note
В примере `useLazyFetch` вызывается с `immediate: false`, поэтому данные загружаются только по мере прокрутки.
::

### С содержимым на всю ширину {#with-full-content-width}

Чтобы содержимое занимало всю ширину своих элементов, настройте слоты `b24ui.content`, `b24ui.item` и `b24ui.viewport`.

::component-example
---
name: 'select-menu-content-width-example'
collapse: true
---
::

### Как выбор страны {#as-a-country-picker}

SelectMenu можно использовать как выбор страны с ленивой загрузкой. Страны загружаются только при первом открытии меню.

::component-example
---
collapse: true
name: 'select-menu-countries-example'
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
