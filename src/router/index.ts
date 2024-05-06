import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { useLoginStore } from '@/store/loginStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs',
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
        component: () => import('@/views/HomePage.vue'),
        
      },
      {
        path: 'explorar',
        component: () => import('@/views/Explorar.vue'),
        
      },
      {
        path: 'tab3',
        component: () => import('@/views/Rebost.vue'),
        
      },
      {
        
          path: 'rebost/:rebostId',
          props: true,
          component: () => import('@/views/Rebost/viewRebost.vue'),
        
      },
      {
        path: 'tab4',
        component: () => import('@/views/Configuracio.vue'),
        
      },
      {
        path: 'tab5',
        component: () => import('@/views/Ofertes/gestionarOfertes.vue'),
        
      },
      {
        path: 'tab6',
        component: () => import('@/views/Comandes/viewComandes.vue'),
        
      },
    ],
  },
  {
    path: '/establiment/:idd',
    component: () => import('@/views/Explorar/viewEstabliment.vue'),
    props: true,
  },
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
