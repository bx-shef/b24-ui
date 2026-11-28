# Раскладка лендинга

Публичные страницы — лендинг, блог, список изменений, тарифы — на оболочке Header + Main + Footer с компонентами Page.

## Когда использовать

- Маркетинговые сайты, страницы продуктов, сайты компаний
- Блог и страницы с контентом
- Тарифы, история изменений, портфолио
- Любая публичная страница, которая не дашборд и не документация

## Оболочка приложения

```vue [app.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Features',
  to: '#features'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}])
</script>

<template>
  <B24App>
    <B24Header>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>

      <B24NavigationMenu :items="items" />

      <template #right>
        <B24ColorModeButton />
        <B24Button label="Sign in" color="air-tertiary-no-accent" />
        <B24Button label="Get started" />
      </template>

      <template #body>
        <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </B24Header>

    <B24Main>
      <NuxtPage />
    </B24Main>

    <B24Footer>
      <template #left>
        <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
      </template>
      <template #right>
        <B24Button :icon="GitHubIcon" color="air-tertiary-no-accent" to="https://github.com" target="_blank" />
      </template>
    </B24Footer>
  </B24App>
</template>
```

### Частые ошибки

- Забыли слот `#body` у `B24Header` — это содержимое мобильного меню. Без него у мобильных пользователей нет навигации.

## Страница лендинга

```vue [pages/index.vue]
<script setup lang="ts">
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'
import MobileIcon from '@bitrix24/b24icons-vue/outline/MobileIcon'

const features = [
  { title: 'Accessible', description: 'Built on Reka UI with full ARIA support.', icon: PersonIcon },
  { title: 'Customizable', description: 'Tailwind Variants theming with full control.', icon: PaletteIcon },
  { title: 'Responsive', description: 'Mobile-first components.', icon: MobileIcon }
]
</script>

<template>
  <B24PageSection
    id="features"
    headline="Features"
    title="Everything you need"
    description="A comprehensive suite of components and utilities."
    :features="features"
  />
</template>
```

`icon` — это **ссылка на компонент**, а не строка: имена в стиле Iconify вроде `i-lucide-palette` — идиома оригинальной библиотеки и здесь ни во что не разрешаются. См. [иконки](../guidelines/icons.md).

## Ключевые компоненты

- `B24PageSection` — раздел с надзаголовком, заголовком, описанием и сеткой `features`. Для якорных ссылок задайте `id`.
- `B24PageGrid` / `B24PageCard` — сетка карточек для преимуществ, отзывов и т. п.
- `B24PageFeature` — отдельное преимущество.
- `B24FooterColumns` — многоколоночный подвал с группами ссылок (используется внутри `B24Footer`).

## Вариации

### Чередующиеся разделы с преимуществами

```vue
<B24PageSection title="Feature A" orientation="horizontal">
  <img src="/feature-a.png" />
</B24PageSection>

<B24PageSection title="Feature B" orientation="horizontal" reverse>
  <img src="/feature-b.png" />
</B24PageSection>
```
