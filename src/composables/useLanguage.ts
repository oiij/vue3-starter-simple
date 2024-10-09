import { i18n } from '~/modules'

const { locale } = i18n.global
function toggle() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
function setLanguage(lang: 'zh-CN' | 'en-US') {
  locale.value = lang
}
export function useLanguage() {
  return {
    locale,
    toggle,
    setLanguage,
  }
}
