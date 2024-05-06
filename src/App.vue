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
const router = useRouter()
const { setToken, setUserId, setUserType } = useLoginStore()
const { setAliments } = useAlimentStore()
const { setLoginFavs } = useFavStore()

let {myToken}=storeToRefs(useFirebaseStore)
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

//Firebase

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
try {
  let messaging = getMessaging(app)
  getToken(messaging, { vapidKey: 'BC49ue7_lVKUlKDx1KHbb7takiKSGkA-cajRyMSQWFlxs8ly-pEMiI3JJpajX2E7Vlrs1usy7KBadc2NRs-N0Wg' }).then((currentToken) => {
    if (currentToken) {
      console.log(currentToken)
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });/*
  onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });*/
} catch (err) {
  console.log(err)
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
popups.0