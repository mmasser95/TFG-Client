<template>
  <ion-app>
    <UseColorMode v-slot="{ mode }">
      <ion-router-outlet :animated="true" :animation="animateRouter" />
    </UseColorMode>
  </ion-app>
</template>

<script setup lang="ts">

import { IonApp, createAnimation, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue';
import { onBeforeMount, onMounted } from 'vue';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { App } from '@capacitor/app'
import { UseColorMode } from '@vueuse/components'
import { useColorMode } from '@vueuse/core';
import { verificarToken } from "./APIService/utils"
import { useLoginStore } from './store/loginStore';
import { useAlimentStore } from './store/alimentStore';
import { useFavStore } from './store/favStore';
import { useFirebaseStore } from './store/firebaseStore'
import { showLoading, showAlert } from './composables/loader';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useFirebase } from './composables/useFirebase'
import { useCapacitorNotifications } from './composables/useCapacitorNotifications'
const { initialize } = useFirebase()
const { registerNotifications, addListeners } = useCapacitorNotifications()

const animateRouter = (baseEl: HTMLElement) => {
  return createAnimation()
    .addElement(baseEl)
    .duration(1250)
    .fromTo('opacity', '1', '0');
}
registerNotifications().then((result) => {

}).catch((err) => {
  initialize()
});

const router = useRouter()
const { setToken, setUserId, setUserType } = useLoginStore()
const { setAliments } = useAlimentStore()
const { setLoginFavs } = useFavStore()

let { myToken } = storeToRefs(useFirebaseStore())
const mode = useColorMode({
  attribute: 'theme',
  modes: {
    light: 'light',
    dark: 'dark',
    contrast: 'contrast'
  }
})

const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
})


let token = localStorage.getItem('token')
if (token) {
  setToken(token)
  showLoading('Iniciant sessió').then((loader) => {
    loader.present()
    verificarToken((err: any, data: any) => {
      loader.dismiss()
      if (err) {
        //router.push("/login")
        return false
      }
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