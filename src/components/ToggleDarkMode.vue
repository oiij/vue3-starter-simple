<script setup lang='ts'>
</script>

<template>
  <button
    type="button"
    class="inline-flex bg-transparent text-xl transition-base hover:scale-110"
    :class="isDark ? 'text-[#FFEB3B]/50' : 'text-[#FF7043]'"
    @click="(ev) => toggleDark(ev, true)"
  >
    <Transition enter-active-class="animated animated-faster animated-rotate-in" leave-active-class="animated animated-faster animated-rotate-out" mode="out-in">
      <i v-if="isDark" class="i-ri-moon-fill" />
      <i v-else class="i-ri-sun-fill" />
    </Transition>
  </button>
</template>

<style scoped lang='less'>

</style>
