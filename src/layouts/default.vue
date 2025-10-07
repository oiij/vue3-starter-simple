<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import BaseLayout from './BaseLayout.vue'

const { reloadFlag, transitionName } = storeToRefs(useAppStore())
const { keepAlivePath, currentRoutePath } = useAutoRoutes()

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
  <div class="h-[100vh] w-[100vw]">
    <BaseLayout>
      <RouterView v-slot="{ Component, route }">
        <Transition appear mode="out-in" :name="transitionName">
          <KeepAlive :include="keepAlivePath" :exclude="reloadFlag ? currentRoutePath : undefined">
            <Suspense>
              <component :is="formatComponentInstance(Component, route)" v-if="!reloadFlag" :key="route.path" />
              <template #fallback>
                <slot name="fallback">
                  Component Fallback
                </slot>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </RouterView>
    </BaseLayout>
  </div>
</template>

<style scoped lang="less"></style>
