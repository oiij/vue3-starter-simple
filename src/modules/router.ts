import type { Router } from 'vue-router/auto'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHashHistory(import.meta.env.VITE_BASE as string),
  routes: setupLayouts(routes),
})
useRouteGuard(router)

if (import.meta.hot) {
  handleHotUpdate(router)
}
