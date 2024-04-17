<template>
    <ion-grid>
        <ion-row>
            <ion-col></ion-col>
        </ion-row>
        <ion-row>
            <ion-col></ion-col>
        </ion-row>
        <ion-row>
            <ion-col></ion-col>
        </ion-row>
    </ion-grid>
</template>
<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonButton, IonButtons } from '@ionic/vue';
interface Element {
    _id: string,
    data_compra: string,
    data_caducitat: string,
}
const props = defineProps<{
    element: Element
}>();
</script>
<style></style>