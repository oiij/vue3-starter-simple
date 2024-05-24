export function useCanvas() {
  const domRef = ref<HTMLElement>()
  const { width, height } = useElementSize(domRef)
  const canRender = computed(() => width.value > 0 && height.value > 0)
  let canvasDom: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let renderFun: ((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void) | null = null
  let resizeFun: ((size: { width: number, height: number }) => void) | null = null

  function setCanvasSize() {
    if (canvasDom) {
      canvasDom.width = width.value
      canvasDom.height = height.value
      canvasDom.style.width = `${width.value}px`
      canvasDom.style.height = `${height.value}px`
      if (resizeFun)
        resizeFun({ width: width.value, height: height.value })
    }
  }
  function render() {
    if (canRender.value) {
      if (canvasDom) {
        setCanvasSize()
      }
      else {
        canvasDom = document.createElement('canvas')
        ctx = canvasDom.getContext('2d')
        ctx?.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2))
        if (renderFun && canvasDom && ctx)
          renderFun(canvasDom, ctx)
        setCanvasSize()
        if (domRef.value?.tagName.toLowerCase() === 'canvas')
          domRef.value = canvasDom

        else
          domRef.value?.appendChild(canvasDom)
      }
    }
  }
  watch([width, height], () => {
    if (canRender.value)
      render()
  })
  function destroy() {
    canvasDom = null
  }
  onUnmounted(() => {
    destroy()
  })

  return {
    domRef,
    onRender(cb: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void) {
      renderFun = cb
    },
    onResize(cb: (size: { width: number, height: number }) => void) {
      resizeFun = cb
    },
  }
}
