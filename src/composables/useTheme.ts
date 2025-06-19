import { useViewTransition } from '@oiij/use'

export function useTheme() {
  const storageKey = '__COLOR_MODE__'
  const isDark = useDark({ storageKey })
  const preferredDark = usePreferredDark()
  const { store: colorMode, system: systemColorMode } = useColorMode({ emitAuto: true, storageKey })
  const { run } = useViewTransition()
  function toggleDark(ev: MouseEvent) {
    run(() => {
      isDark.value = !isDark.value
    }, {
      x: ev?.clientX,
      y: ev?.clientY,
      reverse: isDark.value,
    })
  }
  return {
    isDark,
    preferredDark,
    colorMode,
    systemColorMode,
    toggleDark,
  }
}
