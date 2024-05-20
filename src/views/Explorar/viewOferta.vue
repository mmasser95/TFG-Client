<template>
    <ion-page>
        <ion-content class="container" v-if="oferta?._id">
            <div class="img_fons item">
                <img v-if="oferta.url_imatge" :src="`https://app.flyfood.online/${oferta.url_imatge}`"
                    :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
                <img v-else
                    src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg"
                    :alt="`Imatge de fons de l'oferta ${oferta.nom}`">
            </div>
            <div class="container4">
                <div class="container2">
                    <div class="item2" v-for="(label, k) in labels">
                        <div v-if="label == 'Preu'">
                            {{ label }}: {{ oferta.preu }} €
                        </div>
                        <div v-else>{{ label }}: {{ oferta[k] }}</div>
                    </div>
                </div>
                <form action="" @submit.prevent="">
                    <div class="container3">

                        <div class="item3">
                            <ion-item>
                                <ion-input type="number" :min="1" :max="50" v-model="quantitat"></ion-input>
                            </ion-item>
                        </div>
                        <div class="item3">
                            Total: {{ round(quantitat * oferta.preu,2) }} €
                        </div>
                            <ion-button @click="alertComprar" expand="block">
                                <ion-icon slot="icon-only" :icon="cart"></ion-icon>
                            </ion-button>
                    </div>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, alertController, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonList, modalController, IonInput } from '@ionic/vue';
import { Ref, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { cart } from 'ionicons/icons';
import { showLoading, showAlert } from '../../composables/loader';
import { Oferta } from '../../types';
import { createComanda } from '../../APIService/comandes'
import round from "lodash/round"
import ceil from "lodash/ceil"
//import { getOfertaUser } from '../../APIService/ofertes';
const router = useRouter()
const cancel = () => modalController.dismiss(null, 'cancel')

const quantitat = ref(1)

watch(quantitat, (n: number, o: number) => {
    if (n < 1 || n > 50)
        quantitat.value = o
})
const props = defineProps<{
    oferta: Oferta,
    establimentId: String
}>()
const labels = {
    nom: "Nom",
    descripcio: "Descripcio",
    preu: "Preu",
    quantitatDisponible: "Quantitat disponible",
    categoria: "Categoria"
}

const alertComprar = async () => {
    let alert = await alertController.create({
        header: `Vols comprar x${ceil(quantitat.value)} aquesta oferta per ${props.oferta.preu * ceil(quantitat.value)}€?`,
        message: "Seras redireccionat a la pasarela de pagament.",
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
const ferCompra = () => {
    createComanda({
        establimentId: props.establimentId,
        oferta: JSON.stringify(props.oferta),
        quantitat: ceil(quantitat.value),
        total: round(props.oferta.preu * quantitat.value,2)
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
onMounted(() => {
})

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: column nowrap;
}

.container2 {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    gap: 10px;
    margin: 10px;
    align-items: flex-start;
}

.item2 {
    flex-grow: 1;
}


.container3 {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 10px;
    gap: 17px;
}

.container3>ion-item {
    flex-grow: 1;
}

ion-item>ion-button {
    width: 100%
}

.img_fons {
    height: 20vh;
    overflow: hidden;
}

.container4 {
    display: flex;
    flex-flow: column nowrap;
}

ion-input {
    max-width: 250px;
}
</style>