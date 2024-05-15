import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';


/* Theme variables */
import './theme/variables.css';

/* Store Pinia*/
import { createPinia } from 'pinia';

/*Star-Ratings*/
import vue3starRatings from "vue3-star-ratings";



/* Google-Login-Button */
import GoogleSignInPlugin from "vue3-google-signin"
const pinia = createPinia();

const app = createApp(App)
.use(IonicVue)
.use(router)
.use(pinia)
.use(GoogleSignInPlugin, {
  clientId: "981593687954-d0h9henugkvditar81b2jdmuo7o1rgum.apps.googleusercontent.com",
})
.component('star-rating',vue3starRatings)


router.isReady().then(() => {
  app.mount('#app');
});
