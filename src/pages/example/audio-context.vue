<!-- eslint-disable no-console -->
<script setup lang='ts'>
const { domRef } = useAudioContext()
definePage({
  meta: {
    layout: 'default',
    title: 'AudioContext Demo',
    keepAlive: false,
  },
})
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      AudioContext Demo
    </h1>
    <audio ref="domRef" controls crossorigin="anonymous" src="https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/7241429743491369783.mp3" />
  </div>
</template>

<style scoped lang='less'>

</style>
