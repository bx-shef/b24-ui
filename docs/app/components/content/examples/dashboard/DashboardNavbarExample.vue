<template>
  <B24DashboardNavbar title="Входящие" class="bg-(--ui-color-design-outline-bg-alt) backdrop-blur-md">
    <template #leading>
      <B24DashboardSidebarCollapse />
    </template>

    <template #trailing>
      <B24Badge label="4" />
    </template>

    <template #right>
      <B24FieldGroup>
        <B24Button label="Все" />
        <B24Button label="Непрочитанные" />
      </B24FieldGroup>
    </template>
  </B24DashboardNavbar>
</template>
