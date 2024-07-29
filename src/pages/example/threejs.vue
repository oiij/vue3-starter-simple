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
const { domRef, scene, onRendered, onAnimate, gui, controls, axesHelper } = useThreeJs()
onRendered(() => {
  console.log('onRendered')
})
onMounted(() => {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)

  // material
  const pointMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: false,
  })

  const particles = new THREE.Points(sphereGeometry, pointMaterial)
  scene.add(particles)
  onAnimate(() => {
    pointMaterial.needsUpdate = true
  })
  controls.autoRotate = true
  axesHelper.visible = false
  gui.addBinding(controls, 'autoRotate')
  gui.addBinding(controls, 'autoRotateSpeed', {
    step: 0.01,
    min: 0.1,
    max: 10,
  })
  gui.addBinding(pointMaterial, 'size', {
    step: 0.001,
    min: 0.01,
    max: 1,
  })
  gui.addBinding(pointMaterial, 'sizeAttenuation')
})
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      ThreeJs Demo
    </h1>
    <div ref="domRef" class="h-[400px] w-full bg-black" />
  </div>
</template>

<style scoped lang='less'>

</style>
