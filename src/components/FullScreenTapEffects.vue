<!-- eslint-disable no-console -->
<script setup lang='ts'>
import anime from 'animejs/lib/anime.es.js'

interface Particule {
  x: number
  y: number
  color: string
  radius: number
  endPos: {
    x: number
    y: number
  }
  draw: () => void
}
interface Circle {
  x: number
  y: number
  color: string
  radius: number
  alpha: number
  lineWidth: number
  draw: () => void
}
const { domRef, onRender, onResize } = useCanvas()
onRender((canvas, ctx) => {
  console.log('onRender')

  // 设置初始状态，用户是否进行了交互
  const human = ref(false)
  // 烟花粒子数量
  const numberOfParticules = 20
  // 鼠标指针的位置
  const pointer = ref({
    x: 0,
    y: 0,
  })
  // 根据设备支持情况设置触摸或点击事件
  const tap = ('ontouchstart' in window || navigator.maxTouchPoints) ? 'touchstart' : 'mousedown'
  // 烟花颜色数组
  const colors = ['rgba(99, 97, 220, 0.2)', 'rgba(99, 97, 220, 0.4)', 'rgba(139, 240, 254, 0.2)']
  // 更新鼠标指针位置
  function updateCoords(e: MouseEvent & TouchEvent) {
    pointer.value.x = e.clientX || e.touches[0].clientX
    pointer.value.y = e.clientY || e.touches[0].clientY
  }
  // 计算烟花粒子的运动方向
  function setParticuleDirection(p: { x: number, y: number }) {
    const angle = anime.random(0, 360) * Math.PI / 180
    const value = anime.random(50, 180)
    const radius = [-1, 1][anime.random(0, 1)] * value
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    }
  }
  // 创建烟花粒子
  function createParticule(x: number, y: number) {
    const p: Particule = {
      x,
      y,
      color: colors[anime.random(0, colors.length - 1)],
      radius: anime.random(8, 16), // 烟花粒子尺寸大小区间
      endPos: setParticuleDirection({ x, y }),
      draw: () => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
        ctx.fillStyle = p.color
        ctx.fill()
      },
    }
    return p
  }
  // 创建烟花中心圆
  function createCircle(x: number, y: number) {
    const p: Circle = {
      x,
      y,
      color: '#6361DC',
      radius: 0.1,
      alpha: 0.01,
      lineWidth: 2,
      draw: () => {

      },
    }
    p.draw = function () {
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.lineWidth = p.lineWidth
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return p
  }
  // 渲染烟花粒子
  function renderParticule(anim: any) {
    for (let i = 0; i < anim.animatables.length; i++)
      anim.animatables[i].target.draw()
  }
  // 烟花粒子动画
  function animateParticules(x: number, y: number) {
    const circle = createCircle(x, y)
    const particules = []
    for (let i = 0; i < numberOfParticules; i++)
      particules.push(createParticule(x, y))

    anime.timeline().add({
      targets: particules,
      x(p: any) { return p.endPos.x },
      y(p: any) { return p.endPos.y },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
    })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0,
      })
  }
  // 动画渲染控制器
  const render = anime({
    duration: Infinity,
    update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
  })
  document.addEventListener(tap, (e) => {
    human.value = true
    render.play()
    updateCoords(e as any)
    animateParticules(pointer.value.x, pointer.value.y)
  }, false)
})
onResize(() => {
  console.log('onResize')
})
</script>

<template>
  <Teleport to="body">
    <div ref="domRef" class="fixed inset-0 z-0 h-[100vh] w-[100vw] select-none" />
  </Teleport>
</template>

<style scoped lang='less'>

</style>
