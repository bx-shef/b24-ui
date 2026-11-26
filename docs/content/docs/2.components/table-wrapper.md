---
title: TableWrapper
description: 'Обёртка для отображения HTML-таблицы.'
category: data
keywords:
  - обёртка таблицы
  - HTML-таблица
  - простая таблица
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/TableWrapper.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/table-wrapper
---

## Использование {#usage}

TableWrapper — обёртка над HTML-таблицей, которая даёт гибкий контроль над её внешним видом.

Таблицу можно оформлять как угодно.

::component-example
---
collapse: true
name: 'table-wrapper-example'
---
::

### Размер {#size}

Свойство `size` меняет размер таблицы.

::component-example
---
collapse: true
name: 'table-wrapper-size-example'
---
::

### Граница и фон {#border-and-background}

Свойство `bordered` показывает границу таблицы.

Фон задаётся отдельно через `class`. Например, белый фон: `class="bg-white"`.

Фон можно задать и с помощью компонента [Card](/docs/components/card/).

::component-example
---
collapse: true
name: 'table-wrapper-border-background-example'
---
::

### Скругление {#rounded}

Параметр `rounded` скругляет углы.

::component-example
---
collapse: true
name: 'table-wrapper-rounded-example'
---
::

### Зебра {#zebra}

Свойство `zebra` чередует цвета строк.

Чтобы выделить строки таблицы, используйте класс тега `tr`.

Чтобы выделять строку при наведении курсора, добавьте в класс тега `tr` что-нибудь вроде `hover:bg-red-500`.

::component-example
---
collapse: true
name: 'table-wrapper-zebra-example'
---
::

### Подсветка строки при наведении {#row-hover}

Свойство `rowHover` автоматически подсвечивает строку при наведении.

::component-example
---
collapse: true
name: 'table-wrapper-hover-example'
---
::

### Закреплённые строки {#pinned-rows}

Строки закрепляются свойством `pinRows`.

Закреплённую строку задайте тегом `<thead>...</thead>` или `<tfoot>...</tfoot>`.

::component-example
---
collapse: true
name: 'table-wrapper-pin-rows-example'
---
::

### Закреплённые колонки {#pinned-columns}

Свойство `pinCols` закрепляет колонки.

Колонки задайте тегом `<th>...</th>`.

::component-example
---
collapse: true
name: 'table-wrapper-pin-cols-example'
---
::

## API {#api}

### Пропсы {#props}

:component-props

## Тема {#theme}

:component-theme
