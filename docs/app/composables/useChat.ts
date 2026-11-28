import { createSharedComposable, useLocalStorage } from '@vueuse/core'
import type { DocsChatMessage } from '~~/server/api/ai.post'

/**
 * Состояние чата «Спросить AI»: панель, беседа и очередь вопросов из поиска и кнопки «Объяснить с AI».
 * Беседа хранится только в браузере (localStorage). Панель монтируется при первом открытии (см. `app.vue`).
 */
export const useChat = createSharedComposable(() => {
  const config = useRuntimeConfig()

  // Включён ли чат. Сначала берём флаг сборки/сервера, в браузере уточняем у сервера: ключ задаётся при запуске
  // контейнера, а страницы документации предрендерены без него.
  const enabled = useState('ai-chat-enabled', () => Boolean(config.public.aiChat))

  const storageOpen = useLocalStorage('chat-open', false)
  const messages = useLocalStorage<DocsChatMessage[]>('chat-messages', [])

  const open = ref(false)

  // Страница, с которой задан вопрос: сервер превращает её в маркер контекста
  const route = useRoute()
  const currentPage = computed(() => route.path)

  onNuxtReady(async () => {
    try {
      const status = await $fetch<{ enabled: boolean }>(`${config.public.baseUrl}/api/ai/status`)
      enabled.value = Boolean(status?.enabled)
    } catch {
      // Сервера нет (статическая публикация) или он не ответил: чат скрыт
      enabled.value = false
    }

    nextTick(() => {
      open.value = enabled.value && storageOpen.value
    })
  })

  watch(open, (value) => {
    storageOpen.value = value
  })

  // Выставляют сценарии, которые передают панели вопрос до её создания (палитра поиска, «Объяснить с AI»):
  // панель монтируется при первом открытии, и её собственный наблюдатель ещё не может его отправить.
  const pending = ref(false)

  function ask(text: string) {
    if (!enabled.value) {
      return
    }

    messages.value = [...messages.value, {
      id: String(Date.now()),
      role: 'user',
      parts: [{ type: 'text', text }],
      metadata: { currentPage: currentPage.value }
    }]
    pending.value = true
    open.value = true
  }

  return {
    enabled,
    open,
    messages,
    pending,
    currentPage,
    ask
  }
})
