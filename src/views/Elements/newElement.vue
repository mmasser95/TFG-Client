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
                            v-model="info.categoria">
                            <ion-select-option v-for="(i, k) in categories" :key='k' :value="i">{{ i
                                }}</ion-select-option>
                        </ion-select>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-select label="Aliment" :label-placement="labelPlacement" v-model="info.aliment">
                            <ion-select-option v-for="(i, k) in aliments" :key="k" :value="i._id">{{ i.nom
                                }}</ion-select-option>
                        </ion-select>
                        <ion-item :button="true" :detail="false" @click="openCercadorAliments">
                            <ion-label>Aliment</ion-label>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <ion-input type="date" label="Data de compra" :label-placement="labelPlacement"
                            v-model="info.data_compra"></ion-input>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-input type="date" label="Data de caducitat" :label-placement="labelPlacement"
                            v-model="info.data_caducitat"></ion-input>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <ion-input label="Quantitat" type="number" v-model="info.quantitat"
                            :label-placement="labelPlacement"></ion-input>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-select label="Unitat" :label-placement="labelPlacement" v-model="info.q_unitat">
                            <ion-select-option v-for="(i, k) in unitats_quantitat" :value="i" :key="k">{{ i
                                }}</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <input class="ion-hide" type="submit">Provaa</input>
        </form>
    </ion-content>
</template>
<script setup lang="ts">
import { IonLabel, IonHeader, IonContent, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, modalController, IonSelect, IonSelectOption } from '@ionic/vue';
import { Ref, ref, reactive, defineProps, onMounted, } from 'vue';

import { getArticleCategories, getAllAlimentsByTipus } from '@/APIService';

import cercadorAliments from '../../components/cercadorAliments.vue';

const openCercadorAliments = async () => {
    const modal = await modalController.create({
        component: cercadorAliments,
        componentProps: {
            title: 'Cercar aliments',
            items: aliments.value
        }
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm')
        info.aliment = data

}


const labelPlacement = 'floating'

interface Aliment {
    _id: string,
    nom: string
}

const info = reactive({
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
    getAllAlimentsByTipus(info.categoria).then((result) => {
        aliments.value = result.data.aliments
    }).catch((err) => {
        console.log('err :>> ', err);
    });
}


const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = () => modalController.dismiss(info, 'confirm')

onMounted(() => getCategories())

</script>
<style></style>