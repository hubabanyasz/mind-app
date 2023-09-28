import { createRouter, createWebHistory } from 'vue-router'
import RecordView from '../views/RecordView.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Record',
      component: RecordView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/review',
      name: 'Review',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/ReviewView.vue')
    },
    {
      path: '/protected',
      name: 'protected',
      component: () => import('../views/ProtectedView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters.isAuth) {
      next('/protected')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router