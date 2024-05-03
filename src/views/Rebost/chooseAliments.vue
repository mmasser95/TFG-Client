<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Tria els aliments escanejats</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm">Confirm</ion-button>
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
import { Aliment } from '../../types';
import cardAliment from '../../components/cardAliment.vue';
import { showAlert } from '../../composables/loader';
import { Ref,ref } from 'vue';
import {useScanStore} from '../../store/scanStore'
import { storeToRefs } from 'pinia';
import { createElementScan } from '../../APIService';
const {clearStore}=useScanStore()
const {elementsAfegir}=storeToRefs(useScanStore())
clearStore()
const cancel=()=>modalController.dismiss(null,'cancel')
const confirm=()=>{
    createElementScan(props.rebostId,elementsAfegir.value).then((res) => {
        console.log(res.data)
        
    }).catch((err) => {
        
    });
    modalController.dismiss(null,'confirm')
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



</script>
<style scoped>
.myContainer{
    display:flex;
    flex-flow:row wrap;
    justify-content: center;
}
</style>