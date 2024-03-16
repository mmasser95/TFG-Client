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
              <swiper-slide v-for="(i,k) in rebosts">
                <cardInventari :title="i.nom" :idd="i._id"/>
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <newRebost />
    <ion-fab slot="fixed" vertical="bottom" horitzontal="end">
      <ion-fab-button id="open-modal">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { onMounted, ref, reactive, onBeforeUpdate, computed } from 'vue';
import type {Ref} from 'vue'
import { storeToRefs } from 'pinia'
import { add } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue';
import cardInventari from '../components/cardInventari.vue'
import { getRebosts } from '../APIService'
import 'swiper/css'
import newRebost from './Rebost/newRebost.vue';
import { useLoginStore } from '../store/loginStore'
import { useRouter } from 'vue-router';

interface Rebost{
  _id:string,
  nom:string
}
const rebosts: Ref<Rebost[]|undefined>=ref([]);
const { token } = storeToRefs(useLoginStore());

onMounted(() => {
  getRebosts().then((res) => {
    console.log(res.data.rebosts)
    rebosts.value = res.data.rebosts;
  }).catch((err) => {
    console.log(err.response.data.message);
  })
})



</script>
