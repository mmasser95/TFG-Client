<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="cancel()">
                    <ion-icon slot="icon-only" :icon="close"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Registre Usuari</ion-title>
            <ion-buttons slot="end">
                <ion-button color="tertiary" @click="confirm">
                    <ion-icon slot="icon-only" :icon="checkmark"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <form @submit.prevent="confirm">
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Nom" v-model="state.nom" @ion-blur="v$.nom.$touch"
                                            :label-placement="labelPlacement"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.required.$invalid"
                                        message="El nom és obligatori" />
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.minLength.$invalid"
                                        message="La llargada del nom ha de ser minim 3 caràcters" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Cognoms" v-model="state.cognoms" @ion-blur="v$.cognoms.$touch"
                                            :label-placement="labelPlacement"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.cognoms.$error && v$.cognoms.required.$invalid"
                                        message="Els cognoms són obligatoris" />
                                    <ErrorMessage v-if="v$.cognoms.$error && v$.cognoms.minLength.$invalid"
                                        message="La llargada dels cognoms ha de ser minim 3 caràcters" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Email" type="email" v-model="state.correu"
                                            @ion-change="emailDisponible" @ion-blur="v$.correu.$touch"
                                            :label-placement="labelPlacement"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                                        message="Els correu és obligatori" />
                                    <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                                        message="El correu és invàlid" />
                                    <ErrorMessage v-if="emailDisponibleVar"
                                        message="El correu ja existeix per a un altre compte" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Telèfon" type="tel" v-model="state.telf"
                                            @ion-blur="v$.telf.$touch" :label-placement="labelPlacement"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.telf.$error && v$.telf.required.$invalid"
                                        message="Els telèfon és obligatori" />
                                    <ErrorMessage v-if="v$.telf.$error && v$.telf.numeric.$invalid"
                                        message="Aquest camp és numèric" />
                                    <ErrorMessage v-if="v$.telf.$error && v$.telf.minLength.$invalid"
                                        message="El telefon és invàlid" />
                                    <ErrorMessage v-if="v$.telf.$error && v$.telf.maxLength.$invalid"
                                        message="El telefon és invàlid" />

                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Data de naixement" type="date"
                                            @ion-blur="v$.data_naixement.$touch"
                                            v-model="state.data_naixement"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.data_naixement.$error && v$.data_naixement.required.$invalid"
                                        message="La data de naixement és obligatoria" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Contrasenya" type="password" v-model="state.contrasenya"
                                            @ion-blur="v$.contrasenya.$touch"
                                            :label-placement="labelPlacement"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.required.$invalid"
                                        message="La contrasenya és obligatoria" />
                                    <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.minLength.$invalid"
                                        message="La contrasenya és invàlida" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Repeteix la contrasenya" type="password"
                                            @ion-blur="v$.rcontrasenya.$touch" :label-placement="labelPlacement"
                                            v-model="state.rcontrasenya"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.rcontrasenya.$error && v$.rcontrasenya.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage v-if="v$.rcontrasenya.$error && v$.rcontrasenya.sameAs.$invalid"
                                        message="Aquesta contrasenya no és igual al camp anterior" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-button class="ion-hide" type="submit"></ion-button>
                            </ion-col>
                        </ion-row>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>

    </ion-content>

</template>
<script setup lang="ts">
import { IonHeader,IonIcon, IonContent, IonPage, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonButtons, IonTitle, IonInput, IonButton, alertController, modalController } from '@ionic/vue';
import { reactive, computed, ref } from 'vue';
import { checkmark,close } from 'ionicons/icons';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength, numeric } from '@vuelidate/validators'
import ErrorMessage from '../components/ErrorMessage.vue';
import { correuDisponible } from '../APIService/utils'

import { useDebounceFn } from '@vueuse/core'
const labelPlacement = "floating"
const presentAlert = async (prompt: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: prompt,
        buttons: ['Exit']
    })
    await alert.present()
}
const emailDisponibleVar = ref(false)

const state = reactive({
    nom: '',
    cognoms: '',
    correu: '',
    telf: '',
    data_naixement: '',
    contrasenya: '',
    rcontrasenya: ''
})

const computedContrasenya = computed(() => {
    return state.contrasenya
})

const emailDisponible = useDebounceFn(() => {
    if(!v$.value.correu.$invalid)
    correuDisponible(state.correu, (err, data) => {
        if (err) {
            emailDisponibleVar.value = true
            return false;
        }
        emailDisponibleVar.value = false
    })
}
    , 500)

const rules = {
    nom: { required, minLength: minLength(3) },
    cognoms: { required, minLength: minLength(3) },
    correu: { required, email, emailDisponible },
    telf: { required, minLength: minLength(9), maxLength: maxLength(9), numeric },
    data_naixement: { required },
    contrasenya: { required, minLength: minLength(8) },
    rcontrasenya: { required, sameAs: sameAs(computedContrasenya) }
}

const v$ = useVuelidate(rules, state);


const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = async () => {
    const valid = await v$.value.$validate();
    if (valid && (emailDisponibleVar.value == false))
        modalController.dismiss(state, 'confirm');
}


</script>
<style scoped></style>