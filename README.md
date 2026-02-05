<p align='center'>
  <a href="https://vue3-starter-simple.vercel.app/">Live Demo</a>
</p>

# Vue 3 Starter Simple

一个基于 Vue 3 + TypeScript + Vite 的现代化前端项目模板，开箱即用，提供完整的开发体验。

## 特性

- ⚡️ **Vue 3** - 使用 Composition API 和 `<script setup>` 语法
- 📦 **TypeScript** - 完整的类型安全支持
- 🎨 **UnoCSS** - 原子化 CSS 引擎，Tailwind CSS 超集
- 🗂️ **自动路由** - 基于文件系统的路由生成
- 📦 **自动导入** - 组件、API、图标自动导入，无需手动引入
- 🎨 **Naive UI** - 优秀的 Vue 3 组件库
- 🌍 **国际化** - 内置 Vue I18n 支持
- 📱 **PWA** - 支持离线访问和安装
- 🧪 **Vitest** - 单元测试框架
- 📝 **ESLint** - 基于 @antfu/eslint-config 的代码规范
- 🔧 **Git Hooks** - 自动化代码检查和格式化
- 🎯 **Pinia** - Vue 官方推荐的状态管理库
- 🎭 **布局系统** - 灵活的布局管理
- 🌓 **主题切换** - 支持明暗主题
- 📊 **进度条** - 页面加载进度条
- 🔔 **通知系统** - 基于 Notivue 的消息通知
- 📄 **Markdown** - 支持 Markdown 组件
- 🎨 **SVG 组件** - SVG 文件自动转换为组件

## 预装插件

### 核心框架

- `vue` ^3.5.27
- `vue-router` ^5.0.2
- `pinia` ^3.0.4
- `vue-i18n` ^11.2.8

### UI 组件

- `naive-ui` ^2.43.2
- `@oiij/naive-ui` ^0.0.74
- `notivue` ^2.4.5

### 工具库

- `@vueuse/core` ^14.2.0
- `axios` ^1.13.4
- `await-to-js` ^3.0.0
- `es-toolkit` ^1.44.0
- `nanoid` ^5.1.6
- `nprogress` ^0.2.0

### 开发工具

- `vite` ^7.3.1
- `typescript` ^5.9.3
- `vitest` ^4.0.18
- `eslint` ^9.39.2
- `unocss` 66.6.0

### Vite 插件

- `unplugin-auto-import` - API 自动导入
- `unplugin-vue-components` - 组件自动导入
- `unplugin-icons` - 图标自动导入
- `unplugin-vue-router` - 自动路由
- `vite-plugin-vue-layouts` - 布局系统
- `vite-plugin-pwa` - PWA 支持
- `vite-plugin-vue-devtools` - Vue DevTools

## 编码风格

项目使用 [Anthony Fu](https://github.com/antfu) 的 ESLint 配置，遵循以下规范：

- 使用 Composition API 和 `<script setup>` 语法
- 使用 `type` 定义类型
- 组件名使用 PascalCase
- 自动导入，无需手动引入
- 代码格式化使用 Prettier

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

### 修复代码

```bash
pnpm lint:fix
```

### 类型检查

```bash
pnpm type:check
```

### 运行测试

```bash
pnpm test
```

## 项目结构

```
vue3-starter-simple/
├── src/
│   ├── assets/          # 静态资源
│   │   ├── icons/       # 图标
│   │   └── style/       # 样式文件
│   ├── components/      # 公共组件
│   ├── composables/     # 组合式函数
│   ├── layouts/         # 布局组件
│   ├── locales/         # 国际化文件
│   ├── modules/         # 模块配置
│   ├── pages/           # 页面组件（自动路由）
│   ├── stores/          # Pinia 状态管理
│   ├── utils/           # 工具函数
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── test/                # 测试文件
├── public/              # 公共资源
├── config/              # 配置文件
├── plugins/             # Vite 插件配置
└── api/                 # API 接口
```

## Git 贡献提交规范

项目使用 [cz-git](https://cz-git.qbenben.com/) 进行交互式提交，遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交类型

- `init` - 初始化
- `feat` - 新增功能
- `fix` - 修复缺陷
- `docs` - 文档更新
- `style` - 代码格式
- `refactor` - 代码重构
- `perf` - 性能提升
- `test` - 测试相关
- `build` - 构建相关
- `ci` - 持续集成
- `revert` - 回退代码
- `chore` - 其他修改

### 提交范围

- `projects` - 项目搭建
- `components` - 组件相关
- `hooks` - hook 相关
- `utils` - utils 相关
- `types` - ts 类型相关
- `styles` - 样式相关
- `deps` - 项目依赖
- `auth` - 对 auth 修改
- `release` - 版本发布
- `other` - 其他修改

### 提交命令

```bash
# 交互式提交
pnpm cz

# 拉取 + 提交 + 推送
pnpm commit
```

## 许可证

[MIT](LICENSE)
