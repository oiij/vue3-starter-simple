# Project Info

## Basic Information

- **Project Name**: vue3-starter-simple
- **Type**: Web Application (SPA/PWA)
- **Version**: 0.0.1
- **Author**: oiij

## Project Structure

```
src/
├── assets/          # 静态资源 (样式、图片)
├── components/      # 通用组件
├── composables/     # Vue 组合式函数
├── layouts/         # 布局组件
├── pages/           # 页面组件
├── stores/          # Pinia 状态管理
├── utils/           # 工具函数
├── App.vue          # 根组件
plugins/             # Vite 插件配置
server/              # 服务端 API (Nitro)
```

## Scripts

- `pnpm dev` - 开发服务器
- `pnpm build` - 构建生产版本
- `pnpm lint` - 代码检查
- `pnpm test` - 运行测试
- `pnpm type:check` - 类型检查

## Features

- 自动路由 (file-based routing)
- 自动组件导入
- PWA 支持
- 暗色模式
- 国际化 (vue-i18n)
- 页面切换动画
- Web 更新通知