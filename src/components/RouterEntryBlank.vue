<script setup lang="ts">

</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive>
      <component :is="Component" :key="route.path" />
    </KeepAlive>
  </RouterView>
</template>

<style>

</style>
