// import { vue } from 'vue';
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupPlugins } from './plugins'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.scss'
import 'animate.css'
async function bootstrap() {
  const app = createApp(App)
  setupPlugins(app)
  setupRouter(app)
  await router.isReady()
  app.mount('#app')
  app.use(ElementPlus)
}
bootstrap()
