import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import Mapa from '../views/Mapa.vue'
import Search from '../views/Search.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
import Signin from '../views/Signin.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path:'/mapa',
    name:'mapa',
    component: Mapa
  },
  {
    path:'/settings',
    name:'settings',
    component:Settings
  },
  {
    path:'/search',
    name:'search',
    component:Search
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/signin',
    name:'signin',
    component:Signin
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
