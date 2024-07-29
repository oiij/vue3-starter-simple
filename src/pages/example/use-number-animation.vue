<script setup lang='ts'>
definePage({
  meta: {
    layout: 'default',
    title: 'useNumberAnimation',
    keepAlive: true,
  },
})
const { value } = useNumberAnimation(100)
</script>

<template>
  <div>
    <div>{{ value }}</div>
  </div>
</template>

<style scoped lang='less'>

</style>
