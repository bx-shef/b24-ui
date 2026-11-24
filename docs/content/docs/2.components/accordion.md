---
title: Accordion
description: 'Набор сворачиваемых панелей, расположенных друг под другом'
category: data
keywords:
  - disclosure
  - collapse
  - faq
  - expansion panel
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Accordion.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/accordion
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/accordion
  - label: Accordion
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/accordion
---

## Использование {#usage}

Компонент Accordion показывает список сворачиваемых элементов.

::component-code
---
collapse: true
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
  - defaultValue
props:
  defaultValue: '0'
  class: 'px-4 max-w-[512px]'
  items:
    - label: 'Начало работы с Битрикс24'
      content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе ИИ.'
    - label: 'Основные возможности Битрикс24'
      content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
    - label: 'Тарифы облачного Битрикс24'
      content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `trailingIcon?: IconComponent`{lang="ts-type"}
- `content?: string`{lang="ts-type"}
- `value?: string`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, header?: ClassNameValue, trigger?: ClassNameValue, leadingIcon?: ClassNameValue, label?: ClassNameValue, trailingIcon?: ClassNameValue, content?: ClassNameValue, body?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  items:
    - label: 'Начало работы с Битрикс24'
      content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе ИИ.'
    - label: 'Основные возможности Битрикс24'
      content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
    - label: 'Тарифы облачного Битрикс24'
      content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
---
::

### Несколько элементов {#multiple}

Значение `multiple` у пропса `type` позволяет раскрывать несколько элементов одновременно. По умолчанию — `single`.

::component-code
---
ignore:
  - type
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  type: 'multiple'
  items:
    - label: 'Начало работы с Битрикс24'
      content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе ИИ.'
    - label: 'Основные возможности Битрикс24'
      content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
    - label: 'Тарифы облачного Битрикс24'
      content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
---
::

### Сворачивание {#collapsible}

При `type` равном `single` пропс `collapsible` со значением `false` не даёт свернуть активный элемент.

::component-code
---
ignore:
  - collapsible
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  collapsible: false
  items:
    - label: 'Начало работы с Битрикс24'
      content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе ИИ.'
    - label: 'Основные возможности Битрикс24'
      content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
    - label: 'Тарифы облачного Битрикс24'
      content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
---
::

### Размонтирование {#unmount}

Пропс `unmount-on-hide` управляет тем, размонтируется ли содержимое при сворачивании. По умолчанию — `true`.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  unmountOnHide: false
  items:
    - label: 'Начало работы с Битрикс24'
      content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе ИИ.'
    - label: 'Основные возможности Битрикс24'
      content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
    - label: 'Тарифы облачного Битрикс24'
      content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
---
::

::note
Содержимое каждого элемента видно в DOM, если открыть инструменты разработчика.
::

### Отключение {#disabled}

Свойство `disabled` отключает весь Accordion.

Отдельный элемент отключается свойством `disabled` в объекте элемента.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
props:
  class: 'px-4'
  disabled: true
  items:
    - label: 'Начало работы с Битрикс24'
      content: 'Битрикс24 — онлайн-сервис с полезными инструментами для компании: чаты и звонки, задачи и проекты, CRM и помощник на основе ИИ.'
    - label: 'Основные возможности Битрикс24'
      content: 'Битрикс24 — онлайн-сервис со всеми инструментами для работы компании и управления бизнесом.'
    - label: 'Тарифы облачного Битрикс24'
      content: 'Битрикс24 — онлайн-сервис для управления бизнесом и автоматизации работы. В нём есть инструменты для компаний любого размера и отрасли. Тарифы отличаются набором инструментов и подходят для разных видов бизнеса.'
---
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) справа у каждого элемента.

::tip
Иконку отдельного элемента можно задать свойством `trailingIcon` в объекте элемента.
::

::component-code
---
ignore:
  - items
  - trailingIcon
external:
  - items
externalTypes:
  - AccordionItem[]
hide:
  - class
cast:
  trailingIcon: 'RocketIcon'
props:
  class: 'px-4'
  trailingIcon: 'RocketIcon'
  items:
    - label: 'Иконки'
      content: 'Ничего делать не нужно: @nuxt/icon подключит иконки автоматически.'
    - label: 'Цвета'
      content: 'Выберите основной и нейтральный цвета из темы Tailwind CSS.'
    - label: 'Компоненты'
      content: 'Компоненты настраиваются пропсами `class` / `b24ui` или в `app/app.config.ts`.'
---
::

## Примеры {#examples}

### Управление активными элементами {#control-active-items}

Активным элементом управляют пропс `default-value` или директива `v-model` со значением `value` элемента. Если `value` не задан, берётся индекс **в виде строки**.

::component-example
---
name: 'accordion-model-value-example'
props:
  class: 'px-4'
---
::

::tip
Пропс `value-key` меняет ключ, по которому элементы сопоставляются при `v-model` или `default-value`.
::

::caution
При `type="multiple"` в `default-value` или `v-model` передавайте массив.
::

### С перетаскиванием {#with-drag-and-drop}

Композабл [`useSortable`](https://vueuse.org/integrations/useSortable/) из [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) добавляет Accordion перетаскивание. Он оборачивает [Sortable.js](https://sortablejs.github.io/Sortable/).

::component-example
---
name: 'accordion-drag-and-drop-example'
---
::

### Со слотом body {#with-body-slot}

Слот `#body` настраивает тело каждого элемента.

::component-example
---
name: 'accordion-body-slot-example'
props:
  class: 'px-4'
---
::

::tip
У слота `#body` есть готовые стили. Чтобы начать с нуля, используйте [слот `#content`](#with-content-slot).
::

### Со слотом content {#with-content-slot}

Слот `#content` настраивает содержимое каждого элемента.

::component-example
---
name: 'accordion-content-slot-example'
props:
  class: 'px-4'
---
::

### С пользовательским слотом {#with-custom-slot}

Свойство `slot` настраивает конкретный элемент.

Доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-body`{lang="ts-type"}

::component-example
---
name: 'accordion-custom-slot-example'
props:
  class: 'px-4'
---
::

### С Markdown-содержимым {#with-markdown-content}

Компонент [MDC](https://github.com/nuxt-modules/mdc?tab=readme-ov-file#mdc) из `@nuxtjs/mdc` отрисовывает Markdown внутри элементов.

::component-example
---
collapse: true
name: 'accordion-markdown-example'
class: 'px-8'
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
