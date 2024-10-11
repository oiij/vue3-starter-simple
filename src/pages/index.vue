<script setup lang='ts'>
defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'HOME',
    requireAuth: true,
    keepAlive: true,
    icon: 'svg:pixel-travel-icon-民宿',
  },
})
useHead({
  title: '首页',
})
</script>

<template>
  <div class="flex-col-center gap-10">
    <HelloWorld />
    <div class="flex items-center justify-center gap-1">
      <NButton v-track:exposure>
        ExposureTrack
      </NButton>
      <NButton v-track:click>
        ClickTrack
      </NButton>
      <NButton v-track:long-press>
        LongPressTrack
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>
</style>
