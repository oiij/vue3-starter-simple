export function useAutoRatio(ratio: number | undefined = 1, target?: Ref<HTMLElement>) {
  const { width: targetWidth, height: targetHeight } = target?.value ? useElementSize(target) : useWindowSize()
  const width = computed(() => {
    if (targetWidth.value / targetHeight.value > ratio)
      return targetHeight.value * ratio
    return targetWidth.value
  })
  const height = computed(() => {
    if (targetWidth.value / targetHeight.value > ratio)
      return targetHeight.value
    return targetWidth.value / ratio
  })

  return {
    width,
    height,
  }
}
