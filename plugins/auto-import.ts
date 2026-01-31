// https://github.com/antfu/unplugin-auto-import
import { unheadVueComposablesImports } from '@unhead/vue'
import AutoImport from 'unplugin-auto-import/vite'

export default AutoImport({
  /* options */
  include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/,
  ],
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]packages[\\/]/, /[\\/]\.git[\\/]/],
  imports: [
    'vue',
    'vue-router',
    '@vueuse/core',
    'pinia',
    'vue-i18n',
    unheadVueComposablesImports,
    { from: 'await-to-js', imports: ['to'] },
  ],
  dirs: ['src/composables', 'src/stores'],
  dtsMode: 'overwrite',
  vueTemplate: true,
  resolvers: [],
})
