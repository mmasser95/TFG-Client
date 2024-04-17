<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-refresher slot="fixed" @ion-refresh.stop="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-title class="ion-text-center">Llista de negocis</ion-title>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <swiper :slides-per-view="1">
              <swiper-slide v-if="establiments" v-for="(i, k) in establiments" :key="i._id">
                <myCard :establiment="i" />
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col></ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col></ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import myCard from '../components/myCard.vue';
import { onMounted, ref, Ref } from 'vue';
import { showLoading } from '../composables/loader';
import {  LatLngTuple } from 'leaflet'
import { searchEstabliments } from '../APIService';
let latitude = ref(41.0408888)
let longitude = ref(0.7479283)
let radi = ref(25)

interface Establiment {
  _id: string,
  nom: string,
  descripcio: string,
  latitude: string,
  longitude: string,
  telf: string,
  url_imatge: string
  coordenades: LatLngTuple,
  url_fons: string,
  horari: string,
  tipus: string
}

let establiments: Ref<[Establiment] | null> = ref(null)

const fillEstabliments = async () => {
  const loader = await showLoading("Carregant establiments")
  loader.present()
  searchEstabliments(latitude.value, longitude.value, radi.value).then((result) => {
    establiments.value = result.data.establiments
  }).catch((err) => {

  }).finally(() => {
    loader.dismiss(null, 'cancel')
  });
}

const handleRefresh = (event:RefresherCustomEvent) => {
  console.log("Fa mitja entrada");
  fillEstabliments().then((res)=>{
    console.log("Ha fet l'entrada triunfal");
    event.target.complete()
  })
}

onMounted(async () => {
  await fillEstabliments()
})

</script>
