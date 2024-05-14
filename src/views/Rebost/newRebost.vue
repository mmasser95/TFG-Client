<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title v-if="props.update == ''" class="ion-text-center">Nou Rebost</ion-title>
            <ion-title v-if="props.update != ''" class="ion-text-center">Editar Rebost</ion-title>
            <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirm()">Confirma</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <form action="" @submit.prevent="confirm">
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
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonModal, IonButtons, IonItem, IonInput, modalController, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../../store/loginStore';
import { getRebost } from '../../APIService/rebosts';
import ErrorMessage from '@/components/ErrorMessage.vue'
const props = defineProps({
    update: String
})

const state = reactive({
    nom: ''
});

const rules = {
    nom: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
    }
}

const v$ = useVuelidate(rules, state);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss(state.nom, 'confirm');

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