<script setup lang="ts">
import theme from '#build/b24ui/chat-attachment'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)
const variants = Object.keys(theme.variants.variant)
const statuses = Object.keys(theme.variants.status)

const attrs = reactive({
  size: [theme.defaultVariants.size],
  orientation: [theme.defaultVariants.orientation],
  variant: [theme.defaultVariants.variant]
})

const status = ref<keyof typeof theme.variants.status>('idle')
const removable = ref(true)
const withImage = ref(true)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.size"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
        size="xs"
      />
      <B24Select
        v-model="attrs.orientation"
        class="w-32"
        :items="orientations"
        placeholder="Orientation"
        multiple
        size="xs"
      />
      <B24Select
        v-model="attrs.variant"
        class="w-32"
        :items="variants"
        placeholder="Variant"
        multiple
        size="xs"
      />
      <B24Select
        v-model="status"
        class="w-32"
        :items="statuses"
        placeholder="Status"
        size="xs"
      />
      <B24Switch v-model="removable" label="Removable" size="xs" />
      <B24Switch v-model="withImage" label="Image" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="attrs">
      <B24ChatAttachment
        v-if="withImage"
        name="employee.png"
        type="image/png"
        url="/b24ui/demo/avatar/employee.png"
        :status="status"
        :removable="removable"
        v-bind="props"
      />
      <B24ChatAttachment
        v-else
        name="quarterly-report.pdf"
        type="application/pdf"
        :status="status"
        :removable="removable"
        v-bind="props"
      />
    </Matrix>
  </PlaygroundPage>
</template>
