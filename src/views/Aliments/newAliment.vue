<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel">
                    <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button @click="confirm">
                    <ion-icon :icon="checkmark" slot="icon-only"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center" v-if="!aliment">Crear Aliment</ion-title>
            <ion-title class="ion-text-center" v-if="aliment">Editar Aliment</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <form @submit.prevent="confirm">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-input v-model="state.nom" :label-placement="labelPlacement" type="text"
                                label="Nom"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <ion-select :label-placement="labelPlacement" label="Tipus" v-model="state.tipus">
                                <ion-select-option value="Verdura">Verdura</ion-select-option>
                                <ion-select-option value="Fruita">Fruita</ion-select-option>
                                <ion-select-option value="Carn">Carn</ion-select-option>
                                <ion-select-option value="Peix">Peix</ion-select-option>
                                <ion-select-option value="Fleca">Fleca</ion-select-option>
                                <ion-select-option value="Làctics">Làctics</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-input type="number" :label-placement="labelPlacement" label="Quantitat"
                                v-model="state.temps_defecte_conservacio"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <ion-select label="Unitat" v-model="state.t_unitat" :label-placement="labelPlacement">
                                <ion-select-option value="dies">Dies</ion-select-option>
                                <ion-select-option value="setmanes">Setmanes</ion-select-option>
                                <ion-select-option value="mesos">Mesos</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </form>
    </ion-content>
</template>
<script setup lang="ts">
import { IonSelect, IonSelectOption, IonInput, IonPage, modalController, IonHeader, IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonCard, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem, IonText, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonTextarea, IonChip } from '@ionic/vue'
import { checkmark, trash, add, arrowBack } from 'ionicons/icons'
import { ref, Ref, reactive, computed, onMounted, watch } from 'vue'
import { Aliment } from '../../types';
import { showAlert } from '@/composables/loader'
import { createAliment, updateAliment, deleteAliment } from '../../APIService/aliments'

const labelPlacement = "floating"
const props = defineProps<{ aliment?: Aliment }>()


const confirm = () => {

    if (!props.aliment) {
        createAliment(state, (err, data) => {
            if (err) return true
        })
    } else {
        updateAliment(props.aliment._id, state, (err: any, data: any) => {
            if (err) return true
        })
    }
    modalController.dismiss(state, 'confirm')
}
const cancel = () => modalController.dismiss(null, 'cancel')

const state = reactive({
    nom: '',
    tipus: '',
    temps_defecte_conservacio: 1,
    t_unitat: ''
})

onMounted(() => {
    if (props.aliment) {
        state.nom = props.aliment.nom
        state.tipus = props.aliment.tipus
        state.temps_defecte_conservacio = props.aliment.temps_defecte_conservacio
        state.t_unitat = props.aliment.t_unitat
    }
})
</script>
<style scoped></style>