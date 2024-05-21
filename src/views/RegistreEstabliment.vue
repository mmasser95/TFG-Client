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
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Nom" :label-placement="labelPlacement" v-model="state.nom"
                                                @ion-blur="v$.nom.$touch"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.nom.$error && v$.nom.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.nom.$error && v$.nom.minLength.$invalid"
                                            message="Aquest ha de tenir minim 3 caràcters" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Correu" :label-placement="labelPlacement"
                                                v-model="state.correu" @ion-blur="v$.correu.$touch"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                                            message="Correu invàlid" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Contrasenya" :label-placement="labelPlacement"
                                                type="password" @ion-blur="v$.contrasenya.$touch"
                                                v-model="state.contrasenya"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.minLength.$invalid"
                                            message="Mínim 8 caràcters" />
                                    </div>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Repeteix la contrasenya" :label-placement="labelPlacement"
                                                type="password" @ion-blur="v$.rcontrasenya.$touch"
                                                v-model="state.rcontrasenya"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.rcontrasenya.$error && v$.rcontrasenya.required.$invalid"
                                            message="Aquest camp és obligatori " />
                                        <ErrorMessage v-if="v$.rcontrasenya.$error && v$.rcontrasenya.sameAs.$invalid"
                                            message="Aquest camp ha de ser igual a l'anterior " />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-textarea label="Descripció" :label-placement="labelPlacement"
                                                @ion-blur="v$.descripcio.$touch"
                                                v-model="state.descripcio"></ion-textarea>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage v-if="v$.descripcio.$error && v$.descripcio.minLength.$invalid"
                                            message="Aquest camp ha de tinir mínim 20 caràcters" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="6">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Telèfon" type="tel" :label-placement="labelPlacement"
                                                @ion-blur="v$.telf.$touch" v-model="state.telf"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.telf.$error && v$.telf.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage
                                            v-if="v$.telf.$error && (v$.telf.minLength.$invalid || v$.telf.maxLength.$invalid || v$.telf.numeric.$invalid)"
                                            message="Aquest camp ha de tinir mínim 9 caràcters numèrics. Únicament escriu el telf sense prefix ni espais." />
                                    </div>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Horari" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.horariString.$touch"
                                                v-model="state.horariString"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.horariString.$error && v$.horariString.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage
                                            v-if="v$.horariString.$error && v$.horariString.customHorariValidator.$invalid"
                                            message="Has de posar l'horari amb el format HH:MM-HH:MM. Pots posar més d'un interval separant per comes HH:MM-HH:MM,HH:MM-HH:MM" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Web" type="text" :label-placement="labelPlacement"
                                                v-model="state.web"></ion-input>
                                        </ion-item>
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="8">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Carrer" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.carrer.$touch"
                                                v-model="state.direccio.carrer"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.direccio.carrer.$error && v$.direccio.carrer.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                                <ion-col size="6" sizeXl="2">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Numero" type="number" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.numero.$touch"
                                                v-model="state.direccio.numero"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.direccio.numero.$error && v$.direccio.numero.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                        <ErrorMessage
                                            v-if="v$.direccio.numero.$error && v$.direccio.numero.numeric.$invalid"
                                            message="Aquest camp unicament pot contenir numeros" />
                                    </div>
                                </ion-col>
                                <ion-col size="6" sizeXl="2">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="CP" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.CP.$touch"
                                                v-model="state.direccio.CP"></ion-input>
                                        </ion-item>
                                        <ErrorMessage v-if="v$.direccio.CP.$error && v$.direccio.CP.required.$invalid"
                                            message="Aquest camp és obligatori. " />
                                        <ErrorMessage v-if="v$.direccio.CP.$error && v$.direccio.CP.numeric.$invalid"
                                            message="Aquest camp ha de contenir numeros. " />
                                        <ErrorMessage
                                            v-if="v$.direccio.CP.$error && (v$.direccio.CP.minLength.$invalid || v$.direccio.CP.maxLength.$invalid)"
                                            message="Aquest camp ha de contenir 5 numeros. " />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12" sizeXl="4">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Població" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.poblacio.$touch"
                                                v-model="state.direccio.poblacio"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.direccio.poblacio.$error && v$.direccio.poblacio.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                                <ion-col size="12" sizeXl="4">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Provincia" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.provincia.$touch"
                                                v-model="state.direccio.provincia"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.direccio.provincia.$error && v$.direccio.provincia.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                                <ion-col size="12" sizeXl="4">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-select label="Tipus Establiment" :label-placement="labelPlacement" v-model="state.tipus">
                                                <ion-select-option disabled> Seleccionar tipus d'establiment</ion-select-option>
                                                <ion-select-option value="restaurant">Restaurant</ion-select-option>
                                                <ion-select-option value="supermercat">Supermercat</ion-select-option>
                                                <ion-select-option value="fleca">Fleca</ion-select-option>
                                                <ion-select-option value="peixateria">Peixateria</ion-select-option>
                                                <ion-select-option value="carnisseria">Carnisseria</ion-select-option>
                                                <ion-select-option value="fruiteria_verduleria">Fruita Verdura</ion-select-option>
                                             </ion-select>
                                        </ion-item>
                                    </div>
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
import { IonLabel, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent,IonSelect,IonSelectOption, IonGrid, IonRow, IonCol, IonItem, IonInput, modalController, alertController, IonTextarea } from '@ionic/vue';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, email, sameAs, minValue, numeric, maxLength } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { getCoordinates } from '../APIService/utils';
import { parse } from 'date-fns/parse'
const presentAlert = async (prompt: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: prompt,
        buttons: ['Exit']
    })
    await alert.present()
}
const labelPlacement = "floating"

const state = reactive({
    nom: "",
    correu: "",
    contrasenya: "",
    rcontrasenya: "",
    descripcio: "",
    tipus: "",
    horariString: '',
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

const customHorariValidator = (value: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)(,([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d))*$/;
    return regex.test(value)
}

const rules = {
    nom: { required, minLength: minLength(3) },
    correu: { required, email },
    contrasenya: { required, minLength: minLength(8) },
    rcontrasenya: { required, sameAs: sameAs(myContrasenya) },
    descripcio: { required, minLength: minLength(20) },
    telf: { required, numeric, minLength: minLength(9), maxLength: maxLength(9) },
    horariString: { required, customHorariValidator },
    direccio: {
        carrer: { required },
        numero: { required, numeric },
        CP: { required, numeric, minLength: minLength(5), maxLength: maxLength(5) },
        poblacio: { required },
        provincia: { required }
    }
}

const parseHorari = (value: any) => {
    let horaris = value.split(',')
    let result: any[] = []
    horaris.forEach((element: any) => {
        let iniciFinal = element.split('-')
        let inici = iniciFinal[0]
        let final = iniciFinal[1]
        result.push({
            inici,
            final
        })
    });
    return result
}

const v$ = useVuelidate(rules, state)

const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = async () => {
    let valid = await v$.value.$validate()
    try {
        let coords = await getCoordinates(state.direccio.carrer, state.direccio.numero, state.direccio.poblacio, state.direccio.provincia, state.direccio.CP)
        let body=state
        body.direccio=JSON.stringify(body.direccio)
        if (!coords) presentAlert("L'adreça podria tenir algun error ja que el sistema no en detecta les coordenades")
        if (valid && coords) {
            modalController.dismiss({ ...body, ...coords, horari: JSON.stringify(parseHorari(state.horariString)) }, 'confirm')
        }
    } catch (err) {
        presentAlert(`Hi ha algun error en la comprovació de les coordenades. Comprova la teva conexió i torna-ho a provar.`)
    }
}

</script>
<style></style>