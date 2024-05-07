<template>
    <ion-card @click="openComandaModal">
        <ion-card-header>
            <ion-card-title>Comanda feta a {{ comanda.establimentId.nom }}</ion-card-title>
            <ion-card-subtitle>fa
                {{ data }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <div class="container">
                Has comprat una quantitat de {{ comanda.quantitat }} per un preu total de
                {{ comanda.total }}€
            </div>
        </ion-card-content>
    </ion-card>

</template>
<script setup lang="ts">
import { IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, modalController } from '@ionic/vue';
import { Comanda } from '../types';
import { computed, ref, Ref } from 'vue';
import { parseISO, formatDistanceToNowStrict } from 'date-fns'
import { ca } from 'date-fns/locale'
import viewComanda from '../views/Comandes/viewComanda.vue';
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