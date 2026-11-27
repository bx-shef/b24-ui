<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'

const route = useRoute()
const appConfig = useAppConfig()

const name = route.params.slug?.[0]

const exampleModules = import.meta.glob('~/components/content/examples/**/*.vue')
const exampleMatch = Object.entries(exampleModules).find(([path]) => path.endsWith(`/${upperFirst(camelCase(name || ''))}.vue`))
const resolvedComponent = exampleMatch ? defineAsyncComponent(exampleMatch[1] as any) : undefined

/**
 * Тема примера (?theme=light|dark) — только класс на <html> этой страницы. Выбор посетителя
 * (colorMode.preference, общий ключ localStorage с сайтом) не трогаем: пример в iframe не должен
 * менять тему сайта (bx-shef/b24-ui#57). useColorMode сайта переписывает класс по своему
 * выбору, поэтому наблюдатель возвращает тему примера, пока страница открыта.
 */
const THEME_CLASSES = ['light', 'edge-light', 'dark', 'edge-dark']
const exampleTheme = route.query.theme
  ? (route.query.theme === 'light' ? (appConfig.colorModeTypeLight as string) : 'dark')
  : null

onMounted(() => {
  if (!exampleTheme) {
    return
  }
  const root = document.documentElement
  const apply = () => {
    if (THEME_CLASSES.every(c => root.classList.contains(c) === (c === exampleTheme))) {
      return
    }
    root.classList.remove(...THEME_CLASSES)
    root.classList.add(exampleTheme)
  }
  apply()
  const observer = new MutationObserver(apply)
  observer.observe(root, { attributes: true, attributeFilter: ['class'] })
  onBeforeUnmount(() => observer.disconnect())
})

const width = computed(() => route.query.width && Number.parseInt(route.query.width as string) > 0 ? `${Number.parseInt(route.query.width as string) - 2}px` : '864px')
</script>

<template>
  <div class="example vsk-preview base-mode flex flex-col items-center h-screen">
    <component :is="resolvedComponent" v-if="resolvedComponent" v-bind="route.query" />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .example {
    --b24ui-container-width: v-bind(width);
  }
}
</style>
