<template>
    <ion-page v-if="establiment">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="goBack">
                        <ion-icon :icon="arrowBack"></ion-icon> Back
                    </ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Establiment {{ establiment.nom }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col class="ion-no-margin ion-no-padding" size="12" sizeXl="6" sizeLg="8" sizeMd="10"
                        sizeSm="12">
                        <img crossorigin="anonymous" :src="`https://pro-grouse-unified.ngrok-free.app/${establiment.url_fondo}`" alt="Prova">
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-list>
                            <ion-item v-for="(label, k) in labels" :key="k">
                                {{ label }}: {{ establiment[k] }}
                            </ion-item>
                            <ion-item>
                                Direccio: {{ direccio }}
                            </ion-item>
                            <ion-item>
                                <div id="map" style="height:300px; width:100%;"></div>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-list>
                            <ion-item v-for="oferta in ofertesActives" :key="oferta._id">
                                <cardOferta :oferta="oferta"></cardOferta>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <star-rating v-model:rating="rating"></star-rating>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonList, IonItem, IonText, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon } from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'
import { getEstabliment,getEstadistiques } from '../../APIService';
import { computed, onMounted, ref, Ref } from 'vue';
import { showLoading, showAlert } from '../../composables/loader';
import { useRouter } from 'vue-router';
import cardOferta from '../../components/cardOferta.vue';
import { Establiment } from '../../types'

import "leaflet/dist/leaflet.css";
import L, { Map, LatLngTuple, Icon } from 'leaflet'
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import location from "leaflet/dist/images/marker-icon.png"


const router = useRouter()

const labels = {
    nom: "Nom",
    descripcio: "Descripcio",
    telf: "Telèfon",
    horari: "Horari",
    tipus: "Tipus"
}
const props = defineProps<{
    idd: string
}>();
const establiment: Ref<Establiment | undefined> = ref();
const ofertesActives = computed(() => establiment.value?.ofertes.filter((element) => element.active))
const direccio = computed(() => `Carrer ${establiment.value?.direccio.carrer} nº ${establiment.value?.direccio.numero},${establiment.value?.direccio.CP} ${establiment.value?.direccio.poblacio},${establiment.value?.direccio.provincia}`)
const zoom = ref(16)
const map: Ref<Map | undefined> = ref()
const rating=ref(4.5)
const fillEstabliment = async () => {
    const loader = await showLoading('Carregant establiment')
    loader.present()
    getEstabliment(props.idd).then((result) => {
        establiment.value = result.data.establiment
        setTimeout(() => map.value = loadMap(), 100)
    }).catch(async (err) => {
        let alert = await showAlert(`S'ha produit l'error següent ${err}`)
        alert.present()
    }).finally(() => {
        loader.dismiss(null, 'cancel')
    });
}

const loadMap = () => {
    if (establiment.value) {
        let map = L.map('map').invalidateSize().setView(establiment.value.coordenades, zoom.value)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        let marker=L.marker(establiment.value.coordenades,{icon: new Icon({ iconUrl: location, iconSize: [25, 41], iconAnchor: [12, 41] })})
        // let marker = L.marker(establiment.value.coordenades,)
        marker.bindPopup(direccio.value)
        map.addLayer(marker)
        return map
    }
}

const goBack = () => {
    router.go(-1)
}

onMounted(() => {
    fillEstabliment()
})
</script>
<style></style>