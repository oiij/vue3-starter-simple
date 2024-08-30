export function useMediaRecorder(stream: MediaStream, options?: MediaRecorderOptions) {
  const mediaRecorder = new MediaRecorder(stream, options)
  const state = computed(() => mediaRecorder.state)
  const chunks: Blob[] = []

  function start() {
    mediaRecorder.start()
  }
  function stop() {
    mediaRecorder.stop()
  }
  function pause() {
    mediaRecorder.pause()
  }
  function resume() {
    mediaRecorder.resume()
  }
  function setChunk(ev: BlobEvent) {
    chunks.push(ev.data)
  }
  function getBlob() {
    const blob = new Blob(chunks, { type: 'video/webm' })
    chunks.length = 0
    return blob
  }
  mediaRecorder.addEventListener('dataavailable', setChunk)
  mediaRecorder.addEventListener('stop', getBlob)
  onUnmounted(() => {
    mediaRecorder.removeEventListener('dataavailable', setChunk)
    mediaRecorder.removeEventListener('stop', getBlob)
  })
  return {
    mediaRecorder,
    state,
    start,
    stop,
    pause,
    resume,
    getBlob,
  }
}
