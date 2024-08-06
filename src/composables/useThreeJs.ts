import { ACESFilmicToneMapping, AmbientLight, AxesHelper, CameraHelper, Color, CubeTextureLoader, DirectionalLight, DirectionalLightHelper, EdgesGeometry, Fog, LineBasicMaterial, LineSegments, Mesh, MeshStandardMaterial, PerspectiveCamera, Raycaster, SRGBColorSpace, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer } from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
import type { Camera, MeshStandardMaterialParameters, Object3D } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { CSS3DObject, CSS3DRenderer, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js'
import type { BladeApi } from 'tweakpane'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import type { BladeController, View } from '@tweakpane/core'
import Stats from 'three/addons/libs/stats.module.js'
import { Easing, Group, Tween } from '@tweenjs/tween.js'

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin: () => void
  end: () => void
}

// private
function createWebGLRender() {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.shadowMap.enabled = true // 启用阴影
  renderer.toneMapping = ACESFilmicToneMapping
  return {
    renderer,
  }
}
function createCss2dRender() {
  const css2Renderer = new CSS2DRenderer()
  css2Renderer.domElement.style.position = 'absolute'
  css2Renderer.domElement.style.inset = '0px'
  css2Renderer.domElement.style.pointerEvents = 'none'
  function createCss2DObject(el: HTMLElement) {
    return new CSS2DObject(el)
  }
  return {
    css2Renderer,
    createCss2DObject,
  }
}
function createCss3dRender() {
  const css3Renderer = new CSS3DRenderer()
  css3Renderer.domElement.style.position = 'absolute'
  css3Renderer.domElement.style.inset = '0px'
  css3Renderer.domElement.style.pointerEvents = 'none'
  function createCss3DObject(el: HTMLElement) {
    return new CSS3DObject(el)
  }
  function createCss3DSprite(el: HTMLElement) {
    return new CSS3DSprite(el)
  }
  return {
    css3Renderer,
    createCss3DObject,
    createCss3DSprite,
  }
}
function createScene() {
  const scene = new Scene()
  return {
    scene,
  }
}
function createCamera(fov?: number, aspect?: number, near?: number, far?: number) {
  const camera = new PerspectiveCamera(fov, aspect, near, far)
  return {
    camera,
  }
}
function createCameraHelper(scene: Scene, directionalLight: DirectionalLight) {
  const cameraHelper = new CameraHelper(directionalLight.shadow.camera)
  scene.add(cameraHelper)
  return {
    cameraHelper,
  }
}
function createAmbientLight(scene: Scene) {
  const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
  scene.add(ambientLight)
  // 添加平行光
  return {
    ambientLight,

  }
}
function createDirectionalLight(scene: Scene) {
  const directionalLight = new DirectionalLight('#FFF', 1)
  directionalLight.position.set(50, 60, 50)
  directionalLight.castShadow = true // 启用阴影
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.radius = 3

  directionalLight.shadow.camera.left = -20
  directionalLight.shadow.camera.right = 20
  directionalLight.shadow.camera.top = 20
  directionalLight.shadow.camera.bottom = -20
  directionalLight.shadow.camera.near = 1
  directionalLight.shadow.camera.far = 120

  scene.add(directionalLight)
  const dirHelper = new DirectionalLightHelper(directionalLight, 5)
  scene.add(dirHelper)

  return {
    directionalLight,
    dirHelper,
  }
}
function createAxesHelper(scene: Scene) {
// 添加坐标轴
  const axesHelper = new AxesHelper(5)
  scene.add(axesHelper)
  return {
    axesHelper,
  }
}
function createControls(renderer: WebGLRenderer, camera: Camera) {
  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  return {
    controls,
  }
}
function createGui() {
  // GUI Debugger
  const gui = new Pane()
  gui.registerPlugin(EssentialsPlugin)
  // FPSGraph
  const fpsGraph = gui.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
  }) as FPSGraph
  return {
    gui,
    fpsGraph,
  }
}
function createTweenGroup() {
  const group = new Group()
  return {
    group,
  }
}
function createTween(group: Group, camera: Camera, controls: OrbitControls) {
  function cameraTween(endPos: { x: number, y: number, z: number }, endTarget: { x: number, y: number, z: number }, duration = 1000) {
    const tween = new Tween({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      tx: controls.target.x,
      ty: controls.target.y,
      tz: controls.target.z,
    })
      .to({
      // 动画结束相机位置坐标
        x: endPos.x,
        y: endPos.y,
        z: endPos.z,
        // 动画结束相机指向的目标观察点
        tx: endTarget.x,
        ty: endTarget.y,
        tz: endTarget.z,
      }, duration)
      .onUpdate((obj) => {
        // 动态改变相机位置
        camera.position.set(obj.x, obj.y, obj.z)
        // 动态计算相机视线
        // camera.lookAt(obj.tx, obj.ty, obj.tz);
        controls.target.set(obj.tx, obj.ty, obj.tz)
        controls.update()// 内部会执行.lookAt()
      })
      .easing(Easing.Quadratic.InOut)
      .start()
    group.add(tween)
    return {
      tween,
    }
  }
  function cameraTweenLookAtObj(obj: Object3D, scalar = 5) {
    const pos = new Vector3()
    obj.getWorldPosition(pos)
    const pos2 = pos.clone().addScalar(scalar)

    const { tween } = cameraTween(pos2, pos)
    return {
      tween,
    }
  }
  return {
    cameraTween,
    cameraTweenLookAtObj,
  }
}
function createStats() {
  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.padding = '10px'
  stats.dom.style.opacity = '0.8'
  return {
    stats,
  }
}
// 创建后处理
function createComposer(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  return {
    composer,
    renderPass,
  }
}
// Composer伽马矫正抗锯齿优化
function optimizeComposer(composer: EffectComposer, width: number, height: number) {
  // 保持outputEncoding = sRGBEncoding，自定义着色器通道作为参数
  const effectCopy = new ShaderPass(GammaCorrectionShader)
  effectCopy.renderToScreen = true
  composer.addPass(effectCopy)
  const smaaPass = new SMAAPass(width, height)
  composer.addPass(smaaPass)

  return {
    effectCopy,
    smaaPass,
  }
}
function createOutLinePass(composer: EffectComposer, scene: Scene, camera: Camera, width: number, height: number) {
  const outlinePass = new OutlinePass(new Vector2(width, height), scene, camera)
  outlinePass.visibleEdgeColor.set('#00FF00') // 呼吸显示颜色
  outlinePass.hiddenEdgeColor.set('#00FF00')// 呼吸消失颜色
  outlinePass.edgeStrength = 5 // 边框的亮度强度
  outlinePass.edgeGlow = 0.5 // 光晕[0,1]
  outlinePass.edgeThickness = 1// 边缘宽度
  outlinePass.pulsePeriod = 2 // 呼吸闪烁速度
  outlinePass.renderToScreen = true // 设置这个参数的目的是马上将当前的内容输出
  composer.addPass(outlinePass)
  function selectedObjectEffect(obj?: Object3D) {
    const selectedObjects: Object3D[] = []
    if (obj) {
      selectedObjects.push(obj)
    }
    outlinePass.selectedObjects = selectedObjects
  }
  return {
    outlinePass,
    selectedObjectEffect,
  }
}

// expose
function isMeshType(object?: Object3D): object is Mesh {
  return object?.type === 'Mesh'
}
function createLoader(path = '') {
  const loader = new GLTFLoader().setPath(path)
  return {
    loader,
  }
}
function setSkyBox(scene: Scene, paths: string[], fog?: boolean) {
  if (fog)
    scene.fog = new Fog(new Color('#a0a0a0'), 500, 2000)
  const loaderBox = new CubeTextureLoader()
  const cubeTexture = loaderBox.load(paths)
  cubeTexture.colorSpace = SRGBColorSpace
  scene.background = cubeTexture
}
function setObjLine(obj: Object3D, lineName = 'line') {
  if (isMeshType(obj) && obj.isMesh) {
    const edges = new EdgesGeometry(obj.geometry)
    const edgesMaterial = new LineBasicMaterial({
      color: 0x00FFFF,
    })
    const line = new LineSegments(edges, edgesMaterial)
    line.name = lineName
    obj.add(line)
    obj.userData.hasLine = true
  }
}
function removeObjLine(obj: Object3D, lineName = 'line') {
  const line = obj.children.find(f => f.name === lineName)
  if (line) {
    obj.remove(line)
    obj.userData.hasLine = false
  }
}
// 计算鼠标与模型对象相交
function onIntersectObject(renderer: WebGLRenderer, camera: PerspectiveCamera, obj: Object3D, event: MouseEvent) {
  // 鼠标设备坐标
  const mouse = new Vector2(1, 1)
  // 创建一个射线投射器
  const raycaster = new Raycaster()
  // 判断是否相交

  const rect = renderer.domElement.getBoundingClientRect()
  // 计算鼠标点击位置的归一化设备坐标
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  // 计算射线与球体的相交情况
  const intersects = raycaster.intersectObject(obj)
  // 如果有相交，则说明点击了球体
  if (intersects.length > 0)
    return true
  else
    return false
}
function createBall(geometry: {
  radius?: number
  widthSegments?: number
  heightSegments?: number
  phiStart?: number
  phiLength?: number
  thetaStart?: number
  thetaLength?: number
}, parameters?: MeshStandardMaterialParameters) {
  const ballMat = new MeshStandardMaterial(parameters)
  const ballGeometry = new SphereGeometry(geometry.radius, geometry.widthSegments, geometry.heightSegments, geometry.phiStart, geometry.phiLength, geometry.thetaStart, geometry.thetaLength)
  const ballMesh = new Mesh(ballGeometry, ballMat)
  return {
    ballMat,
    ballGeometry,
    ballMesh,
  }
}

export function useThreeJs() {
  const domRef = ref<HTMLElement>()
  const { width, height } = useElementSize(domRef)
  const aspect = computed(() => width.value / height.value)
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  const canRender = computed(() => width.value > 0 && height.value > 0)
  const { pixelRatioWidth, pixelRatioHeight } = {
    pixelRatioWidth: computed(() => pixelRatio * width.value),
    pixelRatioHeight: computed(() => pixelRatio * height.value),
  }
  const { renderer } = createWebGLRender()
  const { css2Renderer, createCss2DObject } = createCss2dRender()
  const { css3Renderer, createCss3DObject, createCss3DSprite } = createCss3dRender()
  const { scene } = createScene()
  const { camera } = createCamera(45, aspect.value, 0.1, 1000)
  const { stats } = createStats()
  const useComposer = ref(true)
  const { composer } = createComposer(renderer, scene, camera)
  const { effectCopy, smaaPass } = optimizeComposer(composer, pixelRatioWidth.value, pixelRatioHeight.value)
  const { outlinePass, selectedObjectEffect } = createOutLinePass(composer, scene, camera, pixelRatioWidth.value, pixelRatioHeight.value)
  const { ambientLight } = createAmbientLight(scene)
  const { directionalLight } = createDirectionalLight(scene)
  const { cameraHelper } = createCameraHelper(scene, directionalLight)
  const { axesHelper } = createAxesHelper(scene)
  const { controls } = createControls(renderer, camera)
  const { gui, fpsGraph } = createGui()
  const { group } = createTweenGroup()
  const { cameraTween, cameraTweenLookAtObj } = createTween(group, camera, controls)
  gui.addBinding(axesHelper, 'visible', {
    label: 'AxesHelper',
  })
  gui.addBinding(controls, 'autoRotate')
  gui.addBinding(controls, 'autoRotateSpeed', {
    step: 0.1,
    min: 0.1,
    max: 10,
  })
  let webglCanvas: HTMLCanvasElement | null = null
  let css2Dom: HTMLElement | null = null
  let css3Dom: HTMLElement | null = null
  let statsDom: HTMLElement | null = null

  let renderFun: (() => void) | null = null
  let refreshFun: (() => void) | null = null
  function render() {
    if (!canRender.value) {
      return
    }
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(width.value, height.value)

    css2Renderer.setSize(width.value, height.value)
    css3Renderer.setSize(width.value, height.value)

    if (useComposer.value && composer) {
      composer.setPixelRatio(pixelRatio)
      composer.setSize(width.value, height.value)
      effectCopy.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
      smaaPass.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
      outlinePass.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
    }
    camera.aspect = aspect.value
    camera.updateProjectionMatrix()

    if (domRef.value) {
      if (!webglCanvas) {
        webglCanvas = renderer.domElement
        domRef.value.appendChild(renderer.domElement)
        if (renderFun) {
          renderFun()
        }
      }
      if (!css2Dom) {
        css2Dom = css2Renderer.domElement
        domRef.value.appendChild(css2Dom)
      }
      if (!css3Dom) {
        css3Dom = css3Renderer.domElement
        domRef.value.appendChild(css3Dom)
      }
      if (!statsDom) {
        statsDom = stats.dom
        domRef.value.appendChild(statsDom)
      }
      else {
        if (refreshFun) {
          refreshFun()
        }
      }
    }
  }

  // 动画循环
  let animationId: number | null = null
  let animatedFun: (() => void) | null = null
  let beforeAnimateFun: (() => void) | null = null
  function animate() {
    fpsGraph.begin()
    if (beforeAnimateFun) {
      beforeAnimateFun()
    }
    if (useComposer.value && composer) {
      composer.render()
    }
    else {
      renderer.render(scene, camera)
    }
    css2Renderer.render(scene, camera)
    css3Renderer.render(scene, camera)
    if (animatedFun) {
      animatedFun()
    }
    group.update()
    stats.update()
    controls.update()
    fpsGraph.end()
    animationId = requestAnimationFrame(animate)
  }
  animate()

  watch([width, height], () => {
    if (canRender.value) {
      render()
    }
  })
  render()

  function destroy() {
    try {
      scene.clear()
      renderer.dispose()
      renderer.forceContextLoss()
      const gl = renderer.domElement.getContext('webgl')
      if (gl) {
        gl.getExtension('WEBGL_lose_context')!.loseContext()
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      } // 去除animationFrame
      webglCanvas = null
      css2Dom = null
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
    width,
    height,
    aspect,
    pixelRatio,
    pixelRatioWidth,
    pixelRatioHeight,
    renderer,
    css2Renderer,
    css3Renderer,
    scene,
    camera,
    stats,
    useComposer,
    composer,
    effectCopy,
    smaaPass,
    outlinePass,
    ambientLight,
    directionalLight,
    cameraHelper,
    axesHelper,
    controls,
    gui,
    fpsGraph,
    group,
    onRendered(cb: () => void) {
      renderFun = cb
    },
    onRefreshed(cb: () => void) {
      refreshFun = cb
    },
    onAnimated(cb: () => void) {
      animatedFun = cb
    },
    onBeforeAnimate(cb: () => void) {
      beforeAnimateFun = cb
    },
    createCss2DObject,
    createCss3DObject,
    createCss3DSprite,
    selectedObjectEffect,
    cameraTween,
    cameraTweenLookAtObj,
    destroy,
    isMeshType,
    onIntersectObject,
    setSkyBox,
    setObjLine,
    removeObjLine,
    createLoader,
    createBall,
  }
}
