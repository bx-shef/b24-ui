import { Comment, Fragment, Text, isVNode } from 'vue'
import type { VNode } from 'vue'

export interface SlotItem {
  /** Stable key, unique across unwrapped fragments: path of fragment keys/positions plus the node's own key or position. */
  key: string
  node: VNode
}

/**
 * Flattens slot vnodes: unwraps fragments (`v-for`, `<template v-if>`), drops
 * comments and whitespace-only text, so each remaining node is a real item.
 *
 * Keys keep Vue's own scoping: a keyed node is keyed inside its fragment
 * (`a/k:1` and `b/k:1` from two `v-for` do not collide), and an unkeyed node is
 * keyed by its position in the original list, where a `v-if` placeholder comment
 * still takes a place — toggling a `v-if` above it does not remount it.
 */
export function flattenSlot(nodes?: VNode[] | null, path = ''): SlotItem[] {
  const result: SlotItem[] = []

  ;(nodes || []).forEach((node, index) => {
    if (!isVNode(node)) {
      return
    }
    const key = `${path}${node.key != null ? `k:${String(node.key)}` : `i:${index}`}`
    if (node.type === Comment) {
      return
    }
    if (node.type === Text && (typeof node.children !== 'string' || !node.children.trim())) {
      return
    }
    if (node.type === Fragment) {
      result.push(...flattenSlot(Array.isArray(node.children) ? node.children as VNode[] : [], `${key}/`))
      return
    }
    result.push({ key, node })
  })

  return result
}
