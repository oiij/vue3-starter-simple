type State = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'PENDING'
const ReadyState: {
  [key: number]: State
} = {
  0: 'CONNECTING',
  1: 'OPEN',
  2: 'CLOSING',
  3: 'CLOSED',
}
interface Options {
  protocols?: string | string[]
  manual?: boolean
}
type DataType = string | ArrayBufferLike | Blob | ArrayBufferView
export function useIWebSockets<T extends DataType>(url: string | URL, options?: Options) {
  const { protocols, manual = false } = options ?? {}
  let socket: WebSocket | null = null
  const status = ref<State>('PENDING')
  const error = ref<Event>()
  const data = ref<T>()
  function setStatus() {
    if (socket) {
      status.value = ReadyState[socket.readyState]
    }
  }
  function connect() {
    socket = new WebSocket(url, protocols)
    socket.addEventListener('open', onOpen)
    socket.addEventListener('message', onMessage)
    socket.addEventListener('close', onClose)
    socket.addEventListener('error', onError)
  }
  if (!manual) {
    connect()
  }
  function send(data: DataType) {
    if (socket) {
      socket.send(data)
    }
  }
  function close() {
    if (socket) {
      socket.close()
    }
  }
  let onOpenFn: ((ev: Event) => void) | null = null
  function onOpen(ev: Event) {
    setStatus()
    if (onOpenFn) {
      onOpenFn(ev)
    }
  }
  let onMessageFn: ((ev: MessageEvent<T>) => void) | null = null
  function onMessage(ev: MessageEvent<T>) {
    setStatus()
    data.value = ev.data
    if (onMessageFn) {
      onMessageFn(ev)
    }
  }
  let onCloseFn: ((ev: CloseEvent) => void) | null = null
  function onClose(ev: CloseEvent) {
    setStatus()
    if (onCloseFn) {
      onCloseFn(ev)
    }
  }
  let onErrorFn: ((ev: Event) => void) | null = null
  function onError(ev: Event) {
    setStatus()
    error.value = ev
    if (onErrorFn) {
      onErrorFn(ev)
    }
  }
  function destroy() {
    close()
    socket?.removeEventListener('open', onOpen)
    socket?.removeEventListener('message', onMessage)
    socket?.removeEventListener('close', onClose)
    socket?.removeEventListener('error', onError)
    socket = null
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
    data,
    connect,
    send,
    close,
    destroy,
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
