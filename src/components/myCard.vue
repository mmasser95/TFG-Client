<template>
    <ion-card :router-link="`/establiment/${establiment._id}`" class="container ion-activatable">
        <ion-ripple-effect></ion-ripple-effect>
        <div class="img_fons">
            <img v-if="img_fondo" :alt="`Imatge de fons del negoci ${establiment.nom}`" :src="`${img_fondo}`" />
            <img v-else-if="establiment.url_fondo" :alt="`Imatge del negoci ${establiment.nom}`"
                :src="`https://app.flyfood.online/${establiment.url_fondo}`">
            <img v-else :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg" />
        </div>
        <div class="img_perfil">
            <ion-thumbnail>
                <img :src="img_perfil" v-if="img_perfil" :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                    class="miniatura">
                <img v-else-if="establiment.url_imatge" :src="`https://app.flyfood.online/${establiment.url_imatge}`"
                    :alt="`Imatge del logotip del negoci ${establiment.nom}`">
                <img v-else class="miniatura" :alt="`Imatge del logotip del negoci ${establiment.nom}`"
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
            <div class="content2">
                <div class="content3">
                    <p class="ion-text-center">Telèfon</p>
                    <ion-badge color="secondary">
                        <div class="myBadge">
                            {{ establiment.telf }}
                            <ion-icon :icon="call"></ion-icon>
                        </div>
                    </ion-badge>
                    <p class="ion-text-center"> Tipus</p>
                    <ion-badge color="tertiary">{{ establiment.tipus }}</ion-badge>
                </div>
                <div>
                    <div class="content3" v-if="typeof establiment.horari == 'string'">
                        Horari: {{ establiment.horari }}
                    </div>
                    <div v-else>
                        <p class="ion-text-center">Horari</p>
                        <badgeHorari :horaris="establiment.horari"></badgeHorari>
                    </div>

                </div>
                <div class="content3"
                    v-if="establiment.quantitatMitjana != undefined && establiment.qualitatMitjana != undefined">
                    Valoració:
                    <div class="content4" v-if="establiment.quantitatMitjana != undefined">
                        <ion-icon :icon="star" class="star-icon"></ion-icon>
                        <p>{{ round(establiment.quantitatMitjana, 2) }} Quantitat</p>
                    </div>

                    <div class="content4" v-if="establiment.qualitatMitjana != undefined">
                        <ion-icon :icon="star" class="star-icon"></ion-icon>
                        <p>{{ round(establiment.qualitatMitjana, 2) }} Qualitat</p>
                    </div>

                </div>
            </div>
        </ion-card-content>
        <div class="distance-container">
            {{ formatDistance }}
        </div>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonRippleEffect, IonBadge, IonTitle, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardHeader, IonCardContent, IonThumbnail, IonImg, IonIcon, IonChip } from '@ionic/vue'
import { call, star } from 'ionicons/icons'
import { defineProps, computed } from 'vue';
import favButton from './favButton.vue';
import badgeHorari from './badgeHorari.vue';
import { Establiment2 } from '../types';
import round from "lodash/round"
//import _ from 'lodash'
const props = defineProps<{ establiment: Establiment2, img_perfil?: any, img_fondo?: any }>()
const formatDistance = computed(() => {
    if (props.establiment.distance) {
        if (props.establiment.distance > 1000) {
            return `Es troba a ${round(props.establiment.distance / 1000, 2)} km.`
        } else {
            return `Es troba a ${round(props.establiment.distance, 0)} m.`
        }
    }
})

</script>

<style scoped>
.container {
    position: relative;
    width: 95%;
    border-radius: 10px;
    margin: 10px;

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

ion-thumbnail {
    --border-radius: 10px;
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

.content2 {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-evenly;
}

.content3 {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    gap: 10px;
}

.content4 {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 5px;
}
.distance-container{
    position:absolute;
    bottom:10px;
    right:30px;
}
</style>