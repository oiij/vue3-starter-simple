<script setup lang='ts'>
import README from '../../README.md'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'ABOUT',
    keepAlive: true,
    icon: 'i-mage-information-circle',
  },
})
</script>

<template>
  <div class="p-10">
    <README />
  </div>
</template>

<style scoped lang='less'>

</style>
