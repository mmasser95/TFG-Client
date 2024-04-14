<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Editar vista</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="confirm()">Confirmar</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12" sizeMd="6">
                        <ion-radio-group :value="myIdioma" @ionChange="onChangeStyle">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <p class="ion-text-center">Idioma</p>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="ca">Català</ion-radio>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="es">Castellà</ion-radio>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="en">Anglès</ion-radio>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-radio-group>
                    </ion-col>
                    <ion-col size="12" sizeMd="6">
                        <ion-radio-group :value="myTheme" @ionChange="onChangeTheme">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <p class="ion-text-center">Aparença</p>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="sys">Sistema</ion-radio>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="clar">Clar</ion-radio>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="fosc">Fosc</ion-radio>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-radio value="acc">Accessible</ion-radio>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-radio-group>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-title class="ion-text-center">Mida de la lletra</ion-title>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>Slider per la mida de la lletra</ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script lang="ts" setup>
import { IonPage, IonToolbar, IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, modalController, IonRadio, IonRadioGroup } from '@ionic/vue';
import { onMounted, ref } from 'vue';

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => modalController.dismiss({idioma:myIdioma.value,theme:myTheme.value}, 'confirm');

const myIdioma=ref("")
const myTheme=ref("")

const onChangeStyle=(ev:any)=>{
    myIdioma.value=ev.detail.value
}

const onChangeTheme=(ev:any)=>{
    myTheme.value=ev.detail.value
}

onMounted(()=>{
    let idioma= localStorage.getItem('idioma')
    if (!idioma) {
        localStorage.setItem('idioma','ca')
        idioma='ca';
    }
    myIdioma.value=idioma;

    let theme=localStorage.getItem('theme');
    if(!theme){
        localStorage.setItem('theme','sys');
        theme='sys';
    }
    myTheme.value=theme;
})

</script>
<style></style>