<script setup lang="ts">
import { defineComponent, h } from 'vue'

import {
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
} from 'naive-ui'

const { theme, themeOverrides, locale, dateLocale } = useNaiveTheme()

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}
const NaiveProviderContent = defineComponent({
  setup() {
    onMounted(() => {
      registerNaiveTools()
    })
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <n-config-provider
    abstract
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <NLoadingBarProvider>
      <NDialogProvider>
        <NModalProvider>
          <NNotificationProvider>
            <NMessageProvider>
              <slot />
              <NaiveProviderContent />
            </NMessageProvider>
          </NNotificationProvider>
        </NModalProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped></style>
