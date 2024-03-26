<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Registre establiment</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm()">confirm</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <form @submit.prevent="confirm()">
                        <ion-grid>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Nom" :label-placement="labelPlacement"
                                            v-model="state.nom"></ion-input>
                                        <span v-if="v$.nom">Error</span>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Cognoms" :label-placement="labelPlacement"
                                            v-model="state.cognoms"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-input label="Correu" :label-placement="labelPlacement"
                                            v-model="state.correu"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Contrasenya" :label-placement="labelPlacement"
                                            v-model="state.contrasenya"></ion-input>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Repeteix la contrasenya" :label-placement="labelPlacement"
                                            v-model="state.contrasenya"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-item>
                                        <ion-textarea label="Descripció" :label-placement="labelPlacement"
                                            v-model="state.descripcio"></ion-textarea>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Telèfon" type="tel" :label-placement="labelPlacement"
                                            v-model="state.telf"></ion-input>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Horari" type="text" :label-placement="labelPlacement"
                                            v-model="state.horari"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <ion-input label="Web" type="text" :label-placement="labelPlacement"
                                            v-model="state.web"></ion-input>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-item>
                                        <input type="file">
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, modalController, IonTextarea } from '@ionic/vue';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, email, sameAs, minValue } from '@vuelidate/validators';
import { reactive } from 'vue';
const labelPlacement = "floating"
const state = reactive({
    nom: "",
    correu: "",
    contrasenya: "",
    rcontrasenya: "",
    descripcio: "",
    tipus: "establiment",
    horari: "",
    telf: "",
    web: "",
    image: ""
});

const rules = {
    nom: { required, minLength: minLength(3) },
    correu: { required, email },
    contrasenya: { required, minLength: minLength(8) },
    rcontrasenya: { sameAs: sameAs('contrasenya') },
    descripcio: { required, minLength: minLength(20) }
}

const v$ = useVuelidate(rules, state)

const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = () => {
    if (!v$.value.$invalid) {
        modalController.dismiss(state, 'confirm')
    }
}
</script>
<style></style>