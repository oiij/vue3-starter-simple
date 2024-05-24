<script setup lang="ts">
</script>

<template>
  <div class="w-full flex-col-center p-t-16">
    <NavBar />
    <TabBar />
    <main class="z-1 w-screen-md flex-col overflow-x-hidden p-x-3 <md:w-full md:p-x-10">
      <RouterEntry />
    </main>
  </div>
</template>

<style scoped lang="less"></style>
