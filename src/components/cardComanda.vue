<template>
    <ion-card @click="openComandaModal" class="ion-activatable">
        <ion-ripple-effect></ion-ripple-effect>
        <ion-card-header>
            <ion-card-title v-if="userType == 'client'">Comanda feta a {{ comanda.establimentId.nom }}</ion-card-title>
            <ion-card-title v-else>Comanda feta per {{ comanda.userId.nom }} {{ comanda.userId.cognoms }}</ion-card-title>

            <ion-card-subtitle>fa
                {{ data }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <div class="container" v-if="userType == 'client'">
                Has comprat una quantitat de {{ comanda.quantitat }} unitat/s per un preu total de
                {{ comanda.total }}€
            </div>
            <div class="container" v-else>
                El client ha comprat una quantitat de {{ comanda.quantitat }} unitat/s per un preu total de
                {{ comanda.total }}€ <div v-if="comanda.oferta">de l'oferta {{ comanda.oferta.nom }}</div>
            </div>
        </ion-card-content>
    </ion-card>

</template>
<script setup lang="ts">
import { IonItem, IonCard, IonCardContent, IonRippleEffect, IonCardHeader, IonCardTitle, IonCardSubtitle, modalController } from '@ionic/vue';
import { Comanda } from '../types';
import { computed, ref, Ref } from 'vue';
import { parseISO, formatDistanceToNowStrict } from 'date-fns'
import { ca } from 'date-fns/locale'
import { useLoginStore } from '../store/loginStore';
import viewComanda from '../views/Comandes/viewComanda.vue';
import { storeToRefs } from 'pinia'
const { userType } = storeToRefs(useLoginStore())

const props = defineProps<{ comanda: Comanda }>()
const data = computed(() => formatDistanceToNowStrict(parseISO(props.comanda.data), { locale: ca }))

const openComandaModal = async () => {
    const modal = await modalController.create({
        component: viewComanda,
        componentProps: {
            comanda: props.comanda
        }
    })
    modal.present()
}

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
}
</style>