<!-- eslint-disable no-console -->
<script setup lang='ts'>
const { domRef, value, readonly } = useAiEditor()

definePage({
  meta: {
    layout: 'default',
    title: 'AiEditor Demo',
    keepAlive: false,
  },
})
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <div ref="domRef" class="h-[400px] w-full" />
    <div v-html="value" />
    <div>
      <n-switch v-model:value="readonly" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
