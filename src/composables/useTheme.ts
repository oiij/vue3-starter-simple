import { useViewTransition } from '@oiij/use'

export function useTheme() {
  const storageKey = '__COLOR_MODE__'
  const isDark = useDark({ storageKey })
  const preferredDark = usePreferredDark()
  const { store: colorMode, system: systemColorMode } = useColorMode({ emitAuto: true, storageKey })
  const { run } = useViewTransition({
    duration: 1000,
    easing: 'ease-in-out',
    effect: true,
    reverseSelector: '.dark',
  })
  function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
    run(() => isDark.value = !isDark.value, { x, y, reverse: !isDark.value })
  }
  return {
    isDark,
    preferredDark,
    colorMode,
    systemColorMode,
    toggleDark,
  }
}
