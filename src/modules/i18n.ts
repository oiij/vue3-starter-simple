import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

type Locale = 'zh-CN' | 'en-US'
type Language = 'auto' | Locale
const language = useLocalStorage<Language>('__LANGUAGE__PERSIST__', 'auto')
const { language: navigatorLanguage } = useNavigatorLanguage()
const _locale = computed(() => language.value === 'auto' ? navigatorLanguage.value : language.value)

export const i18n = createI18n({
  locale: _locale.value ?? 'zh-CN',
  legacy: false,
  fallbackLocale: 'zh-CN',
  messages: messages as {
    'zh-CN': any
    'en-US': any
  },
})
export function useLanguage() {
  const { locale } = i18n.global

  watch(language, (v) => {
    locale.value = v === 'auto' ? navigatorLanguage.value as Locale : v
  })
  watch(navigatorLanguage, (v) => {
    if (language.value === 'auto') {
      locale.value = v as Locale
    }
  })
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }
  function setLocale(lang: Locale) {
    locale.value = lang
  }
  function setLanguage(lang: Language) {
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
