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
              <swiper-slide v-for="(i, k) in rebosts">
                <cardInventari :title="i.nom" :idd="i._id" @updateRebost="openModalUpdate"
                  @deleteRebost="fillRebosts" />
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horitzontal="end">
      <ion-fab-button @click="openModalCreate">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { onMounted, ref, reactive, onBeforeUpdate, computed } from 'vue';
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { add } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue';
import cardInventari from '../components/cardInventari.vue'
import { getRebosts, crearRebost, updateRebost } from '../APIService'
import 'swiper/css'
import newRebost from './Rebost/newRebost.vue';
import { useLoginStore } from '../store/loginStore'

interface Rebost {
  _id: string,
  nom: string
}

const rebosts: Ref<Rebost[] | undefined> = ref([]);

const fillRebosts = () => {
  getRebosts().then((res) => {
    rebosts.value = res.data.rebosts;
  }).catch((err) => {
    console.log(err.response.data.message);
  })
}

const openModalUpdate = async (rebostId: any) => {
  const modal = await modalController.create({
    component: newRebost,
    componentProps: {
      update: rebostId
    }
  })

  modal.present();

  const { data, role } = await modal.onWillDismiss();
  if (role == 'confirm') {
    console.log(data)
    updateRebost(rebostId, {nom:data})
      .then((result) => {
        fillRebosts()
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

const openModalCreate = async () => {
  const modal = await modalController.create({
    component: newRebost,
    componentProps: { update: '' }
  })

  modal.present();

  const { data, role } = await modal.onWillDismiss();
  if (role == 'confirm') {
    crearRebost({ nom: data })
      .then((res) => {
        fillRebosts();
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

onMounted(() => {
  fillRebosts();
})



</script>
