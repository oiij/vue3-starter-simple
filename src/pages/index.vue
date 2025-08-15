<script setup lang='ts'>
defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'HOME',
    requireAuth: true,
    keepAlive: true,
    icon: 'svg:icon-pixel-travel-icon-比基尼',

  },
})
useHead({
  title: '首页',
})
</script>

<template>
  <div class="wh-full flex-col-center gap-10">
    <h1 v-copy="'copy'">
      首页
    </h1>
  </div>
</template>

<style scoped lang='less'>

</style>
