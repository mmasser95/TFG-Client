<template>
    <ion-card @click="showModalOferta" class="ion-activatable myCard">
        <ion-ripple-effect></ion-ripple-effect>
        <div class="img_fons">
            <img v-if="img_fons" :src="img_fons" :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
            <img v-else-if="oferta.url_imatge" :src="`https://app.flyfood.online/${oferta.url_imatge}`"
                :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
            <img v-else
                src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg"
                :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
        </div>
        <ion-card-header>
            <ion-card-title>
                <ion-title>{{ oferta.nom }}</ion-title>
            </ion-card-title>
            <ion-card-subtitle class="ion-padding">{{ oferta.descripcio }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="container1">
            <div class="container2">
                <div class="container3">{{ total }} €</div>
                <div class="container3" @click.stop="null">
                    <ion-input id="quantitat" label="Quantitat" label-placement="floating" type="number" min="1"
                        :max="oferta.quantitatDisponible" v-model="quantitat"></ion-input>
                </div>
                <div class="container3">
                    <ion-button color="secondary" @click.stop="alertComprar" expand="block">
                        <ion-icon :icon="cart"></ion-icon>
                    </ion-button>
                </div>
            </div>
            <div class="container2">
                {{ oferta.quantitatDisponible }} packs restants
            </div>
        </ion-card-content>
    </ion-card>
</template>
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRippleEffect, alertController, useIonRouter, IonRow, IonCol, IonTitle, IonText, IonButton, IonIcon, IonInput, modalController } from '@ionic/vue';
import viewOferta from '../views/Explorar/viewOferta.vue';
import { cart } from 'ionicons/icons';
import { ref, computed, watch } from 'vue';
import { Oferta } from '../types'
import { createComanda } from '../APIService/comandes'
import round from "lodash/round"
import ceil from "lodash/ceil"
const router = useIonRouter()

const alertComprar = async () => {
    let alert = await alertController.create({
        header: `Vols comprar x${ceil(quantitat.value)} aquesta oferta per ${props.oferta.preu * ceil(quantitat.value)}€?`,
        message: "Seras redirigit a la passarel·la de pagament.",
        buttons: [{
            text: "Si",
            handler: () => {
                ferCompra()
            }
        },
        {
            text: "No",
        }]
    })
    alert.present()
}

let props = defineProps<{
    oferta: Oferta,
    establimentId: string,
    img_fons?: string
}>()

let quantitat = ref(1)

let total = computed(() => round(props.oferta.preu * ceil(quantitat.value), 2))
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
        oferta: JSON.stringify(props.oferta),
        quantitat: ceil(quantitat.value),
        total: round(props.oferta.preu * ceil(quantitat.value), 2)
    }, async (err: any, data: any) => {
        if (err) return true
        let alert = await alertController.create({
            header: "Compra feta",
            message: "S'ha realitzat correctament la compra",
            buttons: [{
                text: "Veure Comanda",
                handler: async () => {
                    await router.push('/tabs/tab6')
                }
            },
            { text: "Ok" }
            ]
        })
        alert.present()
    })
}

</script>
<style scoped>
.container1 {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 40px;
}

.container2 {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 40px;
    width: 100%
}

/*ion-button {
    --background: linear-gradient(to right, #70995c, #a5b061, #dfc36f, #ffd489);
}*/
#quantitat {
    max-width: 75px;
}

ion-picker {
    max-height: 100px;
    --highlight-background: var(--ion-color-dark);
    --highlight-border-radius: 50px;

}

ion-picker-column {
    max-height: 100px;
}

.img_fons {
    height: 100px;
    overflow: hidden;
}

.myCard {
    position: relative;
    border-radius: 10px;
    margin: 10px
}
</style>