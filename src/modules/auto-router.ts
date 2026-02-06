import { createAutoRouter } from '@oiij/auto-router'
import { routes } from 'vue-router/auto-routes'
import { router } from './router'

export const autoRouter = createAutoRouter(router, routes)
