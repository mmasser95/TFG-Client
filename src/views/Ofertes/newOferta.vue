<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title v-if="props.update == ''" class="ion-text-center">Nova Oferta</ion-title>
                <ion-title v-if="props.update != ''" class="ion-text-center">Editar Oferta</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="confirm()">Confirma</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-input label="Descripció" labelPlacement="floating" v-model="state.descripcio"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="number" label="Preu" labelPlacement="floating" v-model="state.preu"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input type="text" label="Establiment" labelPlacement="floating"
                        v-model="state.establiment"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-select v-model="state.divisa" label="Divisa" labelPlacement="floating">
                        <ion-select-option>EUR</ion-select-option>
                        <ion-select-option>USD</ion-select-option>
                        <ion-select-option>JPY</ion-select-option>
                        <ion-select-option>BTC</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-button expand="block" @click="doNewOferta">Guardar</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { ref, reactive, computed, defineProps, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, minValue, numeric } from '@vuelidate/validators'
import { modalController } from '@ionic/core'
import { getOferta } from '../../APIService'

const props = defineProps({
    update: String
})

const state = reactive({
    descripcio: '',
    preu: 0.0,
    establiment: '',
    divisa: ''
})

const rules = {
    descripcio: { required, minLength: minLength(20) },
    preu: { required, minValue: minValue(0), numeric },
    establiment: { required },
    divisa: { required }
}

const v$ = useVuelidate(rules, state);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss(state, 'confirm');

onMounted(() => {
    if (props.update != undefined) {
        if (props.update !== '') {
            getOferta(props.update)
                .then((res) => {
                    state.descripcio = res.data.oferta.descripcio;
                    state.preu = res.data.oferta.preu;
                    state.divisa = res.data.oferta.divisa;
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
})

</script>
<style></style>