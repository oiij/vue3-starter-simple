import { useNaiveTheme } from '@oiij/naive-ui'
import { useBoolean, useTheme } from '@oiij/use'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { autoI18n } from '~/modules/i18n'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { locale, language } = autoI18n
    const { isDark, preferredDark, colorMode } = useTheme()
    const { colors, theme, themeOverrides, locale: naiveLocal } = useNaiveTheme({
      darkMode: isDark,
      language: locale,
    })
    const { value: collapsed, toggle: toggleCollapsed } = useBoolean(false)
    const transitionName = ref('fade')
    const reloadFlag = ref(false)
    async function reload(delay = 300) {
      reloadFlag.value = true
      await nextTick()
      if (delay) {
        setTimeout(() => {
          reloadFlag.value = false
        }, delay)
      }
      else {
        reloadFlag.value = false
      }
    }
    return {
      locale,
      language,
      isDark,
      preferredDark,
      colorMode,
      colors,
      theme,
      themeOverrides,
      naiveLocal,
      collapsed,
      toggleCollapsed,
      transitionName,
      reloadFlag,
      reload,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      pick: [''],
    },
    undo: {
      disable: true,
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
