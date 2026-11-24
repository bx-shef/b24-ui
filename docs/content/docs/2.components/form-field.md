---
title: FormField
description: 'Контейнер для элементов формы со встроенной валидацией и управлением ошибками.'
category: form
keywords:
  - field wrapper
  - form label
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FormField.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/form-field
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/form-field
---

## Использование {#usage}

Оберните любой компонент формы в FormField. Внутри [Form](/docs/components/form/) он обеспечивает валидацию и обработку ошибок.

### Подпись {#label}

Пропс `label` задаёт подпись элемента формы.

::component-code
---
prettier: true
props:
  label: Email
slots:
  default: |

    <B24Input placeholder="Введите email" />
---

:b24-input{placeholder="Введите email"}
::

::note
Атрибут `for` у подписи и элемент формы связываются через уникальный `id`, если он не задан.
::

::tip{to="#label-slot"}
Если подпись — не просто текст, используйте слот `#label`.
::

Если указан пропс `required`, рядом с подписью появляется звёздочка.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  required: true
slots:
  default: |

    <B24Input placeholder="Введите email" />
---

:b24-input{placeholder="Введите email"}
::

### Слот label {#label-slot}

Слот `#label` пригодится, когда подписи мало одной строки: нужны бейдж, счётчик, короткое состояние. Слот заменяет *содержимое* подписи, а не сам элемент `<label>` вокруг неё, поэтому связь поля с подписью не меняется.

::warning
Всё, что вы разместите в слоте, становится частью доступного имени элемента: бейдж `Work` заставит скринридер произнести *«Email Work»*. Декоративному содержимому ставьте `aria-hidden="true"`, как в примере ниже. Избегайте интерактивных элементов: ссылка или кнопка внутри `<label>` и срабатывает сама, и переключает элемент формы.
::

::component-code
---
prettier: true
props:
  name: email
slots:
  label: |

    Email
    <B24Badge label="Работа" size="xs" aria-hidden="true" />

  default: |

    <B24Input placeholder="Введите email" />
---

#label
Email :b24-badge{label="Работа" size="xs" aria-hidden="true"}

#default
:b24-input{placeholder="Введите email"}
::

Слот получает пропс `label`, поэтому обёртка может дополнить строку, а не заменять её. Это удобно, когда текст приходит из схемы или перевода:

```vue
<B24FormField label="Email" name="email">
  <template #label="{ label }">
    {{ label }}
    <B24Badge label="Work" size="xs" aria-hidden="true" />
  </template>

  <B24Input placeholder="Enter your email" />
</B24FormField>
```

Слоты `hint`, `description`, `help` и `error` работают так же, и каждый получает пропс, который заменяет, поэтому пропс рядом со слотом сохраняет текст в одном месте. В разделе [Что озвучивается — то, что отрисовано](#what-is-announced-is-what-was-drawn) описано, что каждый блок вносит в доступное описание элемента. Звёздочка `required` рисуется на элементе `<label>`, поэтому остаётся и при собственном слоте `#label`.

::caution
`#error` идёт дальше остальных: блок ошибки отрисовывается всегда, когда есть слот `#error`, независимо от наличия самой ошибки, и вытесняет `help`. Рабочий подход описан в разделе [Слоты error и help](#error-and-help-slots).
::

### Описание {#description}

Пропс `description` добавляет дополнительную информацию под подписью.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  description: Мы никому не передадим ваш email.
slots:
  default: |

    <B24Input placeholder="Введите email" class="w-full" />
---

:b24-input{placeholder="Введите email" class="w-full"}
::

### Слот description {#description-slot}

Слот `#description` нужен, когда в описании требуется разметка: ссылка на политику, выделение, фрагмент кода. Он заменяет содержимое того же `<p>`, которое заполняет пропс.

Одного слота достаточно, чтобы описание озвучивалось: `aria-describedby` ссылается на реально отрисованные блоки, какой бы способ их ни создал. Но пропс всё равно стоит указать: слот получает его, и оформить значение — это одна интерполяция, а не повторение текста. См. [Что озвучивается — то, что отрисовано](#what-is-announced-is-what-was-drawn).

::component-code
---
prettier: true
props:
  name: email
  label: Email
  description: Мы никому его не передадим.
slots:
  description: |

    Мы никому его не передадим. <a href="/docs/components/form/" class="underline">Как мы используем данные</a>

  default: |

    <B24Input placeholder="Введите email" class="w-full" />
---

#description
Мы никому его не передадим. [Как мы используем данные](/docs/components/form/)

#default
:b24-input{placeholder="Введите email" class="w-full"}
::

Ссылка здесь безопасна, в отличие от `#label`: описание находится вне элемента `<label>`, поэтому щелчок по нему не переключает элемент формы.

Слот получает пропс `description`, поэтому обёртка оформляет строку, а не повторяет её. Это важно, когда текст приходит из схемы или перевода, и это же держит пропс и видимый текст в согласии:

```vue
<B24FormField label="Email" name="email" description="We'll never share it.">
  <template #description="{ description }">
    {{ description }}
    <B24Link to="/docs/components/form/" raw class="underline">
      How we use your data
    </B24Link>
  </template>

  <B24Input placeholder="Enter your email" class="w-full" />
</B24FormField>
```

### Подсказка {#hint}

Пропс `hint` выводит подсказку рядом с подписью.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  hint: Необязательно
slots:
  default: |

    <B24Input placeholder="Введите email" />
---

:b24-input{placeholder="Введите email"}
::

### Слот hint {#hint-slot}

Слот `#hint` нужен, когда подсказка несёт состояние, а не слово: счётчик символов, бейдж, иконку. Он отрисовывается в строке подписи, рядом с самой подписью.

Как и для `#description`, передавайте и `hint`, и слот: озвучивание следует за пропсом, а не за слотом.

::component-code
---
prettier: true
props:
  name: bio
  label: Bio
  hint: 0 / 140
slots:
  hint: |

    <B24Badge label="0 / 140" size="xs" color="air-secondary-accent-1" />

  default: |

    <B24Input placeholder="Расскажите о себе" class="w-full" />
---

#hint
:b24-badge{label="0 / 140" size="xs" color="air-secondary-accent-1"}

#default
:b24-input{placeholder="Расскажите о себе" class="w-full"}
::

::note
Подсказка находится рядом с `<label>`, а не внутри него, поэтому её содержимое не входит в доступное имя элемента, в отличие от `#label`. Озвучивается она через `aria-describedby`.
::

::caution
**Подсказке нужна подпись.** Подсказка отрисовывается в строке подписи, а эта строка есть, только когда задан `label` или `#label`. Поэтому `hint` у поля без подписи не отображается и не озвучивается. Это тихо, но последовательно: до [#497](https://github.com/bitrix24/b24ui/issues/497) элемент ещё и объявлял `aria-describedby="…-hint"`, указывая на элемент, которого никогда не было.
::

### Справка {#help}

Пропс `help` выводит справочное сообщение под элементом формы. Вместе с пропсом `error` приоритет у `error`.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  help: Введите корректный адрес электронной почты.
slots:
  default: |

    <B24Input placeholder="Введите email" class="w-full" />
---

:b24-input{placeholder="Введите email" class="w-full"}
::

### Ошибка {#error}

Пропс `error` выводит сообщение об ошибке под элементом формы. Вместе с пропсом `help` приоритет у `error`.

Внутри [Form](/docs/components/form/) он устанавливается автоматически при ошибке валидации.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: Email
  error: Введите корректный адрес электронной почты.
slots:
  default: |

    <b24Input placeholder="Введите email" class="w-full" />
---

:b24-input{placeholder="Введите email" class="w-full"}
::

### Что озвучивается — то, что отрисовано {#what-is-announced-is-what-was-drawn}

Каждый из пяти блоков отрисовывается по условию `props.x || !!slots.x`: достаточно пропса или слота. `aria-describedby` подчиняется тому же правилу: он ссылается на блоки, которые оказались в документе, и только на них.

| что вы передаёте | блок на экране | указан в `aria-describedby` |
|---|---|---|
| пропс `description` | да | да |
| слот `#description` без пропса | да | да |
| пропс `hint` без `label` | нет | нет |
| `error` и `help` вместе | только error | только error |

Стоит знать два условия, потому что оба скрывают запрошенный блок: `hint` находится в строке подписи и существует только при наличии `label` или `#label`, а `help` — это `v-else-if` ветки ошибки, поэтому отрисованная ошибка занимает его место. В обоих случаях ничего не отрисовывается и ничего не озвучивается.

::note
Это намеренное отличие от `nuxt/ui`, где атрибут строится только по пропсам: слот без пропса не озвучивался, а пропс, блок которого не отрисовался, оставлял атрибут с id, которого нет в документе. Исправлено здесь в [#497](https://github.com/bitrix24/b24ui/issues/497) и записано как инвариант в `.sync/PORTING.md` §2, чтобы последующий перенос не откатил это.
::

### Слоты error и help {#error-and-help-slots}

`#error` — место, где правило выше проявляется сильнее всего, потому что у блока ошибки есть второе условие:

```
v-if="props.error !== false && ((typeof error === 'string' && error) || !!slots.error)"
v-else-if="props.help || !!slots.help"
```

Один слот `#error` удовлетворяет этому `v-if` **независимо от того, есть ли ошибка**. Поэтому блок отрисовывается постоянно, `help` — `v-else-if` той же ветки — не отрисовывается вовсе, а элемент по-прежнему сообщает `aria-invalid="false"`: этот атрибут отражает состояние ошибки поля, а её нет. Блок описан, раз он отрисован, но вспомогательным технологиям никто не сообщает, что поле некорректно:

```vue
<!-- Так нельзя: сообщение видно всегда, а `help` — никогда, и скринридер
     получает информацию, что поле корректно. -->
<B24FormField label="Email" name="email" help="We'll only use it to sign you in.">
  <template #error>
    <WarningIcon class="size-4" /> Please enter a valid email address.
  </template>

  <B24Input placeholder="Enter your email" />
</B24FormField>
```

Привяжите `error` к сообщению (или к `false`, когда сообщения нет), а слот используйте только для разметки. Тогда ветка работает так же, как с пропсом:

```vue
<script setup lang="ts">
import WarningIcon from '@bitrix24/b24icons-vue/main/WarningIcon'

const value = ref('')
const message = computed<string | false>(() =>
  value.value.includes('@') ? false : 'Please enter a valid email address.'
)
</script>

<template>
  <B24FormField
    label="Email"
    name="email"
    :error="message"
    help="We'll only use it to sign you in."
  >
    <template #error="{ error }">
      <WarningIcon
        class="size-4"
        aria-hidden="true"
      /> {{ error }}
    </template>

    <B24Input
      v-model="value"
      placeholder="Enter your email"
    />
  </B24FormField>
</template>
```

| `message` | блок ошибки | блок справки | `aria-invalid` | `aria-describedby` |
|---|---|---|---|---|
| `false` | — | показан | `false` | `…-help` |
| `'Введите корректный адрес…'` | ваша разметка | — | `true` | `…-error` |

`help` и `error` взаимоисключающи и на экране, и в атрибуте: названным оказывается тот блок, который отрисован.

::note
Внутри [Form](/docs/components/form/) `error` задавать не нужно: Form устанавливает его по схеме, и это строка или `undefined`. `undefined` — не `false`, поэтому слот `#error` и там отрисовывается постоянно. Используйте `#error` только у полей, где `error` под вашим контролем, либо используйте пропс и стилизуйте блок через `b24ui.error`.
::

`#help` подчиняется общему правилу: передавайте `help` вместе с ним, иначе справочный текст появится без описания. Когда показывается ошибка, он исчезает, так задумано.

### Шаблон ошибки {#error-pattern}

Пропс `error-pattern` сопоставляет ошибки формы с регулярным выражением. Это особенно важно для компонентов со значением-массивом, например [InputTags](/docs/components/input-tags/): имя ошибки в них содержит индексы массива (например, `tags.0`).

::tip{to="/docs/components/form/#error-reporting"}
Пример использования `error-pattern` внутри Form.
::

### Размер {#size}

Пропс `size` меняет размер FormField и передаётся элементу формы.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - hint
  - help
props:
  label: Email
  description: Мы никому не передадим ваш email.
  hint: Необязательно
  help: Введите корректный адрес электронной почты.
  size: lg
slots:
  default: |

    <B24Input placeholder="Введите email" class="w-full" />
---

:b24-input{placeholder="Введите email" class="w-full"}
::

### Ориентация {#orientation}

Пропс `orientation` меняет раскладку FormField. По умолчанию `vertical`.

::component-code
---
prettier: true
ignore:
  - label
  - class
props:
  orientation: horizontal
  label: Email
  help: Введите корректный адрес электронной почты.
  class: w-72
slots:
  default: |

    <B24Input placeholder="Введите email" class="w-full" />
---

:b24-input{placeholder="Введите email" class="w-full"}
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
### Слоты {#slots-1}

<ComponentSlots component="FormField" />

