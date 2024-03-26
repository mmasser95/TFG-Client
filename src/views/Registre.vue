<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Registre Usuari</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm()">Confirm</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>

            <ion-row>
                <ion-col>
                    <form @submit.prevent="confirm()">
                        <ion-item>
                            <ion-input label="Nom" v-bind="state.nom"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Cognoms" v-bind="state.cognoms"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Email" type="email" v-bind="state.correu"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Telefon" type="tel" v-bind="state.telf"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Data de naixement" type="date" v-bind="state.data_naixement"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Contrasenya" type="password" v-bind="state.contrasenya"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Repeteix la contrassenya" type="password"
                                v-bind="state.rcontrasenya"></ion-input>
                        </ion-item>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>

    </ion-content>

</template>
<script setup lang="ts">
import { IonHeader, IonContent, IonPage, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonButtons, IonTitle, IonInput, IonButton, alertController, modalController } from '@ionic/vue';
import { reactive } from 'vue';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

import { useRouter } from 'vue-router';

import { dosignIn } from '../APIService';

const presentAlert = async (prompt: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: prompt,
        buttons: ['Exit']
    })
    await alert.present()
}

const router = useRouter();

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
const confirm = () => modalController.dismiss(state, 'confirm');

const signIn = () => {
    dosignIn(state)
        .then((res) => {
            presentAlert("T'has registrat al sistema correctament")
            router.push('/login')
        }).catch((err) => {
            presentAlert(err);
        });
}

</script>
<style></style>