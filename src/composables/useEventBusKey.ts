import type { EventBusKey } from '@vueuse/core'

export const eventBusKey: EventBusKey<object> = Symbol('symbol-key')
