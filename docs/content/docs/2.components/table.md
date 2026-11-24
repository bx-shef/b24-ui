---
title: Table
description: 'Адаптивная таблица данных.'
category: data
keywords:
  - data table
  - datagrid
  - data grid
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Table.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/table
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/table
  - label: TanStack Table
    avatar:
      src: https://github.com/tanstack.png
      loading: lazy
    to: https://tanstack.com/table/v8
---

## Использование {#usage}

Table построен на [TanStack Table v8](https://tanstack.com/table/v8) и работает на композабле [useVueTable](https://tanstack.com/table/v8/docs/framework/vue/vue-table#usevuetable), что даёт гибкий и полностью типобезопасный API.

Он отрисовывает данные в виде строк и столбцов и поддерживает сортировку, фильтрацию, постраничный вывод, выбор строк, раскрытие, группировку, закрепление и виртуализацию: от простой таблицы данных до полноценной сетки.

::component-example
---
source: false
border: false
name: 'table-example'
class: '!p-0'
---
::

::callout{to="https://github.com/bitrix24/b24ui/blob/main/docs/app/components/content/examples/table/TableExample.vue" aria-label="Посмотреть исходный код"}
В этом примере показан самый частый случай использования `Table`. Исходный код доступен на GitHub.
::

### Данные {#data}

Пропс `data` — массив объектов; столбцы создаются по ключам объектов.

::component-code
---
prettier: true
collapse: true
class: '!p-0'
ignore:
  - data
  - class
external:
  - data
props:
  data:
    - id: '4600'
      date: '2024-03-11T15:30:00'
      status: 'paid'
      email: 'james.anderson@example.com'
      amount: 594
    - id: '4599'
      date: '2024-03-11T10:10:00'
      status: 'failed'
      email: 'mia.white@example.com'
      amount: 276
    - id: '4598'
      date: '2024-03-11T08:50:00'
      status: 'refunded'
      email: 'william.brown@example.com'
      amount: 315
    - id: '4597'
      date: '2024-03-10T19:45:00'
      status: 'paid'
      email: 'emma.davis@example.com'
      amount: 529
    - id: '4596'
      date: '2024-03-10T15:55:00'
      status: 'paid'
      email: 'ethan.harris@example.com'
      amount: 639
  class: 'flex-1'
---
::

### Столбцы {#columns}

Пропс `columns` — массив объектов [ColumnDef](https://tanstack.com/table/v8/docs/api/core/column-def) со свойствами, например:

- `accessorKey`: [ключ объекта строки, по которому извлекается значение столбца.]{class="text-description"}
- `header`: [заголовок столбца. Если передана строка, она может служить идентификатором столбца по умолчанию. Если передана функция, она получает объект пропсов заголовка и должна вернуть отрисованное значение (точный тип зависит от используемого адаптера).]{class="text-description"}
- [`footer`](#with-column-footer): [подвал столбца. Работает так же, как заголовок, но отображается под таблицей.]{class="text-description"}
- `cell`: [ячейка столбца для каждой строки. Если передана функция, она получает объект пропсов ячейки и должна вернуть отрисованное значение (точный тип зависит от используемого адаптера).]{class="text-description"}
- `meta`: [дополнительные свойства столбца.]{class="text-description"}
  - `class`:
    - `td`: [классы для элемента `td`.]{class="text-description"}
    - `th`: [классы для элемента `th`.]{class="text-description"}
  - `style`:
    - `td`: [стили для элемента `td`.]{class="text-description"}
    - `th`: [стили для элемента `th`.]{class="text-description"}
  - [`colspan`](#with-column-span):
    - `td`: [атрибут colspan для элемента `td`.]{class="text-description"}
  - [`rowspan`](#with-column-span):
    - `td`: [атрибут rowspan для элемента `td`.]{class="text-description"}

Чтобы отрисовать компоненты или другие HTML-элементы, используйте внутри пропсов `header` и `cell` [функцию `h`](https://vuejs.org/api/render-function.html#h) из Vue. Здесь это отличается от других компонентов, где используются слоты, зато даёт больше гибкости.

::tip{to="#with-slots" aria-label="Столбцы таблицы со слотами"}
Заголовки и ячейки данных можно настраивать и слотами.
::

::component-example
---
prettier: true
collapse: true
class: '!p-0'
name: 'table-columns-example'
highlights:
  - 53
  - 108
---
::

::note
При отрисовке компонентов через `h` используйте функцию `resolveComponent` или импорт из `#components`.
::

### Метаданные {#meta}

Пропс `meta` — объект ([TableMeta](https://tanstack.com/table/v8/docs/api/core/table#meta)) со свойствами, например:

- `class`:
  - `tr`: [классы для элемента `tr`.]{class="text-description"}
- `style`:
  - `tr`: [стили для элемента `tr`.]{class="text-description"}

::component-example
---
prettier: true
collapse: true
name: 'table-meta-example'
class: '!p-0'
highlights:
  - 128
  - 140
---
::

### Загрузка {#loading}

Пропс `loading` показывает состояние загрузки, `loading-color` меняет его цвет, а `loading-animation` — анимацию.

::component-code
---
prettier: true
collapse: true
class: '!p-0'
ignore:
  - data
  - class
external:
  - data
props:
  loading: true
  loadingColor: air-primary
  loadingAnimation: loading
  data:
    - id: '4600'
      date: '2024-03-11T15:30:00'
      status: 'paid'
      email: 'james.anderson@example.com'
      amount: 594
    - id: '4599'
      date: '2024-03-11T10:10:00'
      status: 'failed'
      email: 'mia.white@example.com'
      amount: 276
    - id: '4598'
      date: '2024-03-11T08:50:00'
      status: 'refunded'
      email: 'william.brown@example.com'
      amount: 315
    - id: '4597'
      date: '2024-03-10T19:45:00'
      status: 'paid'
      email: 'emma.davis@example.com'
      amount: 529
    - id: '4596'
      date: '2024-03-10T15:55:00'
      status: 'paid'
      email: 'ethan.harris@example.com'
      amount: 639
  class: 'flex-1'
---
::

::tip
Если пользователь предпочитает уменьшенное движение, анимация загрузки отключается, и полоса показывается как пульсация на всю ширину.
::

Пока таблица загружается и в ней нет данных, пустое состояние скрыто. Чтобы показать на его месте своё содержимое, используйте слот `#loading`.

### Липкие шапка и подвал {#sticky}

Пропс `sticky` делает шапку или подвал липкими.

::component-code
---
prettier: true
collapse: true
class: '!p-0'
ignore:
  - data
  - class
external:
  - data
items:
  sticky:
    - true
    - false
props:
  sticky: true
  data:
    - id: '4600'
      date: '2024-03-11T15:30:00'
      status: 'paid'
      email: 'james.anderson@example.com'
      amount: 594
    - id: '4599'
      date: '2024-03-11T10:10:00'
      status: 'failed'
      email: 'mia.white@example.com'
      amount: 276
    - id: '4598'
      date: '2024-03-11T08:50:00'
      status: 'refunded'
      email: 'william.brown@example.com'
      amount: 315
    - id: '4597'
      date: '2024-03-10T19:45:00'
      status: 'paid'
      email: 'emma.davis@example.com'
      amount: 529
    - id: '4596'
      date: '2024-03-10T15:55:00'
      status: 'paid'
      email: 'ethan.harris@example.com'
      amount: 639
    - id: '4595'
      date: '2024-03-10T15:55:00'
      status: 'paid'
      email: 'ethan.harris@example.com'
      amount: 639
    - id: '4594'
      date: '2024-03-10T15:55:00'
      status: 'paid'
      email: 'ethan.harris@example.com'
      amount: 639
  class: 'flex-1 max-h-[312px]'
---
::

## Примеры {#examples}

### С действиями строки {#with-row-actions}

Новый столбец с компонентом [DropdownMenu](/docs/components/dropdown-menu/) внутри `cell` показывает действия строки.

::component-example
---
prettier: true
collapse: true
name: 'table-row-actions-example'
highlights:
  - 115
  - 141
class: '!p-0'
---
::

### С раскрываемыми строками {#with-expandable-rows}

Новый столбец с компонентом [Button](/docs/components/button/) внутри `cell` переключает раскрытие строки через [Expanding API](https://tanstack.com/table/v8/docs/api/features/expanding) TanStack Table.

::caution
Слот `#expanded` отрисовывает раскрытое содержимое и получает строку параметром.
::

::component-example
---
prettier: true
collapse: true
name: 'table-row-expandable-example'
highlights:
  - 55
  - 72
class: '!p-0'
---
::

::tip
Пропс `expanded` управляет раскрытием строк (его можно привязать через `v-model`).
::

::note
То же действие можно добавить в [`DropdownMenu`](/docs/components/dropdown-menu/) внутри столбца `actions`.
::

### С группировкой строк {#with-grouped-rows}

Строки можно группировать по значению заданного столбца и показывать или скрывать вложенные строки кнопкой в ячейке, используя [Grouping API](https://tanstack.com/table/v8/docs/api/features/grouping) TanStack Table.

#### Важное {#important-parts}

* Добавьте пропс `grouping` с массивом идентификаторов столбцов, по которым нужно группировать.
* Добавьте пропс `grouping-options`. В нём должен быть `getGroupedRowModel`: его можно импортировать из `@tanstack/vue-table` или написать свой.
* Раскрывайте строки методом `row.toggleExpanded()` в любой ячейке строки. Учтите, что он переключает и слот `#expanded`.
* Опция `aggregateFn` в определении столбца задаёт способ агрегации строк.
* Отрисовщик `agregatedCell` в определении столбца работает, только если нет отрисовщика `cell`.

::component-example
---
prettier: true
collapse: true
name: 'table-grouped-rows-example'
highlights:
  - 157
  - 160
class: '!p-0'
---
::

### С закреплением строк {#with-row-pinning}

Столбец с компонентом [Button](/docs/components/button/) внутри `cell` переключает закрепление строки через [Row Pinning API](https://tanstack.com/table/v8/docs/api/features/row-pinning) TanStack Table. Закреплённые строки остаются вверху или внизу таблицы независимо от сортировки и фильтрации.

::component-example
---
prettier: true
collapse: true
name: 'table-row-pinning-example'
overflowHidden: true
highlights:
  - 91
  - 107
  - 160
  - 165
  - 168
class: '!p-0'
---
::

::tip
Пропс `row-pinning` управляет закреплением строк (его можно привязать через `v-model`).
::

### С выбором строк {#with-row-selection}

Новый столбец с компонентом [Checkbox](/docs/components/checkbox/) внутри `header` и `cell` выбирает строки через [Row Selection API](https://tanstack.com/table/v8/docs/api/features/row-selection) TanStack Table.

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-row-selection-example'
highlights:
  - 55
  - 72
class: '!p-0'
---
::

::tip
Пропс `row-selection` управляет выбором строк (его можно привязать через `v-model`).
::

### С событием выбора строки {#with-row-select-event}

Слушатель `@select` делает строки кликабельными, с колонкой чекбоксов или без неё.

::note
Функция-обработчик получает `Event` первым аргументом и экземпляр `TableRow` вторым.
::

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-row-select-event-example'
highlights:
  - 124
  - 131
class: '!p-0'
---
::

::tip
Так можно перейти на страницу, открыть модальное окно или даже выбрать строку вручную.
::

### С событием контекстного меню строки {#with-row-context-menu-event}

Слушатель `@contextmenu` делает строки кликабельными правой кнопкой; если обернуть Table в компонент [ContextMenu](/docs/components/context-menu/), он покажет, например, действия строки.

::note
Функция-обработчик получает `Event` первым аргументом и экземпляр `TableRow` вторым.
::

::component-example
---
prettier: true
collapse: true
name: 'table-row-context-menu-event-example'
highlights:
  - 133
  - 173
class: '!p-0'
---
::

### С событием наведения на строку {#with-row-hover-event}

Слушатель `@hover` реагирует на наведение на строки; компонент [Popover](/docs/components/popover/) или [Tooltip](/docs/components/tooltip/) может показать, например, сведения о строке.

::note
Функция-обработчик получает `Event` первым аргументом и экземпляр `TableRow` вторым.
::

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-row-hover-event-example'
highlights:
  - 129
  - 152
class: '!p-0'
---
::

::note
Пример похож на [пример Popover с привязкой к курсору](/docs/components/popover/#with-following-cursor) и использует [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced), чтобы Popover не открывался и не закрывался слишком быстро при переходе курсора от строки к строке.
::

### С подвалом столбца {#with-column-footer}

Свойство `footer` в определении столбца отрисовывает подвал столбца.

::component-example
---
prettier: true
collapse: true
name: 'table-column-footer-example'
highlights:
  - 100
  - 112
class: '!p-0'
---
::

### С объединением ячеек {#with-column-span}

Свойства `colspan` и `rowspan` в `meta` столбца объединяют ячейки. Они принимают статическое значение или функцию, которая получает ячейку и возвращает значение объединения.

::note
При использовании `rowspan` ячейки, «поглощённые» объединением предыдущей строки, нужно визуально скрыть. Для этого задайте в `class` метаданных функцию, которая возвращает `'hidden'` для таких ячеек.
::

::component-example
---
prettier: true
collapse: true
name: 'table-column-span-example'
class: '!p-0'
---
::

### С сортировкой столбцов {#with-column-sorting}

Заголовок `header` столбца можно заменить компонентом [Button](/docs/components/button/), который переключает сортировку через [Sorting API](https://tanstack.com/table/v8/docs/api/features/sorting) TanStack Table.

Задайте таким столбцам и `enableSorting: true`. Тогда на `<th>` ставится `aria-sort`, и скринридеры читают текущее состояние сортировки столбца: `none`, `ascending` или `descending`. Менять его по-прежнему будет кнопка `Button`.

::component-example
---
prettier: true
collapse: true
name: 'table-column-sorting-example'
highlights:
  - 91
  - 116
class: '!p-0'
---
::

::tip
Пропс `sorting` управляет сортировкой столбцов (его можно привязать через `v-model`).
::

::note
У `<th>` сортируемого столбца атрибут `aria-sort` выставляется сам — `ascending`, `descending` или `none`, если столбец сортируется, но сейчас не отсортирован, — поэтому кнопке в заголовке добавлять его не нужно. Столбец считается сортируемым для этой цели, только когда у него задано `enableSorting: true`: обычный столбец с аксессором, который не рисует элемент сортировки, столбец с `enableSorting: false` и отображаемый столбец без аксессора вообще не получают `aria-sort` — по этому признаку вспомогательные технологии понимают, что они не сортируются, а не просто не отсортированы. Если отсортировано сразу несколько столбцов, направление получает первый, потому что `aria-sort` описывает один столбец.
::

Можно создать и переиспользуемый компонент, который делает сортируемым заголовок любого столбца.

::component-example
---
prettier: true
collapse: true
name: 'table-column-sorting-reusable-example'
highlights:
  - 114
  - 159
class: '!p-0'
---
::

::note
В этом примере заголовок столбца задаётся функцией, но можно создать и полноценный компонент.
::

### С закреплением столбцов {#with-column-pinning}

Заголовок `header` столбца можно заменить компонентом [Button](/docs/components/button), который переключает закрепление через [Column Pinning API](https://tanstack.com/table/v8/docs/api/features/column-pinning) TanStack Table.

::note
Закреплённый столбец становится липким у левого или правого края таблицы. При закреплении столбцов задавайте столбцам явные значения `size`, чтобы ширина обрабатывалась корректно, особенно при нескольких закреплённых столбцах.
::

::component-example
---
prettier: true
collapse: true
overflowHidden: true
name: 'table-column-pinning-example'
highlights:
  - 108
  - 126
class: '!p-0 overflow-clip'
---
::

::tip
Пропс `column-pinning` управляет закреплением столбцов (его можно привязать через `v-model`).
::

### С видимостью столбцов {#with-column-visibility}

Компонент [DropdownMenu](/docs/components/dropdown-menu/) переключает видимость столбцов через [Column Visibility API](https://tanstack.com/table/v8/docs/api/features/column-visibility) TanStack Table.

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-column-visibility-example'
highlights:
  - 121
  - 146
class: '!p-0'
---
::

::tip
Пропс `column-visibility` управляет видимостью столбцов (его можно привязать через `v-model`).
::

### С фильтрами столбцов {#with-column-filters}

Компонент [Input](/docs/components/input/) фильтрует строки по каждому столбцу через [Column Filtering API](https://tanstack.com/table/v8/docs/api/features/column-filtering) TanStack Table.

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-column-filters-example'
highlights:
  - 123
  - 128
class: '!p-0'
---
::

::tip
Пропс `column-filters` управляет фильтрами столбцов (его можно привязать через `v-model`).
::

### С глобальным фильтром {#with-global-filter}

Компонент [Input](/docs/components/input/) фильтрует строки через [Global Filtering API](https://tanstack.com/table/v8/docs/api/features/global-filtering) TanStack Table.

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-global-filter-example'
class: '!p-0'
highlights:
  - 116
---
::

::tip
Пропс `global-filter` управляет глобальным фильтром (его можно привязать через `v-model`).
::

### С постраничным выводом {#with-pagination}

Компонент [Pagination](/docs/components/pagination/) управляет постраничным выводом через [Pagination API](https://tanstack.com/table/v8/docs/api/features/pagination).

Подходы к постраничному выводу разобраны в [руководстве по пагинации](https://tanstack.com/table/v8/docs/guide/pagination#pagination-guide). В этом примере используется клиентская пагинация, поэтому функцию `getPaginationRowModel()`{lang="ts-type"} нужно передать вручную.

::component-example
---
prettier: true
border: false
collapse: true
name: 'table-pagination-example'
class: '!p-0'
highlights:
  - 204
  - 209
---
::

::tip
Пропс `pagination` управляет состоянием постраничного вывода (его можно привязать через `v-model`).
::

### С загружаемыми данными {#with-fetched-data}

Данные можно загружать из API и использовать в Table.

::component-example
---
prettier: true
collapse: true
name: 'table-fetch-example'
highlights:
  - 15
  - 26
class: '!p-0'
---
::

::note
В примере `useLazyFetch` вызывается с `server: false`, поэтому данные загружаются на клиенте и не блокируют первую отрисовку. Состояние загрузки проверяет и `pending`, и `idle`, чтобы индикатор показывался и до запроса, и во время него.
::

### С бесконечной прокруткой {#with-infinite-scroll}

При серверной пагинации композабл [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/#useinfinitescroll) подгружает данные по мере прокрутки.

::component-example
---
prettier: true
collapse: true
highlights:
  - 81
  - 83
overflowHidden: true
name: 'table-infinite-scroll-example'
class: '!p-0'
---
::

::note
В примере `useLazyFetch` вызывается с `server: false`, поэтому данные загружаются на клиенте и не блокируют первую отрисовку. Состояние загрузки проверяет и `pending`, и `idle`, чтобы индикатор показывался и до запроса, и во время него. Новые страницы подгружаются по мере прокрутки.
::

### С перетаскиванием {#with-drag-and-drop}

Композабл [`useSortable`](https://vueuse.org/integrations/useSortable/) из [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) включает в Table перетаскивание. Интеграция оборачивает [Sortable.js](https://sortablejs.github.io/Sortable/) и даёт удобное перетаскивание.

::note
Ref таблицы не открывает элемент tbody, поэтому задайте ему уникальный класс через пропс `:b24ui` и используйте его в `useSortable` (например, `:b24ui="{ tbody: 'my-table-tbody' }"`).
::

::component-example
---
prettier: true
collapse: true
highlights:
  - 76
  - 78
name: 'table-drag-and-drop-example'
class: '!p-0'
---
::

### С виртуализацией {#with-virtualization}

Пропс `virtualize` включает виртуализацию для больших наборов данных: булево значение или объект с параметрами вроде `{ estimateSize: 65, overscan: 12 }`. Другие [параметры TanStack Virtual](https://tanstack.com/virtual/v3/docs/api/virtualizer#optional-options) тоже можно передать, чтобы настроить поведение виртуализации.

::warning
Закрепление строк при включённой виртуализации не поддерживается.
::

::component-example
---
prettier: true
collapse: true
overflowHidden: true
name: 'table-virtualize-example'
class: '!p-0'
---
::

::note
Для работы виртуализации у таблицы нужно ограничить высоту (например, `class="h-[400px]"`).
::

::tip
Строки измеряются при отрисовке, поэтому `estimateSize` может быть лишь близкой оценкой. Высота строк может различаться; свою функцию `measureElement` можно передать, чтобы управлять измерением каждой строки (высота раскрытой строки добавляется к ней).
::

### С внешним элементом прокрутки :badge{label="New" class="align-text-top"} {#with-external-scroll-element}

Передайте в пропс `virtualize` функцию `getScrollElement`, чтобы виртуализировать относительно прокручиваемого предка, а не корня самой таблицы. `scrollMargin` задаёт смещение таблицы от начала элемента прокрутки (например, высоту содержимого над ней), чтобы шапка и тело таблицы делили одну полосу прокрутки.

::component-example
---
prettier: true
collapse: true
overflowHidden: true
name: 'table-external-scroll-example'
class: '!p-0'
---
::

::note
В этом режиме `overflow` корня таблицы равен `visible`, а прокруткой по обеим осям управляет внешний контейнер, поэтому задайте ему `overflow-auto` (а не только `overflow-y-auto`), чтобы широкие таблицы прокручивались и по горизонтали. Липкая шапка (`sticky`) тогда крепится к этому контейнеру.
::

### С древовидными данными {#with-tree-data}

Пропс `get-sub-rows` показывает иерархические (древовидные) данные в таблице.
Например, если у объектов данных есть массив `children`, задайте `:get-sub-rows="row => row.children"`, чтобы включить раскрываемые строки.

::component-example
---
prettier: true
collapse: true
highlights:
  - 168
name: 'table-tree-data-example'
class: '!p-0'
---
::

### Со слотами {#with-slots}

Слоты настраивают заголовки и ячейки данных таблицы.

Слот `#<column>-header` настраивает заголовок столбца. В области видимости слота доступны `column`, `header` и `table`.

Слот `#<column>-cell` настраивает ячейку столбца. В области видимости слота доступны `cell`, `column`, `getValue`, `renderValue`, `row` и `table`.

::component-example
---
prettier: true
collapse: true
name: 'table-slots-example'
class: '!p-0'
---
::

## API {#api}

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<table>`.
::

### Слоты {#slots}

:component-slots

### Доступ через ref {#expose}

Типизированный экземпляр компонента доступен через [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const table = useTemplateRef('table')
</script>

<template>
  <B24Table ref="table" />
</template>
```

Он даёт доступ к следующему:

| Имя | Тип |
| ---- | ---- |
| `tableRef`{lang="ts-type"} | `Ref<HTMLTableElement \| null>`{lang="ts-type"} |
| `tableApi`{lang="ts-type"} | [`Table`{lang="ts-type"}](https://tanstack.com/table/v8/docs/api/core/table#table-api) |

## Тема {#theme}

:component-theme
