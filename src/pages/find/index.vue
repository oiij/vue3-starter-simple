<!-- eslint-disable no-console -->
<script setup lang='ts'>
import * as THREE from 'three'

const { domRef, scene, onRendered } = useThreeJs()
onRendered(() => {
  console.log('onRendered')
})
onMounted(() => {
  // 创建一个球体
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.castShadow = true // 球体投射阴影
  sphere.position.y = 1 // 使球体悬浮在地面上
  scene.add(sphere)
  // 创建一个平面
  const planeGeometry = new THREE.PlaneGeometry(200, 200)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true // 平面接收阴影
  plane.rotation.x = -Math.PI / 2 // 使平面水平
  plane.position.y = 0
  scene.add(plane)
})
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      ThreeJs Demo
    </h1>
    <div ref="domRef" class="h-[400px] w-full bg-black/20" />
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
