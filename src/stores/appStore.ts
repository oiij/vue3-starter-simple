import { useNaiveTheme } from '@oiij/naive-ui'
import { useBoolean } from '@oiij/use'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useLanguage } from '~/modules'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { locale, language } = useLanguage()
    const { isDark, preferredDark, colorMode } = useTheme()
    const { color, theme, themeOverrides, locale: naiveLocal, dateLocale } = useNaiveTheme({
      darkMode: isDark,
      language: locale,
    })
    const { value: collapsed, toggle: toggleCollapsed } = useBoolean(false)

    return {
      locale,
      language,
      isDark,
      preferredDark,
      colorMode,
      color,
      theme,
      themeOverrides,
      naiveLocal,
      dateLocale,
      collapsed,
      toggleCollapsed,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      pick: [''],
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
