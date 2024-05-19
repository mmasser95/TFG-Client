<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-refresher slot="fixed" @ion-refresh.stop="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid>
        <ion-row>
          <ion-col class="ion-activatable" id="negocisSection">
            <ion-title class="ion-text-center ion-activatable" >Llista de negocis <ion-icon
                :icon="informationCircle" @click="onboardingElement?.start"></ion-icon></ion-title>

          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <swiper :slides-per-view="1" :space-between="10" :freeMode="true" :navigation="true" :pagination="{ clickable: true }">
              <swiper-slide v-if="establiments" v-for="(i, k) in establiments" :key="i._id">
                <myCard :establiment="i" />
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-activatable" id="preferitsSection">
            <ion-title class="ion-text-center ion-activatable" >Negocis preferits</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <swiper :slides-per-view="1" v-if="establimentsPreferits != null" :freeMode="true" :navigation="true">
              <swiper-slide v-for="d in establimentsPreferits" :key="d._id" v-if="establimentsPreferits.length > 0">
                <myCard :establiment="d"></myCard>
              </swiper-slide>
              <p v-else class="ion-text-center">No es troba cap establiment com a preferit</p>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
      <onboarding v-if="started" :steps="onboardingHomeSteps" @start-onboarding="startOnboarding"></onboarding>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/vue';
import { informationCircle } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import myCard from '../components/myCard.vue';
import { onMounted, ref, Ref, watch } from 'vue';
import { showLoading } from '../composables/loader';
import { LatLngTuple } from 'leaflet'
import { testFCM } from '../APIService/utils';
import { getMyFavs } from '../APIService/favs'
import { searchEstabliments } from '../APIService/establiments';
import { Establiment } from '../types';
import { useFavStore } from '../store/favStore';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core'
import onboarding from '../components/onboarding.vue';
const favStore = useFavStore()
const { favorites } = storeToRefs(favStore)
const latitude = ref(41.0408888)
const longitude = ref(0.7479283)
const radi = ref(25)
const started = ref(false)
const establiments: Ref<[Establiment] | null> = ref(null)

const establimentsPreferits: Ref<[Establiment] | null> = ref(null)

const onboardingHomeSteps = [{
  attachTo: {
    element: "#negocisSection"
  },
  options: {
    popper: {
      placement: 'bottom-start'
    }
  },
  content: {
    title: "Establiments propers",
    description: "En aquest apartat podràs trobar els millors establiments aprop teu"
  }
}, {
  attachTo: {
    element: "#preferitsSection"
  },
  options: {
    popper: {
      placement: 'top'
    }
  },
  content: {
    title: "Establiments preferits",
    description: "En aquest apartat podràs trobar els establiments que has marcat com a preferits"
  }
}]

const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)

const startOnboarding = (element: any) => {
  console.log('element :>> ', element);
  
  onboardingElement.value = element
}

watch(favStore.favorites, async (before, after) => {
  await fillEstablimentsPreferits()
  console.log(before, after)
}, { deep: true })

const fillEstabliments = async () => {
  const loader = await showLoading("Carregant establiments")
  loader.present()
  searchEstabliments(latitude.value, longitude.value, radi.value, 0, 100, 0, 0, (err: any, data: any) => {
    loader.dismiss()
    if (err) return
    establiments.value = data.establiments
  })
  /*searchEstabliments(latitude.value, longitude.value, radi.value).then((result) => {
    establiments.value = result.data.establiments
  }).catch((err) => {

  }).finally(() => {
    loader.dismiss(null, 'cancel')
  });*/
}

const fillEstablimentsPreferits = useDebounceFn(async () => {
  const loader = await showLoading("Carregant establiments preferits")
  loader.present()
  getMyFavs((err: any, data: any) => {
    loader.dismiss()
    if (err) return
    establimentsPreferits.value = data.preferits.establiments_fav
  })
  // getMyFavs().then((result) => {
  //   establimentsPreferits.value = result.data.preferits.establiments_fav
  // }).catch((err) => {

  // }).finally(() => {
  //   loader.dismiss(null, 'cancel')
  // });
}, 250)

const handleRefresh = (event: RefresherCustomEvent) => {
  fillEstabliments().then((res) => {
    event.target.complete()
  })
}

onMounted(async () => {
  console.log(establimentsPreferits.value)
  await fillEstabliments()
  await fillEstablimentsPreferits()
  testFCM((err: any, data: any) => {
    if (err) return
    console.log('data :>> ', data);
  })
  started.value=true

})

</script>
