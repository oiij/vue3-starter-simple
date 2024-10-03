<!-- eslint-disable no-console -->
<script setup lang='ts'>
import {
  VueDataUi,
  type VueUiDonutConfig,
  type VueUiDonutDatasetItem,
} from 'vue-data-ui'
import 'vue-data-ui/style.css'

const config = ref<VueUiDonutConfig>({ useCssAnimation: true, useBlurOnHover: true, style: { fontFamily: 'inherit', chart: { useGradient: true, gradientIntensity: 40, backgroundColor: '#FFFFFF', color: '#1A1A1A', layout: { labels: { dataLabels: { show: true, hideUnderValue: 3, prefix: '', suffix: 'k$ ' }, value: { show: true, rounding: 0 }, percentage: { color: '#1A1A1A', bold: true, fontSize: 14 }, name: { color: '#1A1A1A', bold: false, fontSize: 14 }, hollow: { total: { show: true, bold: false, fontSize: 18, color: '#1A1A1A', text: 'Total', offsetY: -14, value: { color: '#1A1A1A', fontSize: 18, bold: true, prefix: 'k$ ', suffix: '', offsetY: -9, rounding: 0 } }, average: { show: true, bold: false, color: '#1A1A1A', fontSize: 18, text: 'Average', offsetY: 5, value: { color: '#1A1A1A', fontSize: 18, bold: true, prefix: 'k$ ', suffix: '', offsetY: 11, rounding: 0 } } } }, donut: { strokeWidth: 64, borderWidth: 1 } }, legend: { show: true, backgroundColor: '#FFFFFF', color: '#1A1A1A', fontSize: 16, bold: false, roundingValue: 0, roundingPercentage: 0 }, title: { text: 'Boutique revenue', color: '#1A1A1A', fontSize: 20, bold: true, subtitle: { text: '2025', color: '#1A1A1A', fontSize: 16, bold: false } }, tooltip: { show: true, backgroundColor: '#FFFFFF', color: '#1A1A1A', fontSize: 14, showValue: true, roundingValue: 0, showPercentage: true, roundingPercentage: 0 } } }, userOptions: { show: true }, table: { show: false, responsiveBreakpoint: 400, columnNames: { series: 'Series', value: 'Value', percentage: 'Percentage' }, th: { backgroundColor: '#FFFFFF', color: '#1A1A1A', outline: 'none' }, td: { backgroundColor: '#FFFFFF', color: '#1A1A1A', outline: 'none', roundingValue: 0, roundingPercentage: 0 } } })

const dataset = ref<VueUiDonutDatasetItem[]>([{ name: 'Brazil', values: [153], color: '#42d392' }, { name: 'France', values: [255], color: '#6376DD' }, { name: 'India', values: [113], color: '#d98320' }, { name: 'Japan', values: [290], color: '#d94126' }, { name: 'Germany', values: [275], color: '#f5ee38' }])
definePage({
  meta: {
    layout: 'default',
    title: 'vue-data-ui',
    keepAlive: false,
  },
})
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      VueDataUI Demo
    </h1>
    <div class="w-full flex-1">
      <div class="h-[300px] w-[400px]">
        <Suspense>
          <VueDataUi
            component="VueUiDonut"
            :dataset="dataset"
            :config="config"
          />
          <template #fallback>
            <slot name="fallback">
              Component Fallback
            </slot>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
