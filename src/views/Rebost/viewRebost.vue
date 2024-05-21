<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center ion-activatable" id="rebost">Rebost
                    <ion-icon color="primary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <div class="ordenar-container">
                            <ion-select v-model="ordenarPer" label-placement="floating">
                                <ion-select-option value="aliment.nom">Nom</ion-select-option>
                                <ion-select-option value="data_caducitat">Data de caducitat</ion-select-option>
                                <ion-select-option value="data_compra">Data de compra</ion-select-option>
                                <ion-select-option value="aliment.categoria">Categoria</ion-select-option>
                            </ion-select>
                            <ion-toggle v-model="ordenarAsc"></ion-toggle>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeSm="10" sizeMd="8" sizeLg="6">
                        <div class="element-container" v-if="rebostId">
                            <div v-for="element in orderedElements" :key="element._id">
                                <cardElement :rebostId="rebostId" :element="element" @deleteElement="fillRebost"
                                    @updateElement="showUpdateModal"></cardElement>
                            </div>
                        </div>
                    </ion-col>
                    <ion-col>
                    </ion-col>
                </ion-row>

            </ion-grid>

            <ion-fab id="addBtn" slot="fixed" vertical="bottom" horitzontal="center">
                <ion-fab-button color="primary" id="addBtn2" class="ion-activatable">
                    <ion-icon id="addBtn3" :icon="add"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                    <ion-fab-button color="tertiary" @click="takePhoto()">
                        <ion-icon :icon="camera"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button color="secondary" @click="openModalCreate">
                        <ion-icon :icon="pencil"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list>
            </ion-fab>

        </ion-content>
    </ion-page>
    <onboarding :steps="onBoardingViewRebostSteps" @start-onboarding="startOnboarding"></onboarding>
</template>
<script setup lang="ts">
import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonTitle,
    IonText,
    IonImg,
    IonThumbnail,
    IonFab,
    IonFabList,
    IonFabButton,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    alertController,
    modalController,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/vue';
import { getAllElements } from '../../APIService/elements';
import { getAlimentsByNoms } from '../../APIService/aliments';
import { ref, Ref, reactive, computed, onMounted, defineProps, watch } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { add, camera, pencil, informationCircle, arrowBack } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { createWorker } from 'tesseract.js';
import newElement from '@/views/Elements/newElement.vue'
import cardElement from '../../components/cardElement.vue';
import chooseAliments from './chooseAliments.vue'
import { showAlert, showLoading } from '../../composables/loader';
import { useAlimentStore } from '../../store/alimentStore';
import { Element } from '../../types';
import { stringSimilarity } from 'string-similarity-js'
import { storeToRefs } from 'pinia';

import onboarding from '../../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';

import orderBy from 'lodash/orderBy'


const ordenarPer = ref("aliment.nom")
const ordenarAsc = ref(true)
const { takePhoto, photos, lastPhoto } = usePhotoGallery();
const { loggedIn } = useLoginStore();
const { getAllNoms } = storeToRefs(useAlimentStore())
const onBoardingViewRebostSteps: Ref<StepEntity[] | any[]> = ref([])
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
const startOnboarding = (element: any) => {
    onboardingElement.value = element
}
interface Aliment {
    _id: string,
    nom: string,
    tipus: string
}



const elements: Ref<Element[] | null> = ref(null)
const orderDirection = computed(() => ordenarAsc.value ? ["asc"] : ["desc"])
const orderedElements = computed(() => orderBy(elements.value, [ordenarPer.value], orderDirection.value))
const props = defineProps({
    rebostId: String
})

const presentAlert = async (prompt: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: prompt,
        buttons: ['Exit']
    })
    await alert.present()
}

const readImage = async (src: any) => {
    const loader = await showLoading("Llegint imatge")
    loader.present()
    let result = ""
    try {
        const worker = await createWorker('spa');
        const ret = await worker.recognize(src)
        result = ret.data.text
        await worker.terminate()
    } catch (err) {
        console.log('err :>> ', err);
    } finally {
        loader.dismiss()
    }
    console.log('result :>> ', result);
    return result
}

//Funció per a cercar els aliments
// de la base de dades si estan presents en el text 
//Accepta un paràmetre acceptance per a establir 
//el minim d'acceptació per a afegir l'aliment al rebost
const searchAliment = (text: string, acceptance: number) => {
    //Per cada un dels aliments de la base de dades
    let aliments = getAllNoms.value?.map((val, idx, arr) => {
        let mx = 0
        //Busca l'acceptació de cada paraula del text amb l'aliment
        text.split(' ').forEach((val2, idx2, arr2) => {
            let res = stringSimilarity(val, val2)
            if (res > mx)
                mx = res
        })
        return { similarity: mx, val }
    })
    //Finalment es retornen unicament els aliments de la base de dades
    // que obtenen una similaritat major a al limit establert
    return aliments?.filter((val, idx, arr) => val.similarity > acceptance)
}

const fillRebost = async () => {
    const loader = await showLoading("Carregant els elements del rebost")
    loader.present()
    if (props.rebostId) {
        getAllElements(props.rebostId, (err: any, data: any) => {
            if (err) return
            elements.value = data.elements
        });
    }
    loader.dismiss(null, 'cancel')
}

watch(lastPhoto, async (v: any, oV: any) => {
    let textOfPhoto = await readImage(v.webviewPath)

    if (textOfPhoto) {
        let alimentsEscanejats = searchAliment(textOfPhoto, 0.6)
        //let alert = await showAlert(`Els elements que s'han escanejat de la foto són ${alimentsEscanejats?.map((el) => el.val).join(' ')}`)
        //alert.present()
        getAlimentsByNoms(alimentsEscanejats?.map((el) => el.val), (err: any, data: any) => {
            if (err) return
            showChooseAlimentModal(data.aliments)
        })
    }
}, { deep: true })

onMounted(() => {
    fillRebost()
    onBoardingViewRebostSteps.value = [{
        attachTo: {
            element: "#rebost"
        },
        content: {
            title: "Elements del rebost",
            description: "Aquí podras trobar tots els elements dins d'un mateix rebost i veure quan els vas comprar, quan caduquen i la quantitat restant de cada aliment"
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    }, {
        attachTo: {
            element: "#addBtn"
        },
        content: {
            title: "Afegir nous aliments al rebost",
            description: "Si cliques obre aquest botó t'apereixeran dos botons més on podras..."
        },
        options: {
            popper: {
                placement: 'top-end'
            }
        }
    },
    {
        attachTo: {
            element: "#addBtn2"
        },
        content: {
            title: "Afegir nous aliments al rebost",
            description: "Si cliques sobre la icona del llapis, podràs afegir manualment un aliment mitjançant un formulari."
        },
        options: {
            popper: {
                placement: 'top-end'
            }
        }
    },
    {
        attachTo: {
            element: "#addBtn3"
        },
        content: {
            title: "Afegir nous aliments al rebost",
            description: "Si cliques sobre la icona de la càmera, podràs utilitzar la fotografia d'un tiquet de la compra per afegir aliments més ràpid."
        },
        options: {
            popper: {
                placement: 'top-end'
            }
        }
    }]
});

const openModalCreate = async () => {
    const modal = await modalController.create({
        component: newElement,
        componentProps: { rebostId: props.rebostId }
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        presentAlert('Element creat correctament')
        fillRebost()
    }
}

const showUpdateModal = async (event: { element: Element, rebostId: string }) => {
    console.log('event :>> ', event.element);
    const modal = await modalController.create({
        component: newElement,
        componentProps: {
            rebostId: event.rebostId,
            element: event.element
        }
    })

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        presentAlert('Element editat correctament')
        fillRebost()
    }

}

const showChooseAlimentModal = async (aliments: Aliment[]) => {
    const modal = await modalController.create({
        component: chooseAliments,
        componentProps: {
            aliments,
            rebostId: props.rebostId
        }
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role == "confirm")
        fillRebost()
}

const handleRefresh = async (event: any) => {
    await fillRebost()
    // Any calls to load data go here
    event.target?.complete();
};

</script>
<style scoped>
ion-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    -webkit-justify-content: space-evenly;
}

cardElement {
    flex-grow: 1
}

.element-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.ordenar-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
}
</style>