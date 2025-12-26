import type { Router } from 'vue-router'

export function useRouteGuard(router: Router) {
  router.beforeEach((_to, _from) => {
    return true
  })
  router.afterEach((to, _from) => {
    const title = useTitle()
    title.value = to.meta.title ?? ''
  })
}
