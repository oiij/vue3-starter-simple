import messages from '@intlify/unplugin-vue-i18n/messages'
import { createAutoI18n } from '@oiij/auto-i18n'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'zh-CN',
  legacy: false,
  fallbackLocale: 'zh-CN',
  messages: messages as {
    'zh-CN': any
    'en-US': any
  },
})
export const autoI18n = createAutoI18n(i18n)
