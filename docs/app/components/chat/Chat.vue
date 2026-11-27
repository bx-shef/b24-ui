<script setup lang="ts">
import type { ToolUIPart, DynamicToolUIPart } from 'ai'
import { DefaultChatTransport, isToolUIPart, isReasoningUIPart, isTextUIPart, getToolName } from 'ai'
import { useChat as useAIChat } from '@ai-sdk/vue'
import { useMemoize } from '@vueuse/core'
import type { ChatPromptQueueItem, IconComponent } from '@bxshefby/b24ui-nuxt'
import { getTextFromMessage, isPartStreaming, isToolStreaming } from '@bxshefby/b24ui-nuxt/utils/ai'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import CloseChatIcon from '@bitrix24/b24icons-vue/outline/CloseChatIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import type { DocsChatMessage } from '~~/server/api/ai.post'
import { devRequestFromPart } from '~~/shared/devRequest'

const input = ref('')

const config = useRuntimeConfig()
const toast = useToast()
const { track } = useAnalytics()
const { open, messages, pending, currentPage } = useChat()
const { framework } = useFrameworks()

// app.vue монтирует панель при первом открытии, поэтому `open` уже true и боковая панель рисуется раскрытой,
// без изменения ширины, на которое мог бы опереться переход. Держим её закрытой на один кадр отрисовки
// (два requestAnimationFrame, как делает Transition во Vue), и первое открытие выезжает так же, как все следующие.
const painted = ref(false)
onMounted(() => requestAnimationFrame(() => requestAnimationFrame(() => (painted.value = true))))

const panelOpen = computed({
  get: () => painted.value && open.value,
  set: (value: boolean) => (open.value = value)
})

let _skipSync = false

const { messages: chatMessages, status, error, sendMessage, regenerate, stop, clearError } = useAIChat<DocsChatMessage>({
  messages: messages.value,
  transport: new DefaultChatTransport<DocsChatMessage>({
    api: `${config.public.baseUrl}/api/ai`,
    body: () => ({ framework: framework.value })
  }),
  onError: (error) => {
    let message = error.message
    if (typeof message === 'string' && message[0] === '{') {
      try {
        message = JSON.parse(message).message || message
      } catch {
        // оставляем исходный текст
      }
    }

    toast.add({
      description: message,
      icon: AlertIcon,
      color: 'air-primary-alert',
      duration: 0
    })
  },
  onFinish: () => {
    _skipSync = true
    messages.value = chatMessages.value
    nextTick(() => {
      _skipSync = false
    })
  }
})

const canClear = computed(() => messages.value.length > 0)

// Сообщения, отправленные во время ответа, ждут здесь: `B24ChatPrompt` ставит отправку в очередь, пока чат занят,
// а AI SDK иначе начал бы второй запрос рядом с текущим. Вопрос в очереди помнит страницу, с которой его задали.
const queue = ref<ChatPromptQueueItem[]>([])

watch(() => queue.value.length, () => {
  for (const item of queue.value) {
    item.currentPage ??= currentPage.value
  }
})

function send(text: string, page: string) {
  track('AI Chat Message Sent')

  sendMessage({ text, metadata: { currentPage: page } })
}

function sendNext() {
  const next = queue.value.shift()
  if (next) {
    send(next.text.trim(), next.currentPage)
  }
}

function onSubmit() {
  const text = input.value.trim()
  if (!text) {
    return
  }

  input.value = ''
  send(text, currentPage.value)
}

watch(status, (value) => {
  if (value === 'ready') {
    sendNext()
  }
})

// Сообщение из очереди, выбранное «отправить сейчас», стоит первым и уходит, когда текущий ответ остановлен
function onSend() {
  if (status.value === 'submitted' || status.value === 'streaming') {
    stop()
  } else {
    sendNext()
  }
}

// Синхронизация внешних сообщений (поиск → чат, «Объяснить с AI») с экземпляром чата.
// Если последнее — от пользователя, ответ запрашивается автоматически.
// _skipSync не даёт циклу замкнуться, когда onFinish пишет обратно в общий ref.
watch(messages, (newMessages) => {
  if (_skipSync) return

  // Вопрос из палитры поиска во время ответа ждёт в очереди: синхронизация перезапустила бы ответ на полуслове
  const last = newMessages.at(-1)
  if (last?.role === 'user' && (status.value === 'submitted' || status.value === 'streaming')) {
    pending.value = false
    queue.value.push({ text: getTextFromMessage(last), currentPage: last.metadata?.currentPage ?? currentPage.value })
    return
  }

  chatMessages.value = newMessages
  if (chatMessages.value.at(-1)?.role === 'user') {
    pending.value = false
    regenerate()
  }
})

// Вопрос, заданный до создания панели (первое открытие из поиска или «Объяснить с AI»), уже лежит в
// начальных сообщениях, и наблюдатель выше его прихода не видел. Только он: висящий вопрос пользователя
// из прошлой сессии не должен уходить сам при каждой загрузке.
onMounted(() => {
  if (pending.value) {
    pending.value = false
    regenerate()
  }
})

type ToolPart = ToolUIPart | DynamicToolUIPart
type ToolState = ToolPart['state']

function getToolMessage(state: ToolState, toolName: string, input: Record<string, string | undefined>) {
  const done = state === 'output-available'
  const search = done ? 'Поиск выполнен' : 'Ищу'
  const read = done ? 'Прочитано' : 'Читаю'

  return {
    'b24-ui-search-components': `${search}: компоненты${input.category ? ` (${input.category})` : ''}${input.search ? ` по запросу «${input.search}»` : ''}`,
    'b24-ui-search-composables': `${search}: composables${input.search ? ` по запросу «${input.search}»` : ''}`,
    'b24-ui-search-documentation': `${search}: документация${input.section ? ` (${input.section})` : ''}${input.search ? ` по запросу «${input.search}»` : ''}`,
    'b24-ui-search-icons': `${search}: иконки${input.query ? ` по запросу «${input.query}»` : ''}`,
    'b24-ui-get-component': `${read}: компонент ${upperName(input.componentName || '')}`,
    'b24-ui-get-component-metadata': `${read}: метаданные компонента ${upperName(input.componentName || '')}`,
    'b24-ui-list-templates': `${search}: шаблоны${input.category ? ` (${input.category})` : ''}`,
    'b24-ui-get-template': `${read}: шаблон ${upperName(input.templateName || '')}`,
    'b24-ui-get-documentation-page': `${read}: страница ${input.path || ''}`,
    'b24-ui-get-migration-guide': `${read}: руководство по миграции`,
    'b24-ui-list-examples': `${search}: примеры`,
    'b24-ui-get-example': `${read}: пример ${upperName(input.exampleName || '')}`,
    'request_development': done ? 'Запрос на разработку подготовлен' : state === 'output-error' ? 'Не удалось подготовить запрос на разработку' : 'Готовлю запрос на разработку…'
  }[toolName] || `${search}: ${toolName}`
}

const getCachedToolMessage = useMemoize((state: ToolState, toolName: string, input: string) =>
  getToolMessage(state, toolName, JSON.parse(input))
)

function getToolText(part: ToolPart) {
  return getCachedToolMessage(part.state, getToolName(part), JSON.stringify(part.input || {}))
}

function getToolIcon(part: ToolPart): IconComponent {
  const toolName = getToolName(part)

  const iconMap: Record<string, IconComponent> = {
    'b24-ui-get-component': FileIcon,
    'b24-ui-get-component-metadata': FileIcon,
    'b24-ui-get-template': FileIcon,
    'b24-ui-get-documentation-page': FileIcon,
    'b24-ui-get-migration-guide': FileIcon,
    'b24-ui-get-example': FileIcon
  }

  return iconMap[toolName] || SearchIcon
}

// Результат `request_development` рисуется карточкой. Адрес формы в неё не передаётся: он константа окна.
function devRequestOf(part: ToolPart) {
  return devRequestFromPart(getToolName(part), part)
}

const busy = computed(() => status.value === 'submitted' || status.value === 'streaming')

function askQuestion(question: string) {
  input.value = question
  onSubmit()
}

// Боковая панель держит содержимое смонтированным при закрытии, поэтому `autofocus` сработал бы один раз:
// возвращаем фокус в поле при каждом открытии.
const promptRef = useTemplateRef('promptRef')

watch(open, (value) => {
  if (value) {
    nextTick(() => {
      promptRef.value?.textareaRef?.focus()
    })
  }
})

const suggestions = [
  {
    category: 'Компоненты',
    items: [
      'Как собрать макет дашборда?',
      'Как сделать таблицу с постраничной навигацией?',
      'Как создать форму с валидацией?'
    ]
  },
  {
    category: 'Composables',
    items: [
      'Как показать уведомление (toast)?',
      'Как задать горячие клавиши?',
      'Как открыть модальное окно из кода?'
    ]
  }
]

function clearMessages() {
  if (status.value === 'streaming' || status.value === 'submitted') {
    stop()
  }
  messages.value = []
  chatMessages.value = []
  queue.value = []
  // Неудачный ответ иначе оставил бы пустое поле ввода заблокированным
  clearError()
}
</script>

<template>
  <B24Sidebar
    v-model:open="panelOpen"
    side="right"
    title="Спросить AI"
    rail
    breakpoint="xl"
    :style="{ '--sidebar-width': '26rem' }"
    :b24ui="{ root: 'vsk-chat base-mode bg-(--ui-color-gray-02) dark:bg-(--ui-color-base-black-fixed)', header: '', body: 'scrollbar-thin scrollbar-transparent custom-scrollbar-transparent', actions: 'gap-0.5' }"
  >
    <template #actions>
      <B24Tooltip v-if="canClear" text="Очистить беседу">
        <B24Button
          :icon="TrashcanIcon"
          size="sm"
          color="air-tertiary"
          aria-label="Очистить беседу"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:19px]' }"
          @click="clearMessages"
        />
      </B24Tooltip>
    </template>

    <template #close>
      <B24Tooltip text="Закрыть" :kbds="['meta', 'i']">
        <B24Button
          :icon="CloseChatIcon"
          aria-label="Закрыть"
          size="sm"
          color="air-tertiary"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:26px]' }"
          @click="open = false"
        />
      </B24Tooltip>
    </template>

    <B24Theme
      :b24ui="{
        prose: {
          p: { base: 'my-2 text-sm/6' },
          li: { base: 'my-0.5 text-sm/6' },
          ul: { base: 'my-2' },
          ol: { base: 'my-2' },
          h1: { base: 'text-xl mb-4' },
          h2: { base: 'text-lg mt-6 mb-3' },
          h3: { base: 'text-base mt-4 mb-2' },
          h4: { base: 'text-sm mt-3 mb-1.5' },
          code: { base: 'text-xs' },
          pre: { root: 'my-2', base: 'text-xs/5' },
          table: { root: 'my-2' },
          hr: { base: 'my-4' }
        }
      }"
    >
      <B24ChatMessages
        should-auto-scroll
        :messages="chatMessages"
        :status="status"
        compact
        class="px-0 gap-2"
        :user="{ variant: 'message', b24ui: { container: 'max-w-full' } }"
        :assistant="{ variant: 'system', b24ui: { container: 'max-w-full' } }"
        :b24ui="{ footer: 'py-4 before:absolute before:inset-x-0 before:bottom-0 before:h-4 before:bg-(--ui-color-gray-02) dark:before:bg-(--ui-color-base-black-fixed)' }"
      >
        <template v-if="!chatMessages.length" #default>
          <div class="flex flex-col gap-6">
            <B24PageLinks
              v-for="category in suggestions"
              :key="category.category"
              :title="category.category"
              :links="category.items.map(item => ({ label: item, onClick: () => askQuestion(item) }))"
            />
          </div>
        </template>

        <template #indicator>
          <div class="vsk-chat-wait flex items-center gap-1.5">
            <ChatIndicator />

            <B24ChatShimmer text="Думаю…" class="text-sm" />
          </div>
        </template>

        <template #part="{ part, message, streaming }">
          <B24ChatReasoning
            v-if="isReasoningUIPart(part)"
            :text="part.text"
            :streaming="isPartStreaming(part, streaming)"
            :icon="AiStarsIcon"
            chevron="leading"
          >
            <ChatMarkdown
              :value="part.text"
              :streaming="isPartStreaming(part, streaming)"
            />
          </B24ChatReasoning>

          <ChatMarkdown
            v-else-if="isTextUIPart(part) && part.text.length > 0 && message.role === 'assistant'"
            :value="part.text"
            :streaming="isPartStreaming(part, streaming)"
          />

          <ChatDevRequest
            v-else-if="isToolUIPart(part) && devRequestOf(part)"
            :summary="devRequestOf(part)!.summary"
            :kind="devRequestOf(part)!.kind"
            :announce="busy"
          />

          <B24ChatTool
            v-else-if="isToolUIPart(part)"
            :text="getToolText(part)"
            :icon="getToolIcon(part)"
            :streaming="isToolStreaming(part, streaming)"
            :error="part.state === 'output-error'"
          />
        </template>

        <template #footer>
          <B24ChatPrompt
            ref="promptRef"
            v-model="input"
            v-model:queue="queue"
            :status="status"
            :error="error"
            :placeholder="status === 'submitted' || status === 'streaming' ? 'Добавьте вопрос в очередь…' : 'Спросите о Bitrix24 UI…'"
            variant="outline"
            size="sm"
            autofocus
            :rows="2"
            maxlength="2000"
            :b24ui="{
              root: '',
              body: '*:p-0! *:rounded-none! *:text-base!'
            }"
            @submit="onSubmit"
            @send="onSend"
          >
            <template #footer>
              <p class="flex-1 text-xs text-dimmed">
                Ответы формирует AI по документации и могут содержать ошибки.
              </p>

              <B24ChatPromptSubmit
                size="sm"
                :status="status"
                :disabled="!input.trim()"
                @stop="stop()"
                @reload="regenerate()"
              />
            </template>
          </B24ChatPrompt>
        </template>
      </B24ChatMessages>
    </B24Theme>
  </B24Sidebar>
</template>
