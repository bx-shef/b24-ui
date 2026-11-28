import { markRaw } from 'vue'

// Keep `getComputedStyle()` results out of Vue's reactive proxies.
//
// reka-ui's `usePresence` holds the declaration in a `ref`, which deep-wraps an
// object value. Reading `.display` back then calls happy-dom's getter with the
// proxy as its receiver, and happy-dom checks that receiver against the class —
// so `Drawer` threw `TypeError: Receiver must be an instance of class
// CSSStyleDeclaration` four times per run, uncaught. It stayed invisible while
// the harness mounted detached, because `getComputedStyle` on a node outside
// the document returns an empty declaration and the branch is never reached.
//
// `markRaw` sets `__v_skip`, so Vue hands the declaration through untouched.
// Values are unchanged; a computed style is a snapshot the caller re-reads, not
// something reactivity has to track. Drop this once reka-ui uses a `shallowRef`.
export function patchComputedStyle(): void {
  const original = window.getComputedStyle.bind(window)

  window.getComputedStyle = ((...args: Parameters<typeof original>) => {
    const declaration = original(...args)
    try {
      return markRaw(declaration)
    } catch {
      // happy-dom 21 returns the declaration as a Proxy whose `defineProperty`
      // trap refuses unknown keys, so `markRaw` cannot set `__v_skip` on it.
      // Hand back an object Vue will not wrap instead: a frozen view whose
      // getters read from the real declaration with the right receiver.
      return rawView(declaration)
    }
  }) as typeof window.getComputedStyle
}

function rawView(declaration: CSSStyleDeclaration): CSSStyleDeclaration {
  return new Proxy(Object.freeze({}) as CSSStyleDeclaration, {
    get(_target, key) {
      if (key === '__v_skip') return true
      const value = Reflect.get(declaration, key, declaration)
      return typeof value === 'function' ? value.bind(declaration) : value
    },
    has: (_target, key) => key === '__v_skip' || key in declaration
  })
}
