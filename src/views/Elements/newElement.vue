<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Crear element</ion-title>
            <ion-buttons slot="end">
                <ion-button color="primary" @click="confirm">Crear</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-select label="Categoria">
                <ion-select-option v-for="(i,k) in categories" :value="i" :key="k">{{ i }}</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-select label="Article">
                <ion-select-option></ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-input label="Data de compra" type="date"></ion-input>
        </ion-item>
        <ion-item>
            <ion-input label="Duració aprox."></ion-input>
            <ion-select>
                <ion-select-option v-for="(i,k) in categoriesTemps" :value="i" :key="k">{{ i }}</ion-select-option>
            </ion-select>
        </ion-item>
    </ion-content>
</template>
<script setup lang="ts">
import { IonHeader, IonContent, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, modalController, IonSelect, IonSelectOption } from '@ionic/vue';
import { ref, reactive, defineProps, } from 'vue';

import { getArticleCategories } from '@/APIService';

const data = reactive({})

const categories = ref([])
const categoriesTemps=ref(['Dies', 'Setmanes', 'Mesos'])

const getCategories = () => {
    getArticleCategories()
        .then((result) => {
            categories.value = result.data.tipus
        })
        .catch((err) => {
            console.log(err);
        });
}

const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = () => modalController.dismiss(data, 'confirm')

getCategories()

</script>
<style></style>