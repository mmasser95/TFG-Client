import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { useLoginStore } from '@/store/loginStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/config',
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth: 'NoAuth',
    },
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab2Page.vue'),
        meta: {
          order: 1,
          tab: true,
        },
      },
      {
        path: 'explorar',
        component: () => import('@/views/Explorar.vue'),
        meta: {
          order: 2,
          tab: true,
        },
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: {
          order: 5,
          tab: true,
        },
      },
      {
        path: 'tab4',
        component: () => import('@/views/Configuracio.vue'),
        meta: {
          order: 6,
          tab: true,
        },
      },
      {
        path: 'tab5',
        component: () => import('@/views/Ofertes/gestionarOfertes.vue'),
        meta: {
          order: 3,
          tab: true,
        },
      },
      {
        path: 'comandes',
        component: () => import('@/views/Comandes/viewComandes.vue'),
        meta: {
          order: 3,
          tab: true,
        },
      },
    ],
  },
  {
    path: '/establiment/:idd',
    component: () => import('@/views/Explorar/viewEstabliment.vue'),
    props: true,
  },,
  // {
  //   path: '/establiments',
  //   component: () => import('@/views/Establiments/gestionarEstabliments.vue'),
  // },
  // {
  //   path: '/registre',
  //   component: () => import('@/views/Registre.vue'),
  //   meta:{
  //     requiresAuth:'NoAuth'
  //   }
  // },
  /*{
    path: '/oferta/:ofertaId',
    component: () => import('@/views/Ofertes/viewOferta.vue')
  },*/

  {
    path: '/rebost/:rebostId',
    props: true,
    component: () => import('@/views/Rebost/viewRebost.vue'),
  },
  {
    path: '/rebost',
    component: () => import('@/views/Rebost/newRebost.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth != 'NoAuth') {
    if (!useLoginStore().loggedIn) {
      next('/login');
      // next();
    } else {
      next();
    }
  } else {
    next();
  }
});

/*router.afterEach((to, from) => {
  if (to.meta.tab && from.meta.tab) {
    if (to.meta.order < from.meta.order) {
      to.meta.transition = 'animate__animated animate__bounce';
    }
  }
});
*/
export default router;
