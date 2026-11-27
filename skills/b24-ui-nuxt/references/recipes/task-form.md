# Раскладка формы задачи

Форма задачи в стиле Bitrix24, собранная только из стандартных компонентов `b24ui`: одна колонка, без собственного CSS сверх пропсов компонентов.

## Когда использовать

- Экраны создания и редактирования задач в приложениях Bitrix24
- Любая форма, где сочетаются описание в форматированном тексте, поля исполнителей, выбор даты и переносимый ряд второстепенных действий
- Образец сборки `Editor`, `Card`, `Avatar`, `InputDate`, `Calendar`, `Popover` и `Button` в нетривиальную раскладку формы без собственного CSS

## Дерево компонентов

```
div.flex.flex-col.gap-4.p-4.w-full
├── B24Input (xl, no-border — название задачи, semi-bold)
├── B24Card (b24ui.body='p-0') — редактор
│   └── B24Editor (markdown, min-h-48 px-4 py-3)
│       └── slot: div.flex.items-center.gap-1 (строка панели инструментов)
│           ├── B24Button (FileUploadIcon, ghost, sm — прикрепить файл)
│           ├── B24EditorToolbar (mention, bulletList, orderedList)
│           └── B24Button (GoToLIcon, ghost, sm, ms-auto — развернуть)
├── B24Card (b24ui.body='p-0') — ответственные
│   └── div.divide-y
│       ├── строка: постановщик — B24Avatar и имя
│       ├── строка: исполнитель — B24Avatar и имя
│       └── строка: срок — B24InputDate (sm, no-border, flex-1)
│           └── #trailing: B24Popover(:reference=inputsRef[3].$el)
│               ├── trigger: B24Button (CalendarIcon)
│               └── #content: B24Calendar (v-model=deadline)
├── B24Card — наблюдатели
│   ├── #header: подпись и B24Button (PlusLIcon, xs — добавить наблюдателя)
│   └── тело: B24Avatar × n (цвета air-secondary-*)
├── div.flex.flex-wrap.gap-2 — кнопки действий
│   └── B24Button × 17 (sm, активна → air-secondary-accent-2, неактивна → air-secondary-no-accent)
└── div.flex.gap-2.justify-end — подвал
    ├── B24Button (Save, air-primary)
    └── B24Button (Cancel, air-tertiary)
```

## Полный пример

```vue [components/TaskFormWidget.vue]
<script setup lang="ts">
import type { EditorToolbarItem, IconComponent } from '@bitrix24/b24ui-nuxt'
import { CalendarDate } from '@internationalized/date'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import GoToLIcon from '@bitrix24/b24icons-vue/outline/GoToLIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import MentionIcon from '@bitrix24/b24icons-vue/outline/MentionIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'
import PinIcon from '@bitrix24/b24icons-vue/outline/PinIcon'
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import LayersIcon from '@bitrix24/b24icons-vue/outline/LayersIcon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'

const title = ref('Design the new task form interface')
const description = ref('')
// B24InputDate работает со значениями @internationalized/date (DateValue), а не с нативным Date
const deadline = shallowRef<CalendarDate | undefined>(new CalendarDate(2026, 6, 30))
const deadlineInput = useTemplateRef('deadlineInput')

// Статический список — реактивных зависимостей нет, поэтому обычная const (не computed)
const toolbarItems: EditorToolbarItem[][] = [[
  { kind: 'mention', icon: MentionIcon, tooltip: { text: 'Mention' } },
  { kind: 'bulletList', icon: BulletedListIcon, tooltip: { text: 'Bullet list' } },
  { kind: 'orderedList', icon: NumberedListIcon, tooltip: { text: 'Numbered list' } }
]]

// флаг active задаёт цвет кнопки: air-secondary-accent-2 или air-secondary-no-accent
const actionButtons: { label: string, icon: IconComponent, active?: boolean }[] = [
  { label: 'Results', icon: CircleCheckIcon, active: true },
  { label: 'Files', icon: FileUploadIcon, active: true },
  { label: 'Checklists', icon: TaskListIcon },
  { label: 'Project', icon: FolderPlusIcon },
  { label: 'Co-executors', icon: UserGroupIcon },
  { label: 'Observers', icon: NotificationIcon },
  { label: 'Flow', icon: BusinesProcessStagesIcon },
  { label: 'Tags', icon: PinIcon, active: true },
  { label: 'Reminders', icon: BellIcon },
  { label: 'CRM elements', icon: ItemIcon },
  { label: 'Parent task', icon: ArrowTopLIcon },
  { label: 'Subtasks', icon: ArrowDownLIcon },
  { label: 'Linked tasks', icon: LinkIcon },
  { label: 'Gantt', icon: LayersIcon },
  { label: 'Timeline planning', icon: CalendarIcon },
  { label: 'Time tracking', icon: ClockIcon },
  { label: 'Custom fields', icon: SettingsIcon }
]
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <B24Input
      v-model="title"
      placeholder="Task name"
      size="xl"
      no-border
      :b24ui="{ base: 'font-(--ui-font-weight-semi-bold)' }"
    />

    <B24Card :b24ui="{ body: 'p-0' }">
      <B24Editor
        v-slot="{ editor }"
        v-model="description"
        content-type="markdown"
        placeholder="Add a task description..."
        :b24ui="{ base: 'min-h-48 px-4 py-3' }"
      >
        <div class="flex items-center gap-1 px-2 py-1.5 border-b border-(--ui-color-divider-default)">
          <B24Button :icon="FileUploadIcon" color="air-tertiary" size="sm" aria-label="Attach file" />
          <B24EditorToolbar :editor="editor" :items="toolbarItems" />
          <div class="ms-auto">
            <B24Button :icon="GoToLIcon" color="air-tertiary" size="sm" aria-label="Expand editor" />
          </div>
        </div>
      </B24Editor>
    </B24Card>

    <B24Card :b24ui="{ body: 'p-0' }">
      <div class="divide-y divide-(--ui-color-divider-default)">
        <div class="flex items-center gap-3 px-5 py-3">
          <span class="text-description text-sm w-28 shrink-0">Creator</span>
          <div class="flex items-center gap-2 min-w-0">
            <B24Avatar :icon="PersonIcon" color="air-secondary-accent-2" size="xs" />
            <span class="text-sm truncate">Jane Cooper</span>
          </div>
        </div>
        <div class="flex items-center gap-3 px-5 py-3">
          <span class="text-description text-sm w-28 shrink-0">Assignee</span>
          <div class="flex items-center gap-2 min-w-0">
            <B24Avatar :icon="PersonIcon" color="air-secondary-alert" size="xs" />
            <span class="text-sm truncate">Unassigned</span>
          </div>
        </div>
        <div class="flex items-center gap-3 px-5 py-3">
          <span class="text-description text-sm w-28 shrink-0">Deadline</span>
          <B24InputDate ref="deadlineInput" v-model="deadline" size="sm" no-border class="flex-1">
            <template #trailing>
              <B24Popover :reference="deadlineInput?.inputsRef[3]?.$el">
                <B24Button
                  color="air-tertiary-no-accent"
                  size="sm"
                  :icon="CalendarIcon"
                  aria-label="Pick a date"
                  class="px-0"
                />
                <template #content>
                  <B24Calendar v-model="deadline" class="p-2" />
                </template>
              </B24Popover>
            </template>
          </B24InputDate>
        </div>
      </div>
    </B24Card>

    <B24Card>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-sm font-(--ui-font-weight-medium)">Watchers</span>
          <B24Button :icon="PlusLIcon" color="air-tertiary" size="xs" aria-label="Add watcher" />
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <B24Avatar :icon="PersonIcon" color="air-secondary-accent-2" size="xs" />
        <B24Avatar :icon="PersonIcon" color="air-secondary-alert" size="xs" />
        <B24Avatar :icon="PersonIcon" color="air-secondary" size="xs" />
      </div>
    </B24Card>

    <div class="flex flex-wrap gap-2">
      <B24Button
        v-for="btn in actionButtons"
        :key="btn.label"
        :icon="btn.icon"
        :label="btn.label"
        :color="btn.active ? 'air-secondary-accent-2' : 'air-secondary-no-accent'"
        :aria-pressed="btn.active ? 'true' : 'false'"
        size="sm"
      />
    </div>

    <div class="flex gap-2 justify-end">
      <B24Button label="Save" color="air-primary" />
      <B24Button label="Cancel" color="air-tertiary" />
    </div>
  </div>
</template>
```

## Ключевые приёмы

### Редактор со своей строкой панели инструментов

Поместите `div` первым дочерним элементом слота по умолчанию у `B24Editor`, чтобы над областью содержимого постоянно была панель инструментов. Слот отрисовывается в дереве компонентов перед `EditorContent`, поэтому панель естественно оказывается сверху. Сочетайте элементы, работающие с TipTap (`B24EditorToolbar`), с обычными кнопками `B24Button` (вложение, развернуть), которые не являются командами редактора.

```vue
<B24Editor v-slot="{ editor }" v-model="content">
  <div class="flex items-center gap-1 px-2 py-1.5 border-b border-(--ui-color-divider-default)">
    <B24Button :icon="FileUploadIcon" color="air-tertiary" size="sm" aria-label="Attach file" />
    <B24EditorToolbar :editor="editor" :items="toolbarItems" />
    <div class="ms-auto">
      <B24Button :icon="GoToLIcon" color="air-tertiary" size="sm" aria-label="Expand editor" />
    </div>
  </div>
</B24Editor>
```

### Карточка без отступов со строками-разделителями

`b24ui.body = 'p-0'` убирает отступы карточки по умолчанию, дальше отступы задаются у каждой строки. Разделители тянутся от края до края, а каждая строка управляет своими отступами.

```vue
<B24Card :b24ui="{ body: 'p-0' }">
  <div class="divide-y divide-(--ui-color-divider-default)">
    <div class="flex items-center gap-3 px-5 py-3">...</div>
    <div class="flex items-center gap-3 px-5 py-3">...</div>
  </div>
</B24Card>
```

### Поля без рамки внутри карточек

`B24Input` и `B24InputDate` принимают пропс `no-border`. Используйте его для названия задачи (чистый заголовок без рамки) и для полей внутри карточки с `p-0`, чтобы они не спорили с оформлением карточки.

```vue
<B24Input v-model="title" size="xl" no-border />
<B24InputDate v-model="deadline" size="sm" no-border class="flex-1" />
```

### Выбор даты с календарём в выпадающем окне

Поместите `B24Calendar` в слот `#trailing` у `B24InputDate` внутрь `B24Popover`. У обоих общий `v-model`. Поповер привязывается к последнему сегменту поля через `inputsRef[3]?.$el` (устоявшийся приём, как в `FormExampleEditSection`).

```vue
<B24InputDate ref="deadlineInput" v-model="deadline" size="sm" no-border>
  <template #trailing>
    <B24Popover :reference="deadlineInput?.inputsRef[3]?.$el">
      <B24Button color="air-tertiary-no-accent" size="sm" :icon="CalendarIcon" aria-label="Pick a date" class="px-0" />
      <template #content>
        <B24Calendar v-model="deadline" class="p-2" />
      </template>
    </B24Popover>
  </template>
</B24InputDate>
```

### Активные и неактивные кнопки действий

Добавьте каждому элементу флаг `active?: boolean` и задавайте `color` динамически. Добавьте `aria-pressed`, чтобы программы чтения с экрана отличали активные элементы от неактивных.

```vue
<B24Button
  v-for="btn in actionButtons"
  :key="btn.label"
  :icon="btn.icon"
  :label="btn.label"
  :color="btn.active ? 'air-secondary-accent-2' : 'air-secondary-no-accent'"
  :aria-pressed="btn.active ? 'true' : 'false'"
  size="sm"
/>
```

### Перенос кнопок действий

Контейнер `flex flex-wrap gap-2` автоматически переносит `B24Button` при любой ширине экрана. Типизируйте массив данных через `IconComponent`, чтобы пропс иконки проверялся при компиляции.

```vue
<div class="flex flex-wrap gap-2">
  <B24Button
    v-for="btn in actionButtons"
    :key="btn.label"
    :icon="btn.icon"
    :label="btn.label"
    :color="btn.active ? 'air-secondary-accent-2' : 'air-secondary-no-accent'"
    size="sm"
  />
</div>
```

## Частые ошибки

- Статический массив панели инструментов объявлен как `computed` — реактивных зависимостей у него нет, поэтому правильно и дешевле обычная `const toolbarItems: EditorToolbarItem[][]`.
- В `B24InputDate` передан нативный `Date` — компонент работает со значениями `@internationalized/date` (`CalendarDate`/`DateValue`), а не с нативным `Date`. Используйте `shallowRef<CalendarDate | undefined>`.
- Нет `useTemplateRef` для поля срока — `B24Popover` нужен `:reference`, чтобы правильно привязаться; без него поповер может появиться в неожиданном месте.
- Шапка у `B24Card` задана одновременно пропсом `title` и слотом `#header` — используйте что-то одно; если в шапке нужна flex-раскладка, берите `#header`.
- Забыт `aria-pressed` у кнопок действий в роли переключателей — без него программы чтения с экрана не отличат активное состояние от неактивного.
