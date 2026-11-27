<template>
  <B24Theme
    :props="{
      button: { color: 'air-secondary-accent-1', size: 'lg' },
      input: { size: 'lg' },
      select: { size: 'lg' }
    }"
    :b24ui="{
      button: {
        base: 'rounded-full'
      },
      input: {
        base: 'rounded-full'
      },
      select: {
        base: 'rounded-full'
      }
    }"
  >
    <div class="flex items-center gap-2">
      <B24Button label="Кнопка" />
      <B24Input placeholder="Поиск..." />
      <B24Select placeholder="Выбрать" :items="['Item 1', 'Item 2', 'Item 3']" />
    </div>
  </B24Theme>
</template>
