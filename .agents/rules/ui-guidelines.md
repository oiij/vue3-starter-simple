# UI Guidelines

## Styling

- **CSS Framework**: UnoCSS (atomic CSS)
- **CSS Preprocessor**: Less
- **Icons**: Mage Icons (via `@iconify-json/mage` unplugin-icons)

## Fonts

- **Sans**: DM Sans
- **Serif**: DM Serif Display
- **Mono**: DM Mono

## UnoCSS Presets

- `presetWind3` - Tailwind CSS 兼容类
- `presetAttributify` - 属性化写法
- `presetIcons` - 图标类 (scale: 1.2, inline-block)
- `presetTypography` - 排版类
- `presetWebFonts` - Web 字体 (DM Sans/Serif/Mono)
- `presetExtra` - 额外工具类
- `presetScrollbar` - 自定义滚动条
- `presetAnimations` - CSS 动画
- `presetAnimateCSS` - Animate.css 动画
- `oiijPreset` - 项目自定义 shortcuts (见 unocss.md)
- `presetTheme` - 主题变量

## UnoCSS Transformers

- `transformerDirectives` - @apply / @screen 指令
- `transformerVariantGroup` - variant group (hover:(bg-red text-white))
- `transformerAttributifyJsx` - JSX 属性化
- `transformerCompileClass` - 编译时 class 合并

## Component Library

- 使用 `@oiij/naive-ui` 封装组件 (NaiveUiResolver 自动解析)
- 通过 `<NConfigProviders>` 全局配置主题、语言、日期语言
- Naive UI 组件直接使用，无需手动导入

## Theme

- 支持亮色/暗色模式切换 (useTheme / useDark)
- 通过 `useAppStore()` 管理主题状态 (theme, themeOverrides, colors)
- 暗色主题主色: `#00aba9`
- 主题状态通过 pinia-plugin-persistedstate 持久化

## Layouts

- `BaseLayout.vue` - 基础布局 (NLayoutSider 160px + NLayoutContent)
- `BaseLayoutAside.vue` - 侧边栏内容组件
- `blank.vue` - 空白布局 (仅包裹 RouterEntry)
- 使用 `vite-plugin-vue-layouts` 根据文件名自动注册布局

## Animation

- 页面切换: `<Transition appear mode="out-in" name="fade">`
- 路由切换进度条: nprogress
- CSS 动画库: Animate.css, unocss-preset-animations

## Icons

- 使用 `<script setup>` 导入: `import Home from '~icons/mage/home'`
- 或使用 UnoCSS icon 类: `<span class="i-mage-home" />`
- 图标库: @iconify-json/mage

## PWA

- Service Worker (workbox)
- 离线支持
- Web 更新通知 (@plugin-web-update-notification/vite)

## Head Management

- 通过 `@unhead/vue` (useHead) 管理 title, meta, link
- 动态 theme-color 根据暗色模式切换
- 动态 favicon 根据偏好切换

## Notifications

- notivue 通知组件 (通过 NotivueProvider 全局提供)
