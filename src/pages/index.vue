<script setup lang='ts'>
import Foo from '~/components/Foo'

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
    Hello!
    <Foo />
  </div>
</template>

<style scoped lang='less'>

</style>
