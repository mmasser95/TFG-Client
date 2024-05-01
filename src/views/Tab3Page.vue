<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="myContainer">
          <p>Inventari</p>

          <ion-button class="item" size="small" shape="round" @click="startTour">
            <ion-icon slot="icon-only" :icon="informationCircleOutline"></ion-icon>
          </ion-button>

        </div>

      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ion-refresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <ion-grid>
              <ion-row v-for="(i, k) in rebosts">
                <ion-col>
                  <cardInventari :title="i.nom" :subtitle="i.descripcio" :idd="i._id" @updateRebost="openModalUpdate"
                    @deleteRebost="fillRebosts" />
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-fab ref="addButton" slot="fixed" vertical="bottom" horitzontal="end">
      <ion-fab-button @click="openModalCreate">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonButton, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, modalController, IonRefresher, RefresherCustomEvent, IonRefresherContent } from '@ionic/vue';
import { onMounted, ref, reactive, onBeforeUpdate, computed } from 'vue';
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { add, informationCircleOutline } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue';
import cardInventari from '../components/cardInventari.vue'
import { getRebosts, crearRebost, updateRebost } from '../APIService'
import 'swiper/css'
import newRebost from './Rebost/newRebost.vue';
import { showLoading } from '../composables/loader';
import { Rebost } from '../types'
import { useShepherd } from 'vue-shepherd'


const rebosts: Ref<Rebost[] | undefined> = ref([]);

const addButton = ref(null)

const fillRebosts = async () => {
  let loader = await showLoading("Carregant rebosts")
  loader.present()
  getRebosts().then((res) => {
    rebosts.value = res.data.rebosts;
  }).catch((err) => {
    console.log(err.response.data.message);
  }).finally(() => loader.dismiss(null, 'cancel'))
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
    updateRebost(rebostId, { nom: data })
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

const handleRefresh = async (event: RefresherCustomEvent) => {
  await fillRebosts();
  event.target.complete()
}

const startTour = () => {
  const tour = useShepherd({
    defaultStepOptions:
    {
      cancelIcon: {
        enabled: true
      },
      scrollTo:{
        behavior:'smooth',
        block:'center'
      }
    }
  })
}

onMounted(async () => {
  await fillRebosts();
  /*startTour()*/
})



</script>
<style scoped>
.myContainer {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%
}
</style>