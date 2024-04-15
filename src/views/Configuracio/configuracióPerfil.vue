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
                            <ion-item>
                                <ion-input label="Nom" v-model="state.nom"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Cognoms" v-model="state.cognoms"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Email" type="email" v-model="state.correu"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Telefon" type="tel" v-model="state.telf"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Data de naixement" type="date"
                                    v-model="state.data_naixement"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Contrasenya" type="password" v-model="state.contrasenya"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Repeteix la contrassenya" type="password"
                                    v-model="state.rcontrasenya"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-button expand="block" type="submit">Submit</ion-button>
                            </ion-item>
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
import { required, email, minLength, sameAs, minValue } from '@vuelidate/validators';


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
    telf: { required, minLength: minLength(9) },
    data_naixement: { required },
    contrasenya: { required, minLength: minLength(8) },
    rcontrasenya: { required, sameAs: sameAs('contrasenya') }
}

const v$ = useVuelidate(rules, state);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss(null, 'confirm');

</script>
<style></style>