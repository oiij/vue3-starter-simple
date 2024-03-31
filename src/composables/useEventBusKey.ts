import type { EventBusKey } from '@vueuse/core'

export const eventBusKey: EventBusKey<{}> = Symbol('symbol-key')
