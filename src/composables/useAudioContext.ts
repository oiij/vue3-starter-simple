export function useAudioContext() {
  const domRef = ref<HTMLAudioElement | HTMLVideoElement>()

  let audioCtx: AudioContext | null = null

  function createMediaElementSource(element: HTMLAudioElement | HTMLVideoElement) {
    if (!audioCtx)
      audioCtx = new AudioContext()

    const elSource = audioCtx.createMediaElementSource(element)
    return elSource
  }
  function createBufferSource(url: string): Promise<AudioBufferSourceNode> {
    return new Promise((resolve, reject) => {
      if (!audioCtx)
        audioCtx = new AudioContext()

      fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioCtx!.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const bufferSource = audioCtx!.createBufferSource()
          bufferSource.buffer = audioBuffer
          return resolve(bufferSource)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }
  function createMediaStreamSource(mediaStream: MediaStream) {
    if (!audioCtx)
      audioCtx = new AudioContext()

    const streamSource = audioCtx.createMediaStreamSource(mediaStream)
    return streamSource
  }
  return {
    domRef,
    audioCtx,
    createMediaElementSource,
    createBufferSource,
    createMediaStreamSource,
  }
}
