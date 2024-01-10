import Layout from '@/layout/index.vue'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import i18n from '@/lang'

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
          title: i18n.global.t('route.home'),
          icon: 'House'
        },
        component: Home
      }
    ]
  },
  {
    path: '/login/:redirect',
    name: 'Login',
    props: true,
    hidden: true,
    meta: {
      title: i18n.global.t('route.login')
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
          title: i18n.global.t('route.test'),
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
      title: i18n.global.t('route.user'),
      icon: 'user'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          title: i18n.global.t('route.profile')
        },
        component: () => import('@/views/test/index.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: {
          title: i18n.global.t('route.accountSetting')
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
