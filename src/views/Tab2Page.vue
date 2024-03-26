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
              <swiper-slide v-for="(i,k) in [0,1,2,3,4]" :key="k">
                <myCard :title="`Prova ${i}`" subtitle="Subtitul" text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur eius quas non iure, optio eveniet nulla impedit, sed perspiciatis molestias quos unde a atque veritatis tenetur inventore. Facilis, cum ipsa." image="https://ionicframework.com/docs/img/demos/card-media.png"/> 
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
</script>
