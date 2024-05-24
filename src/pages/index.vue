<script setup lang='ts'>
import { useRequest } from 'vue-hooks-plus'
import { useLocalStorageRef } from '~/composables/useLocalStorageRef'

defineOptions({

})
useHead({
  title: '首页',
})
const { data } = useRequest(() => get('/info'))
const { value } = useNumberAnimation(100)
const localValue = useLocalStorageRef('localValue', 'str')
</script>

<template>
  <div class="flex-col-center gap-10">
    <HelloWorld />
    {{ data }}
    <div>{{ value }}</div>
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
    <div class="w-full flex flex-wrap items-start gap-[10px]">
      <MagicalEffects>
        <div class="p-[20px]">
          Button
        </div>
      </MagicalEffects>
      <MagicalEffects>
        <div class="p-[10px]">
          Button
        </div>
      </MagicalEffects>
      <MagicalEffects>
        <div class="p-[30px]">
          Button
        </div>
      </MagicalEffects>
      <div class="i-border">
        <div class="p-[40px]">
          Button
        </div>
      </div>
    </div>
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
    <FullScreenTapEffects />
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

<route lang="yaml">
name:
meta:
  layout: default
  title: Hello World !
</route>
