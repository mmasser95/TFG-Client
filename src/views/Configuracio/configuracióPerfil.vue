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
                        <form v-if="userType == 'client'" @submit.prevent="confirm()">
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Nom" @ion-blur="v$.nom.$touch" v-model="stateUser.nom"
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
                                            <ion-input label="Cognoms" @ion-blur="v$.cognoms.$touch"
                                                v-model="stateUser.cognoms"
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
                                                v-model="stateUser.correu"
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
                                            <ion-input label="Telèfon" type="tel" @ion-blur="v$.telf.$touch"
                                                v-model="stateUser.telf" :label-placement="labelPlacement"></ion-input>
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
                                                @ion-blur="v$.data_naixement.$touch" v-model="stateUser.data_naixement"
                                                :label-placement="labelPlacement"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.data_naixement.$error && v$.data_naixement.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-button class="ion-hide" expand="block" type="submit">Submit</ion-button>
                        </form>
                        <form @submit.prevent="confirm()" v-if="userType == 'establiment'">
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Nom" :label-placement="labelPlacement" @ion-blur=""
                                                v-model="stateEstabliment.nom"></ion-input>
                                        </ion-item>
                                        <ErrorMessage></ErrorMessage>
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-textarea label="Descripció" :label-placement="labelPlacement"
                                                @ion-blur="" v-model="stateEstabliment.descripcio"></ion-textarea>
                                        </ion-item>
                                        <ErrorMessage></ErrorMessage>
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Correu" :label-placement="labelPlacement" @ion-blur=""
                                                v-model="stateEstabliment.correu"></ion-input>
                                        </ion-item>
                                        <ErrorMessage></ErrorMessage>
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Telèfon" :label-placement="labelPlacement" @ion-blur=""
                                                v-model="stateEstabliment.telf"></ion-input>
                                        </ion-item>
                                        <ErrorMessage></ErrorMessage>
                                    </div>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Horari" :label-placement="labelPlacement" @ion-blur=""
                                                v-model="stateEstabliment.horari"></ion-input>
                                        </ion-item>
                                        <ErrorMessage></ErrorMessage>
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-select label="Tipus d'establiment" :label-placement="labelPlacement"
                                                @ion-blur="" v-model="stateEstabliment.tipus">
                                                <ion-select-option value="Restaurant">Restaurant</ion-select-option>
                                                <ion-select-option></ion-select-option>
                                                <ion-select-option></ion-select-option>
                                                <ion-select-option></ion-select-option>
                                                <ion-select-option></ion-select-option>
                                                <ion-select-option></ion-select-option>
                                            </ion-select>
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
                                                v-model="stateEstabliment.direccio.carrer"></ion-input>
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
                                                v-model="stateEstabliment.direccio.numero"></ion-input>
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
                                                v-model="stateEstabliment.direccio.CP"></ion-input>
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
                                <ion-col size="12" sizeXl="6">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Població" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.poblacio.$touch"
                                                v-model="stateEstabliment.direccio.poblacio"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.direccio.poblacio.$error && v$.direccio.poblacio.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                                <ion-col size="12" sizeXl="6">
                                    <div class="input-container">
                                        <ion-item>
                                            <ion-input label="Provincia" type="text" :label-placement="labelPlacement"
                                                @ion-blur="v$.direccio.provincia.$touch"
                                                v-model="stateEstabliment.direccio.provincia"></ion-input>
                                        </ion-item>
                                        <ErrorMessage
                                            v-if="v$.direccio.provincia.$error && v$.direccio.provincia.required.$invalid"
                                            message="Aquest camp és obligatori" />
                                    </div>
                                </ion-col>
                            </ion-row>
                        </form>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script lang="ts" setup>
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonButton, IonTitle, IonGrid, IonRow, IonCol, modalController, IonList, IonInput, IonItem, IonTextarea, IonSelect, IonSelectOption } from '@ionic/vue';
import { reactive, onMounted } from 'vue';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs, numeric, minValue } from '@vuelidate/validators';
import { useLoginStore } from '../../store/loginStore';
import { showAlert } from '../../composables/loader';

import { storeToRefs } from 'pinia';

import { getPerfil, updatePerfil, getCoordinates } from '../../APIService/utils';
import { updateEstabliment } from '../../APIService/establiments';
import { format, parseISO } from 'date-fns'

import ErrorMessage from '@/components/ErrorMessage.vue'

const { userType } = storeToRefs(useLoginStore())
const labelPlacement = "floating"

const stateUser = reactive({
    nom: '',
    cognoms: '',
    correu: '',
    telf: '',
    data_naixement: '',
})

const rulesUser = {
    nom: { required, minLength: minLength(3) },
    cognoms: { required, minLength: minLength(3) },
    correu: { required, email },
    telf: { required, minLength: minLength(9), maxLength: maxLength(9), numeric },
    data_naixement: { required },
}
const customHorariValidator = (value: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)(,([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d))*$/;
    return regex.test(value)
}
const stateEstabliment = reactive({
    nom: '',
    descripcio: '',
    correu: '',
    telf: '',
    url_imatge: '',
    url_fondo: '',
    horari: '',
    tipus: '',
    direccio: {
        carrer: '',
        numero: 1,
        CP: 0,
        poblacio: '',
        provincia: ''
    }
})

const rulesEstabliment = {
    nom: { required, minLength: minLength(3) },
    descripcio: { required, minLength: minLength(3) },
    correu: { required, email },
    telf: { required, minLength: minLength(9), maxLength: maxLength(9), numeric },
    horari: { required, customHorariValidator },
    tipus: { required },
    direccio: {
        carrer: { required },
        numero: { required, numeric },
        CP: { required, numeric, minLength: minLength(5), maxLength: maxLength(5) },
        poblacio: { required },
        provincia: { required }
    }
}

let v$ = userType.value == 'client' 
? useVuelidate(rulesUser, stateUser) 
: useVuelidate(rulesEstabliment, stateEstabliment);

const fill = () => {
    getPerfil((err: any, data: any) => {
        if (err) return
        if (userType.value == 'client') {
            stateUser.nom = data.perfil.nom
            stateUser.cognoms = data.perfil.cognoms
            stateUser.correu = data.perfil.correu
            stateUser.data_naixement = format(data.perfil.data_naixement, 'yyyy-MM-dd')
            stateUser.telf = data.perfil.telf
        } else {
            stateEstabliment.nom = data.perfil.nom
            stateEstabliment.descripcio = data.perfil.descripcio
            stateEstabliment.correu = data.perfil.correu
            stateEstabliment.telf = data.perfil.telf
            stateEstabliment.url_imatge = data.perfil.url_imatge
            stateEstabliment.url_fondo = data.perfil.url_fondo
            stateEstabliment.horari = parseHorari(data.perfil.horari)
            stateEstabliment.tipus = data.perfil.tipus
            stateEstabliment.direccio = data.perfil.direccio
        }
    })
}

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = async () => {
    const valid = await v$.value.$validate();
    if (valid) {
        if (userType.value == "client")
            confirmUser()
        else
            confirmEstabliment()
    }
};
const confirmUser = async () => {
    updatePerfil(stateUser, (err: any, data: any) => {
        if (err) return true
        modalController.dismiss(null, 'confirm')
    })

}

const confirmEstabliment = async () => {
    console.log('state :>> ', stateEstabliment)
    try {
        let coords = await getCoordinates(stateEstabliment.direccio.carrer, stateEstabliment.direccio.numero, stateEstabliment.direccio.poblacio, stateEstabliment.direccio.provincia, stateEstabliment.direccio.CP)
        if (!coords)
            throw new Error('COORDENADES')
        updatePerfil({ ...stateEstabliment, ...coords, horari: formatHorari(stateEstabliment.horari) }, async (err: any, data: any) => {
            if (err) return true
            modalController.dismiss(null, "confirm")
            let alert = await showAlert("S'ha actualitzat correctament")
            alert.present()
        })

    } catch (err:any) {
        if (err.message == "COORDENADES") {
            let alert = await showAlert("L'adreça podria contenir un error ja que el sistema no aconsegueix extrere'n les coordenades")
            alert.present()
        }
    }

}

const parseHorari = (horariList: any) => {
    return horariList.map((el:any) => `${el.inici}-${el.final}`).join(",")
}
const formatHorari = (horariString: any) => {
    let res: Object[] = []
    for (const item of horariString.split(',')) {
        let horari = item.split("-")
        res.push({
            inici: horari[0],
            final: horari[1]
        })
    }
    return res
}


onMounted(() => {
    fill()
})
</script>
<style></style>