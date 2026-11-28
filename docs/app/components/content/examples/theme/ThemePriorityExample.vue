<template>
  <B24Theme
    :b24ui="{
      button: {
        base: 'rounded-full'
      }
    }"
  >
    <div class="flex items-center gap-2">
      <B24Button label="С темой" />
      <B24Button label="Переопределено" :b24ui="{ base: 'rounded-none' }" />
    </div>
  </B24Theme>
</template>
