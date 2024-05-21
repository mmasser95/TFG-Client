<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center ">Explorar
                    <ion-icon color="primary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
                </ion-title>
                <ion-segment color="secondary" id="tabsExplorar" value="mapa" @ionChange="changePestanya">
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
                    <ion-col></ion-col>
                    <ion-col size="10" sizeXl="8">
                        <div class="controls-container">
                            <ion-range v-if="pestanyaMapa" color="tertiary" id="rango" :min="1" :max="25"
                                v-model="cercleRadi"></ion-range>
                            <ion-text v-if="pestanyaMapa">{{ cercleRadi }} km.</ion-text>
                            <ion-button id="locate" v-if="pestanyaMapa" @click="getCurrentPosition" color="tertiary">
                                <ion-icon slot="icon-only" :icon="locate"></ion-icon>
                            </ion-button>
                            <ion-button id="filtres" @click="openFiltresModal" color="tertiary">
                                <ion-icon slot="icon-only" :icon="filter"></ion-icon>
                            </ion-button>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col v-show="pestanyaMapa" size="10" sizeXl="8">
                        <div id="map"></div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10" v-show="!pestanyaMapa">
                        <myCard v-for="establiment in establiments" 
                        :key="establiment._id" 
                        :establiment="establiment" />
                    </ion-col>
                    <ion-col> </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
    <onboarding :steps="onBoardingExplorarSteps" @start-onboarding="startOnboarding"></onboarding>


    <div class="ion-hide">
        <!--En aquest for es generen tots els elements que s'inclouen dins dels popups dels establiments que apareixen al mapa
        A mesura que la variable establiments va canviant a causa dels resultats de cerca, es generaran els elements necessàris aquí
        i es guardarà la referència al refers.set. Que com es podrà veure al <script> és una llista de referències que ens permetrà injectar
        aquests elements dins del tooltip de leaflet
        -->
        <div v-for="(establiment, k) in establiments" :key="k" :ref="refers.set" class="container-map">
            <router-link :to="`/establiment/${establiment._id}`">{{ establiment.nom }}</router-link>
            <badgeTipus :tipus="establiment.tipus"></badgeTipus>
            <p>
                {{ establiment.descripcio }}
            </p>

        </div>

    </div>

</template>
<script setup lang="ts">
import { IonPage, IonText, IonTitle, IonToolbar, IonHeader, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonCard, IonSegment, IonLabel, IonSegmentButton, IonGrid, IonRow, IonCol, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonImg, IonIcon, IonThumbnail, alertController, RefresherCustomEvent, IonRange, modalController } from '@ionic/vue'
import { Ref, onMounted, getCurrentInstance, ref, computed, defineComponent, nextTick, toRaw, watch, onBeforeUnmount, onBeforeUpdate } from 'vue';
import { storeToRefs } from 'pinia';
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
import badgeTipus from '../components/badgeTipus.vue';
import myCard from '../components/myCard.vue';
import { showLoading, showAlert } from '../composables/loader';
import { Establiment } from '../types';
import { LatLng } from 'leaflet';
import { useDebounceFn, useTemplateRefsList } from '@vueuse/core'
import Filtres from './Explorar/Filtres.vue';
import { useFiltresStore } from '../store/filtersStore';
import onboarding from '../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';
//Inicialització de les variables necessàries
//Variable per a guardar tots els elements creats a la plantilla HTML
//Que són els links dins el popup del marcador del mapa
const refers = useTemplateRefsList()
//La variable que representa l'element del mapa de Leaflet
//Amb aquesta variable es podrà controlar el mapa
const map: Ref<Map | null> = ref(null)
//Coordenades inicials. Inicialitzem amb unes coordenades aleatories
const mapCoordinates: Ref<[number, number]> = ref([39.0408888, 0.7479283])
const myLocation: Ref<[number, number]> = ref([0, 0])
//Zoom inicial del mapa
const zoom = ref(9)
//Variable on s'emmagatzemaran els establiments resultat de la cerca de la API
//Aquesta variable es reactiva, per la qual cosa, quan es canvii el valor
//Canviarà tot el necessàri de la plantilla que afecti aquesta variable
const establiments: Ref<Establiment[] | undefined> = ref([]);
//Variable que ens permet canviar entre la pestanya del mapa i de la llista
const pestanyaMapa = ref(true)

//Variables per a controlar el cercle que apareix al mapa
const cercleMapa: Ref<null | Circle> = ref(null)
const cercleRadi = ref(15)

//Variable que permetrà actualitzar tots els marcadors del mapa quan s'actualitzi una cerca
const markersLayer: Ref<any> = ref(null)

const myPopup = ref(null)

//Variables necessaries per als onboardings de les dues pestanyes
const onBoardingExplorarStepsMapa: Ref<StepEntity[] | any[]> = ref([])
const onBoardingExplorarStepsLlista: Ref<StepEntity[] | any[]> = ref([])
const onBoardingExplorarSteps: Ref<StepEntity[] | any[]> = computed(() => pestanyaMapa.value ? onBoardingExplorarStepsMapa.value : onBoardingExplorarStepsLlista.value)
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
const startOnboarding = (element: any) => {
    console.log('element :>> ', element);
    onboardingElement.value = element
}

//Variables de la store dels filtres. Des d'aquí rebem totes les opcions marcades per l'usuari al component Filtres.vue
const { filtres, horari, preu } = useFiltresStore()
const { qualitatMinima, quantitatMinima } = storeToRefs(useFiltresStore())

//Funcio per a canviar de pestanya
const changePestanya = (event: any) => {
    console.log('event.detail.value :>>', event.detail.value);
    if (event.detail.value != 'mapa') { pestanyaMapa.value = false }
    else {
        pestanyaMapa.value = true
        setTimeout(() => map.value = loadMap(), 100)
        addMarkers()
    }
}
//Funció per a obtenir la posició
const getCurrentPosition = async () => {
    try {
        //En primera instancia intenta rebre les coordenades de capacitor
        const coordinates = await Geolocation.getCurrentPosition();
        //En cas de que tot i que funcioni pero ens retorni la localització 0,0. Executarem el catch
        if (coordinates.coords.latitude == 0 || coordinates.coords.longitude == 0)
            throw new Error("GPS no funciona")
        //En cas de que capacitor ens retorni les coordenades, actualitzem les variables reactives
        mapCoordinates.value[0] = coordinates.coords.latitude
        mapCoordinates.value[1] = coordinates.coords.longitude
        myLocation.value = mapCoordinates.value

    } catch (err) {
        //En cas d'un error, es realitza una crida a la API MyIp.io per a obtenir les coordenades
        //A partir de la ip i mostrar una localització aproximada
        doIPLocation((err: any, data: any) => {
            if (err) return
            myLocation.value = [data.location.lat, data.location.lon]
        })

    }
    //Finalment es canvia la posició en el mapa amb la localització obtinguda
    map.value?.flyTo(myLocation.value)
    //Es realitza la cerca
    fillEstabliments()
};

//Aquesta funció fa la crida a la API amb els valors de les variables reactives
//I actualitza els resultats de la variable reactiva establiments
//Utilitza el wrapper useDebounceFn, que únicament executarà la funció si després de la crida passa 1s sense que es torni a fer la crida a la funcio
//D'aquesta manera, si es crida aquesta funció de manera molt seguida, únicament s'executarà quan passi més d'un segon desde la ultima vegada. Si es torna a cridar dins d'aquest periode es reinicia el temporitzador
//Així en estalviem fer moltes crides a la API
const fillEstabliments = useDebounceFn(async () => {
    const loader = await showLoading('Carregant establiments')
    loader.present()
    searchEstabliments(mapCoordinates.value[0], mapCoordinates.value[1], cercleRadi.value, preu.lower, preu.upper, qualitatMinima.value, quantitatMinima.value, (err: any, data: any) => {
        loader.dismiss()
        if (err) return
        establiments.value = data.establiments
    })
}, 1000)

//Funció que crea els marcadors a partir dels elements HTML generats en la plantilla
const addMarkers = () => {
    //Si ja existeix una capa amb marcadors, aquesta s'esborra del mapa
    if (markersLayer.value != null && map.value != null)
        map.value.removeLayer(markersLayer.value)
    //Es crea un cluster de marcadors per a mostrar millor els marcadors
    var markers = L.markerClusterGroup()
    if (establiments.value != undefined) {
        //Per cada establiment
        establiments.value.forEach((element, index) => {
            if (map.value != null) {
                //Es crea un marcador amb una icona
                var marker = L.marker(element.coordenades, {
                    icon: new Icon({ iconUrl: location, iconSize: [25, 41], iconAnchor: [12, 41] })
                })
                try {
                    //S'injecta l'element HTML al popup del marcador
                    marker.bindPopup(() => refers.value[index])
                } catch (err) {
                    // var ruta = `/establiment/${element._id}`
                    // var link = ` <a href="${ruta}"> ${element.nom}</a>`
                    // var popup = L.popup()
                    // popup.setContent(link)
                    // marker.bindPopup(popup)
                }
                //S'afegeix el marcador a la capa
                markers.addLayer(marker)
            }
        });
        if (map.value != null) {
            //S'afegeix la nova capa de marcadors al mapa
            toRaw(map.value).addLayer(markers)
            markersLayer.value = markers
        }
    }
}


//Funció per a carregar el mapa
const loadMap = () => {
    //Per a crear el mapa
    var map = L.map('map').invalidateSize().setView([mapCoordinates.value[0], mapCoordinates.value[1]], zoom.value);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //Per a crear el cercle
    cercleMapa.value = new L.Circle([mapCoordinates.value[0], mapCoordinates.value[1]], cercleRadi.value * 1000)
    cercleMapa.value.addTo(map)

    //Es capturen els events de moure el mapa
    map.on('drag', (event) => {
        var map = event.target
        //S'actualitza la variable reactiva cada vegada que s'activa aquest event
        var center = map.getCenter();  //get map center
        cercleMapa.value?.setLatLng(center)
        mapCoordinates.value = [center.lat, center.lng]
    })
    //I de quan s'acaba de moure el mapa
    map.on('moveend', async (event) => {
        //S'actualitza la variable
        var map = event.target
        var center = map.getCenter()
        mapCoordinates.value = [center.lat, center.lng]
        cercleMapa.value?.setLatLng(center)
        //I finalment es realitza la cerca
        await fillEstabliments()
    })
    return map
}


//Funció per a mostrar el modal dels filtres
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
//Un watch serveix per a observar quan una variable canvia de valor
watch(refers, (v, o) => {
    //En aquest cas s'observa la variable que conté les referencies dels elements generats a la plantilla.
    //Quan s'acaben de generar aquests elements, s'executa la funció mencionada anteriorment per a afegir els marcadors
    addMarkers()
}, { deep: true })

onMounted(async () => {
    await nextTick()
    //Timeout necessari per a renderitzar correctament el mapa per primer cop
    setTimeout(() => map.value = loadMap(), 50)
    //Executem la funció per a obtenir la localització actual
    getCurrentPosition()
    //Les passes necessàries per a l'onboarding
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
            element: "#locate"
        },
        content: {
            title: "Ves a la teva ubicació",
            description: "En prèmer aquest botó, el mapa es dirigirà automàticament a la teva ubicació o una ubicació apròximada."
        },
        options: {
            popper: {
                placement: 'left'
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
    onBoardingExplorarStepsLlista.value = [
        {
            attachTo: {
                element: "#tabsExplorar"
            },
            content: {
                title: "Modes",
                description: "Aquí podràs veure els resultats de la cerca del mapa en mode llista."
            },
            options: {
                popper: {
                    placement: 'bottom'
                }
            }
        },
        {
            attachTo: {
                element: "#filtres"
            },
            content: {
                title: "Filtres",
                description: "En prèmer aquest botó, aqui també podràs afegir filtres a la teva cerca"
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
                description: "Si vols cercar més establiments pots tornar a la pestanya del mapa per a canviar els resultats d'aquesta vista"
            },
            options: {
                popper: {
                    placement: 'bottom'
                }
            }
        }
    ]
})

//Abans de destruir el component, es destrueix l'element HTML de map
onBeforeUnmount(async () => {
    if (map.value) {
        map.value.remove()
    }
})

//S'observa la variable que està enllaçada amb l'ion range
watch(cercleRadi, async (newValue, oldValue) => {
    //Si canvia, es canvia el radi del cercle al mapa
    cercleMapa.value?.setRadius((newValue) * 1000)
    //I es torna a realitzar la cerca
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

.controls-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 15px
}

.container-map {}
</style>