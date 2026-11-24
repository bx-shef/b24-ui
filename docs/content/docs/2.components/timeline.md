---
title: Timeline
description: 'Компонент для хронологической последовательности событий с датами, заголовками и вспомогательными иконками или аватарами.'
category: data
keywords:
  - activity feed
  - history
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Timeline.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/timeline
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/timeline
---

## Использование {#usage}

Timeline показывает список элементов в виде хронологии.

::component-code
---
collapse: true
hide:
  - class
  - defaultValue
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  defaultValue: 2
  items:
    - date: '15 марта 2025'
      title: 'Старт проекта'
      description: 'Запустили проект и согласовали работу команды. Определили вехи и распределили ресурсы.'
    - date: '22 марта 2025'
      title: 'Этап дизайна'
      description: 'Исследование пользователей и дизайн-воркшопы. Создали макеты и прототипы для проверки с пользователями.'
    - date: '29 марта 2025'
      title: 'Спринт разработки'
      description: 'Разработка фронтенда и бэкенда. Реализовали основные функции и интегрировали с API.'
    - date: '5 апреля 2025'
      title: 'Тестирование и развёртывание'
      description: 'QA-тестирование и оптимизация производительности. Развернули приложение в продакшене.'
  class: 'w-[384px]'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `date?: string`{lang="ts-type"}
- `title?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-alternating-layout)
- `avatar?: AvatarProps`{lang="ts-type"}
- `value?: string | number`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, container?: ClassNameValue, indicator?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, date?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  defaultValue: 2
  items:
    - date: '15 марта 2025'
      title: 'Старт проекта'
      description: 'Запустили проект и согласовали работу команды. Определили вехи и распределили ресурсы.'
    - date: '22 марта 2025'
      title: 'Этап дизайна'
      description: 'Исследование пользователей и дизайн-воркшопы. Создали макеты и прототипы для проверки с пользователями.'
    - date: '29 марта 2025'
      title: 'Спринт разработки'
      description: 'Разработка фронтенда и бэкенда. Реализовали основные функции и интегрировали с API.'
    - date: '5 апреля 2025'
      title: 'Тестирование и развёртывание'
      description: 'QA-тестирование и оптимизация производительности. Развернули приложение в продакшене.'
  class: 'w-[384px]'
---
::

### Цвет {#color}

Пропс `color` меняет цвет активных элементов Timeline.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  color: air-primary
  defaultValue: 2
  items:
    - date: '15 марта 2025'
      title: 'Старт проекта'
      description: 'Запустили проект и согласовали работу команды. Определили вехи и распределили ресурсы.'
    - date: '22 марта 2025'
      title: 'Этап дизайна'
      description: 'Исследование пользователей и дизайн-воркшопы. Создали макеты и прототипы для проверки с пользователями.'
    - date: '29 марта 2025'
      title: 'Спринт разработки'
      description: 'Разработка фронтенда и бэкенда. Реализовали основные функции и интегрировали с API.'
    - date: '5 апреля 2025'
      title: 'Тестирование и развёртывание'
      description: 'QA-тестирование и оптимизация производительности. Развернули приложение в продакшене.'
  class: 'w-[384px]'
---
::

### Размер {#size}

Пропс `size` меняет размер Timeline.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  size: xs
  defaultValue: 2
  items:
    - date: '15 марта 2025'
      title: 'Старт проекта'
      description: 'Запустили проект и согласовали работу команды. Определили вехи и распределили ресурсы.'
    - date: '22 марта 2025'
      title: 'Этап дизайна'
      description: 'Исследование пользователей и дизайн-воркшопы. Создали макеты и прототипы для проверки с пользователями.'
    - date: '29 марта 2025'
      title: 'Спринт разработки'
      description: 'Разработка фронтенда и бэкенда. Реализовали основные функции и интегрировали с API.'
    - date: '5 апреля 2025'
      title: 'Тестирование и развёртывание'
      description: 'QA-тестирование и оптимизация производительности. Развернули приложение в продакшене.'
  class: 'w-[384px]'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Timeline. По умолчанию `vertical`.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  orientation: 'horizontal'
  defaultValue: 2
  items:
    - date: '15 марта 2025'
      title: 'Старт проекта'
      description: 'Запустили проект и согласовали работу команды.'
    - date: '22 марта 2025'
      title: 'Этап дизайна'
      description: 'Исследование пользователей и дизайн-воркшопы.'
    - date: '29 марта 2025'
      title: 'Спринт разработки'
      description: 'Разработка фронтенда и бэкенда.'
    - date: '5 апреля 2025'
      title: 'Тестирование и развёртывание'
      description: 'QA-тестирование и оптимизация производительности.'
  class: 'w-full'
class: 'overflow-x-auto'
---
::

### Обратный порядок {#reverse}

Пропс `reverse` меняет направление Timeline на обратное.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  reverse: true
  modelValue: 2
  orientation: 'vertical'
  items:
    - date: '15 марта 2025'
      title: 'Старт проекта'
      description: 'Запустили проект и согласовали работу команды.'
    - date: '22 марта 2025'
      title: 'Этап дизайна'
      description: 'Исследование пользователей и дизайн-воркшопы.'
    - date: '29 марта 2025'
      title: 'Спринт разработки'
      description: 'Разработка фронтенда и бэкенда.'
    - date: '5 апреля 2025'
      title: 'Тестирование и развёртывание'
      description: 'QA-тестирование и оптимизация производительности.'
  class: 'w-full'
class: 'overflow-x-auto'
---
::

## Примеры {#examples}

### Управление активным элементом {#control-active-item}

Активным элементом управляют пропс `default-value` или директива `v-model` со значением `value` элемента. Если `value` не задан, берётся индекс.

:component-example{name="timeline-model-value-example" prettier}

::tip
Пропс `value-key` меняет ключ, по которому элементы сопоставляются с `v-model` или `default-value`.

Значение сопоставляется с `value-key` каждого элемента независимо от его типа. Число сохраняет позиционный смысл, если у элемента на этой позиции нет `value-key` (поэтому обычные массивы по-прежнему работают по индексу), и превращается в позицию, если ни один элемент не совпал. Числа вне диапазона не выбирают ничего.
::

### С событием select {#with-select-event}

Слушатель `@select` делает элементы кликабельными.

::note
Функция-обработчик получает `Event` первым аргументом и `TimelineItem` вторым.
::

::component-example
---
prettier: true
name: 'timeline-select-example'
---
::


### С чередующейся раскладкой {#with-alternating-layout}

Пропс `b24ui` создаёт Timeline с чередующейся раскладкой.

:component-example{name="timeline-alternating-layout-example" prettier}

### С собственным слотом {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент.

Вам будут доступны слоты:

- `#{{ item.slot }}-indicator`{lang="ts-type"}
- `#{{ item.slot }}-date`{lang="ts-type"}
- `#{{ item.slot }}-title`{lang="ts-type"}
- `#{{ item.slot }}-description`{lang="ts-type"}

:component-example{name="timeline-custom-slot-example" prettier}

### Со слотами {#with-slots}

Доступные слоты позволяют собрать более сложный Timeline.

:component-example{name="timeline-slots-example" prettier}

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
