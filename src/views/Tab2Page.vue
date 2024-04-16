<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
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
          <ion-col size="12" sizeXl="8">
            <swiper
              :slides-per-view="1"
            >
              <swiper-slide v-for="(i,k) in establiments" :key="k">
                <myCard :title="i.nom" :subtitle="i.telf" :text="i.direccio" image="https://ionicframework.com/docs/img/demos/card-media.png"/> 
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem } from '@ionic/vue';
import { Swiper, SwiperSlide } from'swiper/vue';
import 'swiper/css';
import myCard from '@/components/myCard.vue';
import { onMounted, ref } from 'vue';

import { searchEstabliments } from '../APIService';
let latitude=ref(41.0408888)
let longitude=ref(0.7479283)
let radi=ref(25)

let establiments=ref([])

onMounted(()=>{
  searchEstabliments(latitude.value,longitude.value,radi.value).then((result) => {
    establiments.value=result.data.establiments
  }).catch((err) => {
    
  });
})

</script>
