import type { RouteMeta } from 'vue-router'

export function getRouteMetaHide(type: 'menu' | 'tab' | 'shortcut' | 'index' | ('menu' | 'tab' | 'shortcut' | 'index')[], meta?: RouteMeta) {
  return typeof meta?.hide === 'boolean'
    ? meta?.hide
    : typeof type === 'string'
      ? meta?.hide?.includes(type)
      : type.every(e => Array.isArray(meta?.hide) && meta.hide.includes(e))
}
