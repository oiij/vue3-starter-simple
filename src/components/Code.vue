<script setup lang='ts'>
import type { BundledLanguage, BundledTheme } from 'shiki'
import { codeToHtml } from 'shiki'

const props = defineProps<{
  code?: string
  lang?: BundledLanguage
  theme?: BundledTheme
}>()
const { code, lang, theme } = toRefs(props)
const html = ref('')
async function format() {
  try {
    const res = await codeToHtml(code.value || '', {
      lang: lang.value || 'javascript',
      theme: theme.value || 'vitesse-dark',
    })
    html.value = res
  }
  catch {

  }
}
onMounted(() => {
  format()
})
watch(() => props.code, () => {
  format()
})
</script>

<template>
  <div class="prose" v-html="html" />
</template>

<style scoped lang='less'>

</style>
