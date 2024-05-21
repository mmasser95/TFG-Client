<template>
    <ion-page v-if="establiment">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="goBack">
                        <ion-icon :icon="arrowBack"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title data-test="titol" class="ion-text-center">{{ establiment.nom }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col class="ion-no-margin ion-no-padding" size="12" sizeXl="6" sizeLg="8" sizeMd="10"
                        sizeSm="12">
                        <div class="container1">
                            <div class="container-img-fondo">
                                <favButton class="fav" :establimentId="establiment._id"></favButton>
                                <img v-if="establiment.url_fondo" class="img_fondo"
                                    :src="`https://app.flyfood.online/${establiment.url_fondo}`" :alt="`Imatge del fons del negoci ${establiment.nom}`"/>
                                <img v-else class="img_fondo" :alt="`Imatge del fons del negoci ${establiment.nom}`"
                                    src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg" />
                                <ion-thumbnail class="img_perfil">
                                    <img v-if="establiment.url_imatge" :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                                        :src="`https://app.flyfood.online/${establiment.url_imatge}`">
                                    <img v-else :alt="`Imatge del logotip del negoci ${establiment.nom}`"
                                        src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                </ion-thumbnail>

                            </div>
                        </div>

                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-list>
                            <ion-item v-for="(label, k) in labels" :key="k">
                                <div v-if="label == 'Horari' && typeof establiment.horari != 'string'">
                                    {{ label }}:
                                    <badgeHorari :horaris="establiment.horari" />
                                </div>
                                <div v-else-if="label == 'Telèfon'">
                                    <ion-badge color="secondary" class="telfBadge">
                                        <div class="myBadge">
                                            {{ establiment.telf }} <ion-icon :icon="call"></ion-icon>
                                        </div>
                                    </ion-badge>
                                </div>
                                <div v-else-if="label=='Tipus'">
                                    <badgeTipus :tipus="establiment[k]"></badgeTipus>
                                </div>
                                <div v-else>
                                    {{ establiment[k] }}
                                </div>
                            </ion-item>
                            <ion-item>
                                Qualitat: <star-rating v-model="qualitat" :disableClick="true"></star-rating>
                                {{ round(qualitat, 1) }}
                            </ion-item>
                            <ion-item>
                                Quantitat: <star-rating v-model="quantitat" :disableClick="true"></star-rating>
                                {{ round(quantitat, 1) }}
                            </ion-item>
                            <ion-item>
                                {{ direccio }}
                            </ion-item>
                            <ion-item>
                                <div id="map" style="height:300px; width:100%;"></div>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>

                    </ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-title class="ion-text-center">Ofertes disponibles</ion-title>
                    </ion-col>
                    <ion-col>

                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">

                        <cardOferta v-for="oferta in ofertesActives" :key="oferta._id" :establimentId="idd"
                            :oferta="oferta"></cardOferta>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <p class="ion-text-center">Últims comentaris</p>

                        <div class="comentaris-box" v-if="ultimsComentaris">
                            <cardComentari v-for="comentari in ultimsComentaris" :avaluacio="comentari" />
                        </div>
                        <div v-else>
                            <p class="ion-text-center">Encara no hi ha comentaris sobre aquest establiment...</p>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonThumbnail, IonRefresher, IonRefresherContent, IonHeader, IonList, IonItem, IonText, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonTextarea, IonChip } from '@ionic/vue'
import { arrowBack, call } from 'ionicons/icons'
import { getEstabliment, getEstadistiques } from '../../APIService/establiments';
import { getComentaris } from '../../APIService/avaluacions';
import { computed, watch, nextTick, onMounted, onBeforeUnmount, ref, Ref, defineComponent } from 'vue';
import { showLoading, showAlert } from '../../composables/loader';
import { useRouter } from 'vue-router';
import cardOferta from '../../components/cardOferta.vue';
import { Establiment2, Avaluacio } from '../../types'
import "leaflet/dist/leaflet.css";
import L, { Map, LatLngTuple, Icon } from 'leaflet'
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import location from "leaflet/dist/images/marker-icon.png"
import favButton from '../../components/favButton.vue';
import badgeHorari from '../../components/badgeHorari.vue';
import badgeTipus from '../../components/badgeTipus.vue';
import cardComentari from '../../components/cardComentari.vue';
import round from 'lodash/round'
import takeRight from 'lodash/takeRight';
const router = useRouter()

const qualitat = ref(0)
const quantitat = ref(0)
const comentaris: Ref<Avaluacio[]> = ref([])
const ultimsComentaris = computed(() => takeRight(comentaris.value, 5))
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
const establiment: Ref<Establiment2 | undefined> = ref();
const ofertesActives = computed(() => establiment.value?.ofertes.filter((element) => element.active))
const direccio = computed(() => `Carrer ${establiment.value?.direccio.carrer} nº ${establiment.value?.direccio.numero},${establiment.value?.direccio.CP} ${establiment.value?.direccio.poblacio},${establiment.value?.direccio.provincia}`)
const zoom = ref(16)
const map: Ref<Map | undefined> = ref()
const fillEstabliment = async () => {
    const loader = await showLoading('Carregant establiment')
    loader.present()
    getEstabliment(props.idd, (err: any, data: any) => {
        loader.dismiss()
        if (err) return
        establiment.value = data.establiment
        setTimeout(() => map.value = loadMap(), 100)
    })
}

const fillEstadistiques = () => {
    getEstadistiques(props.idd, (err: any, data: any) => {
        if (err) {
            qualitat.value = 0
            quantitat.value = 0
        }
        qualitat.value = data.estadistiques.qualitat
        quantitat.value = data.estadistiques.quantitat
    })
}

const loadMap = () => {
    if (establiment.value) {
        let map = L.map('map').invalidateSize().setView(establiment.value.coordenades, zoom.value)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        let marker = L.marker(establiment.value.coordenades, { icon: new Icon({ iconUrl: location, iconSize: [25, 41], iconAnchor: [12, 41] }) })
        marker.bindPopup(direccio.value)
        map.addLayer(marker)
        return map
    }
}

const fillComentaris = () => {
    getComentaris(props.idd, (err: any, data: any) => {
        if (err) return
        comentaris.value = data.avaluacions.filter((el: any) => el.avaluacio)
    })
}

const handleRefresh = async (event: any) => {
    await fillEstabliment()
    fillEstadistiques()
    fillComentaris()
    event.target.complete()
}

const goBack = () => {
    router.go(-1)
}

onMounted(async () => {
    await fillEstabliment()
    await nextTick()
    fillEstadistiques()
    fillComentaris()
})
</script>
<style scoped>
.telfBadge {
    
    display: flex;
    align-items: center;
}

.container1 {
    display: flex;
    flex-flow: row;
    justify-content: center;
}

.container-img-fondo {
    max-height: 300px;
    overflow: hidden;
    position: relative;
    border-radius: 30px;
}

.comentaris-box {
    display: flex;
    flex-flow: column-reverse wrap;
}

.img_perfil {
    position: absolute;
    bottom: 10px;
    left: 30px
}

ion-thumbnail {
    --size: 75px;
    --border-radius: 10px;
}
.fav {
    position: absolute;
    top: 25px;
    right: 25px;
}
</style>
