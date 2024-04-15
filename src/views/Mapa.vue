<template>
    <ion-page>
        <ion-header>
            <ion-title class="ion-text-center">Mapa</ion-title>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">
                        <l-map style="height: 300px;" :zoom="zoom" :center="center">
                            <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                            <l-marker v-for="(i, k) in establiments" :lat-lng="i.coordenades" :key="k">

                                <l-popup>
                                    <span>{{ i.nom }}</span>
                                    <br>
                                    <a @click="anarEstabliment(`/establiment/${i._id}`)">Anar a l'establiment</a>
                                </l-popup>
                            </l-marker>

                        </l-map>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>

</template>
<script setup lang="ts">
import { IonPage, IonTitle, IonHeader, IonContent, IonList, IonItem, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonCardTitle, IonImg, IonIcon, IonThumbnail, alertController } from '@ionic/vue'
import { Ref, onMounted, ref, computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { searchEstabliments } from '../APIService';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LFeatureGroup, LPopup } from "@vue-leaflet/vue-leaflet";
const router = useRouter()
interface Establiment {
    _id: string,
    nom: string,
    descripcio: string,
    latitude: string,
    longitude: string,
    telf: string,
    coordenades: [Number]
}
let latitude = ref(41.0408888)
let longitude = ref(0.7479283)

const center = computed(() => { return [latitude.value, longitude.value] })
const zoom = ref(9)
const establiments: Ref<Establiment[] | undefined> = ref([]);

const anarEstabliment = (ruta) => {
    router.push(ruta)
}

const fillEstabliments = () => {
    searchEstabliments(latitude.value, longitude.value, 15)
        .then((res) => {
            establiments.value = res.data.establiments;
        })
        .catch((err) => {
            console.log(err)
        });
}

// const loadMap = () => {
//     var map = L.map('map').setView([51.505, -0.09], 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);
//     var marker = L.marker([51.5, -0.09]).addTo(map);
// }


onMounted(() => {
    fillEstabliments()
})
</script>
<style></style>