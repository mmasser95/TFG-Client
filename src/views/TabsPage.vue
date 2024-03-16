<template>
  <ion-page>
    <ion-tabs>
      	 <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Inici</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="map" />
          <ion-label>Mapa</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="store.loggedIn" tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="storefront" />
          <ion-label>Inventari</ion-label>
        </ion-tab-button>
        <ion-tab-button v-if="!store.loggedIn" tab="tab4" href="/tabs/login">
          <ion-icon aria-hidden="true" :icon="logIn"></ion-icon>
          <ion-label>Log In</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab5" href="/rebost/524656">
          <ion-icon aria-hidden="true" :icon="golf"></ion-icon>
          <ion-label>Prova</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonRow, IonGrid, IonCol } from '@ionic/vue';
import { home, map, logIn, storefront, golf } from 'ionicons/icons';
import {ref, reactive} from 'vue';
import {useLoginStore} from '@/store/loginStore'

const store = useLoginStore();

</script>
