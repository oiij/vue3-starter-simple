// https://github.com/antfu/unplugin-vue-components
import { NaiveUiResolver, VueUseComponentsResolver, VueUseDirectiveResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default Components({
  dirs: ['src/components'],
  extensions: ['vue', 'md'],
  deep: true,
  include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
  resolvers: [
    NaiveUiResolver(),
    VueUseComponentsResolver(),
    VueUseDirectiveResolver(),
  ],
})
