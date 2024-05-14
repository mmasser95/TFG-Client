<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="modalController.dismiss(null, 'back')">
                    <ion-icon :icon="arrowBack"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Veure comanda</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="container" v-if="userType == 'client'">
            <div class="container-2">
                Establiment: {{comanda.establimentId.nom}}
            </div>
            <div class="container-2">
                Correu: {{comanda.establimentId.correu}}
            </div>
            <div class="container-2">
                
            </div>
        </div>
        <div class="container" v-else>
            <div class="container-2">
                Usuari: {{comanda.userId.nom}} {{comanda.userId.cognoms}}
            </div>
            <div class="container-2">
                Correu: {{ comanda.userId.correu }}
            </div>
            <div class="container-2"></div>
        </div>
        <div class="container">
            <comentariComponent :comandaId="comanda._id"/>
        </div>
        
    </ion-content>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import comentariComponent from '../../components/comentariComponent.vue';
import { arrowBack } from 'ionicons/icons';
import { Comanda } from '../../types';
import { useLoginStore } from '../../store/loginStore';
import { storeToRefs } from 'pinia'

const { userType } = storeToRefs(useLoginStore())

const props = defineProps<{
    comanda: Comanda
}>()

</script>
<style scoped>
.container{
    display: flex;
    gap:15px;
    flex-flow:column wrap;
    padding:16px
}
</style>