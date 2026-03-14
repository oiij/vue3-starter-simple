<script setup lang='ts'>
import { useRequest } from 'vue-hooks-plus'
import Foo from '~/components/Foo'
import { post } from '~/utils/http'

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
const { data } = useRequest(() => post('/hello'), {
  debugKey: 'hello',
})
</script>

<template>
  <div class="wh-full flex-col-center gap-10">
    <span>Hello!</span>
    <span>{{ data }}</span>
    <Foo />
  </div>
</template>

<style scoped lang='less'>

</style>
