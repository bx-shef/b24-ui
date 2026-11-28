import { nextTick } from 'vue'
import { CONSENT_POLICY_URL, CONSENT_SERVICES, METRIKA_INIT_OPTIONS, METRIKA_TAG_URL, parseMetrikaId, shouldLoadMetrika } from '../utils/yandex-metrika'

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[][], l?: number }

declare global {
  interface Window {
    ym?: YmFn
    /** Баннер согласия линейки bx-shef (`public/cookie-consent.js`). */
    BxConsent?: {
      onAnalytics: (fn: () => void) => void
      granted: () => boolean
      open: () => void
    }
  }
}

/**
 * Яндекс Метрика. Номер — runtimeConfig.public.yandexMetrikaId (NUXT_PUBLIC_YANDEX_METRIKA_ID);
 * пусто или не только цифры — ни баннера, ни скрипта, ни запросов.
 * С номером грузится баннер согласия; `tag.js`, init и хиты — только после согласия на аналитику
 * (сразу, если оно уже дано раньше). Отказ — ничего.
 */
export default defineNuxtPlugin({
  name: 'yandex-metrika',
  setup() {
    const config = useRuntimeConfig()
    const id = parseMetrikaId(config.public.yandexMetrikaId)
    if (id === null) {
      return
    }
    const router = useRouter()
    const baseUrl = config.app.baseURL.replace(/\/$/, '')
    const ym = (...args: unknown[]) => window.ym?.(...args)
    // Якорь (#раздел) — та же страница: клики по оглавлению не считаем просмотрами.
    // Адрес страницы без query и #якоря: в Метрику не уходят параметры адреса, якорь — та же страница.
    const page = (href: string) => {
      const u = new URL(href, location.origin)
      return u.origin + u.pathname
    }

    let started = false
    function start() {
      if (started || !shouldLoadMetrika(id, window.BxConsent?.granted() === true)) {
        return
      }
      started = true

      // Стандартный код инициализации Метрики: очередь вызовов до загрузки tag.js.
      if (!window.ym) {
        const stub: YmFn = function (...args: unknown[]) {
          (stub.a = stub.a || []).push(args)
        }
        stub.l = Date.now()
        window.ym = stub
      }
      if (!document.querySelector(`script[src="${METRIKA_TAG_URL}"]`)) {
        const script = document.createElement('script')
        script.async = true
        script.src = METRIKA_TAG_URL
        document.head.appendChild(script)
      }
      ym(id, 'init', { ...METRIKA_INIT_OPTIONS })

      // defer: true — автоматического первого хита нет: отправляем его сами, дальше — по переходам SPA.
      router.isReady().then(() => {
        let last = page(location.href)
        let referer = last
        ym(id, 'hit', last, { referer: document.referrer, title: document.title })

        router.afterEach(() => {
          const url = page(router.resolve(router.currentRoute.value.fullPath).href)
          if (url === last) {
            return
          }
          // Заголовок новой страницы появляется после рендера; согласие могли отозвать в другой вкладке.
          nextTick(() => {
            if (window.BxConsent?.granted() !== true) {
              return
            }
            ym(id, 'hit', url, { referer, title: document.title })
            referer = url
          })
          last = url
        })
      })
    }

    const banner = document.createElement('script')
    banner.src = `${baseUrl}/cookie-consent.js`
    banner.setAttribute('data-policy', CONSENT_POLICY_URL)
    banner.setAttribute('data-services', CONSENT_SERVICES)
    banner.onload = () => window.BxConsent?.onAnalytics(start)
    document.head.appendChild(banner)
  }
})
