import type { PluginOption } from 'vite'
import {
  NaiveUiResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver,
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function VitePluginComponents(): PluginOption[] {
  return [
    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue', 'md'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        NaiveUiResolver(),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
      ],
    }), // https://github.com/antfu/unplugin-vue-components
  ]
}
