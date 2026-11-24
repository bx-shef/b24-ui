<script setup lang="ts">
type CapabilityItem = {
  value: string
  title: string
  text: string
  href: string
}

const value = ref<string[]>(['columns'])

const items: CapabilityItem[] = [
  {
    value: 'columns',
    title: 'В колонках',
    text: 'Выберите для ресурсов, которые всегда должны быть на виду у менеджера. Это основные ресурсы, вокруг которых строится расписание.',
    href: 'https://helpdesk.bitrix24.com/'
  },
  {
    value: 'list',
    title: 'В дополнительном списке',
    text: 'Выберите для ресурсов, которые бронируются только вместе с основным. Например, если основной ресурс — специалисты, оборудование попадает в дополнительный список.',
    href: 'https://helpdesk.bitrix24.com/'
  }
]
</script>

<template>
  <B24CheckboxGroup
    v-model="value"
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
        <Placeholder class="hidden sm:flex shrink-0 w-[120px] h-[72px] text-(length:--ui-font-size-xs) text-description">
          Предпросмотр
        </Placeholder>
      </span>
    </template>
  </B24CheckboxGroup>
</template>
