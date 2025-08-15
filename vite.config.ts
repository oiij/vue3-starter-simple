import { resolve } from 'node:path'
import process from 'node:process'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssPresetEnv from 'postcss-preset-env'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import Info from 'unplugin-info/vite'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import Sitemap from 'vite-plugin-sitemap'
import svgSfc from 'vite-plugin-svg-sfc'
import ServerUrlCopy from 'vite-plugin-url-copy'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import virtual from 'vite-plugin-virtual'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { VitePluginAutoImport, VitePluginComponents, VitePluginI18n, VitePluginMarkdown, VitePluginPWA } from './config'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_DEV_PORT, VITE_API_BASE_PREFIX, VITE_API_BASE_URL, VITE_BASE } = loadEnv(mode, process.cwd(), '')
  const debug = !!process.env.VSCODE_DEBUG

  return {
    plugins: [
      VueRouter({
        extensions: ['.vue', '.md', '.tsx'],
      }), // https://github.com/posva/unplugin-vue-router
      vue({
        include: [/\.vue$/, /\.md$/, /\.tsx$/],
      }), // https://github.com/vitejs/vite-plugin-vue
      vueJsx(), // https://github.com/vitejs/vite-plugin-vue
      Unocss(), // https://github.com/antfu/unocss
      Icons({ compiler: 'vue3' }), // https://github.com/antfu/unplugin-icons
      Layouts(), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      VueDevTools(), // https://devtools-next.vuejs.org/
      ServerUrlCopy({
        qrcode: {
          disabled: false,
          color: 'white',
        },
      }), // https://github.com/XioDone/vite-plugin-url-copy
      UnpluginSvgComponent({
        iconDir: resolve(__dirname, 'src/assets/icons'),
        preserveColor: resolve(__dirname, 'src/assets/icons'),
        dts: true,
        prefix: 'icon',
        domInsertionStrategy: 'dynamic',
        symbolIdFormatter: (svgName: string, prefix: string): string => {
          const nameArr = svgName.split('/')
          if (prefix)
            nameArr.unshift(prefix)
          return nameArr.join('-').replace(/\.svg$/, '')
        },
      }), // https://github.com/jevon617/unplugin-svg-component
      svgSfc(),
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
      WebfontDownload(), // https://github.com/feat-agency/vite-plugin-webfont-dl
      TurboConsole(), // https://github.com/unplugin/unplugin-turbo-console
      Sitemap(),
      analyzer({
        analyzerMode: 'static',
      }), // https://github.com/nonzzz/vite-bundle-analyzer
      virtual({}), // https://github.com/patak-dev/vite-plugin-virtual

      VitePluginAutoImport(),
      VitePluginComponents(),
      VitePluginI18n(),
      VitePluginMarkdown(),
      VitePluginPWA({ command, mode }),
    ],
    clearScreen: true,
    base: VITE_BASE ?? '/',
    server: {
      port: Number(VITE_DEV_PORT),
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
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
      sourcemap: true,
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {},
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '~packages': resolve(__dirname, './packages'),
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
