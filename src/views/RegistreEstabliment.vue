<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">Registre establiment</ion-title>
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
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-input label="Nom" :label-placement="labelPlacement" v-model="state.nom"
                                        @ion-blur="v$.nom.$touch"></ion-input>
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.minLength.$invalid"
                                        message="Aquest ha de tenir minim 3 caràcters" />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <ion-input label="Correu" :label-placement="labelPlacement" v-model="state.correu"
                                        @ion-blur="v$.correu.$touch"></ion-input>
                                    <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                                        message="Correu invàlid" />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Contrasenya" :label-placement="labelPlacement" type="password"
                                        @ion-blur="v$.contrasenya.$touch" v-model="state.contrasenya"></ion-input>
                                    <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.minLength.$invalid"
                                        message="Mínim 8 caràcters" />
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Repeteix la contrasenya" :label-placement="labelPlacement"
                                        type="password" @ion-blur="v$.rcontrasenya.$touch"
                                        v-model="state.rcontrasenya"></ion-input>
                                    <ErrorMessage v-if="v$.rcontrasenya.$error && v$.rcontrasenya.required.$invalid"
                                        message="Aquest camp és obligatori " />
                                    <ErrorMessage v-if="v$.rcontrasenya.$error && v$.rcontrasenya.sameAs.$invalid"
                                        message="Aquest camp ha de ser igual a l'anterior " />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-textarea label="Descripció" :label-placement="labelPlacement"
                                        @ion-blur="v$.descripcio.$touch" v-model="state.descripcio"></ion-textarea>
                                    <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.minLength.$invalid"
                                        message="Aquest camp ha de tinir mínim 20 caràcters" />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Telèfon" type="tel" :label-placement="labelPlacement"
                                        @ion-blur="v$.telf.$touch" v-model="state.telf"></ion-input>
                                    <ErrorMessage v-if="v$.telf.$error && v$.telf.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage
                                        v-if="v$.telf.$error && (v$.telf.minLength.$invalid || v$.telf.maxLength.$invalid || v$.telf.numeric.$invalid)"
                                        message="Aquest camp ha de tinir mínim 9 caràcters. Únicament escriu el telf sense prefix ni espais." />
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Horari" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.horari.$touch" v-model="state.horari"></ion-input>
                                    <ErrorMessage v-if="v$.horari.$error && v$.horari.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Web" type="text" :label-placement="labelPlacement"
                                        v-model="state.web"></ion-input>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <input type="file">
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="8">
                                    <ion-input label="Carrer" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.direccio.carrer.$touch"
                                        v-model="state.direccio.carrer"></ion-input>
                                    <ErrorMessage
                                        v-if="v$.direccio.carrer.$error && v$.direccio.carrer.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                                <ion-col size="6" sizeXl="2">
                                    <ion-input label="Numero" type="number" :label-placement="labelPlacement"
                                        @ion-blur="v$.direccio.numero.$touch"
                                        v-model="state.direccio.numero"></ion-input>
                                    <ErrorMessage
                                        v-if="v$.direccio.numero.$error && v$.direccio.numero.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                    <ErrorMessage
                                        v-if="v$.direccio.numero.$error && v$.direccio.numero.numeric.$invalid"
                                        message="Aquest camp unicament pot contenir numeros" />
                                </ion-col>
                                <ion-col size="6" sizeXl="2">
                                    <ion-input label="CP" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.direccio.CP.$touch" v-model="state.direccio.CP"></ion-input>
                                    <ErrorMessage v-if="v$.direccio.CP.$error && v$.direccio.CP.required.$invalid"
                                        message="Aquest camp és obligatori. " />
                                    <ErrorMessage v-if="v$.direccio.CP.$error && v$.direccio.CP.numeric.$invalid"
                                        message="Aquest camp ha de contenir numeros. " />
                                    <ErrorMessage
                                        v-if="v$.direccio.CP.$error && (v$.direccio.CP.minLength.$invalid || v$.direccio.CP.maxLength.$invalid)"
                                        message="Aquest camp ha de contenir 5 numeros. " />
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Població" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.direccio.poblacio.$touch"
                                        v-model="state.direccio.poblacio"></ion-input>
                                    <ErrorMessage
                                        v-if="v$.direccio.poblacio.$error && v$.direccio.poblacio.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <ion-input label="Provincia" type="text" :label-placement="labelPlacement"
                                        @ion-blur="v$.direccio.provincia.$touch"
                                        v-model="state.direccio.provincia"></ion-input>
                                    <ErrorMessage
                                        v-if="v$.direccio.provincia.$error && v$.direccio.provincia.required.$invalid"
                                        message="Aquest camp és obligatori" />
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                        <ion-button class="ion-hide" type="submit"></ion-button>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, modalController, IonTextarea } from '@ionic/vue';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, email, sameAs, minValue, numeric, maxLength } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import ErrorMessage from '../components/ErrorMessage.vue';
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
    image: "",
    direccio: {
        carrer: "",
        numero: 0,
        CP: 0,
        poblacio: "",
        provincia: ""
    }
});

const myContrasenya = computed(() => state.contrasenya)

const rules = {
    nom: { required, minLength: minLength(3) },
    correu: { required, email },
    contrasenya: { required, minLength: minLength(8) },
    rcontrasenya: { required, sameAs: sameAs(myContrasenya) },
    descripcio: { required, minLength: minLength(20) },
    telf: { required, numeric, minLength: minLength(9), maxLength: maxLength(9) },
    horari: { required },
    direccio: {
        carrer: { required },
        numero: { required, numeric },
        CP: { required, numeric, minLength: minLength(5), maxLength: maxLength(5) },
        poblacio: { required },
        provincia: { required }
    }
}

const v$ = useVuelidate(rules, state)

const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = async () => {
    const valid = await v$.value.$validate()
    if (valid) {
        modalController.dismiss(state, 'confirm')
    }
}
</script>
<style></style>