import { defineStore } from 'pinia'
import { colorMode } from '~/composables/useColorMode'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { language, setLanguage } = useLanguage()
    const { value: collapsed, toggle: toggleCollapsed } = useBoolean(false)

    return {
      language,
      setLanguage,
      colorMode,
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
