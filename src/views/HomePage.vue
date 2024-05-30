<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Home <ion-icon color="primary" :icon="informationCircle"
            @click="onboardingElement?.start"></ion-icon></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-refresher slot="fixed" @ion-refresh.stop="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid>
        <ion-row>
          <ion-col class="ion-activatable" id="negocisSection">
            <ion-title class="ion-text-center ion-activatable">Llista de negocis </ion-title>

          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <swiper v-if="establiments!=null" :slides-per-view="1" :space-between="10" :freeMode="true" :navigation="true"
              :pagination="{ clickable: true }">
              <swiper-slide v-if="establiments.length>0"
               v-for="(establiment, k) in establiments" 
              :key="establiment._id">
                <myCard :establiment="establiment" />
              </swiper-slide>
              <p class="ion-text-center" v-else>No es troba cap establiment a prop, utilitza el <router-link to="/tabs/explorar">mapa</router-link> per explorar establiments.</p>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-activatable" id="preferitsSection">
            <ion-title class="ion-text-center ion-activatable">Negocis preferits</ion-title>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <swiper :slides-per-view="1" v-if="establimentsPreferits != null" :pagination="{ clickable: true }" :freeMode="true" :navigation="true">
              <swiper-slide v-for="establiment in establimentsPreferits" 
                            :key="establiment._id" v-if="establimentsPreferits.length > 0">
                <myCard :establiment="establiment"></myCard>
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
import { doIPLocation } from '../APIService/utils';
import { Geolocation } from '@capacitor/geolocation';
import { getMyFavs } from '../APIService/favs'
import { searchEstabliments } from '../APIService/establiments';
import { Establiment } from '../types';
import { useFavStore } from '../store/favStore';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core'
import onboarding from '../components/onboarding.vue';
//Variables inicials
const favStore = useFavStore()
const { favorites } = storeToRefs(favStore)
const latitude = ref(41.0408888)
const longitude = ref(0.7479283)
const radi = ref(30)
const started = ref(false)
const establiments: Ref<[Establiment] | null> = ref(null)

const establimentsPreferits: Ref<[Establiment] | null> = ref(null)
//Les passes de l'onboarding
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
//L'element de l'onboarding
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
//Funció per a executar l'onboarding
const startOnboarding = (element: any) => {
  console.log('element :>> ', element);

  onboardingElement.value = element
}
//Funció per a obtenir els establiments propers
const fillEstabliments = async () => {
  const loader = await showLoading("Carregant establiments")
  loader.present()
  searchEstabliments(latitude.value, longitude.value, radi.value, 0, 100, 0, 0, (err: any, data: any) => {
    loader.dismiss()
    if (err) return
    establiments.value = data.establiments
  })
}
//Funció per obtenir els establiments preferits de l'usuari
const fillEstablimentsPreferits = useDebounceFn(async () => {
  const loader = await showLoading("Carregant establiments preferits")
  loader.present()
  getMyFavs((err: any, data: any) => {
    loader.dismiss()
    if (err) return
    establimentsPreferits.value = data.preferits.establiments_fav
  })
}, 250)

//Funció per a obtenir la posició
const getCurrentPosition = async () => {
    try {
        //En primera instancia intenta rebre les coordenades de capacitor
        const coordinates = await Geolocation.getCurrentPosition();
        //En cas de que tot i que funcioni pero ens retorni la localització 0,0. Executarem el catch
        if (coordinates.coords.latitude == 0 || coordinates.coords.longitude == 0)
            throw new Error("GPS no funciona")
        //En cas de que capacitor ens retorni les coordenades, actualitzem les variables reactives
        latitude.value= coordinates.coords.latitude
        longitude.value= coordinates.coords.longitude

    } catch (err) {
        //En cas d'un error, es realitza una crida a la API MyIp.io per a obtenir les coordenades
        //A partir de la ip i mostrar una localització aproximada
        doIPLocation((err: any, data: any) => {
            if (err) return
            latitude.value = data.location.lat
            longitude.value= data.location.lon
        })
      }
    //Es realitza la cerca
    fillEstabliments()
};



//Funció per a refrescar els resultats de la pantalla principal
const handleRefresh = (event: RefresherCustomEvent) => {
  fillEstabliments().then((res) => {
    event.target.complete()
  })
}

onMounted(async () => {
  //Es fan les crides a la API per a mostrar els resultats un cop es monti el component
  await getCurrentPosition()
  //await fillEstabliments()
  await fillEstablimentsPreferits()
  started.value = true

})
//Aquesta funció watch permet observar si s'afegeixen o es borren elements dels preferits
//I actualitza automàticament l'slider
watch(favStore.favorites, async (before, after) => {
  await fillEstablimentsPreferits()
  console.log(before, after)
}, { deep: true })

</script>
