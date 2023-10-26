import Home from '@/views/home/index.vue'
import Login from '@/views/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home
  },
  {
    path: '/login/:redirect?',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      keepAlive: true
    },
    component: () => import('@/views/error-pages/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

export default routes
