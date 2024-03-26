<template>
    <ion-header>
        <ion-title class="ion-text-center">Mapa</ion-title>
    </ion-header>
    <ion-content>
        <div id="map" style="height: 100%;">
        </div>
    </ion-content>
</template>
<script setup lang="ts">
import { IonPage, IonTitle, IonHeader, IonContent, IonList, IonItem, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg, IonIcon, IonThumbnail } from '@ionic/vue'
import { Ref, onMounted, ref } from 'vue';
import { getEstabliments } from '../APIService';
import "leaflet/dist/leaflet.css";
//import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
interface Establiment {
    _id: string,
    nom: string,
    descripcio: string,
    latitude: string,
    longitude: string,
    telf: string
}

const zoom = ref(13)
const myMap = ref(null)
const establiments: Ref<Establiment[] | undefined> = ref([]);

const fillEstabliments = () => {
    getEstabliments()
        .then((res) => {
            establiments.value = res.data.establiments;
        })
        .catch((err) => {
            console.log(err)
        });
}

const loadMap = () => {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([51.5, -0.09]).addTo(map);
}


onMounted(() => {
    loadMap()
})
</script>
<style></style>