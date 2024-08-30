const ReadyState: {
  [key: number]: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
} = {
  0: 'CONNECTING',
  1: 'OPEN',
  2: 'CLOSING',
  3: 'CLOSED',
}
type DataType = string | ArrayBufferLike | Blob | ArrayBufferView
export function useIWebSockets<T extends DataType>(url: string | URL) {
  const socket = new WebSocket(url)
  const status = computed(() => ReadyState[socket.readyState])
  const error = ref<Event>()
  const data = ref<T>()
  function send(data: DataType) {
    socket.send(data)
  }
  function close() {
    socket.close()
  }
  let onOpenFn: ((ev: Event) => void) | null = null
  function onOpen(ev: Event) {
    if (onOpenFn) {
      onOpenFn(ev)
    }
  }
  socket.addEventListener('open', onOpen)
  let onMessageFn: ((ev: MessageEvent<T>) => void) | null = null
  function onMessage(ev: MessageEvent<T>) {
    data.value = ev.data
    if (onMessageFn) {
      onMessageFn(ev)
    }
  }
  socket.addEventListener('message', onMessage)
  let onCloseFn: ((ev: CloseEvent) => void) | null = null
  function onClose(ev: CloseEvent) {
    if (onCloseFn) {
      onCloseFn(ev)
    }
  }
  socket.addEventListener('close', onClose)
  let onErrorFn: ((ev: Event) => void) | null = null
  function onError(ev: Event) {
    error.value = ev
    if (onErrorFn) {
      onErrorFn(ev)
    }
  }
  socket.addEventListener('error', onError)
  function destroy() {
    close()
    socket.removeEventListener('open', onOpen)
    socket.removeEventListener('message', onMessage)
    socket.removeEventListener('close', onClose)
    socket.removeEventListener('error', onError)
    onOpenFn = null
    onMessageFn = null
    onCloseFn = null
    onErrorFn = null
  }
  onUnmounted(() => {
    destroy()
  })
  return {
    socket,
    status,
    send,
    close,
    onOpen(fn: (ev: Event) => void) {
      onOpenFn = fn
    },
    onMessage(fn: (ev: MessageEvent<T>) => void) {
      onMessageFn = fn
    },
    onClose(fn: (ev: CloseEvent) => void) {
      onCloseFn = fn
    },
    onError(fn: (ev: Event) => void) {
      onErrorFn = fn
    },
  }
}
