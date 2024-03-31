import { createApp } from 'vue'
import App from './App.vue'
import { useModules } from '~/modules'
import '~/assets'

const app = createApp(App)
useModules(app)
app.mount('#app').$nextTick(() => {
  window.postMessage({ client: 'mounted' }, '*')
})
