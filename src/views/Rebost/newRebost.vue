<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="cancel()">
                    <ion-icon slot="icon-only" :icon="close"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!-- Titol que canvia si s'edita un rebost o si es crea-->
            <ion-title v-if="props.update == ''" class="ion-text-center">Nou Rebost</ion-title>
            <ion-title v-if="props.update != ''" class="ion-text-center">Editar Rebost</ion-title>
            <ion-buttons slot="end">
                <ion-button color="tertiary" :strong="true" @click="confirm()">
                    <ion-icon slot="icon-only" :icon="checkmark"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <!-- Formulari de creació del rebost -->
                    <form @submit.prevent="confirm">
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Nom" v-model="state.nom" @ion-blur="v$.nom.$touch"
                                            label-placement="floating"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.required.$invalid"
                                        message="El nom és obligatori" />
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.minLength.$invalid"
                                        message="La llargada mínima del nom ha de ser 3 caràcters" />
                                    <ErrorMessage v-if="v$.nom.$error && v$.nom.maxLength.$invalid"
                                        message="La llargada màxima del nom ha de ser 20 caràcters" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-button class="ion-hide" type="submit"></ion-button>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script setup lang="ts">
/** Llibreries necessaries */
import { IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonModal, IonButtons, IonItem, IonInput, modalController, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { checkmark, close } from 'ionicons/icons';
import { required, maxLength, minLength } from '@vuelidate/validators'
import { getRebost, crearRebost, updateRebost } from '../../APIService/rebosts'
import ErrorMessage from '@/components/ErrorMessage.vue'

/** Es defineixen les propietats del component */
const props = defineProps({
    update: String
})
/** Es defineix l'estructura de dades reactiva que s'enviarà al servidor */
const state = reactive({
    nom: ''
});

/** Es defineixen les regles de validació */
const rules = {
    nom: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
    }
}
/** S'inicialitza la validació */
const v$ = useVuelidate(rules, state);
/** Funció per a amagar el modal */
const cancel = () => modalController.dismiss(null, 'cancel');
/** Funció que envia la petició a la API amb les dades validades*/
const confirm = async () => {
    const valid = await v$.value.$validate();
    if (valid) {
        if (props.update != undefined && props.update != "") {
            updateRebost(props.update, { nom: state.nom }, (err: any, data: any) => {
                if (err) return
                modalController.dismiss(null, 'confirm');
            })
        } else {
            crearRebost({ nom: state.nom }, (err, data) => {
                if (err) return
                modalController.dismiss(null, 'confirm');
            })
        }
    }

}

onMounted(() => {
    if (props.update != undefined) {
        if (props.update != '') {
            getRebost(props.update, (err: any, data: any) => {
                if (err) {
                    cancel()
                    return
                }
                state.nom = data.rebost.nom;
            })
        }
    }
});

</script>
<style></style>