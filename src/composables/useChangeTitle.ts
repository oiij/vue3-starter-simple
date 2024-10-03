import type { RouteLocation } from 'vue-router'

export function useChangeTitle(to: RouteLocation) {
  const title = useTitle()
  const appName = import.meta.env.VITE_APP_NAME || ''
  title.value = `${appName}${to.meta.title ? ` - ${to.meta.title}` : ''}`
}
