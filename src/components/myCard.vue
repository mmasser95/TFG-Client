<template>
    <ion-card :router-link="`/establiment/${establiment._id}`">
        <div class="container">
            <img class="img_fons" :alt="`Imatge de fons del negoci ${establiment.nom}`"
                src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <ion-thumbnail class="img_perfil">
                <img :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                    src="https://ionicframework.com/docs/img/demos/card-media.png" />
            </ion-thumbnail>
        </div>
        <ion-card-header>
            <ion-card-title>
                <ion-title>
                    {{ establiment.nom }}
                    <favButton :establimentId="establiment._id"></favButton>
                </ion-title>
            </ion-card-title>
            <ion-card-subtitle>{{ establiment.descripcio }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="content">
            <ion-grid>
                <ion-row>
                    <ion-col>Telefon:{{ establiment.telf }}</ion-col>

                </ion-row>
                <ion-row>
                    <ion-col>Horari: {{ establiment.horari }}</ion-col>

                </ion-row>
                <ion-row>
                    <ion-col>Tipus:{{ establiment.tipus }}</ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonTitle, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardHeader, IonCardContent, IonThumbnail, IonImg, IonIcon } from '@ionic/vue'

import { defineProps, onMounted } from 'vue';
import { LatLngTuple } from 'leaflet'
import favButton from './favButton.vue';
import { Establiment } from '../types';
const props = defineProps<{ establiment: Establiment }>()


</script>

<style></style>