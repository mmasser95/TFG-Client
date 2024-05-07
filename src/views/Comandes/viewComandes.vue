<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center"> Veure comandes </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8" sizeLg="10">
                        <div class="container" v-if="comandes">
                            <cardComanda v-for="i in comandes" class="item" :comanda="i"></cardComanda>

                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col></ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import { Comanda } from '../../types';
import { Ref, onMounted, ref } from 'vue';
import cardComanda from '../../components/cardComanda.vue';
import { getAllComandes } from '../../APIService';
import { showLoading } from '../../composables/loader';
const comandes: Ref<Comanda[] | null> = ref(null)

const fillComandes = async () => {
    const loader = await showLoading('Carregant comandes')
    loader.present()
    getAllComandes().then((res) => {
        console.log('res.data :>> ', res.data);
        comandes.value = res.data.comandes
    }).catch((err) => {
        console.log('err :>> ', err.response);
    }).finally(() => loader.dismiss());
}

onMounted(() => {
    fillComandes()
})

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center
}

.item {
    /*flex-grow:1*/
    flex-grow: 1;
    max-width:200px
}
</style>