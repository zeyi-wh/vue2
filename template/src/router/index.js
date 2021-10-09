import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/User/Login')
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        redirect: '/workspace'
      },
      {
        path: '/workspace',
        name: 'workspace',
        component: () =>
          import(/* webpackChunkName: "Workspace" */ '../views/Workspace')
      }
    ]
  },
  {
    path: '*',
    component: { render: (h) => h('div', null, '404') }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
  // todo 路由拦截
})

router.afterEach(() => {})

export default router
