import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

const routerHistory = createWebHashHistory()

import HomePage from './pages/home.vue'
import AboutPage from './pages/about.vue'
import NotFoundPage from './pages/notFound.vue'

const routers = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/about',
      component: AboutPage
    },
    {
      path: '/:CatchAll(.*)',
      component: NotFoundPage
    }
  ]
})

export default routers
