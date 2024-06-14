import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import VitePluginDebug from 'vite-plugin-debug'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import postcssPresetEnv from 'postcss-preset-env'
import TurboConsole from 'unplugin-turbo-console/vite'
import Info from 'unplugin-info/vite'
import ServerUrlCopy from 'vite-plugin-url-copy'
import { analyzer } from 'vite-bundle-analyzer'
import Sitemap from 'vite-plugin-sitemap'
import { VitePluginMock } from './plugin'
import { VitePluginAutoImport, VitePluginComponents, VitePluginI18n, VitePluginMarkdown, VitePluginPWA } from './config'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_DEV_PORT, VITE_API_BASE_PREFIX, VITE_API_BASE_URL, VITE_BASE, BUILD_ENV } = loadEnv(mode, process.cwd(), '')
  const debug = !!process.env.VSCODE_DEBUG

  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }), // https://github.com/vitejs/vite-plugin-vue
      vueJsx(), // https://github.com/vitejs/vite-plugin-vue
      Unocss(), // https://github.com/antfu/unocss
      Icons({ compiler: 'vue3' }), // https://github.com/antfu/unplugin-icons
      VueRouter({
        extensions: ['.vue', '.md'],
      }), // https://github.com/posva/unplugin-vue-router
      Layouts(), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      VueDevTools(), // https://devtools-next.vuejs.org/
      ServerUrlCopy({
        qrcode: {
          disabled: false,
          color: 'white',
        },
      }), // https://github.com/XioDone/vite-plugin-url-copy
      VitePluginDebug(), // https://github.com/hu3dao/vite-plugin-debug/blob/master/README.zh-CN.md
      // virtual({
      //   'virtual:module': 'export default { mode: \'web\' }',
      // }), // https://github.com/patak-dev/vite-plugin-virtual Vite5 type=module 报错
      VitePluginMock({ prefix: VITE_API_BASE_PREFIX }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }), // https://github.com/vbenjs/vite-plugin-svg-icons
      webUpdateNotice({
        logVersion: true,
      }), // https://github.com/GreatAuk/plugin-web-update-notification
      vitePluginVersionMark({
        // name: 'test-app',
        // version: '0.0.1',
        // command: 'git describe --tags',
        ifGitSHA: true,
        ifShortSHA: true,
        ifMeta: true,
        ifLog: true,
        ifGlobal: true,
      }), // https://github.com/ZhongxuYang/vite-plugin-version-mark
      Info(), // https://github.com/yjl9903/unplugin-info
      // viteVueCSSVars({
      //   include: [/.vue/],
      //   includeCompile: ['**/**.scss'],
      //   server: false,
      // }), // https://github.com/baiwusanyu-c/unplugin-vue-cssvars
      WebfontDownload(), // https://github.com/feat-agency/vite-plugin-webfont-dl
      TurboConsole(), // https://github.com/unplugin/unplugin-turbo-console
      Sitemap(),
      BUILD_ENV === 'vercel' ? undefined : analyzer(), // https://github.com/nonzzz/vite-bundle-analyzer
      ...VitePluginAutoImport(),
      ...VitePluginComponents(),
      ...VitePluginI18n(),
      ...VitePluginMarkdown(),
      ...VitePluginPWA({ command, mode }),
    ],
    clearScreen: true,
    base: VITE_BASE ?? '/',
    server: {
      port: Number(VITE_DEV_PORT),
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: VITE_API_BASE_URL === ''
        ? undefined
        : {
            [VITE_API_BASE_PREFIX]: {
              target: VITE_API_BASE_URL,
              changeOrigin: true,
              rewrite: path => path.replace(new RegExp(`^${VITE_API_BASE_PREFIX}`), ''),
            },
          },
    },
    preview: {
      host: true,
    },
    envPrefix: ['VITE_'],
    build: {
      minify: debug ? false : 'esbuild',
      sourcemap: debug,
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: undefined,
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
      postcss: {
        plugins: [
          postcssPresetEnv(),
        ],
      },
    },
  }
})
