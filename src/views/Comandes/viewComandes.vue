<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title id="comandes" class="ion-text-center"> Veure comandes
                    <ion-icon color="primary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8" sizeLg="10">
                        <div class="container" v-if="comandes">
                            <!--<cardComanda v-for="i in comandes" class="item" :comanda="i"></cardComanda>-->
                            <div class="day-container" v-for="(data, k) in comandesPerData" :key="k">
                                <ion-title class="ion-text-center">{{ k }}</ion-title>
                                <div class="comandes-container">
                                    <cardComanda v-for="comanda in data" class="item" :comanda="comanda"
                                        :key="comanda._id">
                                    </cardComanda>
                                </div>
                            </div>
                        </div>
                        <div v-else class="container">
                            <ion-title class="ion-text-center">Encara no has fet cap comanda</ion-title>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
    <onboarding :steps="onBoardingViewComandesSteps" @start-onboarding="startOnboarding"></onboarding>
</template>
<script setup lang="ts">
import { IonPage, IonContent,IonRefresher,IonRefresherContent, IonItem, IonIcon,IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import { informationCircle } from 'ionicons/icons';
import { Comanda } from '../../types';
import { Ref, onMounted, ref, computed, nextTick } from 'vue';
import cardComanda from '../../components/cardComanda.vue';
import { getAllComandes } from '../../APIService/comandes';
import { showLoading } from '../../composables/loader';
import groupBy from 'lodash/groupBy'
import { format } from 'date-fns/format'
import onboarding from '../../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';
import { useLoginStore } from '../../store/loginStore'
const comandes: Ref<Comanda[] | null> = ref(null)
const onBoardingViewComandesSteps: Ref<StepEntity[] | any[]> = ref([])
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
const comandesPerData = computed(() => groupBy(comandes.value, (el: any) => format(el.data, 'dd/MM/yyyy')))
const startOnboarding = (element: any) => {
    onboardingElement.value = element
}
const fillComandes = async () => {
    const loader = await showLoading('Carregant comandes')
    loader.present()
    getAllComandes((err: any, data: any) => {
        loader.dismiss()
        if (err) return
        comandes.value = data.comandes
    })
}

onMounted(async () => {
    await fillComandes()
    console.log('comandesPerData.value :>> ', comandesPerData.value);
    await nextTick()
    if (useLoginStore().userType == "client")
        onBoardingViewComandesSteps.value = [{
            attachTo: {
                element: "#comandes"
            },
            content: {
                title: "Comandes realitzades",
                description: "Aquí podras trobar totes les comandes realitzades fins al moment"
            },
            options: {
                popper: {
                    placement: 'bottom-start'
                }
            }
        },]
    else
        onBoardingViewComandesSteps.value = [{
            attachTo: {
                element: "#comandes"
            },
            content: {
                title: "Comandes realitzades",
                description: "Aquí podras trobar totes les comandes que han fet sobre les teves ofertes fins al moment"
            },
            options: {
                popper: {
                    placement: 'bottom-start'
                }
            }
        },]
})
const handleRefresh = async (event: any) => {
    await fillComandes()
    // Any calls to load data go here
    event.target?.complete();
};
</script>
<style scoped>
.container {
    display: flex;
    flex-flow: column-reverse wrap;
    justify-content: center
}

.day-container {
    display: flex;
    flex-flow: column wrap;
}

.comandes-container {
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: space-evenly;
}

.item {
    /*flex-grow:1*/
    flex-grow: 1;
    max-width: 200px
}
</style>