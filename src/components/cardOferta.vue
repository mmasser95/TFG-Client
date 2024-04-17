<template>
    <ion-grid :router-link="`/oferta/${oferta._id}`">
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
            <ion-col size="2">{{ oferta.preu }} €</ion-col>
            <ion-col size="2" @click.stop="null">
                <ion-input label="Quantitat" label-placement="floating" type="number" min="1" v-model="quantitat"></ion-input>
            </ion-col>
            <ion-col size="3">
                <ion-button @click.stop="goToComprar" expand="block">
                    <ion-icon :icon="bag"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonTitle, IonText, IonButton, IonIcon,IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { bag } from 'ionicons/icons';
import { ref } from 'vue';
const router=useRouter();

interface Oferta {
    _id: string,
    nom: string,
    descripcio: string,
    preu: number,
    active: boolean
}
let props = defineProps<{
    oferta: Oferta
}>()

let quantitat=ref(1)

const goToComprar=()=>{
    router.push(`/comprar/${props.oferta._id}`)
}

</script>
<style>
.card-title {
    font-size: large;
}

.card-subtitle {
    font-size: small;
}

.text-button {
    font-size: small;
}
</style>