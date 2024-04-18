<script setup lang=ts>
defineOptions({
  name: 'DefineInput',
})
const value = defineModel<number>('value', { default: 0 })
</script>

<template>
  <button @click="value++">
    +（{{ value }}）
  </button>
</template>
