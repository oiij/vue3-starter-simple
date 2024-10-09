import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { locale, toggle } = useLanguage()
    return {
      locale,
      toggle,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      pick: [''],
    },
  },
)
