# Tech Stack

## Core

- **Vue 3.5** - 渐进式前端框架 (Composition API + `<script setup>`)
- **TypeScript 6** - 类型安全的 JavaScript
- **Vite 8** - 下一代前端构建工具

## State Management

- **Pinia 3** - Vue 状态管理
- **pinia-plugin-persistedstate** - 状态持久化
- **pinia-undo** - 状态撤销/重做

## Routing

- **Vue Router 5** - 官方路由
- **@oiij/auto-router** - 自动路由生成 (基于文件结构)
- **vue-router-better-scroller** - 路由滚动行为优化

## UI

- **Naive UI 2.44** - Vue 3 组件库
- **@oiij/naive-ui** - Naive UI 封装 (useNaiveTheme, NConfigProviders)
- **UnoCSS 66** - 原子化 CSS 引擎

## Plugins & Tools

| Category | Tools |
|----------|-------|
| Auto Import | unplugin-auto-import, @dxup/unimport |
| Components | unplugin-vue-components |
| Icons | unplugin-icons (@iconify-json/mage) |
| SVG | vite-plugin-svg-sfc, unplugin-svg-component |
| Markdown | unplugin-vue-markdown, @shikijs/markdown-it, @shikijs/twoslash |
| i18n | @oiij/auto-i18n, vue-i18n, @intlify/unplugin-vue-i18n |
| PWA | vite-plugin-pwa |
| Layouts | vite-plugin-vue-layouts |
| DevTools | vite-plugin-vue-devtools |
| Dev Experience | unplugin-turbo-console, vite-plugin-url-copy, unplugin-info |
| Build Analysis | vite-bundle-analyzer |
| Version | vite-plugin-version-mark |
| Virtual Modules | vite-plugin-virtual |
| Webfont | vite-plugin-webfont-dl |
| PostCSS | postcss-preset-env |
| Server | Nitro 3 |

## Dev Tools

- **Vitest 4** - 单元测试 (with @vitest/ui, @vue/test-utils)
- **ESLint 10** - 代码检查 (@antfu/eslint-config, @unocss/eslint-config, @unocss/eslint-plugin, eslint-plugin-format)
- **vue-tsc** - Vue TypeScript 类型检查
- **simple-git-hooks** - Git 钩子 (pre-commit: lint-staged + type:check)
- **lint-staged** - 暂存文件检查
- **cz-git / czg** - 交互式提交
- **taze** - 依赖更新
- **commitlint** - 提交信息规范

## Server

- **Nitro 3** - 服务端 API 框架 (server/api/)
- 输出目录: `.vercel/output/static` (vercel preset)

## Utilities

- **@vueuse/core** - Vue 组合式工具库
- **@oiij/use** - 自定义组合式函数 (useBoolean, useTheme)
- **@oiij/utils** - 自定义工具函数
- **@oiij/directives** - 自定义指令
- **await-to-js** - 异步错误处理 (`to()` 函数)
- **es-toolkit** - 现代 JavaScript 工具库
- **mixte** - 工具函数库
- **colord** - 颜色处理
- **nanoid** - ID 生成
- **notivue** - Vue 通知组件
- **nprogress** - 路由切换进度条
- **axios** - HTTP 客户端
- **vue-hooks-plus** - Vue Hooks 库 (useRequestDevToolsPlugin)

## Auto-Imported APIs

以下模块在 `plugins/auto-import.ts` 中配置自动导入，无需手动 import：

- `vue` - ref, computed, watch, onMounted 等
- `vue-router` - useRouter, useRoute 等
- `@vueuse/core` - useDark, useStorage 等
- `pinia` - defineStore, storeToRefs 等
- `vue-i18n` - useI18n 等
- `await-to-js` - `to()` 异步错误处理
- `@unhead/vue` - useHead, useSeoMeta 等
- `src/composables/*` - 所有导出
- `src/stores/*` - 所有导出
