<script setup lang="ts">
import Location1Icon from '@bitrix24/b24icons-vue/main/Location1Icon'

const searchTerm = ref('F')
const items = ref([
  { label: 'Франция', icon: Location1Icon, value: 'FR' },
  { label: 'Германия', icon: Location1Icon, value: 'DE' },
  { label: 'Италия', icon: Location1Icon, value: 'IT' },
  { label: 'Испания', icon: Location1Icon, value: 'ES' },
  { label: 'Нидерланды', icon: Location1Icon, value: 'NL' },
  { label: 'Польша', icon: Location1Icon, value: 'PL' }
])
const value = ref()
</script>

<template>
  <B24Listbox v-model="value" v-model:search-term="searchTerm" filter :items="items" class="w-full" />
</template>
