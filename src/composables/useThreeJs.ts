import { AmbientLight, AxesHelper, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function useThreeJs() {
  const domRef = ref<HTMLElement>()
  const { width, height } = useElementSize(domRef)
  const canRender = computed(() => width.value > 0 && height.value > 0)
  // 添加场景
  const scene = new Scene()
  // 添加渲染器
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.shadowMap.enabled = true // 启用阴影
  // 添加环境光
  const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
  scene.add(ambientLight)
  // 添加平行光
  const directionalLight = new DirectionalLight(0xFFFFFF, 1)
  directionalLight.position.set(5, 10, 7) // 设置平行光位置
  directionalLight.castShadow = true // 启用阴影
  scene.add(directionalLight)
  // 添加相机
  const camera = new PerspectiveCamera(45, width.value / height.value, 0.1, 1000)
  // 添加坐标轴
  const axesHelper = new AxesHelper(5)
  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)

  let canvasDom: HTMLCanvasElement | null = null

  let renderFun: (() => void) | null = null
  function render() {
    if (!canRender.value)
      return
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width.value, height.value)
    camera.aspect = width.value / height.value
    camera.updateProjectionMatrix()
    if (domRef.value) {
      if (!canvasDom) {
        canvasDom = renderer.domElement
        domRef.value.appendChild(renderer.domElement)
      }
    }
    if (renderFun)
      renderFun()
  }

  let animateFun: (() => void) | null = null
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
    if (animateFun)
      animateFun()
  }
  animate()
  watch([width, height], () => {
    if (canRender.value)
      render()
  })
  render()

  return {
    domRef,
    scene,
    renderer,
    ambientLight,
    directionalLight,
    camera,
    axesHelper,
    controls,
    onRendered(cb: () => void) {
      renderFun = cb
    },
    onAnimated(cb: () => void) {
      animateFun = cb
    },
  }
}
