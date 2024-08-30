<!-- eslint-disable no-console -->
<script setup lang='ts'>
import * as THREE from 'three'

definePage({
  meta: {
    layout: 'default',
    title: 'ThreeJs Demo',
    keepAlive: true,
  },
})
const { domRef, renderer, scene, onRendered, gltfLoader, cubeTextureLoader, setOutLine, onIntersectObject, setSkyBox, camera, isMeshType } = useThreeJs()
gltfLoader.setPath('gltf/')
function createFloor() {
  const floorMat = new THREE.MeshStandardMaterial({
    color: '#f1f1f1', // 材质的颜色
  })
  const floorGeometry = new THREE.BoxGeometry(300, 300, 0.01, 1, 1, 1)
  const floorMesh = new THREE.Mesh(floorGeometry, floorMat)
  floorMesh.receiveShadow = true
  floorMesh.rotation.x = -Math.PI / 2.0
  scene.add(floorMesh)
}
function createSkyBox() {
  const path = 'skybox/night/'
  const format = '.jpg'
  const paths = [`${path}posx${format}`, `${path}negx${format}`, `${path}posy${format}`, `${path}negy${format}`, `${path}posz${format}`, `${path}negz${format}`]
  setSkyBox(scene, cubeTextureLoader.load(paths))
}
function loadSu7() {
  gltfLoader.load('xiaomi_su7/scene.gltf', (gltf) => {
    scene.add(gltf.scene)
    const mesh = new THREE.MeshPhysicalMaterial({
      color: '#22d3ee',
      metalness: 1,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    })
    const meshArr = [
      'Object_18', // 车身
      'Object_20', // 车身下
      // 'Object_21', // 前后玻璃
      // 'Object_22', // 后刹车灯
      // 'Object_23', // 前车灯
      // 'Object_24', // 前车灯行车灯
      'Object_25', // 风挡边框
      // 'Object_27', // 车门内
      // 'Object_28', // 内地板
      // 'Object_29', // 车架内
      'Object_31', // 主驾玻璃框
      'Object_32', // 主驾车门
      'Object_33', // 主驾后视镜框
      // 'Object_34', // 主驾后视镜
      // 'Object_35', // 主驾车门内
      // 'Object_36', // 主驾玻璃
      'Object_38', // 左后玻璃框
      'Object_39', // 左后车门
      // 'Object_40', // 左后玻璃
      // 'Object_41', // 左后车门内
      'Object_44', // 副驾玻璃框
      'Object_45', // 副驾车门
      'Object_46', // 副驾后视镜框
      // 'Object_47', // 副驾后视镜
      // 'Object_48', // 副驾车门内
      // 'Object_49', // 副驾玻璃
      'Object_51', // 右后玻璃框
      'Object_52', // 右后车门
      // 'Object_53', // 右后玻璃
      // 'Object_54', // 右后车门内

    ]
    gltf.scene.traverse((obj) => {
      if (isMeshType(obj) && obj.isMesh) {
        obj.castShadow = true
        if (meshArr.includes(obj.name)) {
          obj.material = mesh
        }
      }
    })
    renderer.domElement.addEventListener('click', (ev) => {
      gltf.scene.traverse((obj) => {
        if (isMeshType(obj) && obj.isMesh) {
          if (onIntersectObject(renderer, camera, obj, ev)) {
            console.log(obj.name)

            setOutLine(obj)
          }
        }
      })
    })
    // cameraTweenLookAtObj(gltf.scene)
  }, (xhr) => {
    const percent = xhr.loaded / xhr.total
    console.log(percent)
  }, (err) => {
    console.log(err)
  })
}
onRendered(() => {
  console.log('onRendered')
  camera.position.set(0, 5, 0)
  createFloor()
  createSkyBox()
  loadSu7()
})
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      ThreeJs Demo
    </h1>
    <div ref="domRef" class="h-[600px] w-full bg-black" />
  </div>
</template>

<style scoped lang='less'>

</style>
