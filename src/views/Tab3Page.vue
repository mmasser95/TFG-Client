<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <ion-title class="ion-text-center">Inventari</ion-title>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="8">
            <swiper>
              <swiper-slide>
                <cardInventari title="Inventari 1" content="Aquest establiment es una merda" idd="2"/>
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horitzontal="end">
        <ion-fab-button router-link="/newInventari">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import {add} from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue';
import cardInventari from '../components/cardInventari.vue'
import 'swiper/css'
</script>
