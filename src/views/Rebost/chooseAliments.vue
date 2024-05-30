<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel" color="secondary">
                    <ion-icon :icon="close" slot="icon-only"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title id="scan" class="ion-text-center">Resultats
                <ion-icon color="primary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
            </ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm" color="tertiary">
                    <ion-icon :icon="checkmark" slot="icon-only"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-row>
            <ion-col></ion-col>
            <ion-col size="12" sizeXl="8">
                <div class="myContainer">
            <cardAliment :aliment="aliment" :ref="`hijo ${idx}`" v-for="(aliment, idx) in MyAliments" @deleteAliment="deleteAliment"></cardAliment>
        </div>
            </ion-col>
            <ion-col></ion-col>
        </ion-row>
    </ion-content>
    <onboarding :steps="onBoardingChooseAlimentsSteps" @start-onboarding="startOnboarding"></onboarding>
</template>
<script setup lang="ts">
import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonTitle,
    IonText,
    IonImg,
    IonThumbnail,
    IonFab,
    IonFabList,
    IonFabButton,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    alertController,
    modalController
} from '@ionic/vue';
import { informationCircle,checkmark,close } from 'ionicons/icons';
import { Aliment } from '../../types';
import cardAliment from '../../components/cardAliment.vue';
import { showAlert } from '../../composables/loader';
import { Ref,onMounted,ref,nextTick } from 'vue';
import {useScanStore} from '../../store/scanStore'
import { storeToRefs } from 'pinia';
import { createElementScan } from '../../APIService/elements';
import onboarding from '../../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';

const onBoardingChooseAlimentsSteps: Ref<StepEntity[] | any[]> = ref([])
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
const startOnboarding = (element: any) => {
    onboardingElement.value = element
}
const {clearStore}=useScanStore()
const {elementsAfegir}=storeToRefs(useScanStore())
clearStore()
const cancel=()=>modalController.dismiss(null,'cancel')
const confirm=()=>{
    createElementScan(props.rebostId,elementsAfegir.value,async (err:any,data:any)=>{
        if(err){
            modalController.dismiss(null,'cancel')
            return
        }
        modalController.dismiss(null,'confirm')
        let alert =await showAlert("S'han creat els elements al rebost")
        alert.present()
    })
    
}
const props=defineProps<{
    aliments:Aliment[],
    rebostId:string
}>()

const MyAliments:Ref<Aliment[]>=ref([])

MyAliments.value=props.aliments

const deleteAliment=async(event:any)=>{
    let idx=MyAliments.value.map((el)=>el._id).indexOf(event._id)
    MyAliments.value.splice(idx,1)
}

onMounted(async()=>{
    await nextTick()
    onBoardingChooseAlimentsSteps.value = [{
        attachTo: {
            element: "#scan"
        },
        content: {
            title: "Elements escanejats",
            description: "Aquí podràs trobar un llistat de tots els elements que escaneji la IA"
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    },{
        attachTo: {
            element: "#scan"
        },
        content: {
            title: "Elements escanejats",
            description: "Si hi ha algun error podràs esborrar l'element i afegir-lo manualment, després. A més a més, tens opcions per a afegir la quantitat d'aliment comprat"
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    },
]
})

</script>
<style scoped>
.myContainer{
    display:flex;
    flex-flow:row wrap;
    justify-content: center;
}
</style>