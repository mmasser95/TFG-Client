<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Configurar perfil</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="confirm()">Confirmar</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <form @submit.prevent="confirm()">
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Nom" @ion-blur="v$.nom.$touch" v-model="state.nom"
                                                :label-placement="labelPlacement"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.nom.$error && v$.nom.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                                            message="El correu electrònic no és valid" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Cognoms" @ion-blur="v$.cognoms.$touch" v-model="state.cognoms"
                                                :label-placement="labelPlacement"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                                            message="El correu electrònic no és valid" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                    
                                        <ion-item>
                                            <ion-input label="Correu" type="email" @ion-blur="v$.correu.$touch"
                                                v-model="state.correu" :label-placement="labelPlacement"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                                            message="El correu electrònic no és valid" />
                                </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Telèfon" type="tel" @ion-blur="v$.telf.$touch"
                                                v-model="state.telf" :label-placement="labelPlacement"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.telf.$error && v$.telf.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                            <ErrorMessage v-if="v$.telf.$error && v$.telf.numeric.$invalid"
                                            message="Aquest camp ha de ser numèric" />
                                        <ErrorMessage v-if="v$.telf.$error && v$.telf.minLength.$invalid"
                                            message="Aquest camp ha de tenir 9 caràcters" />
                                        <ErrorMessage v-if="v$.telf.$error && v$.telf.maxLength.$invalid"
                                            message="Aquest camp ha de tenir 9 caràcters" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Data de naixement" type="date"
                                                @ion-blur="v$.data_naixement.$touch" v-model="state.data_naixement"
                                                :label-placement="labelPlacement"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.data_naixement.$error && v$.data_naixement.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-button class="ion-hide" expand="block" type="submit">Submit</ion-button>
                        </form>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script lang="ts" setup>
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonButton, IonTitle, IonGrid, IonRow, IonCol, modalController, IonList, IonInput, IonItem } from '@ionic/vue';
import { reactive } from 'vue';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs,numeric, minValue } from '@vuelidate/validators';

const labelPlacement = "floating"

import ErrorMessage from '@/components/ErrorMessage.vue'

const state = reactive({
    nom: '',
    cognoms: '',
    correu: '',
    telf: '',
    data_naixement: '',
    contrasenya: '',
    rcontrasenya: ''
})

const rules = {
    nom: { required, minLength: minLength(3) },
    cognoms: { required, minLength: minLength(3) },
    correu: { required, email },
    telf: { required, minLength: minLength(9), maxLength: maxLength(9),numeric },
    data_naixement: { required },
    contrasenya: { required, minLength: minLength(8) },
    rcontrasenya: { required, sameAs: sameAs('contrasenya') }
}

const v$ = useVuelidate(rules, state);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss(null, 'confirm');

</script>
<style></style>