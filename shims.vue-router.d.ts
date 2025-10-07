// 这段可以直接添加到你的任何 `.ts` 文件中，例如 `router.ts`
// 也可以添加到一个 `.d.ts` 文件中。确保这个文件包含在
// 项目的 `tsconfig.json` 中的 "file" 字段内。
import 'vue-router'

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export {}
declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    isLayout?: boolean
    title?: string
    description?: string
    icon?: string
    iconColor?: string
    transitionName?: string
    sort?: number

    keepAlive?: boolean
    requireAuth?: boolean
    root?: boolean
    hide?: boolean | ['menu' | 'tab' | 'shortcut' | 'index']
    group?: {
      title?: string
      icon?: string
      description?: string
      hide?: boolean | ['menu' | 'tab' | 'shortcut' | 'index']
    }
  }
}
