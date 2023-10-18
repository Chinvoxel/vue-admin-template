import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import EnumPlugin from '@/enums'

import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)
// element icon 引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.performance = true // 性能分析

app.use(EnumPlugin)
app.mount('#app')
