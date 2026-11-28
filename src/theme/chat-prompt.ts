/**
 * ChatPrompt
 * An enhanced Textarea component optimized for prompt submission in AI chat interfaces.
 * ---
 */

export default {
  slots: {
    root: 'relative flex flex-col items-stretch gap-[2px] ps-[12px] pe-2 py-2 w-full rounded-lg isolate mt-(--chat-prompt-queue-height)',
    header: 'flex items-center gap-2',
    files: 'flex flex-wrap items-center gap-2 mt-0.5',
    queue: [
      'absolute bottom-full inset-x-2.5 -z-1',
      'flex flex-col px-1 overflow-hidden',
      'rounded-t-(--ui-border-radius-md)',
      'border border-b-0 border-(--ui-color-divider-default)',
      'bg-(--ui-color-bg-content-secondary)/50 backdrop-blur-sm'
    ].join(' '),
    queueTrigger: [
      'flex items-center gap-1.5 w-full p-1.5',
      'text-(length:--ui-font-size-xs) font-(--ui-font-weight-medium)',
      'text-description hover:text-(--ui-color-design-plain-content)',
      'rounded-(--ui-border-radius-sm)',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--ui-color-design-outline-focused-stroke)'
    ].join(' '),
    queueTriggerIcon: 'shrink-0 size-4 data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none',
    queueCount: 'tabular-nums text-(--ui-color-design-plain-na-content-secondary)',
    queueList: 'flex flex-col max-h-60 overflow-y-auto pb-1',
    queueItem: 'group/queue flex items-center gap-2 h-7 ps-2 pe-0.5 rounded-(--ui-border-radius-xs) hover:bg-(--ui-color-bg-content-secondary)',
    queueItemLeading: 'shrink-0 size-3 rounded-(--ui-border-radius-pill) ring ring-(--ui-color-divider-default)',
    queueItemLabel: 'flex-1 min-w-0 truncate text-(length:--ui-font-size-sm) text-(--ui-color-design-plain-content)',
    queueItemActions: 'flex items-center shrink-0 [@media(hover:hover)]:opacity-0 group-hover/queue:opacity-100 group-focus-within/queue:opacity-100 transition-opacity ease-out',
    body: 'py-[4px] items-start',
    footer: 'flex items-center justify-end gap-2',
    base: 'pt-[1px] pb-[0px]' // text-(length:--ui-font-size-lg)/(--ui-font-line-height-2xs)
  },
  variants: {
    variant: {
      outline: {
        queue: 'bottom-[calc(100%+1px)]',
        root: [
          'bg-(--ui-color-design-outline-bg)',
          'ring ring-(--ui-color-design-outline-stroke) ring-1',
          'text-(--ui-color-design-outline-content)'
        ].join(' ')
      },
      tinted: {
        root: [
          'bg-(--ui-color-design-tinted-na-bg)',
          'ring ring-(--ui-color-design-tinted-na-stroke) ring-(length:--ui-design-tinted-na-stroke-weight)',
          'text-(--ui-color-design-tinted-na-content)'
        ].join(' ')
      },
      filled: {
        root: [
          'bg-(--ui-color-design-filled-na-bg)',
          'ring ring-(--ui-color-design-filled-na-stroke) ring-(length:--ui-design-filled-na-stroke-weight)',
          'text-(--ui-color-design-filled-na-content)'
        ].join(' ')
      },
      plain: {
        root: [
          'bg-(--ui-color-design-plain-bg)',
          'ring ring-(--ui-color-design-plain-stroke) ring-(length:--ui-design-plain-stroke-weight)',
          'text-(--ui-color-design-plain-content)'
        ].join(' ')
      }
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
}
