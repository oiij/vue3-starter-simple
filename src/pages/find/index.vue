<!-- eslint-disable no-console -->
<script setup lang='ts'>
import * as THREE from 'three'

const { domRef, scene, camera, axesHelper, onAnimated, onRendered } = useThreeJs()
onRendered(() => {
  console.log('onRendered')
})
onMounted(() => {
  scene.add(axesHelper)
  camera.position.z = 3
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.castShadow = true // 让立方体投射阴影
  scene.add(cube)
  const groundGeometry = new THREE.PlaneGeometry(20, 20)
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xCCCCCC })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2 // 使地面平行于 X 轴
  ground.position.y = -2 // 地面放置在立方体下方
  ground.receiveShadow = true // 让地面接收阴影
  scene.add(ground)
  onAnimated(() => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  })
})
</script>

<template>
  <div class="h-[100vh] bg-black/5">
    <div ref="domRef" class="h-[400px] w-full" />
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang='yaml'>
name:
meta:
  layout: default
  title:
</route>
