import type { MenuOption } from 'naive-ui'
import { routes } from 'vue-router/auto-routes'
import SvgIcon from '~/components/SvgIcon.vue'
import { router } from '~/modules'

function renderIcon(iconName?: string) {
  if (iconName?.startsWith('svg:')) {
    return () => h(SvgIcon, { name: iconName?.replace('svg:', '') })
  }
  return () => h('i', { class: iconName })
}
export function useRoutesMenu() {
  const menu = routes.filter(f => !f.meta?.hideOnMenu).map((route) => {
    const routeMenu: MenuOption = {
      label: `${route.meta?.title ?? (route.name as string)}`,
      key: route.path,
      icon: renderIcon(route.meta?.icon),
      show: !route.meta?.hideOnMenu,
      meta: route.meta,
    }
    return routeMenu
  })

  const currentPath = computed(() => router.currentRoute.value.path)
  function changePath(path: string) {
    router.push(path)
  }
  return {
    routes,
    menu,
    currentPath,
    changePath,
  }
}
