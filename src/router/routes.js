import Layout from '@/layout/index.vue'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'

// 无需权限的页面
const constantRoutes = [
  {
    path: '/',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: 'home/index',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'House'
        },
        component: Home
      }
    ]
  },
  {
    path: '/login/:redirect?',
    name: 'Login',
    hidden: true,
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    meta: {
      title: '404',
      keepAlive: true
    },
    component: () => import('@/views/error-pages/404.vue')
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [
      {
        path: 'index',
        name: 'test',
        meta: {
          title: '测试页',
          icon: 'guide',
          noCache: true
        },
        component: () => import('@/views/test/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/profile',
    meta: {
      title: '个人中心',
      icon: 'user'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          title: '个人资料',
          icon: 'dashboard'
        },
        component: () => import('@/views/test/index.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: {
          title: '账户设置',
          icon: 'dashboard'
        },
        component: () => import('@/views/test/index.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

const asyncRoutes = []

const routes = [...constantRoutes, ...asyncRoutes]

export default routes
