// import { vue } from 'vue';
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupPlugins } from './plugins'
import AreaLinkage from 'vue-area-linkage'
import './styles/global.scss'
import 'vue-area-linkage/dist/index.css'
import 'animate.css'
async function bootstrap() {
  const app = createApp(App)
  app.use(AreaLinkage)
  setupPlugins(app)
  setupRouter(app)
  await router.isReady()
  app.mount('#app')
}
bootstrap()
