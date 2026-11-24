---
title: CheckboxGroup
description: 'Список с множественным выбором на кнопочных элементах.'
category: form
keywords:
  - multi select
  - checklist
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/CheckboxGroup.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chip
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/checkbox-group
  - label: CheckboxGroup
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/checkbox#group-root
---

## Использование {#usage}

Значением CheckboxGroup управляет директива `v-model`, а если управлять состоянием не нужно, начальное значение задаёт пропс `default-value`.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Элементы {#items}

Пропс `items` — массив строк или чисел:

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

Можно передать и массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- [`value?: string`{lang="ts-type"}](#value-key)
- `disabled?: boolean`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#indicator)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
externalTypes:
  - CheckboxGroupItem[]
props:
  modelValue:
    - 'system'
  items:
    - label: 'Системная'
      description: 'Это первый вариант.'
      value: 'system'
    - label: 'Светлая'
      description: 'Это второй вариант.'
      value: 'light'
    - label: 'Тёмная'
      description: 'Это третий вариант.'
      value: 'dark'
---
::

::caution
Если элементы — объекты, в `v-model` или `default-value` указывайте свойство `value` объекта.
::

### Ключ значения {#value-key}

Свойство, из которого берётся значение, меняет пропс `value-key`. По умолчанию — `value`.

::component-code
---
ignore:
  - modelValue
  - items
  - valueKey
external:
  - items
  - modelValue
externalTypes:
  - CheckboxGroupItem[]
props:
  modelValue:
    - 'light'
  valueKey: 'id'
  items:
    - label: 'Системная'
      description: 'Это первый вариант.'
      id: 'system'
    - label: 'Светлая'
      description: 'Это второй вариант.'
      id: 'light'
    - label: 'Тёмная'
      description: 'Это третий вариант.'
      id: 'dark'
---
::

### Легенда {#legend}

Пропс `legend` задаёт легенду CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  legend: 'Тема'
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Цвет {#color}

Пропс `color` меняет цвет CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  color: air-primary-copilot
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Вариант {#variant}

Пропс `variant` меняет вариант CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  variant:
    - list
    - card
    - table
props:
  color: 'air-primary-copilot'
  variant: 'card'
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Размер {#size}

Пропс `size` меняет размер CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  variant:
    - list
    - card
    - table
props:
  size: 'lg'
  variant: 'list'
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию CheckboxGroup. По умолчанию — `vertical`.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  variant:
    - list
    - card
    - table
props:
  orientation: 'horizontal'
  variant: 'list'
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Индикатор {#indicator}

Пропс `indicator` меняет положение индикатора или скрывает его. По умолчанию — `start`.

::note
Пока индикатор виден, `icon` элемента заменяет галочку, а при `hidden` показывается над подписью.
::

::component-example
---
collapse: true
name: 'checkbox-group-icon-example'
---
::

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
items:
  indicator:
    - start
    - end
    - hidden
  variant:
    - list
    - card
    - table
props:
  indicator: 'end'
  variant: 'card'
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Отключение {#disabled}

Пропс `disabled` отключает CheckboxGroup.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
- items
items:
  variant:
  - list
  - card
  - table
props:
  disabled: true
  variant: 'list'
  defaultValue:
    - 'Системная'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

### Максимум :badge{label="2.15+" class="align-text-top"} {#max}

Пропс `max` ограничивает число отмечаемых элементов. Когда предел достигнут, остальные элементы отметить нельзя.

::component-code
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  max: 2
  defaultValue:
    - 'Системная'
    - 'Светлая'
  items:
    - 'Системная'
    - 'Светлая'
    - 'Тёмная'
---
::

## Примеры {#examples}

### Раскладка настроек {#settings-layout}

Вариант `card` вместе со слотом `#label` даёт выбор в стиле настроек: у каждого варианта есть заголовок, описание, ссылка «Learn more» и картинка предпросмотра. Слот подписи отрисовывается внутри `<span>`, поэтому подойдёт любая раскладка из фразового содержимого (flex, ссылка, изображение).

::component-example
---
collapse: true
name: 'checkbox-group-settings-example'
---
::

::prompt
---
description: Собрать расширенный выбор настроек на карточках с чекбоксами (предпросмотр, описание, ссылка).
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Соберите выбор настроек с несколькими переключателями на `B24CheckboxGroup` с `variant="card"`. У каждого варианта — заголовок, многострочное описание, встроенная ссылка «Learn more» и картинка предпросмотра справа; всё раскладывается через слот `#label`. Включить можно сразу несколько вариантов, поэтому `v-model` привязан к массиву.

Прежде чем генерировать код, спросите недостающие сведения, не угадывайте:
- сколько возможностей и какими должны быть их `value`, `title` и описание;
- какой адрес у каждой ссылки «Learn more» (один на всех или у каждого свой);
- откуда берётся предпросмотр: настоящая картинка, `<Placeholder>` до готовности графики или его нет вовсе;
- нужно ли сохранять выбор (куда привязан `v-model`: локальный `ref<string[]>`, хранилище Pinia, query-параметр, сервер);
- какие `size` (`sm` / `md` / `lg`) и токен `color` подходят странице;
- находится ли выбор внутри `B24Form` (тогда его нужно обернуть в `B24FormField` с подписью);
- есть ли взаимоисключающие сочетания: если да, логика живёт в родителе (например, `watch`, который убирает несовместимые значения), а не в разметке.

Требования после подтверждения деталей:
- Объявите локальный `interface` для формы элемента (`value`, `title`, `text`, `href`, необязательный `preview`) и типизируйте им массив. `CheckboxGroupItem[]` не используйте: он расширяет пользовательские поля до `any`
- Внутри слота `#label` используйте только обёртки `<span>` (без `<div>` и `<p>`: в варианте `card` слот отрисовывается как `<span>`)
- Применяйте семантические утилиты (`text-description`, `text-(length:--ui-font-size-md)` и т. п.), а не «сырые» цвета палитры Tailwind
- Скрывайте предпросмотр ниже контрольной точки `sm` (`hidden sm:flex`)
- Добавьте `@click.stop` встроенному `B24Link`, чтобы щелчок по ссылке не переключал чекбокс
- Если `item.href` может прийти из ненадёжного источника, проверьте его перед привязкой (отклоняйте `javascript:`, `data:` и адреса открытого редиректа)
::

::tip
Чтобы щелчок по встроенной ссылке не переключал чекбокс, добавьте ей `@click.stop`.
::

::note
Тот же приём работает и для выбора одного варианта — см. [RadioGroup → Раскладка настроек](/docs/components/radio-group#settings-layout). Для сеток «иконка + описание» (без картинки предпросмотра) используйте [`B24PageCardGroup`](/docs/components/page-card-group).
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
