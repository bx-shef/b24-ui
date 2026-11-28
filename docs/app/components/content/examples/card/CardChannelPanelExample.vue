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
  <B24Card
    class="w-full max-w-xs overflow-hidden"
    :b24ui="{ body: 'p-0 flex flex-col gap-0 divide-y divide-default' }"
  >
    <!-- Шапка канала -->
    <div class="flex flex-col items-center gap-3 px-4 py-6 text-center">
      <B24Avatar
        src="/b24ui/avatar/employee.png"
        alt="Отдел продаж"
        size="3xl"
        :b24ui="{ root: 'rounded-xl' }"
      />
      <div>
        <p class="font-semibold text-label">
          Отдел продаж
        </p>
        <p class="text-description text-sm">
          Канал
        </p>
      </div>

      <!-- :max="4" при 5 аватарах намеренно показывает счётчик +1 -->
      <div class="flex items-center gap-2">
        <B24AvatarGroup :max="4" size="xs">
          <B24Avatar src="/b24ui/avatar/employee.png" alt="Иван Петров" />
          <B24Avatar src="/b24ui/avatar/assistant.png" alt="Мария Иванова" />
          <B24Avatar src="/b24ui/avatar/employee.png" alt="Пётр Сидоров" />
          <B24Avatar src="/b24ui/avatar/assistant.png" alt="Анна Смирнова" />
          <B24Avatar alt="Олег Кузнецов" />
        </B24AvatarGroup>
        <B24Button
          :icon="PersonPlus2Icon"
          label="Добавить"
          color="air-secondary-accent-2"
          size="xs"
        />
      </div>
    </div>

    <!-- Строки с переключателями: иконка снаружи, пропс label у B24Switch связывает переключатель с текстом для доступности -->
    <div class="py-1">
      <div class="flex items-center gap-3 px-4 py-2.5">
        <BellIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <B24Switch
          v-model="soundEnabled"
          label="Звук"
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
            label="Автоудаление сообщений"
            :b24ui="{
              root: 'flex-1 flex-row-reverse justify-between items-center',
              wrapper: 'ms-0'
            }"
          />
        </div>
        <!-- отступ (size-5 + gap-3) выравнивает описание под подписью -->
        <div class="flex gap-3">
          <span class="size-5 shrink-0" />
          <p class="text-xs text-dimmed mt-1">
            {{ autoDeleteEnabled ? 'Сообщения удаляются через 7 дней' : 'Отключено' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Информационные строки -->
    <div class="py-1">
      <div class="flex items-center gap-3 px-4 py-2.5">
        <UserGroupIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <span class="flex-1 text-sm text-label">Групповой чат</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <AiStarsIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <span class="flex-1 text-sm text-label">Избранное</span>
        <B24Badge :label="0" color="air-secondary-accent" size="xs" square />
      </div>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <LinkIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
        <span class="flex-1 text-sm text-label">Ссылки из сообщений</span>
        <B24Badge :label="18" color="air-secondary-accent" size="xs" square />
      </div>
    </div>

    <!-- Раздел «Медиа и файлы» -->
    <div class="py-2">
      <h3 class="px-4 py-1 text-xs text-description font-semibold">
        Медиа и файлы
      </h3>
      <B24Empty
        :icon="ImageIcon"
        title="Нет медиа и файлов"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>

    <!-- Раздел «Задачи» -->
    <div class="py-2">
      <div class="flex items-center justify-between px-4 py-1">
        <h3 class="text-xs text-description font-semibold">
          Задачи
        </h3>
        <B24Button :icon="PlusLIcon" label="Добавить" color="air-secondary-accent-2" size="xs" />
      </div>
      <B24Empty
        :icon="TaskListIcon"
        title="Нет задач"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>

    <!-- Раздел «Встречи» -->
    <div class="py-2">
      <div class="flex items-center justify-between px-4 py-1">
        <h3 class="text-xs text-description font-semibold">
          Встречи
        </h3>
        <B24Button :icon="PlusLIcon" label="Добавить" color="air-secondary-accent-2" size="xs" />
      </div>
      <B24Empty
        :icon="CalendarIcon"
        title="Нет встреч"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>
  </B24Card>
</template>
