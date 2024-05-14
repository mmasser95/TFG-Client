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
            <ion-grid>
                <form @submit.prevent="confirm">
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-input labelPlacement="floating" label="Nom" v-model="state.nom"
                                    @ion-blur="v$.nom.$touch"></ion-input>
                            </ion-item>
                            <ErrorMessage v-if="v$.nom.$error && v$.nom.required.$invalid"
                                message="Aquest camp és obligatori" />
                            <ErrorMessage v-if="v$.nom.$error && v$.nom.minLength.$invalid"
                                message="Aquest ha de tenir minim 3 caràcters" />
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-input type="number" label="Preu" labelPlacement="floating" v-model="state.preu"
                                    @ion-blur="v$.preu.$touch"></ion-input>
                            </ion-item>
                            <ErrorMessage v-if="v$.preu.$error && v$.preu.required.$invalid"
                                message="Aquest camp és obligatori" />
                            <ErrorMessage v-if="v$.preu.$error && v$.preu.minValue.$invalid"
                                message="Aquest camp ha de ser com mínim 1 €" />
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-input label="Descripció" labelPlacement="floating" v-model="state.descripcio"
                                    @ion-blur="v$.descripcio.$touch"></ion-input>
                            </ion-item>
                            <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.required.$invalid"
                                message="Aquest camp és obligatori" />
                            <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.minLength.$invalid"
                                message="Aquest ha de tenir minim 10 caràcters" />
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="12" sizeXl="6">
                            <ion-item>
                                <ion-input type="number" label-Placement="floating" label="Quantitat disponible"
                                    v-model="state.quantitatDisponible"
                                    @ion-blur="v$.quantitatDisponible.$touch"></ion-input>
                            </ion-item>
                            <ErrorMessage
                                v-if="v$.quantitatDisponible.$error && v$.quantitatDisponible.required.$invalid"
                                message="Aquest camp és obligatori" />
                            <ErrorMessage
                                v-if="v$.quantitatDisponible.$error && v$.quantitatDisponible.minValue.$invalid"
                                message="Aquest camp ha de ser com mínim 1 " />
                        </ion-col>
                        <ion-col size="12" sizeXl="6">
                            <ion-item>
                                <ion-checkbox v-model="state.active">Oferta activa?</ion-checkbox>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="12" sizeXl="6">
                            <ion-item>
                                <input type="file">
                            </ion-item>
                        </ion-col>
                        <ion-col size="12" sizeXl="6">
                            <ion-item>
                                <ion-select v-model="state.categoria" @ion-blur="v$.categoria.$touch"
                                    labelPlacement="floating" label="Tipus">
                                    <ion-select-option>Fruiteria</ion-select-option>
                                    <ion-select-option>Supermercat</ion-select-option>
                                    <ion-select-option>Restaurant</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.required.$invalid"
                                message="Aquest camp és obligatori" />
                        </ion-col>
                    </ion-row>


                    <input v-show="false" type="submit"></input>
                </form>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonButtons, IonHeader, IonToolbar, IonRow, IonCol, IonTitle, IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/vue'
import { ref, reactive, computed, defineProps, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, minValue, numeric } from '@vuelidate/validators'
import { modalController } from '@ionic/core'

import { getOferta } from '../../APIService/ofertes'
import ErrorMessage from '../../components/ErrorMessage.vue'

const props = defineProps({
    update: String
})

const state = reactive({
    nom: '',
    descripcio: '',
    preu: 0.0,
    quantitatDisponible: 0,
    active: false,
    categoria: ''
})

const rules = {
    nom: { required, minLength: minLength(3) },
    descripcio: { required, minLength: minLength(10) },
    preu: { required, minValue: minValue(1), },
    quantitatDisponible: { required, minValue: minValue(1), },
    categoria: { required }
}

const v$ = useVuelidate(rules, state);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = async () => {
    const valid = await v$.value.$validate();
    if (valid)
        modalController.dismiss(state, 'confirm');

}

onMounted(() => {
    if (props.update != undefined) {
        if (props.update !== '') {
            getOferta(props.update, (err: any, data: any) => {
                if (err) return
                state.nom = data.oferta.nom
                state.descripcio = data.oferta.descripcio;
                state.preu = data.oferta.preu;
                state.quantitatDisponible = data.oferta.quantitatDisponible
                state.active = data.oferta.active
                state.categoria = data.oferta.categoria
            })
        }
    }
})

</script>
<style></style>