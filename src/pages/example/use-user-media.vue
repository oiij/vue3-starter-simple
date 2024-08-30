<script setup lang='ts'>
definePage({
  meta: {
    layout: 'blank',
    title: 'useUserMedia',
    keepAlive: false,
  },
})
const { domRef, start, close } = useUserDisplayMedia({ display: true, manual: true })
</script>

<template>
  <div class="h-full w-full flex-col-center gap-[20px]">
    <h1 class="text-3xl">
      获取摄像头或屏幕共享
    </h1>
    <div class="h-[400px] w-[600px] overflow-hidden rounded-2xl bg-black/10">
      <video ref="domRef" class="wh-full" controls autoplay />
    </div>
    <div class="w-full flex-x-center gap-[10px]">
      <n-button @click="start">
        开始
      </n-button>
      <n-button @click="close">
        结束
      </n-button>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
