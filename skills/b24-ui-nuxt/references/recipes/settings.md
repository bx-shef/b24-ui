# Раскладки настроек

Приёмы показа пользовательских настроек — единственный выбор, несколько переключателей, флаги возможностей. Сначала подберите подходящий компонент и берите собственную раскладку, только когда каждому варианту действительно нужны картинка, ссылка или многострочное пояснение.

## Матрица выбора

| Выбор                                    | Каждому варианту нужны         | Использовать                                           |
|------------------------------------------|--------------------------------|--------------------------------------------------------|
| Выбрать **один** из 2–4 коротких вариантов | Подпись                      | `B24RadioGroup` (`variant="list"`)                     |
| Выбрать **один** с коротким описанием    | Подпись и одно предложение     | `B24RadioGroup` (`variant="card"`)                     |
| Выбрать **один**, нужны иконка и предложение | Подпись, иконка, описание | `B24PageCardGroup` — см. [card-pickers](./card-pickers.md) |
| Выбрать **один**, нужны картинка предпросмотра, текст подлиннее и ссылка «Подробнее» | Заголовок, описание, ссылка, картинка | `B24RadioGroup` `variant="card"` + слот `#label` (этот рецепт) |
| Включить **несколько** возможностей      | Подпись                        | `B24CheckboxGroup` (`variant="list"`) или несколько `B24Switch` |
| Включить несколько, нужны богатые предпросмотры | Заголовок, описание, ссылка, картинка | `B24CheckboxGroup` `variant="card"` + слот `#label` (этот рецепт) |
| Один флаг (вкл/выкл)                     | Одно значение                  | `B24Switch`                                            |

Если каждому варианту нужны иконка в круге и описание и вы хотите аккуратную сетку, берите `B24PageCardGroup` — см. [card-pickers](./card-pickers.md). Этот рецепт — для более тяжёлого случая, когда варианту нужны полноценная картинка предпросмотра и ссылка на документацию.

## Расширенная карточка с предпросмотром, описанием и ссылкой (один вариант)

Задайте `variant="card"` и переопределите слот `#label`. Слот отрисовывается внутри `<span>`, поэтому в него можно класть любую раскладку из фразового содержимого — flex-колонки, ссылки, картинки и т. п. — без сюрпризов разбора HTML.

Чтобы типизировать `item.*` в слоте строго, объявите локальный интерфейс и используйте его как тип массива: общий `RadioGroupItem[]` расширяет пользовательские поля до `any` (пропадает автодополнение).

```vue
<script setup lang="ts">
type LayoutItem = {
  value: string
  title: string
  text: string
  preview: string
  href: string
}

const layout = ref<string>('columns')

const items: LayoutItem[] = [
  {
    value: 'columns',
    title: 'In columns',
    text: 'Pick this for resources that must always be visible to the manager. These are the primary resources the schedule is built around.',
    preview: '/radio-card-columns.png',
    href: 'https://helpdesk.bitrix24.com/'
  },
  {
    value: 'list',
    title: 'In a secondary list',
    text: 'Pick this for resources that are booked only in addition to a primary one. For instance, when specialists are the primary resource, equipment goes into the secondary list.',
    preview: '/radio-card-list.png',
    href: 'https://helpdesk.bitrix24.com/'
  }
]
</script>

<template>
  <B24RadioGroup
    v-model="layout"
    variant="card"
    size="md"
    :items="items"
    class="w-full max-w-2xl"
  >
    <template #label="{ item }">
      <span class="flex gap-3 items-start w-full">
        <span class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)">
            {{ item.title }}
          </span>
          <span class="text-(length:--ui-font-size-sm) text-description font-(--ui-font-weight-regular)">
            {{ item.text }}
          </span>
          <B24Link
            :to="item.href"
            target="_blank"
            class="self-start mt-1 text-(length:--ui-font-size-sm)"
            @click.stop
          >
            Подробнее
          </B24Link>
        </span>
        <img
          :src="item.preview"
          :alt="item.title"
          class="hidden sm:block shrink-0 w-[120px] h-[72px] rounded-(--ui-border-radius-sm) ring-1 ring-(--ui-color-base-5) object-cover"
        >
      </span>
    </template>
  </B24RadioGroup>
</template>
```

## Тот же рецепт для множественного выбора

Замените компонент на `B24CheckboxGroup` и привяжите `v-model` к массиву. Разметка слота, форма элементов, картинка и ссылка остаются теми же.

```vue
<script setup lang="ts">
type CapabilityItem = {
  value: string
  title: string
  text: string
  preview: string
  href: string
}

const enabled = ref<string[]>(['columns'])

const items: CapabilityItem[] = [
  { value: 'columns', title: 'In columns',           text: '…', preview: '/preview-a.png', href: '/help/a' },
  { value: 'list',    title: 'In a secondary list',  text: '…', preview: '/preview-b.png', href: '/help/b' }
]
</script>

<template>
  <B24CheckboxGroup
    v-model="enabled"
    variant="card"
    size="md"
    :items="items"
    class="w-full max-w-2xl"
  >
    <template #label="{ item }">
      <span class="flex gap-3 items-start w-full">
        <span class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)">
            {{ item.title }}
          </span>
          <span class="text-(length:--ui-font-size-sm) text-description font-(--ui-font-weight-regular)">
            {{ item.text }}
          </span>
          <B24Link
            :to="item.href"
            target="_blank"
            class="self-start mt-1 text-(length:--ui-font-size-sm)"
            @click.stop
          >
            Подробнее
          </B24Link>
        </span>
        <img
          :src="item.preview"
          :alt="item.title"
          class="hidden sm:block shrink-0 w-[120px] h-[72px] rounded-(--ui-border-radius-sm) ring-1 ring-(--ui-color-base-5) object-cover"
        >
      </span>
    </template>
  </B24CheckboxGroup>
</template>
```

## Замечания по реализации

- **Почему внутри слота везде `<span>`.** Библиотека отрисовывает слот подписи как `<span>` для вариантов `card` и `table` (и как `<label>` для `list`). Вкладывайте в него `span` с `class="block"` или `flex` — это остаётся фразовым содержимым HTML5. Блочные элементы вроде `<div>` браузеры терпят, но формально они нарушают требования к фразовому содержимому; при возможности берите span.
- **Строгая типизация пропсов слота.** Запись `const items: RadioGroupItem[] = [...]` расширяет пользовательские поля (`title`, `preview`, `href` и т. д.) до `any` через индекс `[key: string]: any` в публичном типе элемента. Объявите локальный интерфейс, как в примерах, чтобы у `item` в слоте сохранились автодополнение и проверка типов.
- **Не передавайте поле `description`.** `B24RadioGroup` / `B24CheckboxGroup` сами отрисовывают `item.description` отдельным абзацем. Если вы ещё и переопределяете `#label`, текст задвоится. Назовите поле иначе (`text`, `summary`, `body`).
- **`@click.stop` на ссылке внутри карточки.** В варианте `card` вся карточка обёрнута в `<label>`, и нажатие внутри выбирает вариант. Без `@click.stop` переход по ссылке «Подробнее» заодно переключит radio или checkbox.
- **Проверяйте `item.href`, если он приходит из недоверенного источника** (CMS, API, ввод пользователя). Разрешайте только `http(s):` и относительные пути; до привязки к `B24Link :to` отклоняйте URI `javascript:` и `data:` и открытые редиректы. Библиотека URL не очищает — это забота вызывающего. То же касается `item.preview`, если он указывает на внешние картинки (подумайте о политике CSP `img-src`).
- **`target="_blank"` безопасен.** `B24Link` сам добавляет `rel="noopener noreferrer"` для внешних ссылок, поэтому tabnabbing не грозит.
- **Адаптивность.** На маленьких экранах скрывайте предпросмотр через `hidden sm:block`, чтобы текст занимал всю ширину на мобильных. Сам radio или checkbox остаётся в начале, потому что вариант `card` использует `items-start`.
- **Картинок ещё нет?** Пока дизайн в работе, поставьте вместо `<img>` компонент `<Placeholder>` (собственный SVG-компонент с диагональной штриховкой, есть в `docs/` и обеих песочницах) — тот же блок `w-[120px] h-[72px]`, ни одного бинарного файла не нужно.
- **Оставайтесь на семантических цветах.** Для второстепенного текста берите семантические утилиты вроде `text-description`, для тонких линий — `ring-(--ui-color-base-5)`, и никогда не цвета палитры Tailwind. Если подходит только числовой токен `--ui-color-base-N`, проверьте, нет ли именованного семантического класса (`text-description`, `text-title`, …) с тем же смыслом.
- **Интеграция с формой.** Обе группы учитывают `useFormField`, поэтому внутри `B24Form` оборачивайте их в `B24FormField` для подписи и ошибки. См. [формы](../guidelines/forms.md).

## Когда этот приём не нужен

- **Два бинарных переключателя.** Берите два `B24Switch`, а не `B24CheckboxGroup` в варианте `card` с богатым содержимым.
- **Много вариантов (5 и больше) равного веса.** Сетка карточек `B24PageCardGroup` читается лучше, чем длинная стопка плотных строк-карточек. См. [card-pickers](./card-pickers.md).
- **Вариантам не нужны пояснения.** Обычный `variant="list"` быстрее просматривать.
