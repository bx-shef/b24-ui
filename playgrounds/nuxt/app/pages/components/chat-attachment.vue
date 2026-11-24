<script setup lang="ts">
const image = '/avatar/employee.png'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <B24ChatAttachment name="quarterly-report.pdf" type="application/pdf" />
      <B24ChatAttachment name="quarterly-report.pdf" type="application/pdf" removable />
      <B24ChatAttachment name="quarterly-report.pdf" type="application/pdf" status="uploading" />
      <B24ChatAttachment name="quarterly-report.pdf" type="application/pdf" status="error" removable />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <B24ChatAttachment name="employee.png" type="image/png" :url="image" />
      <B24ChatAttachment name="employee.png" type="image/png" :url="image" removable />
      <B24ChatAttachment name="employee.png" type="image/png" :url="image" status="uploading" />
      <B24ChatAttachment name="employee.png" type="image/png" :url="image" status="error" removable />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <B24ChatAttachment orientation="vertical" name="employee.png" type="image/png" :url="image" />
      <B24ChatAttachment orientation="vertical" name="employee.png" type="image/png" :url="image" removable />
      <B24ChatAttachment orientation="vertical" name="quarterly-report.pdf" type="application/pdf" status="uploading" />
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <B24ChatAttachment variant="thumbnail" name="employee.png" type="image/png" :url="image" removable />
      <B24ChatAttachment
        variant="thumbnail"
        name="employee.png"
        type="image/png"
        :url="image"
        status="uploading"
        removable
      />
      <B24ChatAttachment
        variant="thumbnail"
        name="employee.png"
        type="image/png"
        :url="image"
        status="error"
        removable
      />
      <B24ChatAttachment variant="thumbnail" name="quarterly-report.pdf" type="application/pdf" removable />
    </div>
  </div>
</template>
