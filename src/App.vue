<template>
  <ion-app>
    <UseColorMode v-slot="{ mode }">
      <ion-router-outlet :animated="false" />
    </UseColorMode>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue';
import { onBeforeMount, onMounted } from 'vue';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { App } from '@capacitor/app'
import { UseColorMode } from '@vueuse/components'
import { useColorMode } from '@vueuse/core';
import { verificarToken } from './APIService'
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
    verificarToken().then((res) => {
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token)
      setUserId(res.data.userId)
      setUserType(res.data.userType)
      setAliments()
      if (res.data.userType == 'client') {
        setLoginFavs()
        router.push('/tabs/tab1');
      }
      else
        router.push('/tabs/tab5')

    }).catch(() => {
      router.push('/login')
    }).finally(() => {
      loader.dismiss()
    });
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