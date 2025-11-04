import type { RouteRecordRaw } from 'vue-router'
import { useBoolean } from '@oiij/use'
import { cloneDeep } from 'lodash-es'
import { routes as _routes } from 'vue-router/auto-routes'
import { router } from '~/modules'

function parseRoutes(routes: RouteRecordRaw[] | readonly RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.map((route) => {
    const indexMeta = route.children?.find(f => f.path === ``)?.meta?.group
    return {
      ...route,
      meta: {
        ...route.meta,
        ...indexMeta,
        sort: route.meta?.sort,
      },
      children: route.children?.map((m) => {
        return {
          ...m,
          path: m.path === '' ? route.path : m.path,
        }
      }).toSorted((a, b) => (a.meta?.sort ?? Infinity) - (b.meta?.sort ?? Infinity)),
    } as RouteRecordRaw
  }).toSorted((a, b) => (a.meta?.sort ?? Infinity) - (b.meta?.sort ?? Infinity))
}
const { value: loading } = useBoolean(false)
const currentRoute = computed(() => router.currentRoute.value)
const currentRoutePath = computed(() => currentRoute.value.path)
const routes = parseRoutes(cloneDeep(_routes))

const flattenRoutes = cloneDeep(routes).flatMap(f => f.children ?? f)
const keepAlivePath = computed(() => flattenRoutes.filter(f => f.meta?.keepAlive).map(m => m.path))

export function useAutoRoutes() {
  return {
    loading,
    currentRoute,
    currentRoutePath,
    routes,
    flattenRoutes,
    keepAlivePath,
  }
}
