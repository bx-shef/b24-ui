import { portalTargetInjectionKey } from '#b24ui/composables/usePortal'
import type { InjectionKey, Ref } from 'vue'

/** Контейнер для оверлеев превью: <div id="vsk-preview-portal" class="base-mode"> в app.vue (bx-shef/b24-ui#57). */
export const PREVIEW_PORTAL = '#vsk-preview-portal'

/** Тема страницы примера (класс на <html>), общая со страницей `/examples/<имя>`. */
export const exampleThemeKey: InjectionKey<Ref<string | null>> = Symbol('vsk-example-theme')

/**
 * Компоненты ниже по дереву с `portal: true` рисуют оверлеи в контейнер с классом base-mode, а не в body:
 * там токены «Василька» с <html> действовали бы и на окна из превью.
 */
export function providePreviewPortal() {
  provide(portalTargetInjectionKey, ref(PREVIEW_PORTAL))
}
