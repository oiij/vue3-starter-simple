<!-- eslint-disable no-console -->
<script setup lang='ts'>
definePage({
  meta: {
    layout: 'blank',
    title: 'useUserMedia',
    keepAlive: false,
  },
})
const offerInput = ref()
const { connection, channel: offerChannel, createOffer } = useWebRtcOffer('channel')
const { connection: remoteConnection, createAnswer } = useWebRtcAnswer()
createOffer().then((localDescription) => {
  console.log('localDescription', localDescription)

  if (localDescription) {
    createAnswer(localDescription).then((remoteDescription) => {
      console.log('remoteDescription', remoteDescription)
      if (remoteDescription) {
        connection.setRemoteDescription(remoteDescription)
      }
    })
  }
})
connection.onicecandidate = (ev) => {
  console.log('onicecandidate', ev)
}

// remoteConnection.onicecandidate = e => !e.candidate
// || connection.addIceCandidate(e.candidate)
//   .catch((e) => {
//     console.log(e)
//   })
offerChannel.onerror = (ev) => {
  console.log('onerror', ev)
}
offerChannel.onopen = (ev) => {
  console.log('onopen', ev)
}
offerChannel.onclose = (ev) => {
  console.log('onclose', ev)
}
function send() {
  offerChannel.send(offerInput.value)
}
let receiveChannel: RTCDataChannel | null = null
remoteConnection.ondatachannel = (ev) => {
  console.log('ondatachannel', ev)
  receiveChannel = ev.channel
  receiveChannel.onmessage = (ev) => {
    console.log('onmessage', ev)
  }
}
</script>

<template>
  <div class="h-full w-full flex-col-center gap-[20px] p-y-[20px]">
    <h1 class="text-3xl">
      使用WebRTC
    </h1>
    <div class="w-full flex flex-1">
      <div class="flex-col flex-1">
        <h2 class="text-center text-xl">
          Offer
        </h2>
        <div class="h-[300px] w-full p-[10px]">
          1
        </div>
        <div class="w-full flex">
          <n-input v-model:value="offerInput" class="w-[100px]" />
          <n-button @click="send">
            发送
          </n-button>
        </div>
      </div>
      <div class="flex-col flex-1">
        <h2 class="text-center text-xl">
          Answer
        </h2>
        <div class="h-[300px] w-full p-[10px]">
          1
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
