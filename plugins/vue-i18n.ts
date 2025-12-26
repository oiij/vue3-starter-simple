// https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
import { resolve } from 'node:path'
import process from 'node:process'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

export default VueI18n({
  runtimeOnly: true,
  compositionOnly: true,
  fullInstall: true,
  include: resolve(process.cwd(), 'src/locales/**'),
})
