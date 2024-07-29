import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    title?: string
    keepAlive?: boolean
    layout?: string
    transition?: string
  }
}
