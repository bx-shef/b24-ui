import { METRIKA_INIT_OPTIONS, METRIKA_TAG_URL, parseMetrikaId } from '../utils/yandex-metrika'

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[][], l?: number }

declare global {
  interface Window {
    ym?: YmFn
  }
}

/**
 * Яндекс Метрика. Номер — runtimeConfig.public.yandexMetrikaId (NUXT_PUBLIC_YANDEX_METRIKA_ID);
 * пусто или не только цифры — ни скрипта, ни запросов.
 */
export default defineNuxtPlugin({
  name: 'yandex-metrika',
  setup(nuxtApp) {
    const id = parseMetrikaId(useRuntimeConfig().public.yandexMetrikaId)
    if (id === null) {
      return
    }

    // Стандартный код инициализации Метрики: очередь вызовов до загрузки tag.js.
    if (!window.ym) {
      const ym: YmFn = function (...args: unknown[]) {
        (ym.a = ym.a || []).push(args)
      }
      ym.l = Date.now()
      window.ym = ym
    }
    if (!document.querySelector(`script[src="${METRIKA_TAG_URL}"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = METRIKA_TAG_URL
      document.head.appendChild(script)
    }

    const ym = (...args: unknown[]) => window.ym?.(...args)
    ym(id, 'init', { ...METRIKA_INIT_OPTIONS })

    // defer: true — автоматического первого хита нет: отправляем его сами при монтировании,
    // дальше — по переходам SPA, повтор того же адреса пропускаем.
    const router = useRouter()
    // Якорь (#раздел) — та же страница: клики по оглавлению не считаем просмотрами.
    const page = (href: string) => href.split('#')[0]

    nuxtApp.hook('app:mounted', () => {
      ym(id, 'hit', location.href, { referer: document.referrer })
      let last = location.href
      let referer = location.href

      router.afterEach(() => {
        const url = new URL(router.resolve(router.currentRoute.value.fullPath).href, location.origin).href
        if (page(url) === page(last)) {
          return
        }
        ym(id, 'hit', url, { referer })
        referer = url
        last = url
      })
    })
  }
})
