import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { language, toggle } = useLanguage()
    return {
      language,
      toggle,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      paths: [''],
    },
  },
)
