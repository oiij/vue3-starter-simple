import type { CSSProperties } from 'vue'
import type { SvgName } from '~virtual/svg-component'
import SvgIcon from '~virtual/svg-component'

export function useRenderIcon(icon?: string, size?: number | string) {
  const iconSize = typeof size === 'number' ? `${size}px` : size ?? '1em'
  const style: CSSProperties = {
    width: iconSize,
    height: iconSize,
  }
  return icon?.startsWith('svg:')
    ? h(SvgIcon, { name: icon?.replace('svg:', '') as SvgName, style })
    : icon?.startsWith('i-')
      ? h('i', { class: icon, style })
      : null
}
