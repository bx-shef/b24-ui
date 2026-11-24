import type { ComputedRef, InjectionKey } from 'vue'

/**
 * Whether a submit from `ChatPrompt` would be queued right now, so `ChatPromptSubmit` sends instead of stopping.
 * `ChatPrompt` provides it, `ChatPromptSubmit` injects it.
 */
export const chatPromptQueueingInjectionKey: InjectionKey<ComputedRef<boolean>> = Symbol('bitrix24-ui.chat-prompt-queueing')
