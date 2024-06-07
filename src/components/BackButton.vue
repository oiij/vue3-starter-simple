<script setup lang='ts'>
const route = useRoute()
const router = useRouter()
const isBase = computed(() => route.path.split('/').length <= 2)
</script>

<template>
  <button
    type="button"
    class="inline-flex bg-transparent text-xl transition-base hover:scale-110"
    @click="() => isBase ? router.push('/') : router.back() "
  >
    <Transition enter-active-class="animated animated-faster animated-zoom-in" leave-active-class="animated animated-faster animated-zoom-out" mode="out-in">
      <i v-if="isBase" class="i-ri-vuejs-fill" />
      <i v-else class="i-ri-arrow-left-s-line" />
    </Transition>
  </button>
</template>

<style scoped lang='less'>

</style>
