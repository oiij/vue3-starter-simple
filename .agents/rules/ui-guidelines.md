# UI Guidelines

## Styling

- **CSS Framework**: UnoCSS (atomic CSS)
- **CSS Preprocessor**: Less
- **Icons**: Mage Icons (via `@iconify-json/mage`)

## Fonts

- **Sans**: DM Sans
- **Serif**: DM Serif Display
- **Mono**: DM Mono

## UnoCSS Presets

- `presetWind3` - Tailwind CSS 兼容类
- `presetAttributify` - 属性化写法
- `presetIcons` - 图标类
- `presetTypography` - 排版类
- `presetWebFonts` - Web 字体
- `presetExtra` - 额外工具类
- `presetScrollbar` - 自定义滚动条
- `presetAnimations` - CSS 动画
- `presetAnimateCSS` - Animate.css 动画

## Component Library

- 使用 `@oiij/naive-ui` 封装组件
- 通过 `NConfigProviders` 全局配置主题

## Theme

- 支持亮色/暗色模式切换
- 通过 `useAppStore()` 管理主题状态
- 暗色主题色: `#00aba9`

## Layouts

- `BaseLayout.vue` - 基础布局 (Header + Sidebar + Main)
- `BaseLayoutAside.vue` - 侧边栏变体
- `blank.vue` - 空白布局
- 使用 `vite-plugin-vue-layouts` 实现布局切换

## Animation

- 页面切换使用 `<Transition>` + `fade` 动画
- 路由切换进度条 (nprogress)
- CSS 动画库: Animate.css, unocss-preset-animations

## PWA

- Service Worker (workbox)
- 离线支持
- 更新通知 (`@plugin-web-update-notification/vite`)