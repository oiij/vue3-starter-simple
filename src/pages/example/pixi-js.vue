<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { Assets, SCALE_MODES, Sprite } from 'pixi.js'

definePage({
  meta: {
    layout: 'default',
    title: 'PixiJS Demo',
    keepAlive: false,
  },
})
const { domRef, app, onRendered } = usePixiJs({ background: '#ccc' })
onRendered(async () => {
  console.log('onRendered')
  add()
})
async function add() {
  // Load the bunny texture
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png')

  // Set the texture's scale mode to nearest to preserve pixelation
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

  // Create the bunny sprite
  const sprite = Sprite.from(texture)

  // Set the initial position
  sprite.anchor.set(0.5)
  sprite.x = app.screen.width / 2
  sprite.y = app.screen.height / 2

  // Opt-in to interactivity
  sprite.eventMode = 'static'

  // Shows hand cursor
  sprite.cursor = 'pointer'

  // Pointers normalize touch and mouse (good for mobile and desktop)
  sprite.on('pointerdown', (v) => {
    console.log(v)
    onClick()
  })

  // Alternatively, use the mouse & touch events:
  // sprite.on('click', onClick); // mouse-only
  // sprite.on('tap', onClick); // touch-only

  app.stage.addChild(sprite)

  function onClick() {
    sprite.scale.x *= 1.25
    sprite.scale.y *= 1.25
  }
}
</script>

<template>
  <div class="h-[100vh] flex-col flex-y-center gap-3">
    <h1 class="text-2xl font-bold">
      PixiJS Demo
    </h1>
    <div ref="domRef" class="h-[400px] w-full" />
  </div>
</template>

<style scoped lang='less'>

</style>
