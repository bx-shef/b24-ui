# Импорт и использование иконки

Метаданные иконок `@bitrix24/b24icons-vue` лежат в `node_modules/@bitrix24/b24icons-vue/dist/info-metadata.json` (все данные на английском).

**Когда пользователь просит иконку:**

1. **Найдите** в файле метаданных иконку по части имени, **без учёта регистра**. Если совпадений несколько, покажите самые подходящие.
2. **Возьмите** из найденной записи:
   - `code` (например, `"outline::AchievementIcon"`);
   - `type` (например, `"outline"` или `"solid"`);
   - `icon` — имя компонента (например, `"AchievementIcon"`).
3. **Сформируйте** импорт, подставив поля `icon` и `type` из шага 2 в
   `import <icon> from '@bitrix24/b24icons-vue/<type>/<icon>'`. Каждая иконка — экспорт **по умолчанию**: имя без фигурных скобок, поэтому `import { AchievementIcon } from …` не работает.
4. **Приведите примеры использования** (Vue 3, стиль `<script setup>`) строго по образцу ниже: отрисуйте иконку как компонент и передайте в `:icon` сам импортированный компонент — не строку и не объектный литерал вроде `:icon="{AchievementIcon}"`.

**Формат ответа** (чтобы можно было скопировать):
- строка импорта;
- минимальный пример Vue-компонента с иконкой и, при необходимости, `B24Button`.

**Пример ответа на запрос «achievement»:**
```ts
import AchievementIcon from '@bitrix24/b24icons-vue/outline/AchievementIcon'
```
```vue
<script setup>
import AchievementIcon from '@bitrix24/b24icons-vue/outline/AchievementIcon'
</script>

<template>
  <AchievementIcon class="size-5" />
  <B24Button :icon="AchievementIcon" />
</template>
```
