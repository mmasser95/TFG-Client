<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <ion-title class="ion-text-center"></ion-title>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">
                        <ion-list>
                            <ion-item>
                                <ion-input v-model="state.name"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-button>Creat</ion-button>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon, IonTitle, IonText, IonButton, IonInput } from '@ionic/vue';
import { newRebost } from '../../APIService/';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength } from '@vuelidate/validators'
import {storeToRefs} from 'pinia'
import { useLoginStore } from '../../store/loginStore';

const state = reactive({
    name: '',
    userId: ''
});

const store = useLoginStore();
const {userId,token}=storeToRefs(store);

const rules = {
    name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
    },
    userId: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
    }
}

const v$ = useVuelidate(rules, state);

onMounted(() => {
    state.userId=userId.value;
});

const createRebost = () => {
    newRebost(state).then().catch();
};

</script>
<style></style>