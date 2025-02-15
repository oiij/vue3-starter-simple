import type { IMenuOption as MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { routes as _routes } from 'vue-router/auto-routes'
import SvgIcon from '~/components/SvgIcon.vue'
import { router } from '~/modules'

function renderIcon(iconName?: string) {
  if (iconName?.startsWith('svg:')) {
    return () => h(SvgIcon, { name: iconName?.replace('svg:', ''), size: '16px' })
  }
  if (iconName?.startsWith('i-')) {
    return () => h('i', { class: iconName, style: { width: `16px`, height: `16px` } })
  }
  return undefined
}

export function applyMeta(routes: RouteRecordRaw[]) {
  const _routes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.path === '_')
      return
    const _route = { ...route }
    if (_route.children && _route.children.length > 0) {
      _route.meta = {
        ..._route.meta,
        ..._route.children.find(f => f.path === '_')?.meta,
      }
      _route.children = applyMeta(_route.children).map((m) => {
        return {
          ...m,
          path: `${_route.path}/${m.path}`,
        }
      })
    }
    _routes.push(_route)
  })
  return _routes
}
function routesToNaiveMenu(routes: RouteRecordRaw[]) {
  const _menus: MenuOption[] = []
  routes.forEach((route) => {
    const menu: MenuOption = {
      label: route.meta?.title ?? route.name ?? route.path,
      key: route.path ?? route.name?.toString(),
      icon: renderIcon(route.meta?.icon),
      show: !route.meta?.hideOnMenu,
      meta: route.meta,
    }
    if (route.children) {
      menu.children = routesToNaiveMenu(route.children)
    }

    _menus.push(menu)
  })
  return _menus.sort((a, b) => {
    if (a.meta?.sort && b.meta?.sort)
      return a.meta.sort - b.meta.sort
    return 0
  })
}

const routes = applyMeta(_routes)
const naiveMenu = computed(() => routesToNaiveMenu(routes))
const currentRoute = computed(() => router.currentRoute.value)
const currentPath = computed(() => currentRoute.value.path)
function setPath(path: string) {
  return router.push(path)
}
export function useAutoRouter() {
  return {
    routes,
    naiveMenu,
    currentRoute,
    currentPath,
    setPath,
  }
}
