<template>
    <ion-page>
        <ion-header>
            <ion-title class="ion-text-center">Mapa</ion-title>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="1">
                        <ion-button>Filtros</ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">
                        <div id="map" style="height: 500px;"></div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>

</template>
<script setup lang="ts">
import { IonPage, IonTitle, IonHeader, IonContent, IonList, IonItem, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonImg, IonIcon, IonThumbnail, alertController } from '@ionic/vue'
import { Ref, onMounted, ref, computed, defineComponent, nextTick, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { searchEstabliments } from '../APIService';
import { Geolocation } from '@capacitor/geolocation';
import "leaflet/dist/leaflet.css";
import L, { Map, LatLngTuple } from 'leaflet'
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
const router = useRouter()
interface Establiment {
    _id: string,
    nom: string,
    descripcio: string,
    latitude: string,
    longitude: string,
    telf: string,
    coordenades: LatLngTuple
}
let latitude = ref(41.0408888)
let longitude = ref(0.7479283)
const map: Ref<Map | null> = ref(null)
const center = computed(() => { return [latitude.value, longitude.value] })
const zoom = ref(9)
const establiments: Ref<Establiment[] | undefined> = ref([]);


const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
};

const fillEstabliments = () => {
    searchEstabliments(latitude.value, longitude.value, 15)
        .then((res) => {
            establiments.value = res.data.establiments;
            addMarkers()
        })
        .catch((err) => {
            console.log(err)
        });
}

const addMarkers = () => {
    var markers = L.markerClusterGroup()
    if (establiments.value != undefined) {
        establiments.value.forEach(element => {
            if (map.value != null) {
                var marker = L.marker(element.coordenades)
                var ruta = `/establiment/${element._id}`
                var link = `<a v-onClick="anarEstabliment('${ruta}')"> Link</a>`
                marker.bindPopup(`Establiment: ${element.nom} ${link}`)
                markers.addLayer(marker)
            }
        });
        if (map.value != null)
            toRaw(map.value).addLayer(markers)
    }
}

const loadMap = () => {
    var map = L.map('map').invalidateSize().setView([latitude.value, longitude.value], zoom.value);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map
}

onMounted(async () => {
    await nextTick()
    setTimeout(() => map.value = loadMap(), 50)
    fillEstabliments()
    printCurrentPosition()
})
</script>
<style></style>