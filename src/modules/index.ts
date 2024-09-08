import type { App } from 'vue'

import { directive } from './directives'
import { head } from './head'
import { i18n } from './i18n'
import { notivue } from './notivue'
import { pinia } from './pinia'
import { router } from './router'
import { routerScroller } from './router-scroller'

export * from './directives'
export * from './head'
export * from './i18n'
export * from './notivue'
export * from './pinia'
export * from './router'
export * from './router-scroller'
export function useModules(app: App) {
  app
    .use(directive)
    .use(i18n)
    .use(notivue)
    .use(pinia)
    .use(router)
    .use(routerScroller)
    .use(head)
}
