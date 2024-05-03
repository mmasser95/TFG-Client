<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="modalController.dismiss(null, 'back')">
                    <ion-icon :icon="arrowBack"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Veure comanda</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    Establiment:{{ comanda.establimentId.nom }}
                </ion-col>
            </ion-row>
            <comentariComponent :comandaId="comanda._id" />
        </ion-grid>
    </ion-content>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import comentariComponent from '../../components/comentariComponent.vue';
import { arrowBack } from 'ionicons/icons';
import { Comanda } from '../../types';

const props = defineProps<{
    comanda: Comanda
}>()

</script>
<style scoped></style>