<script setup lang="ts">
import type {
  ConfigProviderProps,
  DialogProviderInst,
  DialogProviderProps,
  LoadingBarProviderInst,
  LoadingBarProviderProps,
  MessageProviderInst,
  MessageProviderProps,
  ModalProviderInst,
  ModalProviderProps,
  NotificationProviderInst,
  NotificationProviderProps,
} from 'naive-ui'

import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
  useDialog,
  useLoadingBar,
  useMessage,
  useModal,
  useNotification,
} from 'naive-ui'
import { defineComponent, onMounted } from 'vue'

const {
  configProviderProps,
  loadingBarProps,
  dialogProviderProps,
  modalProviderProps,
  notificationProviderProps,
  messageProviderProps,
} = defineProps<{
  configProviderProps?: ConfigProviderProps
  loadingBarProps?: LoadingBarProviderProps
  dialogProviderProps?: DialogProviderProps
  modalProviderProps?: ModalProviderProps
  notificationProviderProps?: NotificationProviderProps
  messageProviderProps?: MessageProviderProps
}>()
declare global {
  interface Window {
    $dialog: DialogProviderInst
    $loadingBar: LoadingBarProviderInst
    $message: MessageProviderInst
    $modal: ModalProviderInst
    $notification: NotificationProviderInst
  }
}
// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$dialog = useDialog()
  window.$loadingBar = useLoadingBar()
  window.$message = useMessage()
  window.$modal = useModal()
  window.$notification = useNotification()
}
const NaiveProviderContent = defineComponent({
  setup() {
    onMounted(() => {
      registerNaiveTools()
    })
  },
  render() {
    return null
  },
})
</script>

<template>
  <NConfigProvider
    abstract
    v-bind="configProviderProps"
  >
    <NLoadingBarProvider v-bind="loadingBarProps">
      <NDialogProvider v-bind="dialogProviderProps">
        <NModalProvider v-bind="modalProviderProps">
          <NNotificationProvider v-bind="notificationProviderProps">
            <NMessageProvider v-bind="messageProviderProps">
              <slot />
              <NaiveProviderContent />
            </NMessageProvider>
          </NNotificationProvider>
        </NModalProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<style scoped></style>
