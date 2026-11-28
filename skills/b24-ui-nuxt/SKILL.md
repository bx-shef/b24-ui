---
name: b24-ui-nuxt
description: Создание интерфейсов на @bxshefby/b24ui-nuxt v2 — 130+ доступных компонентов Vue с темами на Tailwind CSS. Используйте при создании интерфейсов, форм и раскладок страниц для приложения Bitrix24.
---

# Bitrix24 UI

Библиотека Vue-компонентов на основе [Reka UI](https://reka-ui.com/), [Tailwind CSS](https://tailwindcss.com/) и [Tailwind Variants](https://www.tailwind-variants.org/). Работает с Nuxt, Vue (Vite), Laravel (Vite + Inertia) и AdonisJS (Vite + Inertia).

## LLMs.txt

Когда нужно узнать, **что принимает компонент** или **как устроен его API** — пропсы, слоты, события, полная документация, примеры, — используйте [документацию Bitrix24 UI](https://bitrix24.github.io/b24ui/llms.txt); если она ещё не подключена, подключите. Этот навык подсказывает, **когда какой компонент выбрать** и **как строить хорошо**.

## Основные правила (действуют всегда)

1. **Всегда оборачивайте приложение в `B24App`** — он нужен для уведомлений, подсказок и программных оверлеев. Принимает пропс `locale` для локализации.
2. **Всегда используйте семантические цвета** — `text-description`, `bg-elevated`, `border-muted` и т. д. Не берите цвета палитры Tailwind напрямую, например `text-gray-500`.
3. **Имена слотов смотрите в сгенерированных файлах темы** — Nuxt: `.nuxt/b24ui/<component>.ts`, Vue: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`. В них есть все слоты, варианты и классы по умолчанию любого компонента.
4. **Приоритет переопределений** (побеждает самый высокий): пропс `b24ui` / пропс `class` → глобальная конфигурация → значения темы по умолчанию.
5. **Иконки ищите по [руководству по иконкам](references/guidelines/icons.md)** — оно сопоставляет запрос обычными словами с нужным импортом.

## Как пользоваться навыком

В зависимости от задачи загрузите нужные справочные файлы **до написания кода**. Не грузите всё подряд — только необходимое.

### Справочные файлы

**Руководства** — проектные решения и соглашения:
- [design-system](references/guidelines/design-system.md) — семантические цвета, темизация, фирменная настройка, варианты, пропс `b24ui`
- [component-selection](references/guidelines/component-selection.md) — матрицы выбора: когда Modal, а когда Slideover, Select или SelectMenu, Toast или Alert и т. д.
- [conventions](references/guidelines/conventions.md) — приёмы кода, именование слотов, массивы `items`, композаблы, горячие клавиши
- [forms](references/guidelines/forms.md) — валидация форм, раскладка полей, обработка ошибок, Standard Schema
- [icons](references/guidelines/icons.md) — как импортировать иконку и использовать её

**Раскладки** — готовые структуры страниц:
- [landing](references/layouts/landing.md) — лендинги
- [dashboard](references/layouts/dashboard.md) — интерфейс администратора с боковым меню и панелями

**Рецепты** — готовые решения типовых задач:
- [data-tables](references/recipes/data-tables.md) — таблицы с фильтрами, пагинацией, сортировкой, выбором строк
- [overlays](references/recipes/overlays.md) — модальные окна, боковые панели, Drawer, командная палитра, информационные поповеры
- [navigation](references/recipes/navigation.md) — шапки, боковые меню, хлебные крошки, вкладки
- [card-pickers](references/recipes/card-pickers.md) — сетки карточек с иконкой и описанием для выбора варианта настройки или включения возможностей (`B24PageCardGroup`)
- [settings](references/recipes/settings.md) — раскладки настроек: когда Switch, Radio, Checkbox или PageCardGroup, а также рецепт расширенного варианта `card` с картинкой предпросмотра, описанием и ссылкой «Подробнее»
- [detail-panel](references/recipes/detail-panel.md) — боковые панели сведений о сущности: метаданные, переключаемые настройки и сгруппированные разделы рядом с основным видом
- [task-form](references/recipes/task-form.md) — одноколоночная форма задачи с `B24Editor`, полями исполнителей, выбором даты и переносимым рядом второстепенных действий

**Краткий справочник:**
- [components](references/components.md) — индекс компонентов по категориям, чтобы найти нужное имя компонента

### Таблица выбора

| Задача | Какие файлы загрузить |
|---|---|
| Приложение для Bitrix24 / дашборд / интерфейс администратора | conventions, component-selection, dashboard |
| Лендинг | design-system, conventions, landing |
| Страница настроек | conventions, forms, settings |
| Выбор одного варианта или включение нескольких, когда каждому нужны картинка предпросмотра, многострочное описание и ссылка «Подробнее» — выбор раскладки, выбор тарифа со скриншотами | conventions, settings |
| Форма входа / регистрации | conventions, forms, component-selection |
| Вывод данных в таблице | conventions, component-selection, data-tables |
| Интерфейс чата | conventions, components (§ Chat) |
| Модальное окно, боковая панель или Drawer | conventions, component-selection, overlays |
| Навигация по сайту | conventions, component-selection, navigation |
| Отображение markdown | component-selection, components (§ Prose and § Content) |
| Выбор одного варианта (или включение нескольких) из небольшого набора, где каждому нужны иконка и одно предложение — варианты настроек, флаги возможностей, шаг мастера «что вы хотите создать?» | conventions, component-selection, card-pickers |
| Редактор форматированного текста | conventions, components (§ Editor) |
| Форма задачи с описанием в форматированном тексте, исполнителями и сроком | conventions, forms, task-form |
| Боковая панель сведений о сущности — информация о канале, карточка записи CRM, «об этом элементе» | conventions, component-selection, detail-panel |
| Подбор иконки для кнопки, элемента или пустого состояния | icons |
| Общая работа с интерфейсом | conventions, component-selection |

## Установка

### Nuxt

```bash
pnpm add @bxshefby/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bxshefby/b24ui-nuxt'],
  css: ['~/assets/css/main.css']
})
```

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@bxshefby/b24ui-nuxt";
```

```vue
<!-- app.vue -->
<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```

### Vue (Vite)

```bash
pnpm add @bxshefby/b24ui-nuxt @bitrix24/b24icons-vue tailwindcss
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bxshefby/b24ui-nuxt/vite'

export default defineConfig({
  plugins: [
    vue(),
    bitrix24UIPluginVite()
  ]
})
```

```ts
// src/main.ts
import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import b24UiPlugin from '@bxshefby/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  routes: [],
  history: createWebHistory()
})

app.use(router)
app.use(b24UiPlugin)
app.mount('#app')
```

```css
/* src/assets/css/main.css */
@import "tailwindcss";
@import "@bxshefby/b24ui-nuxt";
```

```vue
<!-- src/App.vue -->
<template>
  <B24App>
    <RouterView />
  </B24App>
</template>
```

> Добавьте `class="isolate"` корневому `<div id="app">` в `index.html`.
> Для Inertia укажите `b24ui({ router: 'inertia' })` в `vite.config.ts`.
