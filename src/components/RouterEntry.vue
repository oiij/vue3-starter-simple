<script setup lang="ts">
const keepAliveName = computed(() => new RegExp(useRouter().getRoutes().filter(f => !f.meta.isLayout).filter(f => f.meta.keepAlive).map((m) => {
  const name = m.name?.toString().match(/([^/]+)/) ? m.name.toString().match(/([^/]+)/)![1] : 'index'
  return `${name}|${toUpperCamelCase(name)}`
}).join('|'), 'i'))
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear mode="out-in" :name="route.meta.transition">
      <KeepAlive :include="keepAliveName">
        <Suspense>
          <component :is="Component" :key="route.path" />
          <template #fallback>
            <slot name="fallback">
              Component Fallback
            </slot>
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: scale(0.99);
  opacity: 0;
}

.slide-left-move,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-left-enter-from {
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  transform: translate(10%, 0);
  opacity: 0;
}

.slide-right-move,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-right-enter-from {
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  transform: translate(-10%, 0);
  opacity: 0;
}
</style>
