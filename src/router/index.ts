import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { useLoginStore } from '@/store/loginStore'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Mapa.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'login',
        component: () => import('@/views/Login.vue'),
        
      }
    ]
  },
  {
    path: '/oferta',
    component: () => import('@/views/Ofertes/newOferta.vue')
  },
  {
    path: '/oferta/:ofertaId',
    component: () => import('@/views/Ofertes/viewOferta.vue')
  },

  {
    path: '/rebost/:rebostId',
    props: true,
    component: () => import('@/views/Rebost/viewRebost.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rebost',
    component: () => import('@/views/Rebost/newRebost.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.meta.requiresAuth) {
    if (!useLoginStore().loggedIn) {
      // next('/tabs/login');
      next();
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
