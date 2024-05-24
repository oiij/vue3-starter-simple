import { ACESFilmicToneMapping, AmbientLight, AxesHelper, DirectionalLight, PCFShadowMap, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'
import type { Object3D } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { BladeApi } from 'tweakpane'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import type { BladeController, View } from '@tweakpane/core'

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin: () => void
  end: () => void
}
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
  // More realistic shadows
  renderer.shadowMap.enabled = true // 启用阴影
  renderer.shadowMap.type = PCFShadowMap
  // renderer.physicallyCorrectLights = true
  // renderer.outputEncoding = sRGBEncoding
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

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
  camera.position.set(1, 2, 2)
  // 添加坐标轴
  const axesHelper = new AxesHelper(5)
  scene.add(axesHelper)
  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  // GUI Debugger
  const gui = new Pane()
  gui.addBinding(axesHelper, 'visible', {
    label: 'AxesHelper',
  })
  gui.registerPlugin(EssentialsPlugin)
  // FPSGraph
  const fpsGraph = gui.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
  }) as FPSGraph

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
  // 鼠标设备坐标
  const mouse = new Vector2(1, 1)
  // 创建一个射线投射器
  const raycaster = new Raycaster()
  // 判断是否相交
  function onIntersectObject(objClick: Object3D, event: MouseEvent) {
    const rect = renderer.domElement.getBoundingClientRect()
    // 计算鼠标点击位置的归一化设备坐标
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    // 计算射线与球体的相交情况
    const intersects = raycaster.intersectObject(objClick)
    // 如果有相交，则说明点击了球体
    if (intersects.length > 0)
      return true
    else
      return false
  }
  let objClick: Object3D | null = null
  let objClickFun: ((event: MouseEvent) => void) | null = null
  renderer.domElement.addEventListener('click', (event) => {
    if (objClick) {
      if (onIntersectObject(objClick, event)) {
        if (objClickFun)
          objClickFun(event)
      }
    }
  })
  let objMouseMoveFun: ((event: MouseEvent) => void) | null = null
  renderer.domElement.addEventListener('mousemove', (event) => {
    if (objClick) {
      if (onIntersectObject(objClick, event)) {
        if (objMouseMoveFun)
          objMouseMoveFun(event)
      }
    }
  })

  // 动画循环
  let animationId: number | null = null
  let animateFun: (() => void) | null = null
  function animate() {
    fpsGraph.begin()
    controls.update()
    if (animateFun)
      animateFun()
    renderer.render(scene, camera)
    fpsGraph.end()
    animationId = requestAnimationFrame(animate)
  }
  animate()
  watch([width, height], () => {
    if (canRender.value)
      render()
  })
  render()

  function destroy() {
    try {
      scene.clear()
      renderer.dispose()
      renderer.forceContextLoss()
      const gl = renderer.domElement.getContext('webgl')
      if (gl)
        gl.getExtension('WEBGL_lose_context')!.loseContext()
      if (animationId)
        cancelAnimationFrame(animationId) // 去除animationFrame
      canvasDom = null
      gui.document.close()
      gui.dispose()
    }
    catch (error) {
      console.error(error)
    }
  }
  onUnmounted(() => {
    destroy()
  })
  return {
    domRef,
    scene,
    renderer,
    ambientLight,
    directionalLight,
    camera,
    axesHelper,
    controls,
    gui,
    fpsGraph,
    onRendered(cb: () => void) {
      renderFun = cb
    },
    onAnimate(cb: () => void) {
      animateFun = cb
    },
    onIntersectObject,
    onObjectClick(obj: Object3D, cb: (event: MouseEvent) => void) {
      objClick = obj
      objClickFun = cb
    },
    onObjectMouseMove(obj: Object3D, cb: (event: MouseEvent) => void) {
      objClick = obj
      objMouseMoveFun = cb
    },
  }
}
