import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'

export interface IUser {
  id: number
  name: string
  email: string
  phone: string
}

export interface NavigationGroup {
  id: string
  label?: string
  items: NavigationMenuItem[]
}

export type Surround<T> = [T | undefined, T | undefined]
