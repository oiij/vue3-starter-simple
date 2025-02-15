<script setup lang='ts'>
defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'HOME',
    requireAuth: true,
    keepAlive: true,
    icon: 'i-mage-home',

  },
})
useHead({
  title: '首页',
})
</script>

<template>
  <div class="wh-full flex-col-center gap-10">
    <h1>首页</h1>
  </div>
</template>

<style scoped lang='less'>

</style>
