<script setup lang='ts'>
const { value } = useNumberAnimation(100)
</script>

<template>
  <div>
    <div>{{ value }}</div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang='yaml'>
name:
meta:
  layout: default
  title: UseNumberAnimation
</route>
