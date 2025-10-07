<script setup lang="ts">
import BaseLayoutAside from './BaseLayoutAside.vue'

const { collapsed } = storeToRefs(useAppStore())
</script>

<template>
  <div class="wh-full flex-col">
    <NLayout has-sider class="min-h-0 flex-1">
      <NLayoutSider
        :width="160"
        :collapsed-width="60"
        collapse-mode="width"
        :collapsed="collapsed"
        bordered
        content-class="flex flex-col"
      >
        <BaseLayoutAside />
      </NLayoutSider>
      <NLayoutContent>
        <main class="wh-full">
          <slot />
        </main>
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<style scoped lang="less"></style>
