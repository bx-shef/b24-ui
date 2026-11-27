# Оверлеи

Приёмы для модальных окон, боковых панелей, Drawer и командных палитр.

## Диалог подтверждения

```vue
<script setup lang="ts">
const isOpen = ref(false)

function confirmDelete() {
  // выполнить удаление
  isOpen.value = false
}
</script>

<template>
  <B24Button label="Delete" color="air-primary-alert" @click="isOpen = true" />

  <B24Modal v-model:open="isOpen" title="Delete item" description="This action cannot be undone. Are you sure?" :b24ui="{ footer: 'justify-end' }">
    <template #footer="{ close }">
      <B24Button label="Delete" color="air-primary" @click="confirmDelete" />
      <B24Button label="Cancel" color="air-tertiary" @click="close" />
    </template>
  </B24Modal>
</template>
```

## Программное подтверждение (useOverlay)

Переиспользуемый приём: в месте вызова не нужно состояние в шаблоне.

```vue [components/ConfirmModal.vue]
<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()

const emit = defineEmits<{
  close: [confirmed: boolean]
}>()
</script>

<template>
  <B24Modal :close="{ onClick: () => emit('close', false) }" :title="title" :description="description">
    <template #footer>
      <B24Button label="Confirm" color="air-primary" @click="emit('close', true)" />
      <B24Button label="Cancel" color="air-tertiary" @click="emit('close', false)" />
    </template>
  </B24Modal>
</template>
```

```ts
// Использование в любом месте
const overlay = useOverlay()
const confirm = overlay.create(ConfirmModal)

async function deleteItem(item) {
  const instance = confirm.open({
    title: 'Delete item',
    description: `Are you sure you want to delete "${item.name}"?`
  })

  if (await instance.result) {
    // пользователь подтвердил
  }
}
```

## Маркетинговое / промо-окно

Промо-окна и окна повышения тарифа (заканчивается пробный период, предложение тарифа) собираются из существующих компонентов — **не создавайте собственное модальное окно**. Приём такой: скройте стандартную шапку (`title=""`, `description=""`), отключите встроенное закрытие (`:close="false"`) и поместите свою иконку закрытия в тело, а тело разложите адаптивным flex в две колонки (предложение и действия слева, карточка с возможностями справа). `#footer` не нужен: обе кнопки действий стоят в левой колонке. Декоративный фон — явный градиент Tailwind в `b24ui.body`.

```vue
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'

const open = ref(false)

const benefits: NavigationMenuItem[] = [
  { label: 'Unlimited monitored lines', icon: CircleCheckIcon },
  { label: 'AI defect detection on camera streams', icon: CircleCheckIcon }
]
</script>

<template>
  <B24Modal
    v-model:open="open"
    title=""
    description=""
    :close="false"
    scrollable
    :b24ui="{
      content: 'sm:max-w-[788px] bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)]',
      body: 'relative p-6 md:p-8'
    }"
  >
    <B24Button label="Open marketing modal" color="air-secondary-accent" />

    <template #body>
      <div class="flex flex-col md:flex-row gap-6 min-h-full">
        <div class="flex-1 flex flex-col gap-3 text-white">
          <h2 class="text-2xl font-semibold leading-snug">
            Keep your factory floor moving — your Pro trial ends in 6 days
          </h2>
          <p class="text-white/85">
            Pro unlocks real-time OEE across every line, 90 days of historical
            analytics, AI defect detection on camera streams and predictive
            maintenance alerts. Teams on Pro ship 12% more units per shift on
            average.
          </p>
          <B24Link to="#" class="inline-flex text-white underline">Compare plans</B24Link>

          <div class="flex flex-wrap items-center gap-2 mt-auto pt-4">
            <B24Button
              label="Upgrade to Pro"
              color="air-primary"
              size="lg"
              :trailing-icon="ArrowRightLIcon"
            />
            <B24ModalDialogClose>
              <B24Button label="Remind me later" color="air-tertiary-accent" />
            </B24ModalDialogClose>
          </div>
        </div>

        <div class="md:w-80 shrink-0">
          <B24Card
            variant="tinted-no-accent"
            :b24ui="{ header: 'flex items-center justify-between gap-2', body: 'space-y-4' }"
          >
            <template #header>
              <span class="font-semibold whitespace-nowrap">Production Insights · Pro</span>
              <B24Badge label="Recommended" color="air-primary" size="xs" class="shrink-0" />
            </template>

            <div>
              <div class="text-3xl font-semibold leading-none">+12%</div>
              <div class="text-sm text-description mt-1">average throughput uplift after upgrade</div>
            </div>

            <div class="space-y-1">
              <B24Progress :model-value="24" :max="30" color="air-primary" size="sm" />
              <div class="text-xs text-description">Trial used — 24 of 30 days</div>
            </div>

            <B24NavigationMenu
              orientation="vertical"
              :items="benefits"
              :b24ui="{ link: 'px-2 py-1.5', linkLeadingIcon: 'text-primary' }"
            />
          </B24Card>
        </div>
      </div>
    </template>
  </B24Modal>
</template>
```

Правила:
- **Призыв к действию — `air-primary`** (Bitrix24 отходит от зелёных кнопок).
- **Градиент кладите в `b24ui.content`, а не в `b24ui.body`** — при `scrollable: true` у contentWrapper пропадает `overflow-hidden`, и фон на уровне body выходит за скруглённые углы. Скругление задаёт слот `content` (`rounded-[calc(var(--ui-border-radius-2xl)+2px)]`), поэтому его собственный background-image обрезается естественно, и углы остаются скруглёнными.
- **Используйте фирменные токены градиента boost** для фона — `--ui-color-design-filled-boost-bg-gradient-{1,2,3}` (тот же радиальный градиент, которым закрашена кнопка `air-boost`). CSS-переменные одинаково определены в светлой и тёмной темах, поэтому одного `bg-[radial-gradient(...)]` хватает для обеих — вариант `dark:` не нужен. Не переходите на обычные цвета палитры Tailwind: промо-поверхности должны выглядеть осознанно фирменными.
- **Отключите стандартную иконку закрытия** через `:close="false"` и поместите свою кнопку с `CrossMIcon` абсолютным позиционированием внутри тела. Размер, как у стандартной кнопки закрытия, даёт `size="md"` и `[--ui-btn-height:24px]` (та же CSS-переменная, которую тема Modal задаёт встроенной кнопке закрытия).
- **Ширина**: немного расширьте окно (`sm:max-w-[788px]`), чтобы две колонки не были тесными; правая карточка имеет `md:w-80`, чтобы строка заголовка не переносилась.
- **Прижмите ряд действий к низу**: сделайте левую колонку `flex flex-col` и дайте ряду кнопок `mt-auto`. Вместе с `md:flex-row` у родителя (он растягивает обе колонки до одной высоты) кнопка оказывается на уровне нижнего края правой карточки.
- **Кнопки действий — в `#body`, а не в `#footer`**: призыв к действию остаётся рядом с текстом предложения, сначала `Upgrade to Pro`, правее — закрывающая окно `Remind me later`.
- **Добавьте `scrollable`**, чтобы длинное предложение и списки возможностей не выходили за экран на малых размерах. Учтите: `scrollable` несовместим с `modal: false` (он опирается на прокручиваемый контейнер оверлея).
- **Для списка преимуществ берите вертикальный `B24NavigationMenu`** и держите список коротким (около 2 пунктов): правая карточка — анонс, а не таблица возможностей.
- **Не кладите заголовок в `title`**: промо-заголовки крупные и свободной формы, внутри `#body` вы управляете типографикой. Добавьте `whitespace-nowrap` заголовку в шапке правой карточки (и `shrink-0` бейджу), чтобы «Pro» не переносилось.
- **Задайте белый текст** в левой колонке (`text-white` на обёртке, `text-white/85` для описания, `text-white underline` для ссылки): градиент boost настолько яркий, что семантические токены текста по умолчанию становятся невидимыми.

## Форма в боковой панели

```vue
<script setup lang="ts">
import * as z from 'zod'

const isOpen = ref(false)

const schema = z.object({
  name: z.string().min(1),
  email: z.email()
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({})

function onSave() {
  // сохранить пользователя
  isOpen.value = false
}
</script>

<template>
  <B24Button label="Add user" @click="isOpen = true" />

  <B24Slideover v-model:open="isOpen" title="Add user" description="Fill in the details below.">
    <template #body>
      <B24Form id="user-form" :schema="schema" :state="state" class="space-y-4" @submit="onSave">
        <B24FormField name="name" label="Name">
          <B24Input v-model="state.name" />
        </B24FormField>
        <B24FormField name="email" label="Email">
          <B24Input v-model="state.email" type="email" />
        </B24FormField>
      </B24Form>
    </template>

    <template #footer="{ close }">
      <B24Button type="submit" form="user-form" label="Save" size="lg" color="air-primary" />
      <B24Button label="Cancel" color="air-tertiary" size="sm" :normal-case="false" @click="close" />
    </template>
  </B24Slideover>
</template>
```

## Командная палитра

```vue
<script setup lang="ts">
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import DocumentPlusIcon from '@bitrix24/b24icons-vue/main/DocumentPlusIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const isOpen = ref(false)

defineShortcuts({
  meta_k: () => { isOpen.value = true }
})

const groups = [{
  id: 'actions',
  label: 'Actions',
  items: [
    { label: 'New file', icon: DocumentPlusIcon, kbds: ['meta', 'n'], onSelect: () => newFile() },
    { label: 'New folder', icon: FolderPlusIcon, onSelect: () => newFolder() }
  ]
}, {
  id: 'navigation',
  label: 'Navigation',
  items: [
    { label: 'Dashboard', icon:HomeIcon, to: '/dashboard' },
    { label: 'Settings', icon: SettingsIcon, to: '/settings' }
  ]
}]
</script>

<template>
  <B24Button label="Search..." :icon="SearchIcon" color="air-tertiary" @click="isOpen = true" />

  <B24Modal v-model:open="isOpen">
    <template #content>
      <B24CommandPalette :groups="groups" placeholder="Type a command or search..." close @update:open="isOpen = $event" />
    </template>
  </B24Modal>
</template>
```

## Drawer (нижняя шторка)

```vue
<script setup lang="ts">
import ShareIcon from '@bitrix24/b24icons-vue/outline/ShareIcon'
import DownloadIcon from '@bitrix24/b24icons-vue/outline/DownloadIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const isOpen = ref(false)
</script>

<template>
  <B24Button label="Options" @click="isOpen = true" />

  <B24Drawer v-model:open="isOpen" title="Options">
    <template #body>
      <div class="space-y-2 p-4">
        <B24Button label="Share" :icon="ShareIcon" block color="air-tertiary" />
        <B24Button label="Export" :icon="DownloadIcon" block color="air-tertiary" />
        <B24Separator />
        <B24Button label="Delete" :icon="TrashcanIcon" block color="air-primary-alert" />
      </div>
    </template>
  </B24Drawer>
</template>
```

## Информационный поповер (краткие сведения о сущности)

Показывает краткую сводку о сущности CRM (компания, сделка, контакт, лид) при наведении или нажатии на её название — без перехода со страницы. Собирается целиком из стандартных компонентов: `B24Popover`, `B24Avatar`, `B24Button`, `B24Separator`, `B24DescriptionList` и `B24Link`. Своего CSS нет, кроме акцентного цвета аватара.

`mode="hover"` — для сводок только для чтения (чаще всего в списках и лентах), `mode="click"` — когда в поповере есть ссылки, с которыми пользователь должен взаимодействовать.

```vue
<script setup lang="ts">
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

const items = [
  { label: 'Account manager', description: 'Sample owner', slot: 'owner' as const },
  { label: 'Created', description: 'Oct 6, 2024 08:37' },
  { label: 'Segment', description: 'Enterprise' }
] satisfies DescriptionListItem[]
</script>

<template>
  <B24Popover mode="hover" :content="{ side: 'bottom', sideOffset: 8 }" :b24ui="{ content: 'p-0' }">
    <B24Link is-action>ACME Corp.</B24Link>

    <template #content>
      <div class="w-65 p-6 flex flex-col gap-4.5">
        <div class="flex items-center gap-3">
          <B24Avatar
            size="lg"
            :icon="UserGroupIcon"
            :b24ui="{
              root: 'bg-(--ui-color-design-filled-alert-bg)',
              icon: 'text-(--ui-color-design-filled-alert-content)'
            }"
          />
          <div class="min-w-0">
            <div class="text-label font-(--ui-font-weight-semi-bold) truncate">ACME Corp.</div>
            <div class="text-sm text-description truncate">12 contacts</div>
          </div>
        </div>

        <B24Button block size="sm" color="air-secondary-accent-2" label="Open account" />

        <B24Separator />

        <B24DescriptionList
          size="sm"
          :items="items"
          :b24ui="{
            container: 'mt-0 sm:grid-cols-1',
            labelWrapper: 'border-t-0 sm:border-t-0 py-0 sm:py-0',
            descriptionWrapper: 'sm:border-t-0 py-0 pb-2.5 sm:py-0 sm:pb-2.5 last:pb-0 sm:last:pb-0'
          }"
        >
          <template #description="{ item }">
            <B24Link v-if="item.slot === 'owner'">{{ item.description }}</B24Link>
            <template v-else>{{ item.description }}</template>
          </template>
        </B24DescriptionList>
      </div>
    </template>
  </B24Popover>
</template>
```

Замечания по раскладке:

- Отступы содержимого поповера сброшены через `:b24ui="{ content: 'p-0' }"`, поэтому интервалами управляет внутренний `flex flex-col gap-4.5` (с `p-6`) — в примере не нужно переопределять границы шапки.
- Аватар перекрашен через свой слот `:b24ui` с дизайн-токенами (`--ui-color-design-filled-alert-*`): замените их на токены `success`, `warning` или `copilot` под тип сущности.
- Фиксированная ширина `w-65` сохраняет карточку компактной на любой контрольной точке. Заголовок и подпись используют `truncate` и `min-w-0`, чтобы длинные названия сущностей не ломали раскладку.
- `B24DescriptionList` по умолчанию с `sm:` переходит на сетку из двух колонок и рисует верхнюю границу перед каждым элементом. В узком поповере оба поведения мешают чтению, поэтому раскладка зафиксирована в одну колонку, а все правила `border-t` обнулены через пропс `b24ui`. Отступ `mt` контейнера убран (`mt-0`): промежуток под разделителем уже даёт родительский `gap-4.5`. У обёрток подписей (`<dt>`) нет вертикальных отступов (`py-0`), у обёрток описаний (`<dd>`) только `pb-2.5` — подпись вплотную к значению, а между строками остаётся одно «дыхание» в 2,5 единицы. У самого последнего `<dd>` этот отступ снова обнулён (`last:pb-0 sm:last:pb-0`), чтобы под последним значением в поповере не было лишнего промежутка.
- Слот `#owner` заменил бы всю пару `<dt>/<dd>` (и подпись «Account manager» пропала бы). Если пометить элемент владельца `slot: 'owner' as const` и переопределить общий слот `#description` с `v-if="item.slot === 'owner'"`, подпись отрисуется как обычно, а заменится только значение — на `B24Link`. Связка `as const` и `satisfies DescriptionListItem[]` позволяет сузить `item.slot` до литерала `'owner'` внутри шаблона.

## Виджет статистики (сводка KPI)

Компактный виджет дашборда с несколькими метриками и одной выделенной строкой KPI внизу. Собран только из стандартных компонентов: `B24Card` (принудительно в контексте `edge-dark` с фиолетовым радиальным градиентом в корневом слоте), `B24Button` (`air-secondary-accent`), `B24Tooltip` и небольшая CSS-сетка для строк. Выделенная строка использует глобальную утилиту `.style-filled-boost`, поэтому её поверхность задаёт набор токенов boost (градиент фона, обводка, цвет содержимого).

Его можно поместить в любой поповер (содержимое `B24Popover`), в модальное окно (тело `B24Modal` — уберите оформление окна через `:b24ui="{ content: 'sm:max-w-md bg-transparent shadow-none border-0', body: 'p-0' }"` и `:close="false"`) или вывести прямо на панели дашборда: виджет самодостаточен.

```vue
<script setup lang="ts">
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const rows = [
  { label: 'Active deals', count: 10, amount: '$46,500' },
  { label: 'Won deals', count: 1, amount: '$10,000' }
]

const highlight = {
  label: 'Conversion',
  count: '10%',
  amount: '17.7%',
  info: 'Today vs. last 30 days'
}
</script>

<template>
  <B24Card
    variant="filled-copilot"
    class="max-w-md"
    :b24ui="{
      root: 'edge-dark rounded-2xl bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-copilot-bg-content-3)_0%,var(--ui-color-copilot-bg-content-2)_58.65%,var(--ui-color-copilot-bg-content-1)_100%)]'
    }"
  >
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <div class="text-(length:--ui-font-size-2xl)/[normal] font-(--ui-font-weight-semi-bold)">Repeat sales dynamics</div>
          <div class="text-(length:--ui-font-size-md) opacity-90">Total deals created: 10</div>
          <div class="text-(length:--ui-font-size-md) opacity-90">Today: 10 deals</div>
        </div>

        <B24Button rounded color="air-secondary-accent" label="Last 30 days" :trailing-icon="RepeatIcon" />
      </div>
    </template>

    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-[1fr_auto_auto] gap-x-6 px-3 py-1 text-(length:--ui-font-size-sm) opacity-80">
        <span />
        <span class="text-end min-w-20">Count</span>
        <span class="text-end min-w-24">Amount</span>
      </div>

      <div
        v-for="row in rows"
        :key="row.label"
        class="grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl bg-white/5"
      >
        <span class="font-(--ui-font-weight-medium)">{{ row.label }}</span>
        <span class="text-end min-w-20">{{ row.count }}</span>
        <span class="text-end min-w-24">{{ row.amount }}</span>
      </div>

      <div class="style-filled-boost grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl text-(--ui-color-design-filled-boost-content)">
        <span class="font-(--ui-font-weight-medium) inline-flex items-center gap-1">
          {{ highlight.label }}
          <B24Tooltip :text="highlight.info">
            <Info1Icon class="size-4 opacity-80" />
          </B24Tooltip>
        </span>
        <span class="text-end min-w-20">{{ highlight.count }}</span>
        <span class="text-end min-w-24 font-(--ui-font-weight-semi-bold)">{{ highlight.amount }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <B24Button color="air-secondary-accent" :icon="SettingsIcon" label="Configure" />
        <B24Button color="air-secondary-accent" :icon="FeedbackIcon" label="Feedback" />
      </div>
    </template>
  </B24Card>
</template>
```

Замечания по раскладке:

- Карточка закреплена за `edge-dark` в корневом слоте, поэтому токены `--ui-color-copilot-bg-content-*` всегда принимают фиолетовые значения тёмной темы, даже если страница вокруг отрисована в светлой. Без `edge-dark` эти токены не определены, и градиент сбрасывается в `unset`.
- Радиальный градиент в `b24ui.root` имеет ту же геометрию `110.42% 110.42% at -10.42% 31.25%`, что и градиент boost в остальной дизайн-системе, только с фиолетовыми опорными цветами `copilot-bg-content-{3,2,1}` (от светлого к тёмному от верхнего левого угла). Чтобы перекрасить поверхность, не меняя геометрию, подставьте `--ui-color-design-filled-warning-bg-gradient-*` или другую тройку.
- Выделенная строка KPI использует глобальную утилиту `.style-filled-boost` из `008_ui_global.css`. Класс подключает градиент фона boost (оранжевый, розовый, фиолетовый), обводку boost и CSS-переменные цвета содержимого boost (текст и иконки). Явно добавьте `text-(--ui-color-design-filled-boost-content)`, чтобы текст строки получил цвет содержимого boost: класс `.style-filled-boost` лишь объявляет переменную и `color` не применяет.
- Невыделенные строки лежат на `bg-white/5` — полупрозрачной подложке поверх градиента. Строки остаются читаемыми, а новые токены вводить не нужно.
- Шаблон сетки `1fr_auto_auto` оставляет подпись метрики гибкой, а две числовые колонки выровнены по концу и пропорциональны: `text-end`, а не `text-right`, поэтому цифры следуют направлению чтения и при RTL оказываются слева. Если строк больше четырёх, подумайте о `B24Table`: этот приём для компактных сводок, а не для списков данных.
- Кнопка-«таблетка» в шапке и две кнопки в подвале используют `color="air-secondary-accent"` — единую полупрозрачную поверхность действий на фиолетовом фоне. Скруглённый силуэт кнопке даёт `rounded`; для `:trailing-icon` берите иконку, подходящую по смыслу (`RepeatIcon`, `Calendar1Icon`, `FlipchartIcon`).
