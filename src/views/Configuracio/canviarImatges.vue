<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="tertiary" @click="cancel">Cancel·la</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Canviar Foto perfil</ion-title>
            <ion-buttons slot="end">
                <ion-button color="primary" @click="confirm">Confirma</ion-button>
            </ion-buttons>
        </ion-toolbar>

    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <form action="" @prevent.default="confirm">
                        <ion-row>
                            <ion-col>
                                <input @change="setImagePerfil" type="file" id="foto_perfil">
                                <ion-button @click="openFileDialog('foto_perfil')">
                                    <ion-icon :icon="cloud"></ion-icon>
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <input @change="setImageFondo" type="file" id="foto_fondo" style="display:'none';">
                                <ion-button @click="openFileDialog('foto_fondo')">
                                    <ion-icon :icon="cloud"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>

    </ion-content>
</template>
<script setup lang="ts">
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonIcon,
    IonLabel,
    modalController
} from '@ionic/vue'

import { cloud } from 'ionicons/icons'
import { Ref, ref } from 'vue';
import { useLoginStore } from '../../store/loginStore';
import { putImatgePerfil, putImatgeFondo } from '@/APIService'
import { storeToRefs } from 'pinia';
const {userId} = storeToRefs(useLoginStore())
const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = async () => {
    if (imagePerfil.value != null) {
        let formdata = new FormData()
        formdata.append('nom', userId.value)
        formdata.append('img_perfil', imagePerfil.value)
        putImatgePerfil(formdata).then((res) => {
            console.log("Ok");
        }).catch((err) => {
            console.log(`err ${err}`);
        });
    }
    if (imageFondo.value != null) {
        let formdata = new FormData()
        formdata.append('nom', userId.value)
        formdata.append('img_fondo', imageFondo.value)
        putImatgeFondo(formdata).then((res) => {
            console.log('Ok');
        }).catch((err) => {
            console.log(`Err: ${err}`);
        });
    }
    modalController.dismiss(null, 'confirm')
}

const imagePerfil = ref(null)
const imageFondo = ref(null)
const setImagePerfil = (ev: any) => {
    imagePerfil.value = ev.target.files![0]
}
const setImageFondo = (ev: any) => {
    imageFondo.value = ev.target.files![0]
}
const openFileDialog = (fileDialogId:any) => {
    (document as any).getElementById(fileDialogId).click()
}

</script>
<style></style>