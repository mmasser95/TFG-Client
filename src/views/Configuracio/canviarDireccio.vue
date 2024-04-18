<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Canviar direccio {{ userId }}</ion-title>
            <ion-buttons slot="end">
                <ion-button color="primary" @click="confirm">Confirmar</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <form @submit.prevent="confirm">
                        <ion-grid>
                            <ion-row>
                                <ion-col size="12" sizeXl="8">
                                    <ion-input label="Carrer" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.carrer.$touch" v-model="state.carrer"></ion-input>
                                    <ErrorMessage v-if="v$.carrer.$error && v$.carrer.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                                <ion-col size="6" sizeXl="2">
                                    <ion-input label="Numero" type="number" :label-placement="labelPlacement"
                                        @ion-blur="v$.numero.$touch" v-model="state.numero"></ion-input>
                                    <ErrorMessage v-if="v$.numero.$error && v$.numero.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage v-if="v$.numero.$error && v$.numero.numeric.$invalid"
                                        message="Aquest camp unicament pot contenir numeros" />
                                </ion-col>
                                <ion-col size="6" sizeXl="2">
                                    <ion-input label="CP" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.CP.$touch" v-model="state.CP"></ion-input>
                                    <ErrorMessage v-if="v$.CP.$error && v$.CP.required.$invalid"
                                        message="Aquest camp és obligatori. " />
                                    <ErrorMessage v-if="v$.CP.$error && v$.CP.numeric.$invalid"
                                        message="Aquest camp ha de contenir numeros. " />
                                    <ErrorMessage
                                        v-if="v$.CP.$error && (v$.CP.minLength.$invalid || v$.CP.maxLength.$invalid)"
                                        message="Aquest camp ha de contenir 5 numeros. " />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Població" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.poblacio.$touch" v-model="state.poblacio"></ion-input>
                                    <ErrorMessage v-if="v$.poblacio.$error && v$.poblacio.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Provincia" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.provincia.$touch" v-model="state.provincia"></ion-input>
                                    <ErrorMessage v-if="v$.provincia.$error && v$.provincia.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script lang="ts" setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, IonInput, modalController } from '@ionic/vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, numeric } from '@vuelidate/validators';
import { reactive } from 'vue'
import { useLoginStore } from '../../store/loginStore';
import { storeToRefs } from 'pinia';

const store = useLoginStore()
const { userId } = store
const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = () => modalController.dismiss(null, 'confirm')
const labelPlacement = 'floating'
const state = reactive({
    carrer: '',
    numero: 1,
    CP: 0,
    poblacio: '',
    provincia: '',
})
const rules = {
    carrer: { required },
    numero: { required, numeric },
    CP: { required, numeric },
    poblacio: { required },
    provincia: { required }
}
const v$ = useVuelidate(rules, state)

</script>
<style></style>