import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { language, toggleLanguage } = useLanguage()
    return {
      language,
      toggleLanguage,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      paths: [''],
    },
  },
)
