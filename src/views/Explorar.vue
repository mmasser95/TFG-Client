<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center ">Explorar
                    <ion-icon color="tertiary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
                </ion-title>
                <ion-segment id="tabsExplorar" value="mapa" @ionChange="changePestanya">
                    <ion-segment-button value="mapa">
                        <ion-label>Mapa</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="llista">
                        <ion-label>Llista</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">

                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="9"></ion-col>
                    <ion-col>
                        <ion-button v-if="pestanyaMapa" @click="getCurrentPosition">
                            <ion-icon slot="icon-only" :icon="locate"></ion-icon>
                        </ion-button>
                        <ion-button id="filtres" @click="openFiltresModal">
                            <ion-icon slot="icon-only" :icon="filter"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col v-show="pestanyaMapa" size="10" sizeXl="8">
                        {{ cercleRadi }}
                        <ion-range id="rango" :min="1" :max="25" v-model="cercleRadi"></ion-range>
                        <div id="map"></div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10" v-show="!pestanyaMapa">
                        <myCard v-for="establiment in establiments" :key="establiment._id" :establiment="establiment" />
                    </ion-col>
                    <ion-col> {{ myLocation }}</ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
    <onboarding :steps="onBoardingExplorarSteps" @start-onboarding="startOnboarding"></onboarding>
    <div class="ion-hide">
        <div v-for="(establiment, k) in establiments" :key="k" :ref="refers.set">
            <router-link :to="`/establiment/${establiment._id}`">Anar a
                l'establiment {{ establiment.nom }}</router-link>
        </div>

    </div>

</template>
<script setup lang="ts">
import { IonPage, IonTitle, IonToolbar, IonHeader, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonCard, IonSegment, IonLabel, IonSegmentButton, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonImg, IonIcon, IonThumbnail, alertController, RefresherCustomEvent, IonRange, modalController } from '@ionic/vue'
import { Ref, onMounted, getCurrentInstance, ref, computed, defineComponent, nextTick, toRaw, watch, onBeforeUnmount, onBeforeUpdate } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { doIPLocation } from '../APIService/utils';
import { searchEstabliments } from '../APIService/establiments'
import { Geolocation } from '@capacitor/geolocation';
import "leaflet/dist/leaflet.css";
import L, { Map, LatLngExpression, Icon, Circle } from 'leaflet'
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { filter, informationCircle, locate } from 'ionicons/icons'
import location from "leaflet/dist/images/marker-icon.png"
import myCard from '../components/myCard.vue';
import { showLoading, showAlert } from '../composables/loader';
import { Establiment } from '../types';
import { LatLng } from 'leaflet';
import { useDebounceFn, useTemplateRefsList } from '@vueuse/core'
import Filtres from './Explorar/Filtres.vue';
import { useFiltresStore } from '../store/filtersStore';
import onboarding from '../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';

const router = useRouter()
const refers = useTemplateRefsList()
const map: Ref<Map | null> = ref(null)
const mapCoordinates: Ref<[number, number]> = ref([39.0408888, 0.7479283])
const myLocation: Ref<[number, number]> = ref([0, 0])
const latitude = computed(() => { if (mapCoordinates.value) { return mapCoordinates.value[0] } })
const longitude = computed(() => { if (mapCoordinates.value) { return mapCoordinates.value[1] } })
const zoom = ref(9)
const establiments: Ref<Establiment[] | undefined> = ref([]);
const pestanyaMapa = ref(true)

const cercleMapa: Ref<null | Circle> = ref(null)
const cercleRadi = ref(15)

const markersLayer: Ref<any> = ref(null)
const myPopup = ref(null)

const onBoardingExplorarStepsMapa: Ref<StepEntity[] | any[]> = ref([])
const onBoardingExplorarStepsLlista: Ref<StepEntity[] | any[]> = ref([])
const onBoardingExplorarSteps = computed(() => pestanyaMapa.value ? onBoardingExplorarStepsMapa : onBoardingExplorarStepsLlista)
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
const startOnboarding = (element: any) => {
    console.log('element :>> ', element);
    onboardingElement.value = element
}

const { filtres, horari, preu } = useFiltresStore()
const { qualitatMinima, quantitatMinima } = storeToRefs(useFiltresStore())

const changePestanya = (event: any) => {
    console.log('event.detail.value :>>', event.detail.value);
    if (event.detail.value != 'mapa') { pestanyaMapa.value = false }
    else {
        pestanyaMapa.value = true
        setTimeout(() => map.value = loadMap(), 100)
        addMarkers()
    }
}

const getCurrentPosition = async () => {
    try {
        const coordinates = await Geolocation.getCurrentPosition();
        if (coordinates.coords.latitude == 0 || coordinates.coords.longitude == 0) throw new Error("GPS no funciona")
        mapCoordinates.value[0] = coordinates.coords.latitude
        mapCoordinates.value[1] = coordinates.coords.longitude
        myLocation.value = mapCoordinates.value
    } catch (err) {
        //if (err instanceof GeolocationPositionError) {
        //    if (err.code == 1)
        doIPLocation((err: any, data: any) => {
            if (err) return
            myLocation.value = [data.location.lat, data.location.lon]
        })
        //}
    }
    map.value?.flyTo(myLocation.value)
    fillEstabliments()
};



const fillEstabliments = useDebounceFn(async () => {
    const loader = await showLoading('Carregant establiments')
    loader.present()
    searchEstabliments(mapCoordinates.value[0], mapCoordinates.value[1], cercleRadi.value, preu.lower, preu.upper, qualitatMinima.value, quantitatMinima.value, (err: any, data: any) => {
        loader.dismiss()
        if (err) return
        establiments.value = data.establiments
    })
}, 1000)

const addMarkers = () => {
    if (markersLayer.value != null && map.value != null)
        map.value.removeLayer(markersLayer.value)
    var markers = L.markerClusterGroup()
    if (establiments.value != undefined) {
        establiments.value.forEach((element, index) => {
            if (map.value != null) {
                var marker = L.marker(element.coordenades, {
                    icon: new Icon({ iconUrl: location, iconSize: [25, 41], iconAnchor: [12, 41] })
                })
                try {
                    console.log('refers.value[index].$el :>> ', refers.value[index]);
                    marker.bindPopup(() => refers.value[index])
                } catch (err) {
                    var ruta = `/establiment/${element._id}`
                    var link = ` <a href="${ruta}"> ${element.nom}</a>`
                    var popup = L.popup()
                    popup.setContent(link)
                    marker.bindPopup(popup)
                }
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

    const { role, data } = await modal.onWillDismiss()
    if (role == "confirm") fillEstabliments()
}

watch(refers, (v, o) => {
    addMarkers()
}, { deep: true })

onMounted(async () => {
    await nextTick()
    setTimeout(() => map.value = loadMap(), 50)
    fillEstabliments()
    getCurrentPosition()
    onBoardingExplorarStepsMapa.value = [{
        attachTo: {
            element: "#map"
        },
        content: {
            title: "Mapa",
            description: "En el mapa interactiu podràs veure tots els establiments que es troben dins del cercle"
        },
        options: {
            popper: {
                placement: 'top'
            }
        }
    }, {
        attachTo: {
            element: "#rango"
        },
        content: {
            title: "Radi del cercle",
            description: "Podràs augmentar o disminuir el radi del cercle mitjançant aquest slider."
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    }, {
        attachTo: {
            element: "#filtres"
        },
        content: {
            title: "Filtres",
            description: "En prèmer aquest botó, podràs afegir filtres a la teva cerca"
        },
        options: {
            popper: {
                placement: 'left'
            }
        }
    }, {
        attachTo: {
            element: "#tabsExplorar"
        },
        content: {
            title: "Modes",
            description: "Amb aquests dos botons podràs canviar el mode de visualització dels elements."
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    }]
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

watch(refers, async () => {
    await nextTick()
}, {
    deep: true,
    flush: 'post',
})

</script>
<style scoped>
#map {
    height: 55vh;
}

ion-title {
    margin: 10px
}

ion-label {
    margin: 0px;
}
</style>