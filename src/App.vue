<template>
  <ion-app>
    <UseColorMode v-slot="{ mode }">
      <ion-router-outlet :animated="true" :animation="animateRouter" />
    </UseColorMode>
  </ion-app>
</template>

<script setup lang="ts">
//S'importen els elements necessaries d'Ionic
import { IonApp, createAnimation, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue';
//S'importa aquest element per a poder sortir de l'aplicació amb el botó d'endarrere
import { App } from '@capacitor/app'
//S'importa aquest component per a canviar entre els diferents temes de l'aplicació 
//i es veiguin reflexats els canvis a la plantilla
import { UseColorMode } from '@vueuse/components'
//La següent funció s'inicialitza per a recordar la ultima opció triada per l'usuari
import { useColorMode } from '@vueuse/core';
//Aquesta funció de la API permet verificar si el token guardat 
import { verificarToken } from "./APIService/utils"
//Amb aquest element podem controlar la store de login i podrem saber quan s'ha iniciat sessió
import { useLoginStore } from './store/loginStore';
//Amb aquesta store guardem tots els aliments presents en la base de dades. 
//D'aquesta manera podem accedir a tota la informació sense haver de repetir peticions innecessàries.
import { useAlimentStore } from './store/alimentStore';
//Store per a controlar els establiments preferits
import { useFavStore } from './store/favStore';
//Store per a emmagatzemar el token de firebase
import { useFirebaseStore } from './store/firebaseStore'
//Composables per a mostrar alertes o un loaders
import { showLoading, showAlert } from './composables/loader';
//Funcionalitat per a controlar el router de vue
import { useRouter } from 'vue-router';
//Funcionalitat per a convertir les variables internes de una store de pinia en refs (variables reactives)
//de la plantilla
import { storeToRefs } from 'pinia';

//Composable per a utilitzar les notificacions de firebase en el navegador
import { useFirebase } from './composables/useFirebase'
//Composable per a utilitzar les notificacions de capacitor en l'app
import { useCapacitorNotifications } from './composables/useCapacitorNotifications'
const { initialize } = useFirebase()
const { registerNotifications, addListeners } = useCapacitorNotifications()

const animateRouter = (baseEl: HTMLElement) => {
  return createAnimation()
    .addElement(baseEl)
    .duration(1250)
    .fromTo('opacity', '1', '0');
}
//S'intenta registrar les notificacions de capacitor
registerNotifications().then((result) => {

}).catch((err) => {
  //En cas de que es produeixi un error (significarà que no estem )
  initialize()
});

//Es declaren les variables necessàries per a utilitzar les funcionalitats anteriorment mencionades
const router = useRouter()
const { setToken, setUserId, setUserType } = useLoginStore()
const { setAliments } = useAlimentStore()
const { setLoginFavs } = useFavStore()

//S'obté el token d'inici de sessi
let { myToken } = storeToRefs(useFirebaseStore())

//S'inicialitza el component de VueUse per al control del tema de l'app
const mode = useColorMode({
  attribute: 'theme',
  modes: {
    light: 'light',
    dark: 'dark',
    contrast: 'contrast'
  }
})

//Aquest petit troç de codi declara un listener que quan no queden elements a l'historial del router
//És a dir, quan ja no podem anar més endarrere, l'aplicació es tancarà.
const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
})

//Quan l'aplicació s'inicia. Cerca al localStorage si existeix alguna cel·la amb el nom token
let token = localStorage.getItem('token')
if (token && token!="") {
  //En cas afirmatiu el guarda a la store
  setToken(token)
  showLoading('Iniciant sessió').then((loader) => {
    //Es mostra un loader durant la petició per a verificar el token trobat
    loader.present()
    //Es verifica el token mitjançant una crida a la API
    verificarToken((err: any, data: any) => {
      //Un cop resolta la crida es treu el loader
      loader.dismiss()
      //Si ha hagut error es redirecciona al login
      if (err) {
        router.push("/login")
        return false
      }
      //En cas contrari, s'inicialitza el procés d'inici de sessió
      setToken(data.token)
      localStorage.setItem('token', data.token)
      setUserId(data.userId)
      setUserType(data.userType)
      setAliments()
      if (data.userType == 'client') {
        setLoginFavs()
        router.push('/tabs/tab1');
      }
      else
        router.push('/tabs/tab5')
    })
  });

}






</script>

<style>
* {
  font-family: 'Exo 2';
}

ion-fab {
  bottom: 7px;
  right: 15px;
}

.input-container {
  display: flex;
  flex-flow: column wrap;
  gap: 3px
}
</style>
popups.0./composables/useFirebase