<script setup lang='ts'>
import { is } from '@oiij/utils'
import { computed } from 'vue'

const { prefix = 'icon-', name, color = '#000', size = 1 } = defineProps<{
  prefix?: string
  name: string
  color?: string
  size?: number | string
}>()
const symbolId = computed(() => `#${prefix}${name}`)
const _size = computed(() => {
  return is.isNumber(size) ? `${size}em` : size
})
</script>

<template>
  <svg aria-hidden="true" :style="{ width: _size, height: _size }">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped lang='less'>

</style>
