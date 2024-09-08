/* eslint-disable unicorn/consistent-function-scoping */
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { Easing, Tween, Group as TweenGroup } from '@tweenjs/tween.js'
import { Vec3, World } from 'cannon-es'
import { BlendFunction, CopyMaterial, EdgeDetectionMode, EffectComposer, EffectPass, OutlineEffect, PredicationMode, RenderPass, ShaderPass, SMAAEffect, SMAAPreset, TextureEffect } from 'postprocessing'
import { ACESFilmicToneMapping, AmbientLight, ArrowHelper, AxesHelper, CameraHelper, Color, CubeTextureLoader, DirectionalLight, DirectionalLightHelper, EdgesGeometry, Fog, Group, HalfFloatType, LineBasicMaterial, LineSegments, LoadingManager, Mesh, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene, SphereGeometry, SRGBColorSpace, TextureLoader, Vector2, Vector3, VSMShadowMap, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { CSS3DObject, CSS3DRenderer, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js'
import { Pane } from 'tweakpane'
import type { BladeController, View } from '@tweakpane/core'
import type { Camera, ColorRepresentation, CubeTexture, MeshStandardMaterialParameters, Object3D } from 'three'
import type { BladeApi } from 'tweakpane'

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin: () => void
  end: () => void
}

// private
function createWebGLRender() {
  const renderer = new WebGLRenderer({
    powerPreference: 'high-performance',
    alpha: true,
    antialias: false,
    stencil: false,
    depth: false,
  })
  renderer.shadowMap.enabled = true // 启用阴影
  renderer.shadowMap.type = VSMShadowMap
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true
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
  cameraHelper.visible = false
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
  directionalLight.position.set(20, 30, 20)
  directionalLight.castShadow = true // 启用阴影
  directionalLight.shadow.mapSize.set(512 * 2, 512 * 2)
  directionalLight.shadow.radius = 5

  // directionalLight.shadow.camera.left = -5
  // directionalLight.shadow.camera.right = 5
  // directionalLight.shadow.camera.top = 5
  // directionalLight.shadow.camera.bottom = -5
  // directionalLight.shadow.camera.near = 1
  // directionalLight.shadow.camera.far = 120

  scene.add(directionalLight)
  const dirHelper = new DirectionalLightHelper(directionalLight, 5)
  dirHelper.visible = false
  scene.add(dirHelper)

  return {
    directionalLight,
    dirHelper,
  }
}
function createAxesHelper(scene: Scene) {
// 添加坐标轴
  const axesHelper = new AxesHelper(10)
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
  const tweenGroup = new TweenGroup()
  return {
    tweenGroup,
  }
}
function createTween(group: TweenGroup) {
  function tween(from: Record<string, any>) {
    return new Tween(from, group).easing(Easing.Linear.None)
  }

  return {
    tween,
  }
}
function createCameraTween(group: TweenGroup, camera: Camera, controls: OrbitControls) {
  function cameraTween(endPos: { x: number, y: number, z: number }, endTarget: { x: number, y: number, z: number }, duration = 1000) {
    const tween = new Tween({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      tx: controls.target.x,
      ty: controls.target.y,
      tz: controls.target.z,
    }, group)
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
  const composer = new EffectComposer(renderer, {
    frameBufferType: HalfFloatType,
  })
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  return {
    composer,
    renderPass,
  }
}
// Composer伽马矫正抗锯齿优化

function createAntialiasing(composer: EffectComposer, camera: Camera) {
  const smaaEffect = new SMAAEffect({
    preset: SMAAPreset.HIGH,
    edgeDetectionMode: EdgeDetectionMode.COLOR,
    predicationMode: PredicationMode.DEPTH,
  })
  smaaEffect.edgeDetectionMaterial.edgeDetectionThreshold = 0.02
  smaaEffect.edgeDetectionMaterial.predicationThreshold = 0.002
  smaaEffect.edgeDetectionMaterial.predicationScale = 1
  const edgesTextureEffect = new TextureEffect({
    blendFunction: BlendFunction.SKIP,
    texture: smaaEffect.edgesTexture,
  })
  const weightsTextureEffect = new TextureEffect({
    blendFunction: BlendFunction.SKIP,
    texture: smaaEffect.edgesTexture,
  })
  const copyPass = new ShaderPass(new CopyMaterial())
  copyPass.enabled = false
  copyPass.renderToScreen = true
  const effectPass = new EffectPass(
    camera,
    smaaEffect,
    edgesTextureEffect,
    weightsTextureEffect,
  )
  effectPass.renderToScreen = true
  composer.addPass(copyPass)
  composer.addPass(effectPass)
  return {
    smaaEffect,
    edgesTextureEffect,
    weightsTextureEffect,
    copyPass,
    effectPass,
  }
}
function createOutLinePass(composer: EffectComposer, renderer: WebGLRenderer, scene: Scene, camera: Camera) {
  const outlineEffect = new OutlineEffect(scene, camera, {
    blendFunction: BlendFunction.SCREEN,
    multisampling: Math.min(4, renderer.capabilities.maxSamples),
    edgeStrength: 2.5, // 边框的亮度强度
    pulseSpeed: 0.0,
    visibleEdgeColor: 0xFFFFFF, // 呼吸显示颜色
    hiddenEdgeColor: 0x22090A, // 呼吸消失颜色
    blur: false,
    xRay: true,
  })
  const outlinePass = new EffectPass(camera, outlineEffect)
  composer.addPass(outlinePass)

  function setOutLine(obj?: Object3D) {
    const selectedObjects: Object3D[] = []
    if (obj) {
      selectedObjects.push(obj)
    }
    outlineEffect.selection.set(selectedObjects)
  }
  return {
    outlinePass,
    outlineEffect,
    setOutLine,
  }
}
function createArrowHelperGroup(scene: Scene) {
  const arrowGroup = new Group()
  arrowGroup.name = 'arrow-helper-group'
  function createArrowHelper(dir?: Vector3, origin?: Vector3, length?: number, color?: ColorRepresentation, headLength?: number, headWidth?: number) {
    const arrowHelper = new ArrowHelper(dir, origin, length, color, headLength, headWidth)
    arrowGroup.add(arrowHelper)
    return {
      arrowHelper,
      arrowGroup,
    }
  }
  scene.add(arrowGroup)
  return {
    arrowGroup,
    createArrowHelper,
  }
}
function createWorld() {
  const world = new World({
    gravity: new Vec3(0, -9.82, 0), // m/s²
  })
  return {
    world,
  }
}
// expose
function isMeshType(object?: Object3D): object is Mesh {
  return object?.type === 'Mesh'
}
function createLoadingManager() {
  const manager = new LoadingManager()
  return {
    manager,
  }
}
function createLoader(manager: LoadingManager) {
  const gltfLoader = new GLTFLoader(manager)
  const textureLoader = new TextureLoader(manager)
  const cubeTextureLoader = new CubeTextureLoader(manager)
  return {
    gltfLoader,
    textureLoader,
    cubeTextureLoader,
  }
}
function setSkyBox(scene: Scene, cubeTexture: CubeTexture, fog?: boolean) {
  if (fog)
    scene.fog = new Fog(new Color('#a0a0a0'), 500, 2000)
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
function lon2xyz(R: number, longitude: number, latitude: number, offset = 1) {
  let lon = longitude * Math.PI / 180 // 转弧度值
  const lat = latitude * Math.PI / 180 // 转弧度值
  lon = -lon // js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = R * offset * Math.cos(lat) * Math.cos(lon)
  const y = R * offset * Math.sin(lat)
  const z = R * offset * Math.cos(lat) * Math.sin(lon)

  return new Vector3(x, y, z)
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
  const { manager } = createLoadingManager()
  const { gltfLoader, textureLoader, cubeTextureLoader } = createLoader(manager)
  const { renderer } = createWebGLRender()
  const { css2Renderer, createCss2DObject } = createCss2dRender()
  const { css3Renderer, createCss3DObject, createCss3DSprite } = createCss3dRender()
  const { scene } = createScene()
  const { camera } = createCamera(45, aspect.value, 0.1, 1000)
  const { stats } = createStats()
  const useComposer = ref(true)
  const { composer } = createComposer(renderer, scene, camera)
  const { copyPass, smaaEffect, effectPass } = createAntialiasing(composer, camera)
  const { outlineEffect, outlinePass, setOutLine } = createOutLinePass(composer, renderer, scene, camera)
  const { ambientLight } = createAmbientLight(scene)
  const { directionalLight, dirHelper } = createDirectionalLight(scene)
  const { cameraHelper } = createCameraHelper(scene, directionalLight)
  const { axesHelper } = createAxesHelper(scene)
  const { controls } = createControls(renderer, camera)
  const { gui, fpsGraph } = createGui()
  const { tweenGroup } = createTweenGroup()
  const { tween } = createTween(tweenGroup)
  const { cameraTween, cameraTweenLookAtObj } = createCameraTween(tweenGroup, camera, controls)
  const { createArrowHelper } = createArrowHelperGroup(scene)
  const { world } = createWorld()
  gui.addBinding(axesHelper, 'visible', {
    label: 'AxesHelper',
  })
  gui.addBinding(dirHelper, 'visible')
  gui.addBinding(cameraHelper, 'visible')
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
      composer.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
      copyPass.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
      effectPass.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
      smaaEffect.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
      // outlinePass.setSize(pixelRatioWidth.value, pixelRatioHeight.value)
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
  const animatedFuns: (() => void)[] = []
  const beforeAnimateFuns: (() => void)[] = []
  function animate() {
    fpsGraph.begin()
    beforeAnimateFuns.forEach((f) => {
      f()
    })
    world.fixedStep()
    tweenGroup.update()

    if (useComposer.value && composer) {
      composer.render()
    }
    else {
      renderer.render(scene, camera)
    }
    css2Renderer.render(scene, camera)
    css3Renderer.render(scene, camera)

    stats.update()
    controls.update()
    fpsGraph.end()
    animatedFuns.forEach((f) => {
      f()
    })
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
    manager,
    gltfLoader,
    textureLoader,
    cubeTextureLoader,
    renderer,
    css2Renderer,
    css3Renderer,
    scene,
    camera,
    stats,
    useComposer,
    composer,
    copyPass,
    smaaEffect,
    effectPass,
    outlineEffect,
    outlinePass,
    setOutLine,
    ambientLight,
    directionalLight,
    cameraHelper,
    axesHelper,
    controls,
    gui,
    fpsGraph,
    tweenGroup,
    tween,
    createArrowHelper,
    onRendered(cb: () => void) {
      renderFun = cb
    },
    onRefreshed(cb: () => void) {
      refreshFun = cb
    },
    onAnimated(cb: () => void) {
      animatedFuns.push(cb)
    },
    onBeforeAnimate(cb: () => void) {
      beforeAnimateFuns.push(cb)
    },
    createCss2DObject,
    createCss3DObject,
    createCss3DSprite,
    cameraTween,
    cameraTweenLookAtObj,
    destroy,
    isMeshType,
    onIntersectObject,
    setSkyBox,
    setObjLine,
    removeObjLine,
    createBall,
    lon2xyz,
  }
}
