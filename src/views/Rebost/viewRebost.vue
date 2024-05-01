<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <ion-icon :icon="arrowBack"></ion-icon>Endarrere
                    </ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center"></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <ion-title class="ion-text-center">Inventari {{ rebostId }}</ion-title>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeSm="10" sizeMd="8" sizeLg="6">
                        <ion-list v-if="rebostId">
                            <ion-item v-for="element in elements" :key="element._id">
                                <cardElement :rebostId="rebostId" :element="element" @deleteElement="fillRebost"
                                    @updateElement="showUpdateModal"></cardElement>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-list>
                            <ion-item v-for="(photo, pk) in photos">
                                <ion-thumbnail><img :src="photo.webviewPath" /></ion-thumbnail>
                                <ion-button @click="readImage(photo.webviewPath)">Read</ion-button>
                            </ion-item>
                        </ion-list>
                    </ion-col>
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
import { getAllElements, createElement, putElement } from '../../APIService/';
import { ref, Ref, reactive, computed, onMounted, defineProps, watch } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { add, camera, pencil } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { createWorker } from 'tesseract.js';
import newElement from '@/views/Elements/newElement.vue'
import cardElement from '../../components/cardElement.vue';
import { showAlert, showLoading } from '../../composables/loader';
import { useAlimentStore } from '../../store/alimentStore';

import { stringSimilarity } from 'string-similarity-js'
import { storeToRefs } from 'pinia';

const { takePhoto, photos } = usePhotoGallery();
const { loggedIn } = useLoginStore();
const { getAllNoms } = storeToRefs(useAlimentStore())
interface Aliment {
    _id: string,
    nom: string,
    tipus: string
}

interface Element {
    _id: string,
    quantitat: number,
    q_unitat: string,
    data_compra: string,
    data_caducitat: string,
    aliment?: Aliment
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
        presentAlert(ret.data.text)
        result = ret.data.text
        await worker.terminate()
    } catch (err) {
        await presentAlert(`Error ${err}`)
    } finally {
        loader.dismiss()
    }
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
        getAllElements(props.rebostId).then((res) => {
            elements.value = res.data.elements
        }).catch((err) => {

        });
    }
    loader.dismiss(null, 'cancel')
}
watch(photos, async (v: any, oV: any) => {
    let textOfPhoto = await readImage(v[v.length - 1].webviewPath)
    let alimentsEscanejats = searchAliment(textOfPhoto, 0.6)
    let alert = await showAlert(`Els elements que s'han escanejat de la foto són ${alimentsEscanejats?.join(' ')}`)
    alert.present()
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
        createElement(props.rebostId, data).then((res) => {
            presentAlert('Element creat correctament')
            fillRebost()
        }).catch((err) => {
            presentAlert(`Error ${err}`)
        });
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
        putElement(event.rebostId, event.element._id, data).then(async (res) => {
            let alert = await showAlert(`Confirmat`)
            alert.present()
        }).catch((err) => {

        });
    }

}

console.log(searchAliment("Limon Cacahuetes Lechuga Iceberg Doca Nabana", 0.6))

</script>
<style></style>