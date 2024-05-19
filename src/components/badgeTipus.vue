<template>
    <ion-badge v-if="tipus == 'restaurant'" color="warning">Restaurant</ion-badge>
    <ion-badge v-if="tipus == 'supermercat'||tipus=='establiment'" color="secondary">Supermercat</ion-badge>
    <ion-badge v-if="tipus == 'fleca'" color="tertiary">Fleca</ion-badge>
    <ion-badge v-if="tipus == 'peixateria'" color="primary">Peixateria</ion-badge>
    <ion-badge v-if="tipus == 'carnisseria'" color="danger">Carnisseria</ion-badge>
    <ion-badge v-if="tipus == 'fruiteria_verduleria'" color="success">Fruiteria/Verduleria</ion-badge>


</template>
<script lang="ts" setup>
import { IonBadge } from '@ionic/vue';
const props = defineProps<{
    tipus: string
}>()
</script>