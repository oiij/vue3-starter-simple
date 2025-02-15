import type { PluginOption } from 'vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export function VitePluginAutoImport(): PluginOption[] {
  return [
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]packages[\\/]/,
        /[\\/]\.git[\\/]/,
      ],
      imports: [
        'vue',
        '@vueuse/core',
        'pinia',
        'vue-i18n',
        unheadVueComposablesImports,
        VueRouterAutoImports,
        { from: 'await-to-js', imports: ['to'] },
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils', 'src/api'],
      vueTemplate: true,
      resolvers: [VueHooksPlusResolver()],
    }), // https://github.com/antfu/unplugin-auto-import
  ]
}
