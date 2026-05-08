# Vue3 Starter Simple

<div align="center" style="display:flex;justify-content: center;">

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.34-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.11-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0.4-FFD859?style=flat&logo=pinia&logoColor=white)](https://pinia.vuejs.org/)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-66.6.8-4B5563?style=flat&logo=unocss&logoColor=white)](https://unocss.dev/)
[![Naive UI](https://img.shields.io/badge/Naive_UI-2.44.1-5396EF?style=flat&logoColor=white)](https://www.naiveui.com/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-5.0.6-4FC08D?style=flat&logoColor=white)](https://router.vuejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1.5-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-10.3.0-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![pnpm](https://img.shields.io/badge/pnpm-latest-F69220?style=flat&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](https://github.com/oiij/vue3-starter-simple/blob/main/LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/oiij/vue3-starter-simple/pulls)
[![GitHub stars](https://img.shields.io/github/stars/oiij/vue3-starter-simple?style=flat&logo=github)](https://github.com/oiij/vue3-starter-simple/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/oiij/vue3-starter-simple?style=flat&logo=github)](https://github.com/oiij/vue3-starter-simple/network/members)
[![GitHub issues](https://img.shields.io/github/issues/oiij/vue3-starter-simple?style=flat&logo=github)](https://github.com/oiij/vue3-starter-simple/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/oiij/vue3-starter-simple?style=flat&logo=github)](https://github.com/oiij/vue3-starter-simple/commits/main)

</div>

一个现代化的 Vue 3 + Vite + TypeScript 项目启动模板，集成了最佳实践和丰富的功能特性。

## ✨ 特性

- 🚀 **Vue 3** - 最新的 Vue 3 Composition API
- ⚡️ **Vite** - 快速的开发服务器和构建工具
- 🎨 **UnoCSS** - 即时按需原子化 CSS 引擎
- 📦 **Pinia** - 新一代状态管理库
- 🛣 **Vue Router** - 官方路由管理器，支持类型化路由
- 🌍 **Vue I18n** - 国际化支持
- 💪 **TypeScript** - 类型安全
- 🎭 **Naive UI** - 企业级 Vue 3 组件库
- 📱 **PWA** - 渐进式 Web 应用支持
- 🔥 **热更新** - 极速的 HMR
- 🎯 **自动导入** - 组件和 API 自动导入
- 📐 **ESLint** - 代码质量检查
- 🎨 **Icons** - Iconify 图标集成
- 🧪 **Vitest** - 快速的单元测试框架
- 📝 **Markdown** - Markdown 作为组件支持
- 🔄 **Git Hooks** - 代码提交前检查
- 🎬 **动画** - 内置多种动画预设
- 🔌 **插件系统** - 模块化的插件架构
- 📦 **Nitro** - 轻量级服务器引擎（支持 Vercel 部署）

## 📦 技术栈

### 核心框架

- Vue 3.5.34
- Vite 8.0.11
- TypeScript 6.0.3
- Pinia 3.0.4
- Vue Router 5.0.6

### UI 组件库

- Naive UI 2.44.1
- @oiij/naive-ui 0.0.82

### 样式方案

- UnoCSS 66.6.8
- UnoCSS 预设集合（animatecss、animations、extra、scrollbar、theme）
- PostCSS + Less

### 工具库

- @vueuse/core 14.3.0
- vue-hooks-plus 2.4.3
- es-toolkit 1.46.1
- axios 1.16.0
- await-to-js 3.0.0
- nanoid 5.1.11
- colord 2.9.3
- notivue 2.4.5

### 开发工具

- unplugin-auto-import - API 自动导入
- unplugin-vue-components - 组件自动导入
- unplugin-icons - 图标自动导入
- unplugin-vue-markdown - Markdown 支持
- vite-plugin-vue-layouts - 布局系统
- vite-plugin-vue-devtools - Vue 开发者工具
- @intlify/unplugin-vue-i18n - i18n 支持
- vite-bundle-analyzer - 构建分析

### 代码规范

- ESLint 10 + @antfu/eslint-config
- simple-git-hooks + lint-staged
- commitlint + cz-git

## 🚀 快速开始

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install
```

### 开发

```bash
pnpm dev
```

访问 [http://localhost:5678](http://localhost:5678)

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

## 📜 脚本命令

```json
{
  "dev": "启动开发服务器（端口 5678）",
  "build": "类型检查并构建生产版本",
  "preview": "本地预览生产构建",
  "lint": "代码检查",
  "lint:fix": "自动修复代码问题",
  "test": "运行测试",
  "type:check": "TypeScript 类型检查",
  "update:deps": "更新依赖",
  "commit": "提交代码（带规范）",
  "cz": "使用交互式提交",
  "pull": "拉取最新代码",
  "release": "发布版本"
}
```

## 📁 项目结构

```
vue3-starter-simple/
├── config/                 # 应用配置常量
│   └── index.ts           # 端口、API 前缀等配置
├── plugins/                # Vite 插件配置
│   ├── auto-import.ts     # 自动导入配置
│   ├── components.ts      # 组件自动导入
│   ├── markdown.ts        # Markdown 支持
│   ├── pwa.ts            # PWA 配置
│   ├── svg-component.ts  # SVG 组件
│   ├── vue-i18n.ts       # 国际化
│   └── vue-router.ts     # 路由
├── public/                # 静态资源
├── server/                # Nitro API 路由（Vercel 部署）
├── src/
│   ├── assets/           # 资源文件
│   ├── components/       # 组件（自动导入）
│   ├── composables/      # 组合式函数（自动导入）
│   ├── layouts/          # 布局组件
│   ├── locales/          # 国际化文件
│   ├── modules/          # 功能模块
│   ├── pages/            # 页面（文件路由）
│   ├── stores/           # 状态管理（自动导入）
│   ├── test/             # 测试文件
│   ├── utils/            # 工具函数
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .gitignore
├── commitlint.config.js  # Commitlint 配置
├── eslint.config.js      # ESLint 配置
├── index.html            # HTML 模板
├── nitro.config.ts       # Nitro 服务器配置
├── package.json
├── tsconfig.json         # TypeScript 配置
├── uno.config.ts         # UnoCSS 配置
├── vercel.json           # Vercel 部署配置
├── vite.config.ts        # Vite 配置
└── vitest.config.ts      # Vitest 配置
```

## 🔧 配置说明

### 路径别名

```typescript
// ~ 指向 src 目录
import { something } from '~/utils'
```

### 开发服务器配置

```typescript
// config/index.ts
export const DEV_PORT = 5678        // 前端开发端口
export const SERVER_PORT = 5633      // 后端 API 端口
export const API_BASE_PREFIX = '/api' // API 路径前缀
```

### 自动导入

项目配置了组件和 API 的自动导入，无需手动 import：

- Vue API（ref、reactive、computed 等）
- Vue Router API
- Pinia API
- VueUse API
- `src/composables/*` 导出自动导入
- `src/stores/*` 导出自动导入
- `src/components/**/*.{vue,md}` 组件自动导入

### 主题定制

UnoCSS 配置文件：`uno.config.ts`

### 国际化

支持多语言，配置文件位于 `src/locales/`

## 🎨 UI 组件

项目使用 Naive UI 作为主要组件库，提供：

- 丰富的组件集
- 主题定制
- TypeScript 支持
- 按需加载

## 🧪 测试

```bash
# 运行测试
pnpm test

# 测试 UI
pnpm test --ui
```

## 📦 构建与部署

### 构建优化

- Tree Shaking
- 代码分割
- 资源压缩
- 生产环境自动移除 console/debugger
- Sourcemap 支持

### Vercel 部署

项目使用 Nitro 作为服务器引擎，支持 Vercel 部署：

- 输出目录：`.vercel/output/static`
- 自动适配 Vercel Serverless Functions

### 版本标记

自动注入构建版本信息和 Git SHA。

## 🔄 Git 提交规范

项目使用 commitlint + cz-git 进行提交规范管理：

```bash
# 使用交互式提交
pnpm cz

# 或使用快捷命令
pnpm commit
```

提交类型：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

## 📝 开发规范

### TypeScript

- 严格模式
- 类型定义使用 `type` 而非 `interface`（ESLint 规则强制）
- 路径别名 `~` 指向 `src` 目录

### Vue

- 使用 Composition API + `<script setup>`
- 组件名使用 PascalCase
- 遵循 Vue 3 最佳实践

### 样式

- 使用 UnoCSS 原子化 CSS
- 支持 Less 预处理器
- CSS Modules 支持

## 🛠️ 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 📄 许可证

[MIT](./LICENSE)

## 👨‍💻 作者

oiij

## 🔗 相关链接

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [UnoCSS](https://unocss.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Nitro](https://nitro.unjs.io/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⭐ Star History

如果这个项目对你有帮助，请给一个 Star ⭐️

---

由 ❤️ 创建