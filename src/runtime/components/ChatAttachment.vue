<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chat-attachment'
import type { IconComponent } from '../types/icons'
import type { ComponentConfig } from '../types/tv'

type ChatAttachment = ComponentConfig<typeof theme, AppConfig, 'chatAttachment'>

export interface ChatAttachmentProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The file to display, its `name`, `type` and size are read from it and images are previewed.
   */
  file?: File
  /**
   * The name of the file.
   */
  name?: string
  /**
   * The media type of the file, images are previewed.
   */
  type?: string
  /**
   * The URL of the file, used to preview images.
   */
  url?: string
  /**
   * The text displayed under the name. Defaults to the file extension and size.
   */
  description?: string
  /**
   * The upload status of the file.
   * @defaultValue 'idle'
   */
  status?: 'idle' | 'uploading' | 'error'
  /**
   * @defaultValue 'md'
   */
  size?: ChatAttachment['variants']['size']
  /**
   * The orientation of the attachment, `vertical` gives an image a large preview.
   * @defaultValue 'horizontal'
   */
  orientation?: ChatAttachment['variants']['orientation']
  /**
   * The style of the attachment, `thumbnail` only shows the preview with the remove button on its corner.
   * @defaultValue 'card'
   */
  variant?: ChatAttachment['variants']['variant']
  /**
   * Display a button to remove the file.
   * @defaultValue false
   */
  removable?: boolean
  /**
   * The icon displayed for files that are not images.
   * @defaultValue icons.file
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * The icon displayed while the file uploads, over the image if any.
   * @defaultValue icons.loading
   * @IconComponent
   */
  loadingIcon?: IconComponent
  /**
   * The icon displayed when the upload fails, over the image if any.
   * @defaultValue icons.caution
   * @IconComponent
   */
  errorIcon?: IconComponent
  /**
   * The icon of the remove button.
   * @defaultValue icons.close
   * @IconComponent
   */
  removeIcon?: IconComponent
  class?: any
  b24ui?: ChatAttachment['slots']
}

export interface ChatAttachmentEmits {
  remove: [event: MouseEvent]
}
</script>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { Primitive, VisuallyHidden } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useLocale } from '../composables/useLocale'
import { formatFileSize } from '../utils/file'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'
import B24ChatShimmer from './ChatShimmer.vue'

const _props = withDefaults(defineProps<ChatAttachmentProps>(), {
  as: 'div',
  status: 'idle',
  orientation: 'horizontal',
  variant: 'card'
})
const emits = defineEmits<ChatAttachmentEmits>()

const props = useComponentProps('chatAttachment', _props)

const { t } = useLocale()
const appConfig = useAppConfig() as ChatAttachment['AppConfig']

const fileName = computed(() => props.name ?? props.file?.name)
const fileType = computed(() => props.type || props.file?.type)

// A `File` has no URL, preview it through an object URL released when the file changes
const fileUrl = ref<string>()
watchEffect((onCleanup) => {
  if (props.url || !props.file || !fileType.value?.startsWith('image/')) {
    fileUrl.value = undefined
    return
  }

  const url = URL.createObjectURL(props.file)
  fileUrl.value = url
  onCleanup(() => URL.revokeObjectURL(url))
})

const previewUrl = computed(() => props.url ?? fileUrl.value)
const isImage = computed(() => !!previewUrl.value && !!fileType.value?.startsWith('image/'))

const fileDescription = computed(() => {
  if (props.description !== undefined) return props.description

  const extension = fileName.value?.includes('.') ? fileName.value.split('.').pop()?.toUpperCase() : undefined

  return [extension, formatFileSize(props.file?.size)].filter(Boolean).join(' · ')
})

const leadingIcon = computed(() => {
  if (props.status === 'uploading') return props.loadingIcon || icons.loading
  if (props.status === 'error') return props.errorIcon || icons.caution

  return isImage.value ? undefined : (props.icon || icons.file)
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.chatAttachment || {}) })({
  size: props.size,
  orientation: props.orientation,
  status: props.status,
  variant: props.variant
}))
</script>

<template>
  <Primitive
    :as="props.as"
    :data-status="props.status"
    :data-orientation="props.orientation"
    :data-variant="props.variant"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <div data-slot="leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
      <img v-if="isImage" :src="previewUrl" :alt="fileName ?? ''" data-slot="image" :class="b24ui.image({ class: props.b24ui?.image })">
      <Component
        :is="leadingIcon"
        v-if="leadingIcon"
        data-slot="leadingIcon"
        :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
      />
    </div>

    <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <B24ChatShimmer v-if="props.status === 'uploading' && fileName" :text="fileName" data-slot="name" :class="b24ui.name({ class: props.b24ui?.name })" />
      <span v-else data-slot="name" :class="b24ui.name({ class: props.b24ui?.name })">{{ fileName }}</span>

      <span v-if="fileDescription" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">{{ fileDescription }}</span>

      <B24Button
        v-if="props.removable"
        :icon="props.removeIcon || icons.close"
        :color="props.variant === 'thumbnail' ? 'air-secondary-no-accent' : 'air-tertiary-no-accent'"
        size="xs"
        :aria-label="t('fileUpload.removeFile', { filename: fileName ?? '' })"
        data-slot="remove"
        :class="b24ui.remove({ class: props.b24ui?.remove })"
        @click="emits('remove', $event)"
      />
    </div>

    <VisuallyHidden aria-live="polite">
      {{ props.status === 'idle' ? '' : t(`chatAttachment.${props.status}`) }}
    </VisuallyHidden>
  </Primitive>
</template>
