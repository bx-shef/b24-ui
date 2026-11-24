/**
 * ToggleGroup
 * A set of buttons that can be pressed on or off.
 * ---
 * Reka renders a hidden input after the items when the group has a `name`
 * inside a form, so the rounding of attached items counts buttons only
 * (`*-of-type`) rather than children. The pressed item is lifted above its
 * neighbours so its border shows, and the focused one above both.
 */
export default {
  slots: {
    root: 'relative',
    item: ''
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'inline-flex items-center gap-1'
      },
      vertical: {
        root: 'flex flex-col gap-1'
      }
    },
    attached: {
      true: {
        item: 'rounded-none data-[state=on]:z-[1] focus-visible:z-[2]'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      attached: true,
      class: {
        root: 'gap-0 -space-x-px',
        item: 'first-of-type:rounded-s-(--ui-btn-radius) last-of-type:rounded-e-(--ui-btn-radius)'
      }
    },
    {
      orientation: 'vertical',
      attached: true,
      class: {
        root: 'gap-0 -space-y-px',
        item: 'first-of-type:rounded-t-(--ui-btn-radius) last-of-type:rounded-b-(--ui-btn-radius)'
      }
    }
  ],
  defaultVariants: {
    orientation: 'horizontal'
  }
}
