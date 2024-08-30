interface Options {
  video?: boolean
  audio?: boolean
  display?: boolean
  manual?: boolean
}
export function useUserDisplayMedia(options?: Options) {
  const { audio = true, video = true, display = false, manual = false } = options ?? {}
  const domRef = ref<HTMLVideoElement | HTMLAudioElement>()
  let stream: MediaStream | null = null

  function start(): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices[display ? 'getDisplayMedia' : 'getUserMedia']({ audio, video }).then((_stream) => {
        stream = _stream
        if (domRef.value) {
          domRef.value.srcObject = stream
        }
        return resolve(stream)
      }).catch(error => reject(error))
    })
  }
  function close() {
    if (stream) {
      stream.getTracks().forEach((f) => {
        if (f.readyState === 'live') {
          f.stop()
        }
      })
    }
  }
  onMounted(() => {
    if (!manual) {
      start()
    }
  })
  return {
    domRef,
    stream: stream as unknown as MediaStream | null,
    start,
    close,
  }
}
