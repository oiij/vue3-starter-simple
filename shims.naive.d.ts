import type { MenuOption } from 'naive-ui'
import type { RouteMeta } from 'vue-router'

export {}

declare module 'naive-ui' {
  export type IMenuOption = MenuOption & {
    meta?: RouteMeta
  }
}
