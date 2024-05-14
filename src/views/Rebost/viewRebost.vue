<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Inventari</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>

                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeSm="10" sizeMd="8" sizeLg="6">
                        <div class="element-container" v-if="rebostId">
                            <div v-for="element in elements" :key="element._id">
                                <cardElement :rebostId="rebostId" :element="element" @deleteElement="fillRebost"
                                    @updateElement="showUpdateModal"></cardElement>
                            </div>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>

            </ion-grid>

            <ion-fab slot="fixed" vertical="bottom" horitzontal="center">
                <ion-fab-button>
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                    <ion-fab-button @click="takePhoto()">
                        <ion-icon :icon="camera"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button @click="openModalCreate">
                        <ion-icon :icon="pencil"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list>
            </ion-fab>
        </ion-content>

    </ion-page>
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
    modalController
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons'
import { getAllElements, createElement, putElement } from '../../APIService/elements';
import { getAlimentsByNoms } from '../../APIService/aliments';
import { ref, Ref, reactive, computed, onMounted, defineProps, watch } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { add, camera, pencil } from 'ionicons/icons';
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

const { takePhoto, photos, lastPhoto } = usePhotoGallery();
const { loggedIn } = useLoginStore();
const { getAllNoms } = storeToRefs(useAlimentStore())
interface Aliment {
    _id: string,
    nom: string,
    tipus: string
}



const elements: Ref<Element[] | null> = ref(null)

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

const searchAliment = (text: string, acceptance: number) => {
    let aliments = getAllNoms.value?.map((val, idx, arr) => {
        let mx = 0
        text.split(' ').forEach((val2, idx2, arr2) => {
            let res = stringSimilarity(val, val2)
            if (res > mx)
                mx = res
        })
        return { similarity: mx, val }
    })
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
        let alert = await showAlert(`Els elements que s'han escanejat de la foto són ${alimentsEscanejats?.map((el) => el.val).join(' ')}`)
        alert.present()
        getAlimentsByNoms(alimentsEscanejats?.map((el) => el.val), (err: any, data: any) => {
            if (err) return
            showChooseAlimentModal(data.aliments)
        })
    }
}, { deep: true })

onMounted(() => {
    fillRebost()
});

const openModalCreate = async () => {
    const modal = await modalController.create({
        component: newElement
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        createElement(props.rebostId, data, (err: any, data: any) => {
            if (err) return
            presentAlert('Element creat correctament')
            fillRebost()
        })
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
        putElement(event.rebostId, event.element._id, data, (err: any, data: any) => {
            if (err) return
            presentAlert('Element editat correctament')
            fillRebost()
        })
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

console.log(searchAliment("Limon Cacahuetes Lechuga Iceberg Doca Nabana", 0.6))

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
</style>