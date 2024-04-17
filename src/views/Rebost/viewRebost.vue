<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <ion-icon :icon="arrowBack" ></ion-icon>Endarrere
                    </ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center"></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col >
                        <ion-title class="ion-text-center">Inventari {{ rebostId }}</ion-title>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeSm="10" sizeMd="8" sizeLg="6">
                        <ion-list v-if="rebostId">
                            <ion-item v-for="element in elements" :key="element._id">
                                <cardElement :rebostId="rebostId" :element="element" @deleteElement="fillRebost"></cardElement>
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
import {arrowBack} from 'ionicons/icons'
import { getAllElements, createElement } from '../../APIService/';
import { ref,Ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { add, camera, pencil } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { createWorker } from 'tesseract.js';
import newElement from '@/views/Elements/newElement.vue'
import cardElement from '../../components/cardElement.vue';
import { showLoading } from '../../composables/loader';
const { takePhoto, photos } = usePhotoGallery();
const { loggedIn } = useLoginStore();
interface Aliment {
    _id:string,
    nom:string,
    tipus:string
}

interface Element {
    _id: string,
    quantitat:number,
    q_unitat:string,
    data_compra: string,
    data_caducitat: string,
    aliment?:Aliment
}

const elements: Ref<Element[]|null>=ref(null)

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
    const worker = await createWorker('spa');
    const ret = await worker.recognize(src)
    presentAlert(ret.data.text)
    await worker.terminate()
}

const fillRebost = async() => {
    const loader=await showLoading("Carregant els elements del rebost")
    loader.present()
    if (props.rebostId) {
        getAllElements(props.rebostId).then((res) => {
            elements.value=res.data.elements
        }).catch((err) => {
            
        });
    }
    loader.dismiss(null,'cancel')
}

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
</script>
<style></style>