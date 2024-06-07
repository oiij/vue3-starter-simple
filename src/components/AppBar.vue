<script setup lang='ts'>
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="w-full flex">
    <div v-if="$slots.left">
      <slot name="left" />
    </div>
    <div class="flex-1">
      <slot>
        {{ props.title }}
      </slot>
    </div>
    <div v-if="$slots.right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
