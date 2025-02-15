import type { Router } from 'vue-router/auto'

export function useRouteGuard(router: Router) {
  const { start, done } = useNProgress()
  router.beforeEach((_to, _from) => {
    start()
    return true
  })
  router.afterEach((_to, _from) => {
    useChangeTitle(_to)
    done()
  })
}
