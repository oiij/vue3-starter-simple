import { resolve } from 'node:path'
import process from 'node:process'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssPresetEnv from 'postcss-preset-env'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import Info from 'unplugin-info/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import Vue from 'unplugin-vue/vite'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import Sitemap from 'vite-plugin-sitemap'
import svgSfc from 'vite-plugin-svg-sfc'
import ServerUrlCopy from 'vite-plugin-url-copy'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import virtual from 'vite-plugin-virtual'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { DEV_PORT, DEV_PROXY } from './config'
import { AutoImport, Components, Markdown, Pwa, SvgComponent, VueI18n, VueRouter } from './plugins'

const DEBUG = !!process.env.VSCODE_DEBUG

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      VueRouter,
      Vue({
        include: [/\.vue$/, /\.md$/],
      }), // https://github.com/vitejs/vite-plugin-vue
      vueJsx(), // https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue-jsx/README.md
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

      AutoImport,
      Components,
      Markdown,
      Pwa,
      SvgComponent,
      VueI18n,

    ],
    clearScreen: true,
    server: {
      port: DEV_PORT,
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
        ...DEV_PROXY,
      },
      watch: {
        ignored: ['**/**.d.ts'],
      },
    },
    preview: {
      host: true,
    },
    envPrefix: ['VITE_'],
    build: {
      minify: DEBUG ? false : 'esbuild',
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
      license: true,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
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
