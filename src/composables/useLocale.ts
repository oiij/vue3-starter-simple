import { i18n } from '~/modules'

export function useLocale() {
  const { locale } = i18n.global
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }
  function setLocale(lang: 'zh-CN' | 'en-US') {
    locale.value = lang
  }
  return {
    locale,
    toggle,
    setLocale,
  }
}
