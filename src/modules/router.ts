import type { Router, RouteRecordRaw } from 'vue-router'
import { createAutoRouter } from '@oiij/auto-router'
import { cloneDeep } from 'es-toolkit'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterScroller } from 'vue-router-better-scroller'

import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHashHistory(import.meta.env.VITE_BASE as string),
  routes: setupLayouts(cloneDeep(routes as RouteRecordRaw[])),
})
export const autoRouter = createAutoRouter(router, routes)

export const routerScroller = createRouterScroller({
  selectors: {
    'window': true,
    'body': true,
    '.scrollable': true,
  },
})

useRouteGuard(router)

if (import.meta.hot) {
  handleHotUpdate(router)
}
