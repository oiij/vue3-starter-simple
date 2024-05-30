<script setup lang='ts'>
import { useRequest } from 'vue-hooks-plus'
import { useLocalStorageRef } from '~/composables/useLocalStorageRef'

defineOptions({

})
const { formRef, formProps, formValue, validate, resetValidation, resetForm, reset, clear } = useNaiveForm({
  value: {
    id: undefined,
    name: '',
  },
  rules: {
    id: {
      required: true,
      type: 'number',
      message: '请输入',
      trigger: ['input', 'blur'],
    },
    name: {
      required: true,
      message: '请输入',
      trigger: ['input'],
    },
  },
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
    <n-form ref="formRef" v-bind="formProps">
      <n-form-item label="ID" path="id">
        <n-input-number v-model:value="formValue.id" clearable />
      </n-form-item>
      <n-form-item label="Name" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <div class="flex gap-3">
        <n-button @click="validate">
          验证
        </n-button>
        <n-button @click="resetValidation">
          重置验证
        </n-button>
        <n-button @click="resetForm">
          重置表单
        </n-button>
        <n-button @click="reset">
          重置
        </n-button>
        <n-button @click="clear">
          清除表单
        </n-button>
      </div>
    </n-form>
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
