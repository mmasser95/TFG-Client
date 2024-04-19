<template>
    <ion-card :router-link="`/establiment/${establiment._id}`" class="container">
        <div class="img_fons">
            <img :alt="`Imatge de fons del negoci ${establiment.nom}`"
                :src="`https://pro-grouse-unified.ngrok-free.app/${establiment.url_fondo}`" />
        </div>
        <div class="img_perfil">
            <ion-thumbnail class="miniatura">
                <img :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                    src="https://ionicframework.com/docs/img/demos/card-media.png" />
            </ion-thumbnail>
        </div>

        <favButton class="fav" :establimentId="establiment._id"></favButton>
        <ion-card-header>
            <ion-card-title>
                <ion-title>
                    {{ establiment.nom }}
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
import favButton from './favButton.vue';
import { Establiment } from '../types';
const props = defineProps<{ establiment: Establiment }>()


</script>

<style>
.container {
    position: relative;
    width: 100%;
    border-radius: 10px;
    margin:10px;
    padding:15px;
}

.fav {
    position: absolute;
    top: 25px;
    right: 25px;
}

.img_fons {
    height: 100px;
}

.img_perfil {
    position: absolute;
    left: 25px;
    top: 60px;
}
.miniatura{
    border-radius:25px;
}
</style>