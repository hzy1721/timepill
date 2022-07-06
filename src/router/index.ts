import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PutPillView from '@/views/PutPillView.vue'
import OpenPillView from '@/views/OpenPillView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/put',
      name: 'put',
      component: PutPillView
    },
    {
      path: '/open',
      name: 'open',
      component: OpenPillView
    },
    {
      path: '/open/:key',
      name: 'openKey',
      component: OpenPillView
    }
  ]
})

export default router
