<script setup lang='ts'>
definePage({
  meta: {
    layout: 'blank',
    title: 'useIWebSocket',
    keepAlive: false,
  },
})
const { status, data, connect, send, close, destroy } = useIWebSockets('http://127.0.0.1:5631/_ws', {
  protocols: 'test',
  manual: true,
})
</script>

<template>
  <div class="h-full w-full flex-col-center gap-[20px]">
    <h1 class="text-3xl">
      获取摄像头或屏幕共享
    </h1>
    {{ status }}
    {{ data }}
    <div class="flex gap-1">
      <n-button @click="connect">
        连接
      </n-button>
      <n-button @click="() => send('message')">
        发送
      </n-button>
      <n-button @click="close">
        关闭
      </n-button>
      <n-button @click="destroy">
        卸载
      </n-button>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
