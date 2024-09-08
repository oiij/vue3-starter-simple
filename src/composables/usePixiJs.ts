import { Application } from 'pixi.js'
import type { ApplicationOptions } from 'pixi.js'

export function usePixiJs(options?: Partial<ApplicationOptions>) {
  const domRef = ref<HTMLElement>()
  const { width, height } = useElementSize(domRef)
  const canRender = computed(() => domRef.value && width.value > 0 && height.value > 0)
  const app = new Application()
  let canvasDom: HTMLCanvasElement | null = null
  let renderFun: ((app: Application) => void) | null = null
  async function render() {
    if (!canRender.value)
      return
    if (!canvasDom) {
      await app.init({ ...options, width: width.value, height: height.value, resizeTo: domRef.value })
      canvasDom = app.canvas
      domRef.value?.appendChild(canvasDom)
      if (renderFun) {
        renderFun(app)
      }
    }
    else {
      app.render()
    }
  }
  render()
  watch([width, height], () => {
    if (canRender.value) {
      render()
    }
  })
  onUnmounted(() => {
    if (canvasDom) {
      app.destroy()
      canvasDom = null
      renderFun = null
    }
  })
  return {
    domRef,
    app,
    onRendered(cb: (app: Application) => void) {
      renderFun = cb
    },
  }
}
