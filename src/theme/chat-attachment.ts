/**
 * ChatAttachment
 * A file attached to a prompt or a chat message, with a preview and upload states.
 * ---
 */

export default {
  slots: {
    root: 'group/attachment relative flex min-w-0 max-w-full w-fit shrink-0',
    leading: [
      'relative flex items-center justify-center shrink-0 aspect-square overflow-hidden',
      'rounded-(--ui-border-radius-md)',
      'bg-(--ui-color-bg-content-secondary)',
      'text-(--ui-color-design-plain-na-content-secondary)'
    ].join(' '),
    leadingIcon: 'absolute shrink-0',
    image: 'size-full object-cover',
    wrapper: 'grid grid-cols-[minmax(0,1fr)_auto] items-center min-w-0 flex-1',
    name: 'block truncate font-(--ui-font-weight-medium) text-(--ui-color-design-plain-content)',
    description: 'block truncate row-start-2 text-(length:--ui-font-size-xs) text-description',
    remove: 'shrink-0'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1.5 p-1 rounded-(--ui-border-radius-md) text-(length:--ui-font-size-xs) data-[orientation=vertical]:w-20 data-[variant=thumbnail]:w-10',
        leading: 'w-7 rounded-(--ui-border-radius-sm)',
        leadingIcon: 'size-3.5',
        description: 'text-[10px]/3'
      },
      sm: {
        root: 'gap-2 p-1.5 text-(length:--ui-font-size-xs) data-[orientation=vertical]:w-24 data-[variant=thumbnail]:w-12',
        leading: 'w-8',
        leadingIcon: 'size-4'
      },
      md: {
        root: 'gap-2.5 p-2 text-(length:--ui-font-size-sm) data-[orientation=vertical]:w-30 data-[variant=thumbnail]:w-14',
        leading: 'w-10',
        leadingIcon: 'size-5',
        description: 'mt-0.5'
      },
      lg: {
        root: 'gap-3 p-2.5 text-(length:--ui-font-size-sm) data-[orientation=vertical]:w-36 data-[variant=thumbnail]:w-20',
        leading: 'w-12',
        leadingIcon: 'size-6',
        description: 'mt-0.5'
      },
      xl: {
        root: 'gap-3 p-3 text-(length:--ui-font-size-md) data-[orientation=vertical]:w-44 data-[variant=thumbnail]:w-30',
        leading: 'w-14 rounded-(--ui-border-radius-lg)',
        leadingIcon: 'size-7',
        description: 'mt-0.5 text-(length:--ui-font-size-sm)'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-center min-w-40 pe-2.5',
        remove: 'col-start-2 row-start-1 -my-1 ms-1'
      },
      vertical: {
        root: 'flex-col',
        leading: 'w-full',
        leadingIcon: 'size-6',
        wrapper: 'px-1',
        remove: [
          'absolute top-3 end-3 rounded-(--ui-border-radius-pill)',
          'bg-(--ui-color-bg-content-primary)/75 backdrop-blur-xs'
        ].join(' ')
      }
    },
    variant: {
      card: {
        root: [
          'rounded-(--ui-border-radius-lg)',
          'border border-(--ui-color-divider-default)',
          'bg-(--ui-color-bg-content-primary)'
        ].join(' ')
      },
      thumbnail: {
        root: 'p-0 min-w-0',
        leading: 'w-full outline -outline-offset-1 outline-(--ui-color-divider-default)',
        wrapper: 'contents',
        name: 'sr-only',
        description: 'sr-only',
        remove: [
          'absolute -top-1.5 -end-1.5 m-0 p-0 rounded-(--ui-border-radius-pill) border',
          'edge-light:[--ui-btn-background:var(--ui-color-base-white-fixed)]',
          'edge-dark:[--ui-btn-background:var(--ui-color-base-white-fixed)]',
          'edge-dark:hover:bg-(--ui-color-base-white-fixed)/90',
          'edge-dark:[--ui-btn-color:var(--ui-color-g-content-grey-1)]',
          'dark:[--ui-btn-background:var(--ui-color-g-content-grey-1)]',
          'dark:hover:bg-(--ui-color-g-content-grey-1)/90',
          'dark:[--ui-btn-color:var(--ui-color-g-content-grey-4)]',
          '[@media(hover:hover)]:opacity-0 group-hover/attachment:opacity-100 group-focus-within/attachment:opacity-100',
          'transition-opacity ease-out'
        ].join(' ')
      }
    },
    status: {
      idle: '',
      uploading: {
        leading: 'has-data-[slot=image]:text-(--ui-color-design-plain-content)',
        // @memo: the loading icon is animated itself.
        image: 'opacity-50'
      },
      error: {
        root: 'border-(--ui-color-accent-main-alert)/30',
        leading: [
          'bg-(--ui-color-accent-main-alert)/10',
          'text-(--ui-color-accent-main-alert)',
          'outline-(--ui-color-accent-main-alert)/30'
        ].join(' '),
        image: 'opacity-50',
        description: 'text-(--ui-color-accent-main-alert)'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    status: 'idle',
    variant: 'card'
  }
}
