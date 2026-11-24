# port — nuxt/ui@be37b7f17c4a6cc2a39106b0afcc4fa90feaf91f

**Upstream:** fix(module): import `useImage` instead of re-exporting it from `#imports` (#7319)

**Решение:** port.

## Что изменено
`src/templates.ts`, шаблон `b24ui-image-component`: при подключённом `@nuxt/image` вместо `export { useImage } from '#imports'` генерируется `import { useImage } from '#imports'` и `export { useImage }`. Плагин imports Nuxt переписывает только `import … from '#imports'`; реэкспорт тянул в сборку все модули с побочными эффектами за `#imports`. Хунк лёг как есть, имя шаблона у нас своё, на правку это не влияет. Тест не добавлялся: в апстриме его тоже нет.
