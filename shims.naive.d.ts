/* eslint-disable */
/* prettier-ignore */
// biome-ignore format: off
// biome-ignore lint: off
// @ts-nocheck
import type { MenuOption } from 'naive-ui'
import type { RouteMeta } from 'vue-router'
import 'naive-ui'

export {}

declare module 'naive-ui' {
   type IMenuOption = MenuOption & {
    meta?: RouteMeta
  }
}
