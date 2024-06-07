<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const keepAliveName = computed(() => useRouter().getRoutes().filter(f => !f.meta.isLayout).filter(f => f.meta.keepAlive).map((m) => {
  return m.path
}))

// 用来存已经创建的组件
const wrapperMap = new Map()
// 将router传个我们的组件重新换一个新的组件，原组件包里面
function formatComponentInstance(component: Component, route: RouteLocationNormalizedLoaded) {
  let wrapper
  if (component) {
    const wrapperName = route.path
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName)
    }
    else {
      wrapper = {
        name: wrapperName,
        render() {
          return h(component)
        },
      }
      wrapperMap.set(wrapperName, wrapper)
    }
    return h(wrapper)
  }
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear mode="out-in" :name="route.meta.transition">
      <KeepAlive :include="keepAliveName">
        <Suspense>
          <component :is="formatComponentInstance(Component, route)" :key="route.path" />
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

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-left-enter-from {
  transform: translate(50%, 0);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translate(20%, 0);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translate(-50%, 0);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translate(-20%, 0);
  opacity: 0;
}
</style>
