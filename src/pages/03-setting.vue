<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { NDivider } from 'naive-ui'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'SETTING',
    keepAlive: true,
    icon: 'i-mage-settings',
  },
})
const { t } = useI18n()
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
const localesOptions = computed(() => [
  {
    label: t('GLOBAL.auto-language'),
    value: 'auto',
  },
  {
    label: t('GLOBAL.zh-CN'),
    value: 'zh-CN',
  },
  {
    label: t('GLOBAL.en-US'),
    value: 'en-US',
  },
])
const colorModeOptions = computed(() => [
  {
    label: t('GLOBAL.auto-mode'),
    value: 'auto',

  },
  {
    label: t('GLOBAL.light-mode'),
    value: 'light',
  },
  {
    label: t('GLOBAL.dark-mode'),
    value: 'dark',
  },
])
</script>

<template>
  <div class="flex-col gap-[10px] p-[20px]">
    <CardItem title="通用">
      <NFormItem :label="t('GLOBAL.language')">
        <NSelect v-model:value="language" class="w-[260px]!" :options="localesOptions" />
      </NFormItem>
      <NFormItem :label="t('GLOBAL.color-mode')">
        <NSelect v-model:value="colorMode" class="w-[260px]!" :options="colorModeOptions" />
      </NFormItem>
    </CardItem>
    <CardItem title="关于">
      <div class="w-full flex">
        <GitHub />
      </div>
    </CardItem>
  </div>
</template>

<style scoped lang='less'></style>
