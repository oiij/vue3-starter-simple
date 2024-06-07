<script setup lang='ts'>

</script>

<template>
  <Teleport to="body">
    <header class="fixed left-0 top-0 z-1000 h-16 w-full flex items-center justify-center bg-white/60 p-[10px] backdrop-blur-xl dark:bg-white/10">
      <nav class="w-screen-md flex-y-center justify-end gap-3 <md:w-full <md:p-x-3">
        <AppBar>
          <template #left>
            <div class="flex items-center justify-center">
              <BackButton />
            </div>
          </template>
          <template #right>
            <div class="flex items-center justify-center gap-[10px]">
              <ToggleDarkMode />
              <ToggleLanguage />
              <GitHub />
            </div>
          </template>
        </AppBar>
      </nav>
    </header>
  </Teleport>
</template>

<style scoped lang='less'>

</style>
