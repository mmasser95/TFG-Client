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
        <ion-item>
            <ion-input type="text" label="Nom" labelPlacement="floating" v-model="state.nom"></ion-input>
        </ion-item>
    </ion-content>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonModal, IonButtons, IonItem, IonInput, modalController } from '@ionic/vue';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../../store/loginStore';
import { getRebost } from '../../APIService';

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
            getRebost(props.update)
                .then((res) => {
                    state.nom = res.data.rebost.nom;
                })
                .catch((err) => {
                    cancel();
                });
        }
    }
});

</script>
<style></style>