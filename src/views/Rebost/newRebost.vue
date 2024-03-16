<template>
    <ion-content>
        <ion-modal ref="modal" trigger="open-modal">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="cancel()">Cancel</ion-button>
                    </ion-buttons>
                    <ion-title class="ion-text-center">Nou Rebost</ion-title>
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
        </ion-modal>
    </ion-content>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonModal, IonButtons, IonItem, IonInput } from '@ionic/vue';
import { newRebost } from '../../APIService/';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../../store/loginStore';

const cancel = () => {
    modal.value.$el.dismiss(null, 'cancel');
};


const modal = ref();


const state = reactive({
    nom: ''
});

const store = useLoginStore();
const { userId, token } = storeToRefs(store);

const confirm = () => { 
    newRebost(state).then(
        (res) => {
            modal.value.$el.dismiss(null, 'cancel');
            console.log(res);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );
};
const rules = {
    nom: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
    }
}

const v$ = useVuelidate(rules, state);



</script>
<style></style>