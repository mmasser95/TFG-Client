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
                    <ion-col>
                        <div class="container" v-if="comandes">
                            <ion-item v-for="i in comandes">
                                <cardComanda :comanda="i"></cardComanda>
                            </ion-item>
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
import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/vue'
import { Comanda } from '../../types';
import { Ref, ref } from 'vue';
import cardComanda from '../../components/cardComanda.vue';

const comandes: Ref<Comanda[] | null> = ref(null)

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
}
</style>