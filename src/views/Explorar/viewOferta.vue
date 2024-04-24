<template>
    <ion-page>
        <ion-content class="container" v-if="oferta?._id">
            <div class="img_fons item">
                <img :alt="`Imatge del logotip del negoci ${oferta._id}`"
                    src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325253/assortment-of-fruits.jpg" />
            </div>
            <div class="container2">
                <div v-for="(label, k) in labels">
                    <div class="item" v-if="label == 'Preu'">
                        {{ label }}: {{ oferta.preu }} €
                    </div>
                    <div class="item" v-else>{{ label }}: {{ oferta[k] }}</div>
                </div>
            </div>
            <form action="" @submit.prevent="">
                <div class="container3">
                    <ion-item>
                        <ion-input type="number"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-button type="submit">
                            <ion-icon slot="icon-only" :icon="bag"></ion-icon>
                        </ion-button>
                    </ion-item>
                </div>
            </form>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonList, modalController, IonInput } from '@ionic/vue';
import { Ref, ref, onMounted } from 'vue'
import { bag } from 'ionicons/icons';
import { showLoading, showAlert } from '../../composables/loader';
import { Oferta } from '../../types';
import { getOfertaUser } from '../../APIService';

const cancel = () => modalController.dismiss(null, 'cancel')

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
    flex-flow: row wrap;
    gap: 10px;
}

.container3 {
    display: flex;
    flex-flow: row wrap;
}

.container3>ion-item{
    flex-grow: 1;
}

ion-item>ion-button{
    width:100%
}

.img_fons {
    height: 20vh;
    overflow: hidden;
}
</style>