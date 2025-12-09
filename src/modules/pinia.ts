import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { PiniaUndo } from 'pinia-undo'

export const pinia = createPinia().use(createPersistedState()).use(PiniaUndo)
