<script setup lang='ts'>
import Foo from '~/components/Foo'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'HOME',
    icon: 'svg:icon-home',
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
