<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center">Gestionar Aliments</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8"></ion-col>
                    <ion-col>
                        <ion-select label-placement="floating" label="Tipus" v-model="filterTipus">
                            <ion-icon :icon="filter" slot="start"></ion-icon>
                            <ion-select-option value="">Tots</ion-select-option>
                            <ion-select-option value="Verdura">Verdura</ion-select-option>
                            <ion-select-option value="Fruita">Fruita</ion-select-option>
                            <ion-select-option value="Carn">Carn</ion-select-option>
                            <ion-select-option value="Peix">Peix</ion-select-option>
                            <ion-select-option value="Fleca">Fleca</ion-select-option>
                            <ion-select-option value="Làctics">Làctics</ion-select-option>

                        </ion-select>
                    </ion-col>
                    <ion-col size="12" sizeXl="2"></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="10">
                        <div class="container">
                            <div class="item" v-for="aliment in filteredAliments" :key="aliment._id">
                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-title>{{ aliment.nom }}</ion-card-title>
                                        <ion-card-subtitle>{{ aliment.tipus }}</ion-card-subtitle>
                                    </ion-card-header>
                                    <ion-card-content>
                                        <div>Temps de conservació: {{ aliment.temps_defecte_conservacio }} {{
                            aliment.t_unitat }}</div>
                                        <div class="container-btns">
                                            <ion-button @click="openModalUpdate(aliment)">
                                                <ion-icon slot="icon-only" :icon="pencil"></ion-icon>
                                            </ion-button>
                                            <ion-button @click="eliminarAliment(aliment._id)">
                                                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                            </ion-button>
                                        </div>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-fab id="addBtn" ref="addButton" slot="fixed" horizontal="end">
            <ion-fab-button @click="openModalCreate">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, modalController, IonSelect, IonSelectOption, IonHeader, IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonCard, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem, IonText, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonTextarea, IonChip } from '@ionic/vue'
import { pencil, trash, add, filter } from 'ionicons/icons'
import { ref, Ref, computed, onMounted, watch } from 'vue'

import { getAllAliments } from '../../APIService/aliments'
import { Aliment } from '../../types'
import { showAlert, showLoading } from '../../composables/loader'
import { deleteAliment } from '../../APIService/aliments'
import newAliment from './newAliment.vue'
const aliments: Ref<Aliment[]> = ref([])

const filterTipus = ref('')
const filteredAliments = computed(() => {
    if (filterTipus.value != "")
        return aliments.value.filter((el) => el.tipus == filterTipus.value)
    else
        return aliments.value


})
const fillAliments = async () => {
    let loading = await showLoading("Carregant aliments")
    loading.present()
    getAllAliments((err: any, data: any) => {
        loading.dismiss()
        if (err) return true
        aliments.value = data.aliments
    })
}
const openModalCreate = async () => {
    let modal = await modalController.create({
        component: newAliment
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss()
    if (role == "confirm")
        fillAliments()

}
const openModalUpdate = async (aliment: any) => {
    let modal = await modalController.create({
        component: newAliment,
        componentProps: {
            aliment: aliment
        }
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss()
    if (role == "confirm")
        fillAliments()

}

const eliminarAliment = (alimentId: any) => {
    deleteAliment(alimentId, (err, res) => {
        if (err) return true
        fillAliments()
    })
}

onMounted(() => {
    fillAliments()
})
</script>
<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 15px
}

.container-btns {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: flex-end;
}
</style>