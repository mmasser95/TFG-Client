<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                </ion-buttons>
                <ion-title class="ion-text-center">Editar vista</ion-title>
                <ion-buttons slot="end">
                    <ion-button color="primary" @click="confirm()">
                        <ion-icon :icon="checkmark" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-radio-group :value="myTheme()" @ionChange="onChangeTheme">

                            <div class="container">
                                <ion-radio value="sys">Sistema</ion-radio>

                                <ion-radio value="clar">Clar</ion-radio>

                                <ion-radio value="fosc">Fosc</ion-radio>

                                <ion-radio value="acc">Accessible</ion-radio>
                            </div>
                        </ion-radio-group>
                    </ion-col>
                </ion-row>

            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script lang="ts" setup>
import { IonPage, IonIcon, IonToolbar, IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, modalController, IonRadio, IonRadioGroup } from '@ionic/vue';
import { checkmark } from 'ionicons/icons';
import { onMounted, ref } from 'vue';

import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
    attribute: 'theme',
    modes: {
        light: 'light',
        dark: 'dark',
        contrast: 'contrast'
    }
})
const myTheme = () => {
    if (mode.value == "contrast") return "acc"
    if (mode.value == "dark") return "fosc"
    if (mode.value == "light") return "clar"
    else return "auto"
}

const confirm = () => modalController.dismiss(null, 'confirm');


const onChangeTheme = (ev: any) => {
    
    if (ev.detail.value == 'acc')
        mode.value = 'contrast'
    else if (ev.detail.value == 'fosc')
        mode.value = 'dark'
    else if (ev.detail.value == "clar")
        mode.value = 'light'
    else
        mode.value = 'auto'
}

onMounted(() => {
    console.log('mode.value :>> ', mode.value);

})

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 50px;
}
</style>