<script setup lang='ts'>
const props = withDefaults(defineProps<{
  circleSize?: number
  borderWidth?: number
  borderRadius?: number
}>(), {
  circleSize: 300,
  borderWidth: 1,
  borderRadius: 10,
})
const domRef = ref<HTMLElement>()
const { x, y } = toRefs(reactive({
  x: 0,
  y: 0,
}))
const { left, top, width, height } = useElementBounding(domRef)
const offset = computed(() => {
  return {
    x: Number.parseFloat((x.value - left.value).toFixed(2)),
    y: Number.parseFloat((y.value - top.value).toFixed(2)),
  }
})
function mouseMove(ev: MouseEvent) {
  x.value = ev.x
  y.value = ev.y
}
onMounted(() => {
  window.addEventListener('mousemove', mouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', mouseMove)
})
</script>

<template>
  <div
    ref="domRef"
    class="magical flex-col"
    :style="{
      '--circle-size': `${props.circleSize}px`,
      '--inset': `${props.borderWidth}px`,
      '--border-radius': `${props.borderRadius}px`,
      '--mouse-x': `${offset.x}px`,
      '--mouse-y': `${offset.y}px`,

    }"
  >
    <slot />
    {{ `${x}-${y}-${left}-${top}` }}
    <div class="show" :style="{ opacity: (offset.x >= 0 && offset.x <= width && offset.y >= 0 && offset.y <= height) ? 1 : 0 }" />
  </div>
</template>

<style scoped>
.magical {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  @apply bg-white dark:bg-black;
}

.magical::before,
.magical::after {
  content: '';
  position: absolute;
  width: calc(100% + var(--inset) * 2);
  height: calc(100% + var(--inset) * 2);
  border-radius: var(--border-radius);
  inset: calc(0 - var(--inset));
}

.magical::before {
  background: radial-gradient(
    var(--circle-size) circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 0, 0, 0.2),
    transparent 40%
  );
  /* hover border */
  z-index: -1;
}
.dark .magical::before {
  background: radial-gradient(
    var(--circle-size) circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.2),
    transparent 40%
  );
  /* hover border */
}

.magical::after {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.1) 20%,
    rgba(0, 0, 0, 0.2) 100%
  );
  /* border */
  z-index: -2;
}
.dark .magical::after {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.3) 100%
  );
  /* border */
}
.magical .show {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: var(--border-radius);
  opacity: 0;
  pointer-events: none;
  background: radial-gradient(
    var(--circle-size) circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 0, 0, 0.05),
    transparent 40%
  );
  /* hover fill */
}
.dark .magical .show {
  background: radial-gradient(
    var(--circle-size) circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.1),
    transparent 40%
  );
}
</style>
