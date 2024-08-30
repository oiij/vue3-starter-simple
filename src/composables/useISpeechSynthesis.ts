export function useISpeechSynthesis() {
  const synth = window.speechSynthesis
  synth.addEventListener('voiceschanged', setVoices)
  const voices = ref(synth.getVoices())
  const voice = ref(voices.value.find(v => v.default) ?? voices.value[0])
  const rate = ref(1)
  const pitch = ref(1)
  const volume = ref(1)
  const paused = computed(() => synth.paused)
  const pending = computed(() => synth.pending)
  const speaking = computed(() => synth.speaking)
  function setVoices() {
    voices.value = synth.getVoices()
    voice.value = voices.value.find(v => v.default) ?? voices.value[0]
  }
  function speak(text: string) {
    if (synth.speaking) {
      cancel()
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice.value
    utterance.pitch = pitch.value
    utterance.rate = rate.value
    utterance.volume = volume.value
    synth.speak(utterance)
  }
  function pause() {
    synth.pause()
  }

  function resume() {
    synth.resume()
  }
  function cancel() {
    synth.cancel()
  }
  onUnmounted(() => {
    synth.removeEventListener('voiceschanged', setVoices)
    synth.cancel()
  })
  return {
    synth,
    voices,
    voice,
    rate,
    pitch,
    volume,
    paused,
    pending,
    speaking,
    speak,
    pause,
    resume,
    cancel,
  }
}
