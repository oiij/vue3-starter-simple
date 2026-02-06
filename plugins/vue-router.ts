// https://router.vuejs.org/

import { appendRouterMeta } from '@oiij/auto-router/plugin'
import VueRouter from 'vue-router/vite'

export default VueRouter({
  extensions: ['.vue', '.md', '.tsx'],
  exclude: ['**/components/**/*.*'],
  extendRoute: (route) => {
    appendRouterMeta(route)
  },
})
