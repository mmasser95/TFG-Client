<template>
    <ion-page>

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
                    <ion-col>
                        <ion-list>
                            <ion-item v-for="(i, k) in rebost">{{ k }} : {{ i }}</ion-item>
                        </ion-list>
                    </ion-col>

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
    alertController,
    modalController
} from '@ionic/vue';
import { getRebost } from '../../APIService/';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { add, camera, pencil } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { createWorker } from 'tesseract.js';
import newElement from '@/views/Elements/newElement.vue'
const { takePhoto, photos } = usePhotoGallery();
const { loggedIn } = useLoginStore();


const rebost = reactive({
    nom: '',
    elements: []
});

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

onMounted(() => {
    if (props.rebostId) {
        getRebost(props.rebostId).then((res: any) => {
            console.log(res.data.rebost);
            rebost.nom = res.data.rebost.nom;
            rebost.elements = res.data.rebost.elements;
        }).catch((err: any) => {
            console.log(err);
        });
    }
});

const openModalCreate = async () => {
    const modal = await modalController.create({
        component: newElement
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        console.log('Ok')
    }
}
</script>
<style></style>