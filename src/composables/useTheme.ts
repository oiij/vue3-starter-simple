import { useViewTransition } from '@oiij/use'

export function useTheme() {
  const storageKey = '__COLOR_MODE__'
  const isDark = useDark({ storageKey })
  const preferredDark = usePreferredDark()
  const { store: colorMode, system: systemColorMode } = useColorMode({ emitAuto: true, storageKey })

  function toggleDark(ev?: MouseEvent) {
    useViewTransition(() => {
      isDark.value = !isDark.value
    }, {
      x: ev?.clientX,
      y: ev?.clientY,
      reverse: isDark,
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
