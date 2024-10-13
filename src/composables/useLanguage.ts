import { i18n } from '~/modules'

export function useLanguage() {
  const { locale } = i18n.global
  const language = useLocalStorage('language', 'auto')
  const { language: navigatorLanguage } = useNavigatorLanguage()
  watch(language, (v) => {
    if (v === 'auto') {
      locale.value = navigatorLanguage.value as any
    }
    else {
      locale.value = v
    }
  })
  watch(navigatorLanguage, (v) => {
    if (language.value === 'auto') {
      locale.value = v as any
    }
  })
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }
  function setLocale(lang: 'zh-CN' | 'en-US' | string) {
    locale.value = lang
  }
  function setLanguage(lang: 'zh-CN' | 'en-US' | 'auto') {
    language.value = lang
  }
  return {
    locale,
    language,
    navigatorLanguage,
    toggle,
    setLocale,
    setLanguage,
  }
}
