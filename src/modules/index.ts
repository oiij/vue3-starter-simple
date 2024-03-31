import type { App } from 'vue'

import { directive } from './directives'
import { i18n } from './i18n'
import { notivue } from './notivue'
import { pinia } from './pinia'
import { router } from './router'
import { routerScroller } from './router-scroller'
import { head } from './vue-use-head'

export * from './directives'
export * from './i18n'
export * from './notivue'
export * from './pinia'
export * from './router'
export * from './router-scroller'
export * from './vue-use-head'
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
