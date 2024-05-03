<template>
    <ion-card :router-link="`/establiment/${establiment._id}`" class="container">
        <div class="img_fons">
            <img v-if="false" :alt="`Imatge de fons del negoci ${establiment.nom}`"
                :src="`https://pro-grouse-unified.ngrok-free.app/${establiment.url_fondo}`" />
            <img :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg" />
        </div>
        <div class="img_perfil">
            <ion-thumbnail>
                <img class="miniatura" :alt="`Imatge del logotip del negoci ${establiment.nom}`"
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
            <div class="content-item">
                <div>
                    Telèfon:
                    <ion-chip class="telfBadge">
                        <div class="myBadge">
                            {{ establiment.telf }} <ion-icon :icon="call"></ion-icon>
                        </div>
                    </ion-chip>
                </div>
                <div class="content-item">
                    <div v-if="typeof establiment.horari=='string'">
                        Horari: {{establiment.horari}}
                    </div>
                    <div v-else>
                        Horari: <badgeHorari :horaris="establiment.horari"></badgeHorari>
                    </div>
                    
                </div>
            </div>
            <div class="content-item">
                Valoració:
                <ion-icon :icon="star" class="star-icon"></ion-icon> {{establiment.quantitatMitjana}} Quantitat
                <ion-icon :icon="star" class="star-icon"></ion-icon> {{establiment.qualitatMitjana}} Qualitat
                Tipus: {{ establiment.tipus }}
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonTitle, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardHeader, IonCardContent, IonThumbnail, IonImg, IonIcon, IonChip } from '@ionic/vue'
import { call, star } from 'ionicons/icons'
import { defineProps, onMounted } from 'vue';
import favButton from './favButton.vue';
import badgeHorari from './badgeHorari.vue';
import { Establiment2 } from '../types';
const props = defineProps<{ establiment: Establiment2 }>()


</script>

<style scoped>
.container {
    position: relative;
    width: 98%;
    border-radius: 10px;
    margin: 10px;
    background-image: linear-gradient(to left bottom, #040404, #1e242e, #234355, #166678, #008b90, #00a199, #00b79c, #2ecd98, #43da9b, #57e69d, #6bf39f, #7effa0);

    @media (prefers-color-scheme: dark) {
        background-image: linear-gradient(to right top, #040404, #0c1219, #051d25, #00282a, #003225, #003a21, #004318, #064a07, #06540d, #065e13, #046819, #00731f);
    }
}

.fav {
    position: absolute;
    top: 25px;
    right: 25px;
}

.img_fons {
    height: 100px;
    overflow: hidden
}

.img_perfil {
    position: absolute;
    left: 25px;
    top: 60px;
}

.miniatura {
    border-radius: 10px;
}

.telfBadge {
    background: #008b90;
}

.star-icon {
    color: #ff9800
}

.content {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    gap: 25px;
}

.content-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 5px;
}
</style>