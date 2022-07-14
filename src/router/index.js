import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'search',
        component: () => import('@/views/search')
      },
      {
        path: 'news',
        component: () => import('@/views/news')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
