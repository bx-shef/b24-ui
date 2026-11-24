---
title: Form
description: 'Компонент формы для валидации и обработки отправки.'
category: form
keywords:
  - validation
  - schema
  - submit
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Form.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/form
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/form
---

## Использование {#usage}

Компонент Form проверяет данные формы любой библиотекой валидации, поддерживающей [Standard Schema](https://github.com/standard-schema/standard-schema), например [Valibot](https://github.com/fabian-hiller/valibot), [Zod](https://github.com/colinhacks/zod), [Regle](https://github.com/victorgarciaesgi/regle), [Yup](https://github.com/jquense/yup), [Joi](https://github.com/hapijs/joi) или [Superstruct](https://github.com/ianstormtaylor/superstruct), либо вашей собственной логикой.

Вместе с компонентом [FormField](/docs/components/form-field/) он автоматически показывает сообщения об ошибках рядом с элементами формы.

### Валидация по схеме {#schema-validation}

Нужны два пропса:

- `state` — реактивный объект с состоянием формы.
- `schema` — любая схема [Standard Schema](https://github.com/standard-schema/standard-schema) или [Superstruct](https://github.com/ianstormtaylor/superstruct).

::warning
**Библиотека валидации по умолчанию не входит в поставку**, **установите нужную вам**.
::

::tabs{class="gap-0"}
  ::component-example{label="Valibot"}
  ---
  name: 'form-example-valibot'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Zod"}
  ---
  name: 'form-example-zod'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Regle"}
  ---
  name: 'form-example-regle'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Yup"}
  ---
  name: 'form-example-yup'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Joi"}
  ---
  name: 'form-example-joi'
  props:
    class: 'w-60'
  ---
  ::

  ::component-example{label="Superstruct"}
  ---
  name: 'form-example-superstruct'
  props:
    class: 'w-60'
  ---
  ::
::

### Собственная валидация {#custom-validation}

Пропс `validate` подключает вашу логику валидации.

Функция валидации должна вернуть список ошибок с атрибутами:

- `message` — сообщение об ошибке.
- `name` — `name` поля `FormField`, которому адресована ошибка.

::tip
Её можно использовать вместе с пропсом `schema` в сложных случаях.
::

::component-example
---
name: 'form-example-basic'
props:
  class: 'w-60'
---
::

### Отображение ошибок {#error-reporting}

Ошибки сопоставляются с нужным [FormField](/docs/components/form-field/) по его пропсу `name`. Ошибка поля `email` показывается в `<FormField name="email">`{lang="vue"}.

Вложенные поля сопоставляются через точку. Схема вида `{ user: z.object({ email: z.string() }) }`{lang="ts"} применится к `<FormField name="user.email">`{lang="vue"}.

::warning
Имя ошибки у элемента массива включает индекс (например, `tags.0`, `tags.1`), поэтому только по `name` она не совпадёт с `<FormField name="tags">`{lang="vue"}. Чтобы их перехватить, передайте в пропс `error-pattern` регулярное выражение вроде `/^tags\..+/`{lang="ts"}. Это особенно полезно для компонентов вроде [InputTags](/docs/components/input-tags/).
::

::component-example
---
name: 'form-example-error-pattern'
props:
  class: 'w-60'
---
::

### События ввода {#input-events}

Form автоматически запускает валидацию, когда элемент ввода генерирует событие `input`, `change` или `blur`.

- Валидация по `input` происходит **по мере ввода**.
- Валидация по `change` происходит, когда вы **фиксируете значение**.
- Валидация по `blur` происходит, когда элемент **теряет фокус**.

Когда выполнять валидацию, определяет пропс `validate-on`.

::tip
При отправке форма проверяется всегда.
::

::component-example{label="Default"}
---
source: false
name: 'form-example-elements'
options:
  - name: 'validate-on'
    label: 'validate-on'
    items:
    - 'input'
    - 'change'
    - 'blur'
    default:
    - 'input'
    - 'change'
    - 'blur'
    multiple: true
---
::

::tip
Чтобы реализовать то же внутри собственных компонентов, используйте композабл `useFormField`.
::

::warning
Событие `change` у этих элементов — **синтетическое** `Event`, его `target` равен `null`{lang="ts-type"}: значения оно не несёт. `@change="e => e.target.value"`{lang="ts"} выбросит ошибку.

Оно нужно, чтобы реагировать на фиксацию значения; значение через него не передаётся, и Form узнаёт о нём не так: валидацию запускает отдельный внутренний вызов. Читайте значение из `@update:model-value`{lang="ts"} или из `v-model`:

```vue
<template>
  <B24Select v-model="value" :items="items" @update:model-value="onCommit" />
</template>
```

Это относится ко всем элементам, которые генерируют `change` без нативного события: `Select`, `SelectMenu`, `InputMenu`, `InputDate`, `InputTime`, `InputTags`, `InputNumber`, `InputRating`, `PinInput`, `Listbox`, `Range`, `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch` и `FileUpload`. `Input` и `Textarea` пробрасывают собственное событие `change` браузера, поэтому их `target` — настоящий элемент.
::

### Событие error {#error-event}

На событие `@error` можно подписаться, чтобы обрабатывать ошибки. Оно срабатывает при отправке формы и содержит массив объектов `FormError` с полями:

- `id` — `id` элемента ввода.
- `name` — `name` поля `FormField`.
- `message` — сообщение об ошибке.

Пример: после отправки формы фокус переходит на первый элемент с ошибкой:

::component-example
---
name: 'form-example-on-error'
collapse: true
props:
  class: 'w-60'
---
::

### HTML5-валидация {#html5-validation}

При программном вызове `form.submit()` Form перед отправкой автоматически запускает нативную HTML5-валидацию.

::note
Это особенно полезно, когда кнопка отправки находится вне элемента формы, например в футере модального окна.
::

::component-example
---
name: 'form-example-html5-validation'
props:
  class: 'w-60'
---
::


### Вложенные формы {#nesting-forms}

Пропс `nested` позволяет вкладывать несколько компонентов Form друг в друга и связывать их функции валидации. Тогда валидация родительской формы автоматически проверяет и все вложенные.

Вложенные формы напрямую наследуют состояние родителя, отдельное состояние для них задавать не нужно. Пропс `name` указывает на вложенный атрибут в состоянии родителя.

Так можно динамически добавлять поля по вводу пользователя:

::component-example
---
collapse: true
name: 'form-example-nested'
---
::

Или проверять списки полей:

::component-example
---
collapse: true
name: 'form-example-nested-list'
---
::

## Примеры {#examples}

### Раздел редактирования записи {#record-edit-section}

Типичный шаблон редактирования записи (UF placement, контекст слайдера): раздел с заголовком и полями с вертикальными подписями, двухколоночная строка «сумма + валюта», вложенный подраздел «Клиент» и набор дополнительных полей. Целиком собран из `B24Form`, `B24FormField`, `B24Input`, `B24Select`, `B24InputNumber`, `B24InputDate`, `B24Popover` и `B24Calendar`, без собственных компонентов.

Полный набор полей: стадия (`B24Select`), сумма и валюта (`B24InputNumber` + `B24Select` в двухколоночной строке), группа «Клиент» (компания и контакт в `B24Input` и ссылка «Добавить участника»), затем обращение (`B24Select`), фамилия и имя (`B24Input`), тип услуги (`B24Select`) и запланированная дата (`B24InputDate` с выпадающим `B24Calendar` в `B24Popover`).

Подраздел «Клиент» — это обычный `<div>` с подписью сверху и контейнером с рамкой (`rounded-md border ... p-3 sm:p-4 space-y-4`), в который вложены `B24FormField`; `role="group"` и `aria-labelledby` связывают подпись с группой. Двухколоночная строка «Сумма и валюта» использует `grid-cols-1 sm:grid-cols-[1fr_auto]`, поэтому на узком экране валюта переносится под сумму. `B24InputDate` работает со значением `@internationalized/date` (не с нативным `Date`), поэтому в схеме это поле типизируется свободно.

::component-example
---
collapse: true
name: 'form-example-edit-section'
---
::

::prompt
---
description: Собрать раздел формы редактирования записи (панель редактирования в слайдере или UF placement).
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Опирайтесь на навык `b24-ui-nuxt` (см. `references/guidelines/forms.md` → «Record-edit form pattern») и соберите раздел формы редактирования записи: панель редактирования с заголовком, какие используются в слайдерах Битрикс24 и UF placement. Собирайте только из штатных компонентов (`B24Form`, `B24FormField`, `B24Input`, `B24Select`, `B24InputNumber`, `B24InputDate`, `B24Popover`, `B24Calendar`) под одной `:schema`, без собственных компонентов.

Прежде чем писать код, спросите недостающие сведения, не угадывайте:
- Какая запись редактируется (сделка, лид, заказ, обращение, контакт…)? От этого зависят заголовок раздела, набор полей и правила валидации.
- Какие поля входят в раздел, в каком порядке и какие обязательны? Сгруппируйте связанные (например, подраздел «Клиент») и отметьте двухколоночные строки (вроде «сумма + валюта»).
- Какой элемент подходит каждому полю: перечисление → `B24Select` (перечислите варианты), свободный текст → `B24Input`, число → `B24InputNumber`, дата → `B24InputDate` с выпадающим `B24Calendar`.
- Шапка: заголовок и одно действие-иконка справа — уточните иконку и её `aria-label`.
- Локаль, значения по умолчанию для действия сброса и что должна делать отправка (уведомление, вызов API, закрытие слайдера).

Когда ответы получены:
- Подраздел с подписью соберите как `<div role="group" :aria-labelledby="...">`, id берите из `useId()` (в b24ui нет примитива fieldset).
- Чтобы `B24Select` занял всю ширину, задайте и `class` (триггер), и `:b24ui="{ root: 'w-full' }"` (обёртка); для `B24Input` и `B24InputNumber` достаточно `class="w-full"`.
- Поле даты в схеме типизируйте свободно (`z.any().optional()`): `B24InputDate` работает со значением `@internationalized/date`, а не с нативным `Date`. К полю добавьте `B24Calendar` в `B24Popover` слота `#trailing`; оба используют один `v-model`.
- Для кнопок-иконок и кнопок-ссылок (действие в шапке и «Добавить участника») используйте `color="air-tertiary-no-accent"`: у `B24Button` нет пропса `variant`.

Весь текст оформляйте на запрошенном языке.
::

### Раскладка формы задачи {#task-form-layout}

Практический пример: форма задачи в стиле Битрикс24 из одних стандартных компонентов — `Input` для названия, `Editor` (с минимальной строкой панели) для описания, `Card`, `Avatar` и `InputDate` для блока ответственных и перенос строки с кнопками `Button`. Везде одна колонка, без собственного CSS сверх пропсов компонентов.

::component-example
---
collapse: true
name: 'form-task-form-example'
class: '!p-0'
---
::

::prompt
---
description: Собрать форму задачи в стиле Битрикс24 из стандартных компонентов b24ui.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Соберите форму задачи в стиле Битрикс24 только из стандартных компонентов `b24ui` (одна колонка, без собственного CSS сверх пропсов компонентов).

- **Название**: `B24Input` `size="xl"` `no-border`, жирный шрифт через `:b24ui="{ base: 'font-(--ui-font-weight-semi-bold)' }"`
- **Карточка с редактором**: `B24Card` с `b24ui.body='p-0'`, внутри `B24Editor` (`content-type="markdown"`, `min-h-48 px-4 py-3`). В слоте по умолчанию редактора отрисуйте строку панели (`flex items-center gap-1 px-2 py-1.5 border-b`): слева кнопка вложений `B24Button`, посередине `B24EditorToolbar` с `mention`/`bulletList`/`orderedList`, справа с `ml-auto` кнопка разворачивания `B24Button` (`GoToLIcon`)
- **Карточка ответственных**: `B24Card` `b24ui.body='p-0'`, тело — `div` с `divide-y` и тремя строками `px-5 py-3`: постановщик (`B24Avatar` + имя), исполнитель (`B24Avatar` + имя), крайний срок (`B24InputDate` `size="sm"` `no-border` с `B24Popover` + `B24Calendar` в слоте `#trailing`, оба используют один `shallowRef<CalendarDate | undefined>`)
- **Карточка наблюдателей**: `#header` с подписью и кнопкой `+` `B24Button`; в теле иконки `B24Avatar`
- **Кнопки действий**: ряд `flex flex-wrap gap-2` из 17 `B24Button` `size="sm"`; у каждого элемента флаг `active`: активный → `color="air-secondary-accent-2"`, неактивный → `color="air-secondary-no-accent"`. Кнопки: Results, Files, Checklists, Project, Co-executors, Observers, Flow, Tags, Reminders, CRM elements, Parent task, Subtasks, Linked tasks, Gantt, Timeline planning, Time tracking, Custom fields
- **Футер**: `flex gap-2 justify-end` с кнопками «Сохранить» (`air-primary`) и «Отмена» (`air-tertiary`)
- Состояние: `title` и `description` как `ref`; `deadline` как `shallowRef<CalendarDate | undefined>` (из `@internationalized/date`: `B24InputDate` не принимает нативный `Date`); `toolbarItems` — обычная `const` (без реактивных зависимостей); список действий типизирован как `{ label: string, icon: IconComponent, active?: boolean }[]`
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<form>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

Типизированный экземпляр компонента доступен через [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const form = useTemplateRef('form')
</script>

<template>
  <B24Form ref="form" />
</template>
```

Так вы получите доступ к следующему:

| Имя | Тип |
| ---- | ---- |
| `submit()`{lang="ts-type"} | `Promise<void>`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Запускает отправку формы с HTML5-валидацией.</p></div> |
| `validate(opts: { name?: keyof T \| (keyof T)[], silent?: boolean, nested?: boolean, transform?: boolean })`{lang="ts-type"} | `Promise<T>`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Запускает валидацию формы. Показывает ошибки, если не передан `opts.silent` со значением true.</p></div> |
| `clear(path?: keyof T \| RegExp)`{lang="ts-type"} | `void` <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Очищает ошибки формы по указанному пути. Без пути очищает все ошибки.</p></div> |
| `getErrors(path?: keyof T \| RegExp)`{lang="ts-type"} | `FormErrorWithId[]`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Возвращает ошибки формы по указанному пути. Без пути возвращает все ошибки.</p></div> |
| `setErrors(errors: FormError[], name?: keyof T \| RegExp)`{lang="ts-type"} | `void` <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Задаёт ошибки формы для указанного пути. Без пути заменяет все ошибки.</p></div> |
| `errors`{lang="ts-type"} | `Ref<FormErrorWithId[]>`{lang="ts-type"} <br> <div class="text-(--ui-color-design-tinted-na-content) mt-1"><p>Ссылка на массив с ошибками валидации. Через неё можно читать и изменять сведения об ошибках.</p></div> |
| `disabled`{lang="ts-type"} | `Ref<boolean>`{lang="ts-type"} |
| `dirty`{lang="ts-type"} | `Ref<boolean>`{lang="ts-type"} `true`, если пользователь изменил хотя бы одно поле формы. |
| `dirtyFields`{lang="ts-type"} | `ReadonlySet<DeepReadonly<keyof T>>`{lang="ts-type"} Отслеживает поля, изменённые пользователем. |
| `touchedFields`{lang="ts-type"} | `ReadonlySet<DeepReadonly<keyof T>>`{lang="ts-type"} Отслеживает поля, с которыми взаимодействовал пользователь. |
| `blurredFields`{lang="ts-type"} | `ReadonlySet<DeepReadonly<keyof T>>`{lang="ts-type"} Отслеживает поля, потерявшие фокус. |

## Тема {#theme}

:component-theme
