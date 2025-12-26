import type { IMenuOption as MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { getRouteMetaHide } from '~/utils/route-meta-utils'

function routes2menu(routes: RouteRecordRaw[]): MenuOption[] {
  const options: MenuOption[] = []
  routes.forEach((route) => {
    const hideFlag = getRouteMetaHide('menu', route.meta)
    if (hideFlag) {
      return
    }
    const menu: MenuOption = {
      label: route.meta?.title ?? route.path,
      key: route.path?.toString(),
      icon: () => useRenderIcon(route.meta?.icon),
      meta: route.meta,
    }
    if (route.children) {
      menu.children = routes2menu(route.children)
      menu.children = menu.children.length > 0 ? menu.children : undefined
    }
    const childrenRoot = route.children?.filter(f => f.meta?.root).map((m) => {
      return {
        label: m.meta?.title ?? m.name ?? m.path,
        key: m.path?.toString(),
        icon: () => useRenderIcon(m.meta?.icon),
        meta: m.meta,
      } as MenuOption
    })
    options.push(menu, ...childrenRoot ?? [])
  })
  return options
}
const { routes } = useAutoRoutes()
const menuOptions = computed(() => routes2menu(cloneDeep(routes)))
const flattenMenuOptions = computed(() => cloneDeep(menuOptions).value.flatMap<MenuOption>(f => f.children ?? f))

export function useMenu() {
  return {
    menuOptions,
    flattenMenuOptions,
  }
}
