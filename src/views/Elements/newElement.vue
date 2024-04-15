<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Crear element</ion-title>
            <ion-buttons slot="end">
                <ion-button color="primary" @click="confirm">Crear</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <form @submit.prevent="confirm">
            <ion-grid>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <ion-select label="Categoria" :label-placement="labelPlacement" @ion-change="fillAliments"
                            v-model="data.categoria">
                            <ion-select-option v-for="(i, k) in categories" :key='k' :value="i">{{ i
                                }}</ion-select-option>
                        </ion-select>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-select label="Aliment" :label-placement="labelPlacement" v-model="data.aliment">
                            <ion-select-option v-for="(i, k) in aliments" :key="k" :value="i._id">{{ i.nom
                                }}</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <ion-input type="date" label="Data de compra" :label-placement="labelPlacement"></ion-input>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-input type="date" label="Data de caducitat" :label-placement="labelPlacement"></ion-input>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <ion-input label="Quantitat" type="number" :label-placement="labelPlacement"></ion-input>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-select label="Unitat" :label-placement="labelPlacement">
                            <ion-select-option v-for="(i, k) in unitats_quantitat" :value="i" :key="k">{{ i
                                }}</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-input class="ion-hide" type="submit">Provaa</ion-input>
        </form>
    </ion-content>
</template>
<script setup lang="ts">
import { IonHeader, IonContent, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, modalController, IonSelect, IonSelectOption } from '@ionic/vue';
import { Ref, ref, reactive, defineProps, onMounted, } from 'vue';

import { getArticleCategories, getAllAlimentsByTipus } from '@/APIService';

const labelPlacement = 'floating'

interface Aliment {
    _id: string,
    nom: string
}

const data = reactive({
    categoria: '',
    aliment: '',
    data_compra: '',
    data_caducitat: '',
    quantitat: 0,
    q_unitat: ''

})

const aliments: Ref<Aliment[] | undefined> = ref([]);

const categories = ref([])
const unitats_quantitat = ref(['kg', 'g', 'l', 'unitats'])

const getCategories = () => {
    getArticleCategories()
        .then((result) => {
            categories.value = result.data.tipus
        })
        .catch((err) => {
            console.log(err);
        });
}

const fillAliments = () => {
    getAllAlimentsByTipus(data.categoria).then((result) => {
        aliments.value = result.data.aliments
    }).catch((err) => {
        console.log('err :>> ', err);
    });
}


const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = () => modalController.dismiss(data, 'confirm')

onMounted(() => getCategories())

</script>
<style></style>