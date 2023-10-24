import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Base64 } from 'js-base64'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { getToken } from '@/utils/token'
import { useUserStore } from '@/store/user'

// NProgress 配置
NProgress.configure({
  showSpinner: false
})

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000 // 超时时间
})

// 配置请求拦截器
instance.interceptors.request.use(
  config => {
    NProgress.start() // 开启 progress bar
    if (getToken()) {
      config.headers.Authorization = Base64.encode(`Bearer${getToken()}`)
    }
    return config
  },
  err => {
    NProgress.done() // 关闭 progress bar
    return Promise.reject(err) // 将错误消息挂到promise的失败函数上
  }
)

// 配置相应拦截器
instance.interceptors.response.use(
  res => {
    NProgress.done()
    // 获取状态码
    const { status } = res
    const message = res.data.message || '未知错误'
    // 如果是401则跳转到登录页面
    if (status === 401) {
      ElMessage.error('当前登录已失效，请重新登录')
      const store = useUserStore()
      store.FedLogout().then(() => {
        router.replace({
          name: 'Login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
    }
    // 状态码非200则弹窗提示
    if (status !== 200) {
      // 解决连续弹出警告框的问题
      if (!window._$messageInstance || !window._$messageInstance.visible) {
        window._$messageInstance = ElMessage({
          message,
          type: 'error',
          onClose() {
            window._$messageInstance = undefined
          }
        })
      }
      return Promise.reject(new Error(message))
    }

    return res.data
  },
  err => {
    NProgress.done()
    return Promise.reject(new Error(err))
  }
)

export default instance
