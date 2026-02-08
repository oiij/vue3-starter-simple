<script setup lang='ts'>
import Foo from '~/components/Foo'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'SUB-PAGE',
    keepAlive: true,
    icon: 'i-mage-dots-menu',
    parent: {
      title: 'SUB',
      icon: 'i-mage-dashboard-check',
    },
  },
})
useHead({
  title: 'SUB-PAGE',
})
</script>

<template>
  <div class="wh-full flex-col-center gap-10">
    Hello! SUB-PAGE
    <Foo />
  </div>
</template>

<style scoped lang='less'>

</style>
