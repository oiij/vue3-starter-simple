<!-- eslint-disable no-console -->
<script setup lang='ts'>
import type { SelectOption } from 'naive-ui'
import { NDivider } from 'naive-ui'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'SETTING',
    requireAuth: true,
    keepAlive: true,
    icon: 'i-mage-settings',
  },
})
const { language, colorMode } = storeToRefs(useAppStore())
const CardItem = defineComponent((props: { title?: string }, { slots }) => {
  return () => h('div', {
    class: 'flex-col gap-[10px] rounded-xl bg-white p-[20px] dark:bg-black/20',
  }, [
    h('h1', { class: 'text-xl' }, props.title ?? 'Card Name'),
    h(NDivider, { class: 'm-y-[10px]!' }),
    h('div', { class: 'flex-col gap-[10px]' }, [
      slots.default && slots.default(),
    ]),
  ])
}, {
  props: ['title'],
})
const localesOptions: SelectOption[] = [
  {
    label: '跟随系统',
    value: 'auto',
  },
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: '英文',
    value: 'en-US',
  },
]
const colorModeOptions: SelectOption[] = [
  {
    label: '跟随系统',
    value: 'auto',

  },
  {
    label: '浅色',
    value: 'light',
  },
  {
    label: '深色',
    value: 'dark',
  },
]
</script>

<template>
  <div class="flex-col gap-[10px] p-[20px]">
    <CardItem title="通用">
      <n-form-item label="语言">
        <n-select v-model:value="language" class="w-[260px]!" :options="localesOptions" />
      </n-form-item>
      <n-form-item label="颜色模式">
        <n-select v-model:value="colorMode" class="w-[260px]!" :options="colorModeOptions" />
      </n-form-item>
    </CardItem>
    <CardItem title="关于">
      <div class="w-full flex">
        <GitHub />
      </div>
    </CardItem>
  </div>
</template>

<style scoped lang='less'></style>
