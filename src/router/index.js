import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const generateRouter = () => {
  return createRouter({
    base: '/',
    routes,
    history: createWebHashHistory(),
    scrollBehavior: () => ({ top: 0 })
  })
}

const router = generateRouter()

//  TODO 重置路由方法封装
export function resetRouter() {
  // 重置路由
  const newRouter = generateRouter()
  router.matcher = newRouter.matcher
}

export default router
