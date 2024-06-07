<script setup lang='ts'>
import SvgIcon from './SvgIcon.vue'

const router = useRouter()
const route = useRoute()
const tabs = [
  {
    name: '首页',
    icon: 'pixel-travel-icon-民宿',
    path: '/',
  },
  {
    name: '示例',
    icon: 'pixel-travel-icon-比基尼',
    path: '/example',
  },
  {
    name: '关于',
    icon: 'pixel-travel-icon-指南针',
    path: '/about',
  },
]
const squareRect = ref({
  left: 0,
  width: 0,
  height: 0,
})
const showBlur = ref(false)
const wrapRef = ref<HTMLElement>()
const { left: wrapLeft } = useElementBounding(wrapRef)
const { width } = useWindowSize()
const itemRef = ref<HTMLElement[]>()

function handleMove(path: string) {
  if (itemRef.value && Array.isArray(itemRef.value)) {
    const index = tabs.findIndex(f => f.path === path)
    if (index === -1)
      return
    const rect = itemRef.value[index].getBoundingClientRect()
    squareRect.value = {
      left: rect.left - wrapLeft.value,
      width: rect.width,
      height: rect.height,
    }
    showBlur.value = true
    setTimeout(() => {
      showBlur.value = false
    }, 150)
  }
}
function handleClick(e: MouseEvent, path: string) {
  router.push(path)
}
onMounted(() => {
  handleMove(route.path)
})
watch(width, () => {
  handleMove(route.path)
})
watch(() => route.path, () => {
  handleMove(route.path)
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-[50px] left-0 z-[1000] w-full flex items-center justify-center p-[10px]">
      <div ref="wrapRef" class="relative w-screen-md flex-y-center justify-around overflow-hidden rounded-xl bg-white/60 p-[10px] shadow-black/5 shadow-xl backdrop-blur-xl <md:w-full dark:bg-white/20">
        <div
          v-for="item in tabs"
          :key="item.path"
          ref="itemRef"
          class="relative h-[60px] w-[60px] flex-col-center cursor-pointer rounded-xl transition-base hover:bg-black/5"
          @click="(e) => handleClick(e, item.path)"
        >
          <SvgIcon :width="2" :height="2" :name="item.icon" />
          <div>{{ item.name }}</div>
        </div>
        <div
          class="square absolute left-0 rounded-xl bg-black/10 transition-base"
          :class="{ blur: showBlur }"
          :style="{ transform: `translateX(${squareRect.left}px)`, width: `${squareRect.width}px`, height: `${squareRect.height}px` }"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang='less'>
.square.blur {
  filter: blur(30px);
}
</style>
