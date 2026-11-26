import { Comment, Fragment, Text, isVNode } from 'vue'
import type { VNode } from 'vue'

/**
 * Flattens slot vnodes: unwraps fragments (`v-for`, `<template v-if>`), drops
 * comments and whitespace-only text, so each remaining node is a real item.
 */
export function flattenSlot(nodes?: VNode[] | null): VNode[] {
  const result: VNode[] = []

  for (const node of nodes || []) {
    if (!isVNode(node)) {
      continue
    }
    if (node.type === Comment) {
      continue
    }
    if (node.type === Text && (typeof node.children !== 'string' || !node.children.trim())) {
      continue
    }
    if (node.type === Fragment) {
      result.push(...flattenSlot(Array.isArray(node.children) ? node.children as VNode[] : []))
      continue
    }
    result.push(node)
  }

  return result
}
