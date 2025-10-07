<script setup lang='ts'>
import type { MenuGroupOption, MenuOption } from 'naive-ui'
import { useMenu } from '~/composables/useMenu'

const { t } = useI18n()
const { collapsed } = storeToRefs(useAppStore())
const { currentRoutePath } = useAutoRoutes()
const { menuOptions } = useMenu()
const router = useRouter()
const { toggleCollapsed } = useAppStore()
function renderLabel(option: MenuOption | MenuGroupOption) {
  return t(`GLOBAL.MENU.${option.label}`)
}
function handleUpdateValue(key: string) {
  router.push(key)
}
</script>

<template>
  <div class="wh-full flex-col">
    <div class="min-h-0 w-full flex-1">
      <NScrollbar>
        <NMenu
          :collapsed="collapsed"
          :collapsed-width="60"
          :collapsed-icon-size="32"
          :indent="14"
          :icon-size="24"
          accordion
          :value="currentRoutePath"
          :options="menuOptions"
          :render-label="renderLabel"
          @update:value="handleUpdateValue"
        />
      </NScrollbar>
    </div>
    <div class="flex items-center justify-center p-y-[10px]">
      <NButton quaternary @click="toggleCollapsed">
        <template #icon>
          <Transition name="fade" mode="out-in">
            <i v-if="collapsed" class="i-mage-dots-menu" />
            <i v-else class="i-mage-dash-menu" />
          </Transition>
        </template>
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
