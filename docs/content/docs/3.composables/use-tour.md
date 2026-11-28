---
title: useTour
description: 'Композабл для пошаговых туров по интерфейсу: один Popover переносится от шага к шагу.'
---

## Использование {#usage}

Автоимпортируемый композабл `useTour` ведёт пошаговый тур с помощью одного [Popover](/docs/components/popover/), у которого от шага к шагу меняется точка привязки. Композабл хранит состояние шагов и превращает `target` каждого шага в `reference`, который вы привязываете к `<B24Popover>`; содержимое и навигация остаются полностью под вашим контролем.

::component-example
---
collapse: true
name: 'use-tour-example'
---
::

Каждому шагу нужен `target`, к которому привязывается popover. Это может быть голый id (простое слово всегда считается id, а не селектором тега), любой CSS-селектор, элемент, виртуальный элемент (любой объект с `getBoundingClientRect`) либо ref или геттер, возвращающий любой из них. `null` привязывает шаг к центру области просмотра. Остальные поля шага (`title`, `body`, `side` и др.) передаются без изменений и доступны через `current`.

```vue
<script setup lang="ts">
const card = useTemplateRef('card')

const tour = useTour([
  { target: '#cta', title: 'Get started' },
  { target: () => card.value, title: 'Profile', side: 'right' },
  { target: null, title: 'All set' }
])
</script>

<template>
  <B24Button @click="tour.start()">Start tour</B24Button>

  <B24Popover :open="tour.open.value" :reference="tour.reference.value" :dismissible="false">
    <template #content>
      <!-- your content + buttons -->
      <B24Button :disabled="!tour.hasPrev.value" @click="tour.prev()">Back</B24Button>
      <B24Button @click="tour.next()">{{ tour.hasNext.value ? 'Next' : 'Finish' }}</B24Button>
    </template>
  </B24Popover>
</template>
```

- Основан на реактивном пропсе `reference` у Popover, поэтому при смене активного шага popover плавно перемещается.
- Когда шаг становится активным, страница автоматически прокручивается к его цели.
- Содержимое вы отрисовываете сами, поэтому отдельной темы и локали поддерживать не нужно.

## API

`useTour(steps, options?)`{lang="ts-type"}

### Параметры {#parameters}

::field-group

  ::field{name="steps" type="MaybeRefOrGetter<TourStep[]>" required}
  Список шагов тура. Это может быть статичный массив, `ref` или геттер для реактивных шагов.

    ::collapsible

      ::field-group
        ::field{name="target" type="MaybeRefOrGetter<string | ReferenceElement | null | undefined>"}
        Элемент, к которому привязан шаг. Принимает голый id (`'id'` — простое слово всегда считается id, а не селектором тега), любой CSS-селектор (`'#id'`, `'.class'`, `'[data-tour="step"]'` и т. д.), элемент, виртуальный элемент либо ref или геттер, возвращающий любой из них. `null` помещает шаг в центр области просмотра.
        ::

        ::field{name="[key: string]" type="any"}
        Любые дополнительные поля (`title`, `body`, `side` и др.) передаются как есть и доступны через `current`.
        ::
      ::
    ::
  ::

  ::field{name="options" type="UseTourOptions"}
  Настройки тура.

    ::collapsible

      ::field-group
        ::field{name="initialStep" type="number" default="0"}
        Индекс шага, с которого начинается тур.
        ::

        ::field{name="loop" type="boolean" default="false"}
        Возвращаться к первому шагу после последнего.
        ::

        ::field{name="scrollIntoView" type="boolean | ScrollIntoViewOptions" default="true"}
        Прокручивать страницу к цели, когда шаг становится активным.
        ::
      ::
    ::
  ::
::

### Возвращаемое значение {#return}

::field-group

  ::field{name="open" type="Ref<boolean>"}
  Открыт ли тур сейчас.
  ::

  ::field{name="index" type="Ref<number>"}
  Индекс текущего шага, ограниченный диапазоном шагов.
  ::

  ::field{name="current" type="ComputedRef<TourStep | undefined>"}
  Объект текущего шага или `undefined`, если шагов нет.
  ::

  ::field{name="reference" type="ComputedRef<ReferenceElement | undefined>"}
  Вычисленная точка привязки текущего шага; передаётся в `<B24Popover :reference>`.
  ::

  ::field{name="total" type="ComputedRef<number>"}
  Общее число шагов.
  ::

  ::field{name="hasNext" type="ComputedRef<boolean>"}
  Есть ли следующий шаг.
  ::

  ::field{name="hasPrev" type="ComputedRef<boolean>"}
  Есть ли предыдущий шаг.
  ::

  ::field{name="start" type="(index?: number) => void"}
  Открывает тур, при необходимости с заданного шага.
  ::

  ::field{name="next" type="() => void"}
  Переходит к следующему шагу. В конце тур зацикливается или завершается — в зависимости от опции `loop`.
  ::

  ::field{name="prev" type="() => void"}
  Переходит к предыдущему шагу.
  ::

  ::field{name="goTo" type="(index: number) => void"}
  Переходит к указанному шагу и открывает тур.
  ::

  ::field{name="finish" type="() => void"}
  Закрывает тур.
  ::
::

## Примеры {#examples}

### Подсветка цели {#spotlight}

Пример показывает, как затемнить страницу вокруг текущей цели, сочетая `reference` с [`useElementBounding`](https://vueuse.org/core/useElementBounding/) из VueUse. Цель остаётся кликабельной, остальная страница заблокирована, а шаг без цели затемняет всю страницу. Настройка занимает три шага:

1. Скопируйте компонент оверлея ниже в своё приложение. Он измеряет цель через `useElementBounding` и рисует подложку с `clip-path`: вырез и кольцо вокруг цели.
2. Отрисуйте `<UseTourSpotlight :tour="tour" />` рядом с `<B24Popover>`. Измерение оставьте внутри оверлея: размеры обновляются на каждом кадре прокрутки, и чтение их в родительском шаблоне перерисовывало бы весь родитель при прокрутке.
3. Задайте popover `:b24ui="{ content: 'z-50' }"`, чтобы он оставался над подложкой (`z-40`), и `sideOffset` со значением `16`, чтобы он не заходил на отступ выреза.

::component-example
---
collapse: true
name: 'use-tour-spotlight'
preview: false
---
::

::component-example
---
collapse: true
name: 'use-tour-spotlight-example'
---
::
