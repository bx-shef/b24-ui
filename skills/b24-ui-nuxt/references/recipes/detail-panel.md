# Панель сведений (информационное боковое меню)

Собирает боковую панель сведений о сущности в стиле Bitrix24 из стандартных компонентов.
Применяйте, когда нужна информационная боковая панель с метаданными сущности, настройками и разделами содержимого рядом с основным видом.

## Когда применять

- Боковая панель сведений о канале или группе чата (участники, настройки звука, медиа, задачи)
- Панель карточки записи CRM (контакты, активность, связанные сделки)
- Любая панель «об этом элементе» с переключаемыми настройками и сгруппированными разделами

## Ключевые решения

| Задача | Решение |
|---|---|
| Квадратный аватар канала или сущности | `B24Avatar` with `:b24ui="{ root: 'rounded-xl' }"` переопределяет `rounded-full` |
| Строка участников с переполнением | `B24AvatarGroup :max="N"` — добавьте один лишний дочерний элемент, чтобы показать счётчик `+1` |
| Строка с переключателем и иконкой (доступность) | `B24Switch label="..."` + переопределение `b24ui` для иконки слева |
| Числовой бейдж-счётчик | `B24Badge square` справа в информационной строке |
| Пустое состояние раздела | `B24Empty color="air-tertiary" :b24ui="{ root: 'ring-0 rounded-none' }"` |
| Разделители разделов | `divide-y divide-default` в теле `B24Card` через пропс `b24ui` |

## Полный пример

```vue
<script setup lang="ts">
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import PersonPlus2Icon from '@bitrix24/b24icons-vue/crm/PersonPlus2Icon'

const soundEnabled = ref(true)
const autoDeleteEnabled = ref(false)
</script>

<template>
  <!-- max-w-xs (320px) — обычная ширина свёрнутой панели сведений -->
  <B24Card
    class="w-full max-w-xs overflow-hidden"
    :b24ui="{ body: 'p-0 flex flex-col gap-0 divide-y divide-default' }"
  >
    <!-- Шапка: квадратный аватар, название и группа участников -->
    <div class="flex flex-col items-center gap-3 px-4 py-6 text-center">
      <B24Avatar
        src="/avatar/employee.png"
        alt="Sales Department"
        size="3xl"
        :b24ui="{ root: 'rounded-xl' }"
      />
      <div>
        <p class="font-semibold text-label">
          Sales Department
        </p>
        <p class="text-description text-sm">
          Channel
        </p>
      </div>

      <!-- :max="4" при 5 дочерних элементах намеренно показывает счётчик переполнения +1 -->
      <div class="flex items-center gap-2">
        <B24AvatarGroup :max="4" size="xs">
          <B24Avatar src="/avatar/employee.png" alt="John Doe" />
          <B24Avatar src="/avatar/assistant.png" alt="Jane Smith" />
          <B24Avatar src="/avatar/employee.png" alt="Bob Johnson" />
          <B24Avatar src="/avatar/assistant.png" alt="Alice Brown" />
          <B24Avatar alt="Charlie Davis" />
        </B24AvatarGroup>
        <B24Button :icon="PersonPlus2Icon" label="Add" color="air-secondary-accent-2" size="xs" />
      </div>
    </div>

    <!-- Строки с переключателями: иконка снаружи, пропс label у B24Switch связывает переключатель с текстом для доступности -->
    <div class="py-1">
      <div class="flex items-center gap-3 px-4 py-2.5">
        <BellIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <B24Switch
          v-model="soundEnabled"
          label="Sound"
          :b24ui="{
            root: 'flex-1 flex-row-reverse justify-between items-center',
            wrapper: 'ms-0'
          }"
        />
      </div>
      <div class="px-4 py-2.5">
        <div class="flex items-center gap-3">
          <ClockIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
          <B24Switch
            v-model="autoDeleteEnabled"
            label="Auto-delete messages"
            :b24ui="{
              root: 'flex-1 flex-row-reverse justify-between items-center',
              wrapper: 'ms-0'
            }"
          />
        </div>
        <!-- невидимая распорка (size-5 + gap-3) выравнивает описание под подписью -->
        <div class="flex gap-3">
          <span class="size-5 shrink-0" />
          <p class="text-xs text-dimmed mt-1">
            {{ autoDeleteEnabled ? 'Messages deleted after 7 days' : 'Disabled' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Информационные строки: иконка, подпись и необязательный бейдж-счётчик -->
    <div class="py-1">
      <div class="flex items-center gap-3 px-4 py-2.5">
        <UserGroupIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <span class="flex-1 text-sm text-label">Group chat</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <AiStarsIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <span class="flex-1 text-sm text-label">Favorites</span>
        <B24Badge :label="0" color="air-secondary-accent" size="xs" square />
      </div>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <LinkIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <span class="flex-1 text-sm text-label">Links from messages</span>
        <B24Badge :label="18" color="air-secondary-accent" size="xs" square />
      </div>
    </div>

    <!-- Разделы содержимого: заголовок, необязательное действие и B24Empty для пустого состояния -->
    <div class="py-2">
      <h3 class="px-4 py-1 text-xs text-description font-semibold">Media & Files</h3>
      <B24Empty
        :icon="ImageIcon"
        title="No media or files"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>

    <div class="py-2">
      <div class="flex items-center justify-between px-4 py-1">
        <h3 class="text-xs text-description font-semibold">Tasks</h3>
        <B24Button :icon="PlusLIcon" label="Add" color="air-secondary-accent-2" size="xs" />
      </div>
      <B24Empty
        :icon="TaskListIcon"
        title="No tasks"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>

    <div class="py-2">
      <div class="flex items-center justify-between px-4 py-1">
        <h3 class="text-xs text-description font-semibold">Meetings</h3>
        <B24Button :icon="PlusLIcon" label="Add" color="air-secondary-accent-2" size="xs" />
      </div>
      <B24Empty
        :icon="CalendarIcon"
        title="No meetings"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>
  </B24Card>
</template>
```

## Как устроена строка с переключателем

`B24Switch` с пропсом `label` создаёт настоящий `<label for="...">`, связанный с переключателем.
Переопределение `b24ui` меняет порядок во flex на обратный, и переключатель оказывается справа:

```vue
<B24Switch
  v-model="value"
  label="Sound"
  :b24ui="{
    root: 'flex-1 flex-row-reverse justify-between items-center',
    wrapper: 'ms-0'
  }"
/>
```

- `flex-row-reverse` — переключатель справа, подпись слева
- `justify-between` — разводит переключатель и подпись по краям
- `wrapper: 'ms-0'` — убирает отступ `ms-2` в начале, заданный по умолчанию

## Выравнивание описания под подписью

Чтобы выровнять строку описания под подписью (а не под иконкой), поставьте невидимую распорку шириной с иконку:

```vue
<div class="flex gap-3">
  <span class="size-5 shrink-0" /> <!-- по размеру иконки -->
  <p class="text-xs text-dimmed mt-1">Description text</p>
</div>
```
