<script setup lang="ts">
import type { MenuGroupOption, MenuOption } from 'naive-ui'

const { t } = useI18n()
const { collapsed } = storeToRefs(useAppStore())
const { toggleCollapsed } = useAppStore()
const { naiveMenu, currentPath, setPath } = useAutoRouter()
function renderLabel(option: MenuOption | MenuGroupOption) {
  return t(`GLOBAL.MENU.${option.label}`)
}
</script>

<template>
  <div class="wh-full flex-col">
    <n-layout has-sider class="min-h-0 flex-1">
      <n-layout-sider
        :width="160"
        :collapsed-width="60"
        collapse-mode="width"
        :collapsed="collapsed"
        bordered
        content-class="flex flex-col"
      >
        <div class="w-full flex-1">
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="60"
            :collapsed-icon-size="24"
            :root-indent="20"
            :value="currentPath"
            :options="naiveMenu"
            :render-label="renderLabel"
            @update:value="setPath"
          />
        </div>
        <div class="flex items-center justify-center p-y-[10px]">
          <n-button quaternary @click="toggleCollapsed">
            <template #icon>
              <Transition name="fade" mode="out-in">
                <i v-if="collapsed" class="i-mage-dots-menu" />
                <i v-else class="i-mage-dash-menu" />
              </Transition>
            </template>
          </n-button>
        </div>
      </n-layout-sider>
      <n-layout-content>
        <main class="wh-full">
          <RouterEntry />
        </main>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<style scoped lang="less"></style>
