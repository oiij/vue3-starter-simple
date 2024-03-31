/* eslint-disable no-console */
import type { Router } from 'vue-router'

export function useRouteGuard(router: Router) {
  const { start, done } = useNProgress()
  router.beforeEach((to, from, next) => {
    const { language } = storeToRefs(useAppStore())
    console.log(language.value)

    start()
    next()
  })
  router.afterEach((to) => {
    useChangeTitle(to)
    done()
  })
}
