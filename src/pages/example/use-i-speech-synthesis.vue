<script setup lang='ts'>
definePage({
  meta: {
    layout: 'blank',
    title: 'useISpeechSynthesis',
    keepAlive: false,
  },
})
const { speak } = useISpeechSynthesis()
</script>

<template>
  <div class="h-full w-full flex-col-center gap-[20px]">
    <h1 class="text-3xl">
      获取摄像头或屏幕共享
    </h1>
    <div class="">
      <n-button @click="speak('你好')">
        点击说话
      </n-button>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
