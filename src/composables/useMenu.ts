import type { IMenuOption as MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'
import { autoRouter } from '~/modules/auto-router'
import { getRouteMetaHide } from '~/utils/route-meta-utils'

function routes2menu(routes: RouteRecordRaw[]): MenuOption[] {
  const iconSize = 24
  const options: MenuOption[] = []
  routes.forEach((route) => {
    const hideFlag = getRouteMetaHide('menu', route.meta)
    if (hideFlag) {
      return
    }
    const menu: MenuOption = {
      label: route.meta?.title ?? route.path,
      key: route.path?.toString(),
      icon: () => useRenderIcon(route.meta?.icon, iconSize),
      meta: route.meta,
    }
    if (route.children && route.children.length > 0) {
      if (route.meta?.rootOnOne && route.children.length === 1) {
        const child = route.children[0]
        if (getRouteMetaHide('menu', child.meta)) {
          return
        }

        menu.label = child.meta?.title ?? child.path
        menu.key = child.path?.toString()
        menu.icon = () => useRenderIcon(child.meta?.icon, iconSize)
        menu.meta = child.meta
      }
      else {
        menu.children = routes2menu(route.children)
      }
    }
    const childrenRoot = route.children?.filter(f => f.meta?.root).map((m) => {
      return {
        label: m.meta?.title ?? m.name ?? m.path,
        key: m.path?.toString(),
        icon: () => useRenderIcon(m.meta?.icon, iconSize),
        meta: m.meta,
      } as MenuOption
    })
    options.push(menu, ...childrenRoot ?? [])
  })

  return options
}
const { routes } = autoRouter
const menuOptions = computed(() => routes2menu(cloneDeep(routes)))
const flattenMenuOptions = computed(() => cloneDeep(menuOptions).value.flatMap<MenuOption>(f => f.children ?? f))

export function useMenu() {
  return {
    menuOptions,
    flattenMenuOptions,
  }
}
