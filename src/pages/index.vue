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
    <div class="h-[300px] w-[600px] border bg-white mockup-window">
      <div class="wh-full flex-col-center">
        Hello!
        <Foo />
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
