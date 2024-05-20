<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="primary" @click="confirm">
                    <ion-icon slot="icon-only" :icon="checkmark"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Filtres</ion-title>
            <!--<ion-buttons slot="end">
                <ion-button color="primary" @click="confirm">Confirmar</ion-button>
            </ion-buttons>-->
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                    <ion-range @ion-change="preuChange" :min="1" :max="50" :model-value="preu"
                        :label-placement="labelPlacement" :label="`Preu ${preu.lower} € - ${preu.upper} €`"
                        :dual-knobs="true" :pin="true" :pin-formatter="pinFormatterPreu"></ion-range>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                    <ion-range color="secondary" @ion-change="horariChange" :model-value="horari" :min="0" :max="47"
                        :label-placement="labelPlacement"
                        :label="`Horari ${hores[horari.lower]}-${hores[horari.upper]}`" :dual-knobs="true" :pin="true"
                        :pin-formatter="pinFormatterHorari"></ion-range>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                            <ion-range color="tertiary" v-model="qualitatMinima" @ion-change="qualitatChange"
                                :label="`Valoració qualitat: ${qualitatMinima}`" :label-placement="labelPlacement"
                                :max="4" :min="0" :pin="true"></ion-range>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                            <ion-range color="tertiary" v-model="quantitatMinima" :label="`Valoraciò quantitat:${quantitatMinima}`"
                                :label-placement="labelPlacement" :max="4" :min="0" :pin="true"></ion-range>
                        </ion-col>
                <ion-col></ion-col>
            </ion-row>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                    <div class="checkbox-container">
                        <ion-checkbox v-model="filtres.restaurant" label-placement="fixed">Restaurant</ion-checkbox>
                        <ion-checkbox v-model="filtres.supermercat" label-placement="fixed">Supermercat</ion-checkbox>
                        <ion-checkbox v-model="filtres.fleca" label-placement="fixed">Fleca</ion-checkbox>
                        <ion-checkbox v-model="filtres.peixateria" label-placement="fixed">Peixateria</ion-checkbox>
                        <ion-checkbox v-model="filtres.carnisseria" label-placement="fixed">Carnisseria</ion-checkbox>
                        <ion-checkbox v-model="filtres.fruiteria_verduleria" label-placement="fixed">Fruita
                            Verdura</ion-checkbox>
                    </div>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>

        </ion-grid>
    </ion-content>
</template>
<script setup lang="ts">
import {IonIcon, IonPage, IonHeader, IonToolbar, IonButton, IonLabel, IonButtons, IonTitle, IonContent, IonRange, IonCheckbox, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue';
import { checkmark } from 'ionicons/icons';
import { reactive, ref } from 'vue';
import { useFiltresStore } from '../../store/filtersStore'
import { storeToRefs } from 'pinia';
const labelPlacement = 'stacked';

const { filtres, horari, preu, generarHores } = useFiltresStore()

const { qualitatMinima, quantitatMinima } = storeToRefs(useFiltresStore())

const horariChange = (event: any) => {
    let val = event.detail.value
    horari.lower = val.lower
    horari.upper = val.upper
}

const preuChange = (event: any) => {
    let val = event.detail.value
    preu.lower = val.lower
    preu.upper = val.upper
}

const quantitatChange = (event: any) => {
    let val = event.detail.value
    console.log('event.detail.value :>> ', event.detail.value);
    quantitatMinima.value = val
}

const qualitatChange = (event: any) => {
    let val = event.detail.value
    console.log('event.detail.value :>> ', event.detail.value);
    qualitatMinima.value = val
}

const hores = generarHores()

const pinFormatterHorari = (i: number) => {
    return hores[i]
}

const pinFormatterPreu = (i: number) => {
    return `${i} €`
}

const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = () => {
    modalController.dismiss(null, 'confirm')
}
</script>
<style scoped>
.checkbox-container {
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
}
</style>