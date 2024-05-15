import type { Router } from 'vue-router/auto'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

export const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHashHistory(import.meta.env.VITE_BASE as string),
  extendRoutes: routes => setupLayouts(routes.map((m) => {
    if (m.meta)
      m.meta.keepAlive = m.meta.keepAlive !== false
    return m
  })),
})
useRouteGuard(router)
