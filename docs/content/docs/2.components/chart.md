---
title: Chart
description: 'Строит данные линиями, областями, столбцами или кольцом; SVG отрисовывается на сервере.'
category: data
navigation.badge: New
keywords:
  - graph
  - line chart
  - bar chart
  - area chart
  - donut chart
  - график
  - диаграмма
  - линейный график
  - столбчатая диаграмма
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Chart.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chart
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chart
  - label: TanStack Charts
    avatar:
      src: https://github.com/tanstack.png
      loading: lazy
    to: https://tanstack.com/charts/v1
---

## Использование :badge{label="2.15+" class="align-text-top"} {#usage}

Компонент Chart построен на [TanStack Charts](https://tanstack.com/charts/v1) и отрисовывает SVG на сервере.

TanStack Charts — необязательная peer-зависимость, сначала установите её:

::code-group{sync="pm"}

```bash [pnpm]
pnpm add @tanstack/charts
```

```bash [yarn]
yarn add @tanstack/charts
```

```bash [npm]
npm install @tanstack/charts
```

```bash [bun]
bun add @tanstack/charts
```

::

### Данные {#data}

Пропс `data` принимает массив объектов, пропс `index` задаёт ключ для оси X, а пропс `categories` — ряды: у каждого есть `key` со значениями и необязательные `label` и `color`.

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

::note
Категории можно передать и строками, например `['desktop', 'mobile']`, если они хорошо читаются как названия.
::

::tip
Пропс `aria-label` задаёт название графика для вспомогательных технологий.
::

### Тип {#type}

Пропс `type` меняет тип графика. По умолчанию — `line`.

::note
При `donut` каждая строка `data` — отдельный сектор. `index` задаёт его подпись, а первый ключ `categories` — значение.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
items:
  type:
    - line
    - area
    - bar
    - donut
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  type: donut
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### С накоплением {#stacked}

Пропс `stacked` складывает ряды друг на друга.

::warning
Пропс работает только при `type` равном `area` или `bar`.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  type: bar
  stacked: true
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Кривая {#curve}

Пропс `curve` меняет форму линии между значениями. По умолчанию — `linear`.

::warning
Пропс работает только при `type` равном `line` или `area`.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
items:
  curve:
    - linear
    - monotone
    - step
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  type: line
  curve: monotone
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Цвета {#colors}

Пропс `colors` задаёт цвет каждого ряда: цветами `air-*` (`air-primary`, `air-primary-success`, `air-primary-alert`, `air-primary-warning`, `air-primary-copilot`, `air-secondary-no-accent`) или любым CSS-цветом.

::note
Цвета назначаются в порядке `categories`, а при `donut` — в порядке `data`. `color`, заданный у категории, приоритетнее. Если рядов больше, чем цветов, цвета повторяются в более светлых оттенках.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
  - colors
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  colors:
    - air-primary-success
    - '#8b5cf6'
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

::tip{to="/docs/getting-started/theme/css-variables/#chart"}
По умолчанию цвета берутся из CSS-переменных `--b24ui-chart-*`, которые можно переопределить в файле `main.css`.
::

### Точки {#points}

Пропс `points` рисует точку у каждого значения.

::warning
Пропс работает только при `type` равном `line`.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  points: true
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Сетка {#grid}

Пропс `grid` включает и выключает горизонтальные линии сетки. По умолчанию — `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  grid: false
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Оси {#axis}

Пропсы `x-axis` и `y-axis` включают и выключают каждую ось. По умолчанию оба — `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  xAxis: false
  yAxis: false
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Подписи осей {#axis-labels}

Пропсы `x-label` и `y-label` показывают заголовок вдоль каждой оси.

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  xLabel: Месяц
  yLabel: Посетители
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Легенда {#legend}

Пропс `legend` включает и выключает легенду.

::note
По умолчанию легенда видна, если категорий больше одной (или секторов больше одного при `donut`).
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  legend: false
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Подсказка {#tooltip}

Пропс `tooltip` настраивает или скрывает [подсказку](/docs/components/tooltip), которая показывается у выбранных значений. По умолчанию — `true`.

::tip{to="#with-tooltip-slot"}
Содержимое подсказки заменяет слот `#tooltip`.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
items:
  tooltip:
    - true
    - false
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  tooltip: false
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Толщина {#thickness}

Пропс `thickness` задаёт толщину кольца в пикселях. По умолчанию — `24`.

::warning
Пропс работает только при `type` равном `donut`.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
hide:
  - aspectRatio
  - initialWidth
props:
  aspectRatio: 2.77
  initialWidth: 832
  type: donut
  thickness: 12
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

### Размер {#size}

Пропс `height` задаёт высоту графика в пикселях. По умолчанию — `300`.

::tip
График занимает всю ширину контейнера. Пропс `aspect-ratio` выводит высоту из ширины, а пропс `width` задаёт фиксированную ширину.
::

::note
При фиксированной высоте график плавно появляется после измерения контейнера. При `aspect-ratio` сразу показывается график, отрисованный на сервере.
::

::component-code
---
prettier: true
collapse: true
ignore:
  - data
  - index
  - categories
external:
  - data
externalTypes:
  - ChartData[]
props:
  height: 200
  data:
    - month: Январь
      desktop: 186
      mobile: 80
    - month: Февраль
      desktop: 305
      mobile: 200
    - month: Март
      desktop: 237
      mobile: 120
    - month: Апрель
      desktop: 73
      mobile: 190
    - month: Май
      desktop: 209
      mobile: 130
    - month: Июнь
      desktop: 214
      mobile: 140
  index: month
  categories:
    - key: desktop
      label: Компьютер
    - key: mobile
      label: Телефон
---
::

## Примеры {#examples}

### С форматированием значений {#with-formatted-values}

Пропс `format` форматирует значения на оси Y и в подсказке.

::component-example
---
collapse: true
name: 'chart-format-example'
---
::

### С готовым описанием графика {#with-a-chart-definition}

Если остальных пропсов не хватает, пропс `definition` принимает готовое [описание графика TanStack Charts](https://tanstack.com/charts/v1/docs/concepts/chart-definitions).

::note{to="https://tanstack.com/charts/v1" target="_blank"}
Описание из примеров TanStack Charts отрисовывается как есть, с подсказкой и адаптивным размером.
::

::component-example
---
collapse: true
name: 'chart-definition-example'
---
::

::tip{to="/docs/getting-started/theme/css-variables/#chart"}
Ряды без явного цвета берут цвет из CSS-переменных `--b24ui-chart-*`. Цвета, заданные в описании, сохраняются.
::

::caution
Если в описании есть собственный `tooltip`, он показывается вместо пропса `tooltip`.
::

::warning
Примерам, которые импортируют пакеты `d3-*`, нужны эти пакеты в вашем проекте.
::

### Со слотом center {#with-center-slot}

Слот `#center` показывает содержимое в центре кольцевого графика `donut`.

::component-example
---
collapse: true
name: 'chart-center-slot-example'
---
::

### Со слотом tooltip {#with-tooltip-slot}

Слот `#tooltip` заменяет содержимое подсказки. Он получает `title`, `rows` с их `label`, `value` и `color`, а также выбранные `points`.

::component-example
---
collapse: true
name: 'chart-tooltip-slot-example'
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

## История изменений {#changelog}

:component-changelog
