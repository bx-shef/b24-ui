# Соглашения

Приёмы кода, специфичные для Bitrix24 UI.

## Подключение модуля Content

Если используется `@nuxt/content`, он **должен** стоять после `@bxshefby/b24ui-nuxt` в массиве `modules`, иначе prose-компоненты будут недоступны:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bxshefby/b24ui-nuxt', '@nuxt/content']
})
```

Добавьте `@source` в CSS, чтобы Tailwind генерировал классы, используемые в markdown/MDC:

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@bxshefby/b24ui-nuxt";

@source "../../../content/**/*";
```

## Настройка IDE

Рекомендуемый `.vscode/settings.json` для автодополнения Tailwind IntelliSense с Bitrix24 UI:

```json
{
  "files.associations": { "*.css": "tailwindcss" },
  "editor.quickSuggestions": { "strings": "on" },
  "tailwindCSS.classAttributes": ["class", "b24ui"],
  "tailwindCSS.classFunctions": ["defineAppConfig"]
}
```

## Обёртка B24App

Всегда оборачивайте приложение в `B24App` — он даёт:
- контейнер уведомлений (`useToast`);
- провайдер подсказок;
- контекст программных оверлеев (`useOverlay`);
- поддержку локали.

```vue
<B24App :locale="fr">
  <NuxtPage /> <!-- или <RouterView /> для Vue -->
</B24App>
```

## Иконки

Bitrix24 UI использует [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/). Как найти нужную иконку — в [руководстве по иконкам](icons.md).

```vue
<script setup>
  import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
  <B24Button :icon="RocketIcon">Button</B24Button>
</template>
```

## Шаблоны слотов

Большинство компонентов называют слоты единообразно:

| Слот | Где используется | Назначение |
|---|---|---|
| `#header` | Card, Modal, Slideover, DashboardPanel | Верхняя секция |
| `#body` | Modal, Slideover, Header, DashboardPanel | Прокручиваемая область содержимого; у Header — мобильное меню |
| `#footer` | Card, Modal, Slideover, DashboardPanel | Нижняя секция |
| `#left` | Page, DashboardNavbar, Header, Footer | Левая колонка или содержимое |
| `#right` | Page, DashboardNavbar, Header, Footer | Правая колонка или содержимое |
| `#leading` | Input, Button, Alert | Перед основным содержимым (область иконки) |
| `#trailing` | Input, Button | После основного содержимого (область иконки) |
| `#content` | Modal, Slideover, Popover, Tooltip | Полная замена содержимого |
| `#default` | Большинство компонентов | Основная область содержимого |

## Массивы items

Многие компоненты принимают пропс `items`. Возможны два вида:

**Плоский массив** — простой список:

```ts
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const items = [
  { label: 'Edit', icon: PersonIcon },
  { label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }
]
```

**Вложенный массив** — группы, между которыми автоматически рисуются разделители:

```ts
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const items = [
  [
    { label: 'Edit', icon: PersonIcon },
    { label: 'Duplicate', icon: PersonIcon }
  ],
  [
    { label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }
  ]
]
```

Вложенные массивы поддерживают `B24DropdownMenu`, `B24ContextMenu`, `B24NavigationMenu`. `B24CommandPalette` группирует то же самое иначе: у него вообще нет пропса `items` верхнего уровня, только `groups`, и у каждой группы свой плоский `items`.

Вложенность допустима только в `items` **верхнего уровня**. `children` подменю — всегда плоский массив: `B24NavigationMenu` разворачивает вложенный, разделитель не рисует, а в режиме разработки выводит предупреждение.

## Композаблы

### useToast

```ts
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

const toast = useToast()

toast.add({
  title: 'Success',
  description: 'Item saved',
  color: 'air-primary-success',
  icon: CircleCheckIcon,
  duration: 5000,
  actions: [{ label: 'Undo', onClick: () => {} }]
})

toast.remove('toast-id')
toast.clear()
```

### useDevice
Определяет платформу (мобильное или десктопное приложение Bitrix24, веб) и размер экрана

```vue
<script setup lang="ts">
const { isBitrixMobile, screen } = useDevice()
</script>

<template>
  <div>
    <p v-if="isBitrixMobile">Вы в мобильном приложении Bitrix24 на маленьком экране.</p>
    <p v-else-if="screen.isMobile">Обычный браузер на маленьком экране.</p>
    <p v-else-if="!isBitrixMobile && (!screen.isMobile)">Обычный браузер на десктопе.</p>
    <p v-else>Другое сочетание.</p>
  </div>
</template>
```

### useConfetti

```ts
const confetti = useConfetti()
confetti.fire()
```

### useOverlay

Программные модальные окна, боковые панели, drawer — `v-model` в шаблоне не нужен. Подробные приёмы — в [рецепте про оверлеи](../recipes/overlays.md).

```ts
const overlay = useOverlay()
const modal = overlay.create(MyComponent)
const instance = modal.open({ title: 'Confirm?' })
if (await instance.result) { /* подтверждено */ }
```

### defineShortcuts

```ts
defineShortcuts({
  meta_k: () => openSearch(),
  escape: () => close(),
  meta_enter: {
    handler: () => submit(),
    // `usingInput` — единственная настройка сочетания: `true` разрешает его,
    // пока в фокусе любое поле ввода, строка ограничивает полем с таким
    // `name`.
    usingInput: true
  }
})
```

Клавиши: `meta` (Cmd/Ctrl), `ctrl`, `alt`, `shift`. Разделитель: `_`.

Чтобы включать сочетание по условию, передайте реактивную конфигурацию и поставьте ключу `false`: `ShortcutsConfig` принимает для каждого ключа `false | null | undefined`, пересобирать объект не нужно:

```ts
defineShortcuts(computed(() => ({
  meta_enter: isFormValid.value ? { handler: () => submit() } : false
})))
```

### extractShortcuts

Подключает горячие клавиши из элементов меню:

```ts
const items = [
  { label: 'New file', kbds: ['meta', 'n'], onSelect: () => newFile() },
  { label: 'Save', kbds: ['meta', 's'], onSelect: () => save() }
]

defineShortcuts(extractShortcuts(items))
```

### Интернационализация (i18n)

Bitrix24 UI поставляется с 20 локалями. Локаль задаётся на `B24App` — все компоненты её наследуют.

#### Статическая локаль

```vue
<script setup lang="ts">
import { fr } from '@bxshefby/b24ui-nuxt/locale'
</script>

<template>
  <B24App :locale="fr">
    <NuxtPage />
  </B24App>
</template>
```

#### Расширение встроенной локали

`extendLocale` импортируется автоматически. Можно переопределить отдельные сообщения или `code` (влияет на формат даты и времени в Calendar, InputDate, InputTime):

```ts
import { en } from '@bxshefby/b24ui-nuxt/locale'

const locale = extendLocale(en, {
  code: 'en-AU',
  messages: {
    commandPalette: { placeholder: 'Search a component...' }
  }
})
```

#### Собственная локаль с нуля

```ts
import type { Messages } from '@bxshefby/b24ui-nuxt'

const locale = defineLocale<Messages>({
  name: 'My locale',
  code: 'en',
  dir: 'ltr',
  messages: {
    // все ключи сообщений компонентов
  }
})
```

#### Динамическая локаль с @nuxtjs/i18n

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bxshefby/b24ui-nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', language: 'en', name: 'English' },
      { code: 'fr', language: 'fr', name: 'Français' },
      { code: 'ar', language: 'ar', dir: 'rtl', name: 'العربية' }
    ]
  }
})
```

```vue
<script setup lang="ts">
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs
}))
</script>

<template>
  <B24App>
    <NuxtPage />
  </B24App>
</template>
```

Если установлен `@nuxtjs/i18n`, `B24App` следует текущей локали i18n и включает в сборку только локали Bitrix24 UI, совпадающие с `i18n.locales`: сопоставляются `language` (или `code`) каждой записи и языковой тег локали, поэтому задавайте `language`, если `code` не является тегом. Не используйте `import * as locales from '@bxshefby/b24ui-nuxt/locale'`: он добавит в сборку все локали. `dir` каждой локали (`'ltr'` или `'rtl'`) задаёт направление текста во всех компонентах; чтобы передать `lang` и `dir` в элемент `<html>`, используйте `useLocaleHead`.

## Цветовая схема

Bitrix24 UI автоматически подключает `useColorMode` из `@vueuse/core`. Для переключения есть готовые компоненты:
- `B24ColorModeButton` — кнопка-переключатель (светлая/тёмная)
- `B24ColorModeSwitch` — переключатель-свитч
- `B24ColorModeSelect` — выпадающий список: системная, светлая, тёмная
- `B24ColorModeAvatar` — показывает свой аватар для каждой схемы
- `B24ColorModeImage` — показывает своё изображение для каждой схемы

Для собственного переключателя схемы используйте `useColorMode` вместе с `ClientOnly`, чтобы избежать расхождения при гидратации:

```vue
<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v) => { colorMode.preference = v ? 'dark' : 'light' }
})
</script>

<template>
  <ClientOnly>
    <B24Switch v-model="isDark" />
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
```

## Официальные шаблоны

Начните проект с шаблона, а не с нуля:

**Дашборд**
```bash
git clone https://github.com/bitrix24/templates-dashboard.git <project-name>
cd <project-name>
pnpm install
pnpm run dev
```

**Стартер**
```bash
git clone https://github.com/bitrix24/starter-b24ui.git <project-name>
cd <project-name>
pnpm install
pnpm run dev
```

## Адаптивность

- Боковое меню дашборда на мобильных скрывается и показывается как slideover или drawer — за это отвечает пропс `mode` у `B24DashboardSidebar`.
- Слот `body` у `B24Header` — содержимое мобильного меню (открывается по нажатию на «гамбургер»).
- Большинство компонентов адаптируются сами — без нужды не добавляйте классы контрольных точек вручную.
- `B24PageAside` — для боковых колонок, которые должны скрываться ниже контрольной точки `lg`.
