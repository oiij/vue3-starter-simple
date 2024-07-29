<script setup lang='ts'>
import { useLocalStorageRef } from '~/composables/useLocalStorageRef'

defineOptions({

})
definePage({
  meta: {
    layout: 'default',
    title: 'Hello World',
    keepAlive: true,
  },
})
useHead({
  title: '首页',
})
const { data } = useRequest(() => get('/info'))
const localValue = useLocalStorageRef('localValue', 'str')
</script>

<template>
  <div class="flex-col-center gap-10">
    <HelloWorld />

    {{ data }}
    <div>
      <n-button @click="localValue = 'strrrrrr'">
        ++
      </n-button>
      {{ localValue }}
      <n-button @click="localValue = 'st'">
        --
      </n-button>
    </div>
    <DefineInput />
    <div class="flex items-center justify-center gap-1">
      <NButton v-track:exposure>
        ExposureTrack
      </NButton>
      <NButton v-track:click>
        ClickTrack
      </NButton>
      <NButton v-track:long-press>
        LongPressTrack
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>
.i-border {
  border: solid 4px transparent;
  border-radius: 10px;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(135deg, rgba(183, 40, 255, 1), rgba(40, 112, 255, 1));
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
