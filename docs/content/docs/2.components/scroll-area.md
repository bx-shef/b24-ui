---
title: ScrollArea
description: 'Гибкая прокручиваемая область с виртуализацией для работы с большими наборами данных при высокой производительности.'
category: data
keywords:
  - scrollbar
  - overflow
  - scrolling
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ScrollArea.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/scroll-area
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/scroll-area
  - label: TanStack Virtual
    avatar:
      src: https://github.com/tanstack.png
      loading: lazy
    to: https://tanstack.com/virtual/v3
---

## Использование {#usage}

ScrollArea создаёт прокручиваемые контейнеры с необязательной виртуализацией для больших списков.

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-example'
class: '!p-0'
---
::

### Элементы {#items}

Пропс `items` — массив; каждый элемент отрисовывается через слот по умолчанию:

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-items-example'
class: '!p-0'
---
::

::tip{to="#with-default-slot"}
Слот по умолчанию можно использовать и без пропса `items`, чтобы напрямую отрисовать произвольное прокручиваемое содержимое.
::

### Ориентация {#orientation}

Пропс `orientation` меняет направление прокрутки. По умолчанию `vertical`.

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-orientation-example'
class: '!p-0'
options:
  - name: orientation
    label: orientation
    default: horizontal
    items:
      - vertical
      - horizontal
---
::

### Виртуализация {#virtualize}

Пропс `virtualize` отрисовывает только те элементы, которые сейчас на экране, и заметно ускоряет работу с большими наборами данных.

::note
При **включённой** виртуализации отступы настраиваются опциями пропса `virtualize`: `gap`, `paddingStart` и `paddingEnd`. Без виртуализации применяйте пропс `b24ui`, например классы `gap p-4` для слота `viewport`.
::

::tip
Если у всех элементов **одинаковая высота**, задайте в пропсе `virtualize` значение `skipMeasurement: true`: компонент перестанет измерять каждый элемент в DOM и будет опираться на `estimateSize`. Это заметно ускоряет большие однородные списки.
::

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-virtualize-example'
class: '!p-0'
options:
  - name: orientation
    label: orientation
    default: vertical
    items:
      - vertical
      - horizontal
---
::

### Тень прокрутки {#shadow}

Пропс `shadow` показывает затухающую тень на краях прокрутки и подсказывает, что в этом направлении есть ещё содержимое. Тень следует за `orientation` и появляется, только когда содержимое не помещается.

::component-example
---
collapse: true
name: 'scroll-area-shadow-example'
---
::

::tip
Объект в пропсе `shadow` настраивает размер затухания, например `:shadow="{ size: 48 }"`.
::

## Примеры {#examples}

### Раскладка masonry {#as-masonry-layout}

Пропс `virtualize` с опциями `lanes`, `gap` и `estimateSize` строит раскладки masonry в стиле Pinterest с элементами разной высоты.

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-masonry-layout-example'
class: '!p-0'
options:
  - name: orientation
    label: orientation
    default: vertical
    items:
      - vertical
      - horizontal
  - name: lanes
    type: number
    label: lanes
    default: 6
  - name: gap
    type: number
    label: gap
    default: 16
---
::

::tip
Для лучшей производительности задайте `estimateSize` близким к средней высоте элемента. Больший `overscan` делает прокрутку плавнее, но отрисовывает больше элементов за пределами экрана.
::

### С адаптивным числом колонок {#with-responsive-lanes}

Чтобы сделать `lanes` реактивным, используйте композаблы [`useWindowSize`](https://vueuse.org/core/useWindowSize/) (по области просмотра) или [`useElementSize`](https://vueuse.org/core/useElementSize/) (по контейнеру).

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-responsive-lanes-example'
class: '!p-0'
---
::

### С внешним элементом прокрутки :badge{label="New" class="align-text-top"} {#with-external-scroll-element}

Передайте в пропс `virtualize` функцию `getScrollElement`, чтобы виртуализировать относительно прокручиваемого предка, а не собственной области компонента. `scrollMargin` задаёт смещение списка от начала элемента прокрутки (например, высоту содержимого над ним).

::component-example
---
prettier: true
collapse: true
overflowHidden: true
name: 'scroll-area-external-scroll-example'
class: '!p-0'
options:
  - name: orientation
    label: orientation
    default: vertical
    items:
      - vertical
      - horizontal
---
::

::note
Контейнер сам управляет прокруткой, поэтому кнопка «Top»/«Start» в шапке прокручивает его напрямую через `container.scrollTo`.
::

::caution
В этом режиме пропс `shadow` не действует, потому что корневой элемент больше не управляет прокруткой. Добавьте затухание на прокручиваемый контейнер самостоятельно.
::

### С программной прокруткой {#with-programmatic-scroll}

Через доступный `virtualizer` положением прокрутки можно управлять программно.

::component-example
---
collapse: true
overflowHidden: true
name: 'scroll-area-scroll-to-example'
class: '!p-0'
---
::

### С бесконечной прокруткой {#with-infinite-scroll}

Композабл [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/) подгружает данные по мере прокрутки.

::component-example
---
prettier: true
collapse: true
overflowHidden: true
name: 'scroll-area-infinite-scroll-example'
class: '!p-0'
---
::

::note
В примере `useLazyFetch` с `server: false` загружает данные на клиенте, не блокируя первую отрисовку. Состояние загрузки проверяет и `pending`, и `idle`, чтобы индикатор показывался и до запроса, и во время него. Новые страницы подгружаются по мере прокрутки.
::

### Со слотом по умолчанию {#with-default-slot}

Слот по умолчанию можно использовать без пропса `items`, чтобы напрямую отрисовать произвольное прокручиваемое содержимое.

::component-example
---
name: 'scroll-area-default-slot-example'
class: '!p-0'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

Типизированный экземпляр компонента доступен через [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const scrollArea = useTemplateRef('scrollArea')

// Прокрутить к нужному элементу
function scrollToItem(index: number) {
  scrollArea.value?.virtualizer?.scrollToIndex(index, { align: 'center' })
}
</script>

<template>
  <B24ScrollArea ref="scrollArea" :items="items" virtualize />
</template>
```

Он даёт доступ к следующему:

| Имя | Тип | Описание |
| ---- | ---- | ----------- |
| `$el`{lang="ts-type"} | `HTMLElement`{lang="ts-type"} | Корневой элемент компонента. |
| `virtualizer`{lang="ts-type"} | `Ref<Virtualizer> \| undefined`{lang="ts-type"} | Экземпляр виртуализатора [TanStack Virtual](https://tanstack.com/virtual/v3/docs/api/virtualizer) (`undefined`, если виртуализация отключена). |

## Тема {#theme}

:component-theme
