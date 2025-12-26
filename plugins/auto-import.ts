// https://github.com/antfu/unplugin-auto-import
import { unheadVueComposablesImports } from '@unhead/vue'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default AutoImport({
  /* options */
  include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/,
  ],
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]packages[\\/]/, /[\\/]\.git[\\/]/],
  imports: [
    'vue',
    '@vueuse/core',
    'pinia',
    'vue-i18n',
    unheadVueComposablesImports,
    VueRouterAutoImports,
    { from: 'await-to-js', imports: ['to'] },
  ],
  dirs: ['src/composables', 'src/stores'],
  dtsMode: 'overwrite',
  vueTemplate: true,
  resolvers: [],
})
