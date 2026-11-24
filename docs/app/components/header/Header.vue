<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

const route = useRoute()
const { desktopLinks } = useHeader()
const config = useRuntimeConfig()

// Кнопка есть, только если на сервере включён чат (задан ключ DeepSeek)
const { enabled: chatEnabled, open: chatOpen } = useChat()
const { track } = useAnalytics()

function toggleChat() {
  if (!chatOpen.value) {
    track('AI Chat Opened', { source: 'header' })
  }
  chatOpen.value = !chatOpen.value
}

// region ColorMode ////
const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = !(colorMode.value === 'dark') ? 'dark' : 'light'
}
// endregion ////

// region Shortcuts ////
defineShortcuts({
  shift_D: () => {
    toggleMode()
  }
})
// endregion ////
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <B24Header
    mode="modal"
    class="bg-(--ui-color-accent-soft-element-violet)/40 dark:bg-(--ui-color-copilot-bg-content-3)/40 backdrop-blur-md"
    :b24ui="{ container: 'lg:ps-10.5 h-auto', right: 'gap-1 sm:gap-3' }"
  >
    <template #left>
      <LogoWithVersion no-padding />
    </template>

    <B24NavigationMenu
      :items="desktopLinks"
      orientation="horizontal"
    />

    <template #right>
      <B24Tooltip text="Поиск" :kbds="['meta', 'K']" ignore-non-keyboard-focus>
        <B24ContentSearchButton />
      </B24Tooltip>

      <B24Tooltip v-if="chatEnabled" text="Спросить AI" :kbds="['meta', 'I']" ignore-non-keyboard-focus>
        <B24Button
          color="air-selection"
          :icon="AiStarsIcon"
          aria-label="Спросить AI"
          @click="toggleChat"
        />
      </B24Tooltip>

      <B24ColorModeButton />

      <div class="hidden sm:flex flex-nowrap flex-row items-center justify-end gap-3">
        <B24Button
          aria-label="Bitrix24 UI на GitHub"
          :icon="GitHubIcon"
          :to="config.public.gitUrl"
          target="_blank"
          size="sm"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:16px]' }"
        />
      </div>
    </template>
    <template #body>
      <HeaderBody />
    </template>

    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <HeaderBottom />
    </template>
  </B24Header>
</template>
