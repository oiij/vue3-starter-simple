import type { PluginOption } from 'vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import AutoImport from 'unplugin-auto-import/vite'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
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
      imports: [
        'vue',
        '@vueuse/core',
        'pinia',
        'vue-i18n',
        unheadVueComposablesImports,
        VueRouterAutoImports,
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils', 'src/api'],
      vueTemplate: true,
      resolvers: [VueHooksPlusResolver()],
    }), // https://github.com/antfu/unplugin-auto-import
  ]
}
