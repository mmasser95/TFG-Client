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
          <ion-col>
            <ion-title class="ion-text-center">Negocis preferits</ion-title>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <swiper :slides-per-view="1" v-if="establimentsPreferits!=null">
                <swiper-slide v-for="d in establimentsPreferits"
                  :key="d._id" v-if="establimentsPreferits.length>0">
                  <myCard :establiment="d"></myCard>
                </swiper-slide>
                <p v-else class="ion-text-center">No es troba cap establiment com a preferit</p>
            </swiper>
            
          </ion-col>
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
import 'swiper/css/free-mode'
import myCard from '../components/myCard.vue';
import { onMounted, ref, Ref, watch } from 'vue';
import { showLoading } from '../composables/loader';
import { LatLngTuple } from 'leaflet'
import { searchEstabliments, getMyFavs } from '../APIService';
import { Establiment } from '../types';
import { useFavStore } from '../store/favStore';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core'
const favStore = useFavStore()
const { favorites } = storeToRefs(favStore)
let latitude = ref(41.0408888)
let longitude = ref(0.7479283)
let radi = ref(25)



let establiments: Ref<[Establiment] | null> = ref(null)
let establimentsPreferits: Ref<[Establiment] | null> = ref(null)

watch(favStore.favorites, async (before, after) => {
  await fillEstablimentsPreferits()
  console.log(before, after)
}, { deep: true })

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

const fillEstablimentsPreferits = useDebounceFn(async () => {
  const loader = await showLoading("Carregant establiments preferits")
  loader.present()
  getMyFavs().then((result) => {
    establimentsPreferits.value = result.data.preferits.establiments_fav
  }).catch((err) => {

  }).finally(() => {
    loader.dismiss(null, 'cancel')
  });
}, 250)

const handleRefresh = (event: RefresherCustomEvent) => {
  console.log("Fa mitja entrada");
  fillEstabliments().then((res) => {
    console.log("Ha fet l'entrada triunfal");
    event.target.complete()
  })
}

onMounted(async () => {
  console.log(establimentsPreferits.value)
  await fillEstabliments()
  await fillEstablimentsPreferits()
})

</script>
