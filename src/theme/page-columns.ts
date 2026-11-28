/**
 * PageColumns
 * A responsive multi-column layout system for organizing content side-by-side.
 * ----
 * The vertical gap is `padding-bottom` of the per-item wrapper, not a margin:
 * WebKit carries a margin over a column break and leaves a column empty
 * (bitrix24/b24ui#803).
 */

export default {
  slots: {
    base: 'relative columns-1 md:columns-2 lg:columns-3 gap-8',
    item: 'break-inside-avoid-column will-change-transform pb-8 last:pb-0'
  }
}
