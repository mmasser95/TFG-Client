<template>
    <ion-page>
        <ion-header>
            <ion-title class="ion-text-center">Mapa</ion-title>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ion-refresh.stop="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">
                        <ion-segment value="mapa" @ionChange="changePestanya">
                            <ion-segment-button value="mapa">
                                <ion-label>Mapa</ion-label>
                            </ion-segment-button>
                            <ion-segment-button value="llista">
                                <ion-label>Llista</ion-label>
                            </ion-segment-button>
                        </ion-segment>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col v-show="pestanyaMapa" size="12" sizeXl="10">
                        <div id="map" style="height: 500px;"></div>

                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10" v-show="!pestanyaMapa">
                        <ion-list>
                            <ion-item v-for="establiment in establiments" :key="establiment._id">
                                <myCard :establiment="establiment" />
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>

</template>
<script setup lang="ts">
import { IonPage, IonTitle, IonHeader, IonContent, IonList, IonItem, IonCard, IonSegment, IonLabel, IonSegmentButton, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonImg, IonIcon, IonThumbnail, alertController, RefresherCustomEvent } from '@ionic/vue'
import { Ref, onMounted, ref, computed, defineComponent, nextTick, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { searchEstabliments } from '../APIService';
import { Geolocation } from '@capacitor/geolocation';
import "leaflet/dist/leaflet.css";
import L, { Map, LatLngTuple, Icon } from 'leaflet'
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// import {location} from 'ionicons/icons'
import location from "leaflet/dist/images/marker-icon.png"
import myCard from '../components/myCard.vue';
import { showLoading, showAlert } from '../composables/loader';

const router = useRouter()
interface Establiment {
    _id: string,
    nom: string,
    descripcio: string,
    latitude: string,
    longitude: string,
    telf: string,
    url_imatge: string
    coordenades: LatLngTuple,
    url_fons: string,
    horari: string,
    tipus: string,

}
let latitude = ref(41.0408888)
let longitude = ref(0.7479283)
const map: Ref<Map | null> = ref(null)
const center = computed(() => { return [latitude.value, longitude.value] })
const zoom = ref(9)
const establiments: Ref<Establiment[] | undefined> = ref([]);
const pestanyaMapa = ref(true)

const changePestanya = (event:any) => {
    console.log('event.detail.value :>>', event.detail.value);
    if (event.detail.value != 'mapa') { pestanyaMapa.value = false }
    else {
        pestanyaMapa.value = true
        setTimeout(() => map.value = loadMap(), 100)
        addMarkers()
    }
}

const handleRefresh = async (event: RefresherCustomEvent) => {
    searchEstabliments(latitude.value, longitude.value, 15).then((res) => {
        establiments.value = res.data.establiments
    }).catch((err) => {

    }).finally(() => event.target.complete());
}

const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    let alerta = await showAlert('Current position:' + coordinates);
    alerta.present()
};

const fillEstabliments = async () => {
    const loader = await showLoading('Carregant establiments')
    loader.present()
    searchEstabliments(latitude.value, longitude.value, 50)
        .then((res) => {
            establiments.value = res.data.establiments;
            addMarkers()
        })
        .catch((err) => {
            console.log(err)
        }).finally(() => {
            loader.dismiss(null, 'cancel')
        });
}

const addMarkers = () => {
    var markers = L.markerClusterGroup()
    if (establiments.value != undefined) {
        establiments.value.forEach(element => {
            if (map.value != null) {
                var marker = L.marker(element.coordenades, {
                    icon: new Icon({ iconUrl: location })
                })
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