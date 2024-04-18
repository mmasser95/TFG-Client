<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">{{ title }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm">Confirm</ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-toolbar>
            <ion-searchbar autocapitalize="off" autocomplete="name" @ion-input="searchbarInput($event)"></ion-searchbar>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-list>
            <ion-radio-group v-model="alimentSelected" @ion-change="confirm">
                <ion-item v-for="aliment in filteredItems" :key="aliment._id">
                    <ion-radio :value="aliment._id">{{ aliment.nom }}</ion-radio>
                </ion-item>
            </ion-radio-group>
        </ion-list>
    </ion-content>
</template>
<script lang="ts" setup>
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonSearchbar, IonContent, IonList, IonItem, IonRadio, IonRadioGroup, modalController, SearchbarCustomEvent } from '@ionic/vue';
import { ref, Ref } from 'vue'
import { Aliment } from '../types';

const alimentSelected: Ref<Aliment | null> = ref(null)
const filteredItems: Ref<Aliment[] | null> = ref(null)

let props = defineProps<{
    items: Aliment[],
    title: string
}>();

const cancel = () => {
    modalController.dismiss(null, 'cancel')
}

const confirm = () => {
    modalController.dismiss(alimentSelected, 'confirm')
}

const searchbarInput = (event: SearchbarCustomEvent) => {
    if (event.target.value)
        filterList(event.target.value)
}

const filterList = (searchQuery: string | undefined) => {
    if (searchQuery == undefined) {
        filteredItems.value = [...props.items]
    } else {
        const normQuery = searchQuery.toLowerCase()
        filteredItems.value = props.items.filter(item => item.nom.toLowerCase().includes(normQuery))
    }
}
</script>
<style></style>