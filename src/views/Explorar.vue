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
                    <ion-col size="10"></ion-col>
                    <ion-col>
                        <ion-button @click="openFiltresModal">
                            <ion-icon :icon="filter"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col v-show="pestanyaMapa" size="10" sizeXl="8">
                        {{ cercleRadi }}
                        <ion-range :min="1" :max="25" v-model="cercleRadi"></ion-range>
                        <div id="map"></div>
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
                    <ion-col> {{ myLocation }}</ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>

</template>
<script setup lang="ts">
import { IonPage, IonTitle, IonHeader, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonCard, IonSegment, IonLabel, IonSegmentButton, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonImg, IonIcon, IonThumbnail, alertController, RefresherCustomEvent, IonRange, modalController } from '@ionic/vue'
import { Ref, onMounted, ref, computed, defineComponent, nextTick, toRaw, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { searchEstabliments, doIPLocation } from '../APIService';
import { Geolocation } from '@capacitor/geolocation';
import "leaflet/dist/leaflet.css";
import L, { Map, LatLngExpression, Icon, Circle } from 'leaflet'
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { filter } from 'ionicons/icons'
import location from "leaflet/dist/images/marker-icon.png"
import myCard from '../components/myCard.vue';
import { showLoading, showAlert } from '../composables/loader';
import { Establiment } from '../types';
import { LatLng } from 'leaflet';
import { useDebounceFn } from '@vueuse/core'
import Filtres from './Explorar/Filtres.vue';
import { useFiltresStore } from '../store/filtersStore';
const router = useRouter()

const map: Ref<Map | null> = ref(null)
const mapCoordinates = ref([41.0408888, 0.7479283])
const myLocation: Ref<[number, number]> = ref([0, 0])
const latitude = computed(() => { if (mapCoordinates.value) { return mapCoordinates.value[0] } })
const longitude = computed(() => { if (mapCoordinates.value) { return mapCoordinates.value[1] } })
const zoom = ref(9)
const establiments: Ref<Establiment[] | undefined> = ref([]);
const pestanyaMapa = ref(true)

const cercleMapa: Ref<null | Circle> = ref(null)
const cercleRadi = ref(15)

const markersLayer: Ref<any> = ref(null)

const { filtres, horari, preu } = useFiltresStore()

const changePestanya = (event: any) => {
    console.log('event.detail.value :>>', event.detail.value);
    if (event.detail.value != 'mapa') { pestanyaMapa.value = false }
    else {
        pestanyaMapa.value = true
        setTimeout(() => map.value = loadMap(), 100)
        addMarkers()
    }
}

const printCurrentPosition = async () => {
    try {
        const coordinates = await Geolocation.getCurrentPosition();
        let alerta = await showAlert('Current position:' + coordinates.coords.latitude + " " + coordinates.coords.longitude);
        alerta.present()
        myLocation.value = [coordinates.coords.latitude, coordinates.coords.longitude]
    } catch (err) {
        if (err instanceof GeolocationPositionError) {
            let alerta2 = await showAlert('Error message: ' + err.message.toString());
            alerta2.present()
            let alerta = await showAlert('Error code:' + err.code.toString());
            alerta.present()
            if (err.code == 1)
                doIPLocation().then((res) => {
                    let d = res.data
                    myLocation.value = [d.location.lat, d.location.lon]
                }).catch((err3) => {
                    console.log('err3 :>> ', err3);
                });
        }
    }




};

const fillEstabliments = useDebounceFn(async () => {
    const loader = await showLoading('Carregant establiments')
    loader.present()
    searchEstabliments(mapCoordinates.value[0], mapCoordinates.value[1], cercleRadi.value)
        .then((res) => {
            establiments.value = res.data.establiments;
            addMarkers()
        })
        .catch((err) => {
            console.log(err)
        }).finally(() => {
            loader.dismiss(null, 'cancel')
        });
}, 1000)



const addMarkers = () => {
    if (markersLayer.value != null && map.value != null)
        map.value.removeLayer(markersLayer.value)
    var markers = L.markerClusterGroup()
    if (establiments.value != undefined) {
        establiments.value.forEach(element => {
            if (map.value != null) {
                var marker = L.marker(element.coordenades, {
                    icon: new Icon({ iconUrl: location, iconSize: [25, 41], iconAnchor: [12, 41] })
                })
                var ruta = `/establiment/${element._id}`
                var link = `<a v-onClick="anarEstabliment('${ruta}')"> Link</a>`
                var popup = L.popup()
                popup.setContent(element.nom + link)
                marker.bindPopup(popup)
                markers.addLayer(marker)
            }
        });
        if (map.value != null) {
            toRaw(map.value).addLayer(markers)
            markersLayer.value = markers
        }
    }
}

const loadMap = () => {
    var map = L.map('map').invalidateSize().setView([mapCoordinates.value[0], mapCoordinates.value[1]], zoom.value);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    cercleMapa.value = new L.Circle([mapCoordinates.value[0], mapCoordinates.value[1]], cercleRadi.value * 1000)
    cercleMapa.value.addTo(map)

    map.on('drag', (event) => {
        var map = event.target
        var center = map.getCenter();  //get map center
        cercleMapa.value?.setLatLng(center)
        mapCoordinates.value = [center.lat, center.lng]
    })

    map.on('moveend', async (event) => {
        var map = event.target
        var center = map.getCenter()
        mapCoordinates.value = [center.lat, center.lng]
        cercleMapa.value?.setLatLng(center)
        await fillEstabliments()
    })

    return map
}

const openFiltresModal = async () => {
    const modal = await modalController.create({
        component: Filtres,
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5, 0.75, 1]
    })
    modal.present()
}

onMounted(async () => {
    await nextTick()
    setTimeout(() => map.value = loadMap(), 50)
    fillEstabliments()
    printCurrentPosition()
})

onBeforeUnmount(async () => {
    if (map.value) {
        map.value.remove()
    }
})

watch(cercleRadi, async (newValue, oldValue) => {
    cercleMapa.value?.setRadius((newValue) * 1000)
    await fillEstabliments()
})



</script>
<style>
#map {
    height: 55vh;
}
</style>