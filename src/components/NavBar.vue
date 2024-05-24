<script setup lang='ts'>

</script>

<template>
  <Teleport to="body">
    <header class="fixed left-0 top-0 z-1000 h-16 w-full flex items-center justify-center bg-white/60 backdrop-blur-xl dark:bg-white/10">
      <nav class="w-screen-md flex-y-center justify-end gap-3 <md:w-full <md:p-x-3">
        <BackToHome class="m-r-auto" />
        <ToggleDarkMode />
        <ToggleLanguage />
        <GitHub />
      </nav>
    </header>
  </Teleport>
</template>

<style scoped lang='less'>

</style>
