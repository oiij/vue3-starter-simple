import { createRouterScroller } from 'vue-router-better-scroller'

export const routerScroller = createRouterScroller({
  selectors: {
    'window': true,
    'body': true,
    '.scrollable': true,
  },
})
