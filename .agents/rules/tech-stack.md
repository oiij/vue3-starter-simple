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

## UI

- **@oiij/naive-ui** - Naive UI 组件库封装
- **Naive UI 2.44** - Vue 3 组件库
- **UnoCSS 66** - 原子化 CSS 引擎

## Plugins & Tools

| Category | Tools |
|----------|-------|
| Auto Import | unplugin-auto-import, @dxup/unimport |
| Components | unplugin-vue-components |
| Icons | unplugin-icons (@iconify-json/mage) |
| Markdown | unplugin-vue-markdown, @shikijs/markdown-it |
| i18n | @oiij/auto-i18n, vue-i18n |
| PWA | vite-plugin-pwa |
| Layouts | vite-plugin-vue-layouts |
| DevTools | vite-plugin-vue-devtools |

## Dev Tools

- **Vitest 4** - 单元测试
- **ESLint 10** - 代码检查 (@antfu/eslint-config)
- **simple-git-hooks** - Git 钩子
- **cz-git** - 交互式提交

## Server

- **Nitro 3** - 服务端渲染/API 框架

## Utilities

- **@vueuse/core** - Vue 组合式工具库
- **@oiij/use** - 自定义组合式函数
- **await-to-js** - 异步错误处理
- **es-toolkit** - 现代 JavaScript 工具库
- **colord** - 颜色处理
- **nanoid** - ID 生成