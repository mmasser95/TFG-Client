<template>
    <ion-header>
        <ion-buttons slot="start">
            <ion-button @click="modalController.dismiss(null, 'back')">
                <ion-icon :icon="backspace"></ion-icon>
            </ion-button>
        </ion-buttons>
        <ion-toolbar>
            <ion-title>Veure comanda</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    Establiment:{{ comanda.establimentId.nom }}
                </ion-col>
            </ion-row>
            <comentariComponent />
        </ion-grid>
    </ion-content>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import comentariComponent from '../../components/comentariComponent.vue';
import { backspace } from 'ionicons/icons';
import { Comanda } from '../../types';

const props = defineProps<{
    comanda: Comanda
}>()
</script>
<style scoped></style>