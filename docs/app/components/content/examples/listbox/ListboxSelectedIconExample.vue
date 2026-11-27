<script setup lang="ts">
import Location1Icon from '@bitrix24/b24icons-vue/main/Location1Icon'
import FireIcon from '@bitrix24/b24icons-vue/outline/FireIcon'

const items = ref([
  { label: 'Франция', icon: Location1Icon, value: 'FR' },
  { label: 'Германия', icon: Location1Icon, value: 'DE' },
  { label: 'Италия', icon: Location1Icon, value: 'IT' },
  { label: 'Испания', icon: Location1Icon, value: 'ES' }
])
const value = ref('FR')
</script>

<template>
  <B24Listbox
    v-model="value"
    :selected-icon="FireIcon"
    value-key="value"
    :items="items"
    class="w-full"
  />
</template>
