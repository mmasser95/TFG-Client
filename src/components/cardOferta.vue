<template>
    <ion-grid @click="showModalOferta" class="container">
        <ion-row>
            <ion-col>
                <ion-text class="card-title">{{ oferta.nom }}</ion-text>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <ion-text color="tertiary">
                    <p class="card-subtitle">
                        {{ oferta.descripcio }}
                    </p>
                </ion-text>
            </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
            <ion-col></ion-col>
            <ion-col size="2">{{ total }} €</ion-col>
            <ion-col size="2" @click.stop="null">
                <ion-input label="Quantitat" label-placement="floating" type="number" min="1"
                    v-model="quantitat"></ion-input>
            </ion-col>
            <ion-col size="3">
                <ion-button @click.stop="ferCompra" expand="block">
                    <ion-icon :icon="bag"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonTitle, IonText, IonButton, IonIcon, IonInput, modalController } from '@ionic/vue';
import viewOferta from '../views/Explorar/viewOferta.vue';
import { bag } from 'ionicons/icons';
import { ref,computed } from 'vue';
import { Oferta } from '../types'
import { createComanda } from '../APIService'



let props = defineProps<{
    oferta: Oferta,
    establimentId: string
}>()

let quantitat = ref(1)
let total=computed(()=>props.oferta.preu*quantitat.value)
const showModalOferta = async () => {
    const modal = await modalController.create({
        component: viewOferta,
        initialBreakpoint: 0.75,
        breakpoints: [0, 0.5, 0.75],
        componentProps: {
            establimentId: props.establimentId,
            oferta: props.oferta
        }
    })
    modal.present()
}

const ferCompra = () => {
    createComanda({
        establimentId: props.establimentId,
        ofertaId: props.oferta._id,
        quantitat: quantitat.value,
        total: props.oferta.preu*quantitat.value
    }).then((res) => {
        console.log('res.data.comandaSaved :>> ', res.data.comandaSaved);
    }).catch((err) => {
        console.log('err :>> ', err);
    });
}

</script>
<style scoped>
.card-title {
    font-size: large;
}

.card-subtitle {
    font-size: small;
}

.text-button {
    font-size: small;
}

.container {
    background-image: linear-gradient(to left bottom, #70995c, #3e9466, #008e78);
    border-radius: 10px
}

ion-button {
    --background: linear-gradient(to right, #70995c, #a5b061, #dfc36f, #ffd489);
}
</style>