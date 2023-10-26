import { createApp } from 'vue'
// 枚举管理
import EnumPlugin from '@/enums'
// 状态管理器
import pinia from '@/store'
// 路由
import router from '@/router'
import '@/router/interceptor'
// 错误日志
import errorHandler from '@/error'
// 全局css
import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)

app.config.performance = true // 性能分析

app.use(errorHandler)
app.use(EnumPlugin)
app.use(router)
app.use(pinia)
app.mount('#app')
