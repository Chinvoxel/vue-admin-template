import Home from '@/views/home/index.vue'
import Login from '@/views/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/:redirect?',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    name: '404',
    meta: {
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
