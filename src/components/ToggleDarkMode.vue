<script setup lang='ts'>
</script>

<template>
  <i
    class="text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
    :class="isDark ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
    @click="toggleDark"
  />
</template>

<style scoped lang='less'>

</style>
