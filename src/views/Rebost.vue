<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="myContainer">
          <ion-grid>
            <ion-row class="ion-justify-content-center ion-align-items-center">
              <ion-col>
                <ion-title class="ion-text-center">Rebost
                  <ion-icon color="tertiary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
                </ion-title>
              </ion-col>
            </ion-row>
          </ion-grid>
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
            <ion-grid id="rebostsSection">
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
    <ion-fab id="addBtn" ref="addButton" slot="fixed" vertical="bottom" horitzontal="end">
      <ion-fab-button @click="openModalCreate">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <onboarding :steps="onBoardingRebostSteps" @start-onboarding="startOnboarding"></onboarding>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonButton, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, modalController, IonRefresher, RefresherCustomEvent, IonRefresherContent } from '@ionic/vue';
import { onMounted, ref, reactive, onBeforeUpdate, computed } from 'vue';
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { add, informationCircle } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue';
import cardInventari from '../components/cardInventari.vue'
import { getRebosts, crearRebost, updateRebost } from '../APIService/rebosts'
import 'swiper/css'
import newRebost from './Rebost/newRebost.vue';
import { showLoading } from '../composables/loader';
import { Rebost } from '../types'
import onboarding from '../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';

const rebosts: Ref<Rebost[] | undefined> = ref([]);

const addButton = ref(null)
const onBoardingRebostSteps: Ref<StepEntity[] | any[]> = ref([])


const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)

const startOnboarding = (element: any) => {
  console.log('element :>> ', element);
  onboardingElement.value = element
}

const fillRebosts = async () => {
  let loader = await showLoading("Carregant rebosts")
  loader.present()
  getRebosts((err: any, data: any) => {
    loader.dismiss()
    if (err) return
    rebosts.value = data.rebosts;
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
    updateRebost(rebostId, { nom: data }, (err: any, data: any) => {
      if (err) return
      fillRebosts()
    })

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
    crearRebost({ nom: data }, (err, data) => {
      if (err) return
      fillRebosts();
    })
  }
}

const handleRefresh = async (event: RefresherCustomEvent) => {
  await fillRebosts();
  event.target.complete()
}


onMounted(async () => {
  await fillRebosts();
  onBoardingRebostSteps.value = [{
    attachTo: {
      element: "#rebostsSection"
    },
    content: {
      title: "Els teus rebosts",
      description: "En aquest apartat trobaràs els teus rebosts"
    },
    options: {
      popper: {
        placement: 'center'
      }
    }
  }, {
    attachTo: {
      element: "#addBtn"
    },
    options: {
      popper: {
        placement: "top-end"
      }
    },
    content: {
      title: "Afegir rebosts",
      description: "En aquest apartat podràs trobar els establiments que has marcat com a preferits"
    }
  }]
})


</script>
<style scoped></style>