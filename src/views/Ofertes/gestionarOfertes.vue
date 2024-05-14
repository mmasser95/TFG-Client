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
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-card class="ion-activatable myCard" v-for="(oferta, k) in ofertes" :key="k">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div class="img_fons">
                                <img v-if="oferta.url_imatge" :src="oferta.url_imatge" :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
                                <img v-else src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg" :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
                            </div>
                            <ion-card-header>
                                <ion-card-title>{{ oferta.nom }}</ion-card-title>
                                <ion-card-subtitle>{{ oferta.descripcio }}</ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content class="container">
                                <div class="container-1">
                                    <ion-text></ion-text>
                                    <ion-text>{{ oferta.quantitatDisponible }} lots </ion-text>
                                    <ion-text>{{ oferta.preu }}€</ion-text>
                                    <ion-text>{{ oferta.categoria }}</ion-text>
                                </div>
                                <div class="container-2">
                                    <ion-button expand="block" color="secondary"
                                        @click="openModalUpdate(oferta._id)">
                                        <ion-icon :icon="pencil" slot="icon-only"></ion-icon>
                                        
                                    </ion-button>
                                        <ion-button expand="block" color="danger"
                                            @click="eliminarOferta(oferta._id)">
                                            <ion-icon :icon="trash" slot="icon-only"></ion-icon>
                                        </ion-button>
                                </div>
                                
                            </ion-card-content>
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
    IonText,
    IonCol,
    IonRow,
    IonCard,
    IonCardSubtitle,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    modalController,
    alertController,
    IonFab,
    IonFabButton,
    IonRippleEffect
} from '@ionic/vue'

import { add,pencil,trash } from 'ionicons/icons'

import { crearOferta, deleteOferta, getOfertes, updateOferta } from '../../APIService/ofertes';
import { Ref, ref } from 'vue';
import newOferta from './newOferta.vue';
import { useLoginStore } from '../../store/loginStore';
import { storeToRefs } from 'pinia';
import { Oferta } from '../../types'
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



const ofertes: Ref<Oferta[] | undefined> = ref([]);

const fillOfertes = () => {
    getOfertes((err: any, data: any) => {
        if (err) return
        ofertes.value = data.ofertes;
    })
}
const openModalCreate = async () => {
    const modal = await modalController.create({
        component: newOferta,
        componentProps: { update: '' }
    })
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        crearOferta(data, (err: any, data: any) => {
            if (err) return
            fillOfertes()
        })
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
        updateOferta(ofertaId, data, (err: any, data: any) => {
            if (err) return
            fillOfertes()
        })
    }
}

const eliminarOferta = (ofertaId: any) => {
    deleteOferta(ofertaId, (err: any, data: any) => {
        if (err) return
        fillOfertes()
    })
}

fillOfertes();
</script>
<style scoped>
.container{
    display:flex;
    flex-flow:row wrap;
    justify-content: space-between;
    align-items: center;
    gap:20px
}
.container-1{
    display:flex;
    justify-content: flex-start;
    flex-flow:row wrap;
    gap:20px;
}

.container-2{
    display:flex;
    flex-flow:row wrap;
    justify-content: flex-end;
    gap:20px
}
.img_fons{
    height:100px;
    overflow:hidden;
}
.myCard{
    position:relative;
    border-radius:10px;
    margin:10px
}
</style>