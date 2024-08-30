<!-- eslint-disable no-console -->
<script setup lang='ts'>
const { domRef, open } = usePdf()
definePage({
  meta: {
    layout: 'blank',
    title: 'usePdfJs',
    keepAlive: false,
  },
})
function handleOpen() {
  open().then(() => {
    // saveAsPdf(canvases, 'demo')
    // saveAsFile(canvases, 'demo')
  })
}
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      usePdfJs Demo
    </h1>
    <n-button @click="handleOpen">
      Open
    </n-button>

    <div class="w-full flex-1">
      <div ref="domRef" class="w-full flex-col-center" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
