import type { App } from 'vue'

import { setupDirective } from './directives'
import { head } from './head'
import { autoI18n, i18n } from './i18n'
import { notivue } from './notivue'
import { pinia } from './pinia'
import { autoRouter, router, routerScroller } from './router'

export * from './directives'
export * from './head'
export * from './i18n'
export * from './notivue'
export * from './pinia'
export * from './router'
export function useModules(app: App) {
  app
    .use(setupDirective)
    .use(i18n)
    .use(autoI18n)
    .use(notivue)
    .use(pinia)
    .use(router)
    .use(autoRouter)
    .use(routerScroller)
    .use(head)
}
