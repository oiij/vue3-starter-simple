# Project Info

## Basic Information

- **Project Name**: vue3-starter-simple
- **Type**: Web Application (SPA/PWA)
- **Version**: 0.0.1
- **Author**: oiij
- **License**: MIT

## Project Structure

```
src/
├── assets/          # 静态资源 (样式、图片、SVG 图标)
│   ├── icons/       # SVG 图标
│   └── style/       # 全局样式 (index.css, markdown.css, page-transition.css, style-classic.css, style-rich.css)
├── components/      # 通用组件 (自动导入)
├── composables/     # Vue 组合式函数 (自动导入)
├── layouts/         # 布局组件 (通过 vite-plugin-vue-layouts 自动注册)
├── locales/         # i18n 翻译文件 (en-US.json, zh-CN.json)
├── modules/         # 应用模块注册 (i18n, pinia, router, directives, notivue, head)
├── pages/           # 页面组件 (通过 @oiij/auto-router 基于文件结构自动生成路由)
├── stores/          # Pinia 状态管理 (自动导入)
├── test/            # 测试文件
├── utils/           # 工具函数 (http, render-icon)
├── App.vue          # 根组件
├── main.ts          # 应用入口
config/              # 应用常量 (DEV_PORT=5678, SERVER_PORT=5633, DEV_PROXY)
plugins/             # Vite 插件配置 (barrel-exported from plugins/index.ts)
server/              # Nitro API 路由 (server/api/)
```

## Scripts

- `pnpm dev` - Vite 开发服务器 (port 5678, proxy /api → port 5633)
- `pnpm build` - vue-tsc --noEmit && vite build
- `pnpm lint` - ESLint 检查
- `pnpm lint:fix` - ESLint 自动修复
- `pnpm test` - Vitest 运行测试
- `pnpm type:check` - TypeScript 类型检查
- `pnpm cz` - 交互式提交 (czg/cz-git)
- `pnpm commit` - git pull + add + cz + push 快捷命令
- `pnpm release` - git pull + build 发布

## Features

- File-based routing (via @oiij/auto-router)
- Auto-import APIs (vue, vue-router, vueuse, pinia, vue-i18n, await-to-js)
- Auto-import composables and stores (src/composables, src/stores)
- Auto-import components (src/components + NaiveUiResolver + VueUseComponentsResolver)
- PWA support (vite-plugin-pwa)
- Dark mode / Light mode toggle
- Internationalization (vue-i18n, @oiij/auto-i18n)
- Page transition animations (fade)
- Route progress bar (nprogress)
- Web update notification
- Markdown pages (unplugin-vue-markdown + Shiki syntax highlighting)
- SVG component support (vite-plugin-svg-sfc, unplugin-svg-component)
- Nitro server API routes
- Post-commit hooks (simple-git-hooks: lint-staged + type:check)

## Key Conventions

- **Package Manager**: pnpm only (enforced by preinstall hook)
- **TypeScript**: Use `type` not `interface` (eslint rule)
- **Vue**: Composition API + `<script setup>` only
- **Path Alias**: `~` → `src/`
- **CSS**: UnoCSS atomic classes (not Tailwind)
- **Icons**: `@iconify-json/mage` via unplugin-icons
- **Formatting**: ESLint handles formatting (no Prettier)
- **Git Commits**: czg/cz-git interactive commit (feat/fix/docs/style/refactor/perf/type/test/build/ci/revert/chore)
