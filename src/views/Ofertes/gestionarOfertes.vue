<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">
                        <ion-title class="ion-text-center">Gestionar Ofertes publicades per {{ userId }}</ion-title>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <ion-card v-for="(oferta, k) in ofertes" :key="k">
                            <ion-card-header>
                                <ion-card-title>{{ oferta.nom }}</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                {{ oferta.descripcio }}
                            </ion-card-content>
                            <ion-button color="secondary" @click="openModalUpdate(oferta._id)">Editar</ion-button>
                            <ion-button color="danger" @click="eliminarOferta(oferta._id)">Eliminar</ion-button>
                        </ion-card>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
            <ion-fab slot="fixed" vertical="bottom" horitzontal="start">
                <ion-fab-button @click="openModalCreate">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonList,
    IonItem,
    IonIcon,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    modalController,
    alertController,
    IonFab,
    IonFabButton
} from '@ionic/vue'

import { add } from 'ionicons/icons'

import { crearOferta, deleteOferta, getOfertes, updateOferta } from '../../APIService';
import { Ref, ref } from 'vue';
import newOferta from './newOferta.vue';
import { useLoginStore } from '../../store/loginStore';
import { storeToRefs } from 'pinia';

const store = useLoginStore()
const { userId } = storeToRefs(store)

const presentAlert = async (prompt: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: prompt,
        buttons: ['Exit']
    })
    await alert.present()
}

interface Oferta {
    _id: string,
    nom: string
    descripcio: string,
    preu: string,
    divisa: string
}

const ofertes: Ref<Oferta[] | undefined> = ref([]);

const fillOfertes = () => {
    getOfertes()
        .then((res) => {
            ofertes.value = res.data.ofertes;
        }).catch((err) => {
            console.log(err.response.data.message);
        });
}

const openModalCreate = async () => {
    const modal = await modalController.create({
        component: newOferta,
        componentProps: { update: '' }
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        crearOferta(data)
            .then((res) => {
                fillOfertes();
            }).catch((err) => {
                console.log(err)
            });
    }
}

const openModalUpdate = async (ofertaId: any) => {
    const modal = await modalController.create({
        component: newOferta,
        componentProps: { update: ofertaId }
    })

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        updateOferta(ofertaId, data)
            .then((res) => {
                fillOfertes()
            }).catch((err) => {
                presentAlert(err)
            });
    }
}

const eliminarOferta = (ofertaId: any) => {
    deleteOferta(ofertaId)
        .then((result) => {
            fillOfertes()
            presentAlert("L'oferta s'ha eliminat correctament.")
        }).catch((err) => {
            presentAlert(err)
        });
}

fillOfertes();
</script>
<style></style>