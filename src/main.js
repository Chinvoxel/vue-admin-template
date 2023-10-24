import { createApp } from 'vue'
import EnumPlugin from '@/enums'
import pinia from '@/store'

import router from '@/router'
import '@/router/interceptor'

import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)

app.config.performance = true // 性能分析

app.use(EnumPlugin)
app.use(router)
app.use(pinia)
app.mount('#app')
