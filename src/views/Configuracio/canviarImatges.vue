<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="tertiary" @click="cancel"><ion-icon :icon="close"
                        slot="icon-only"></ion-icon></ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Canviar Foto perfil</ion-title>
            <ion-buttons slot="end">
                <ion-button color="primary" @click="confirm">
                    <ion-icon :icon="checkmark" slot="icon-only"></ion-icon></ion-button>
            </ion-buttons>
        </ion-toolbar>

    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <form @prevent.default="confirm">
                        <ion-row>
                            <ion-col>
                                <input class="ion-hide" @change="setImagePerfil" type="file" id="foto_perfil">
                                <ion-button @click="openFileDialog('foto_perfil')">
                                    Foto de perfil <ion-icon slot="end" :icon="cloud"></ion-icon>
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <input class="ion-hide" @change="setImageFondo" type="file" id="foto_fondo"
                                    style="display:'none';">
                                <ion-button @click="openFileDialog('foto_fondo')">
                                    Foto de fons <ion-icon slot="start" :icon="cloud"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </form>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <myCard @click.stop="null" v-if="myEstabliment" :establiment="myEstabliment"
                        :img_fondo="imageFondoBase64" :img_perfil="imagePerfilBase64" />
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
import myCard from '../../components/myCard.vue'
import { cloud, checkmark, close } from 'ionicons/icons'
import { Ref, ref, onMounted, watch } from 'vue';
import { useLoginStore } from '../../store/loginStore';
import { putImatgePerfil, putImatgeFondo } from '../../APIService/establiments'
import { storeToRefs } from 'pinia';
import { Establiment2 } from '../../types'
import { getPerfil } from '../../APIService/utils';

const { userId } = storeToRefs(useLoginStore())
const myEstabliment: Ref<Establiment2 | null> = ref(null)
const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = async () => {
    if (imagePerfil.value != null) {
        let formdata = new FormData()
        formdata.append('nom', userId.value)
        formdata.append('img_perfil', imagePerfil.value)
        putImatgePerfil(formdata, (err, data) => {
            console.log("Ok");
            return
        })
    }
    if (imageFondo.value != null) {
        let formdata = new FormData()
        formdata.append('nom', userId.value)
        formdata.append('img_fondo', imageFondo.value)
        putImatgeFondo(formdata, (err: any, data: any) => {
            console.log("Ok")
            return
        })
    }
    modalController.dismiss(null, 'confirm')
}

const imagePerfil = ref(null)
const imageFondo = ref(null)
const setImagePerfil = (ev: any) => {
    imagePerfil.value = ev.target.files![0]
    if (imagePerfil.value != null) {
        fileToBase64(imagePerfil.value).then((res) => {
            imagePerfilBase64.value = res
        }).catch((err) => {
            imageFondoBase64.value = ""
        })
    }
    imageFondoBase64.value = ""
}
const setImageFondo = (ev: any) => {
    imageFondo.value = ev.target.files![0]
    if (imageFondo.value != null) {
        fileToBase64(imageFondo.value).then((res) => {
            imageFondoBase64.value = res
        }).catch((err) => {
            imageFondoBase64.value = ""
        });
    }
    imageFondoBase64.value = ""
}
const openFileDialog = (fileDialogId: any) => {
    (document as any).getElementById(fileDialogId).click()
}

const fileToBase64 = async (f: any) => {
    const convert = async () => new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(f)
        reader.onload = () => resolve(reader.result?.toString())
        reader.onerror = (e) => reject(e)
    });
    return convert()
}
const imageFondoBase64 = ref('')
const imagePerfilBase64 = ref('')
const fillPerfil = () => {
    getPerfil((err: any, data: any) => {
        if (err) return
        myEstabliment.value = data.perfil
    })
}

onMounted(() => {
    fillPerfil()
})
</script>
<style></style>