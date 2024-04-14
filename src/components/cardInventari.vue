<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-text>
                {{ content }}
            </ion-text>
        </ion-card-content>

        <ion-button :router-link="`/rebost/${idd}`">Entrar</ion-button>
        <ion-button @click="updateInventari">Editar</ion-button>
        <ion-button @click="borrarInventari(idd)">Esborrar</ion-button>
    </ion-card>
</template>
<script setup lang="ts">
import { IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, alertController } from '@ionic/vue'

import { defineProps } from 'vue';
import { deleteRebost } from '@/APIService';

const emit = defineEmits(['updateRebost', 'deleteRebost'])

const props = defineProps({
    title: String,
    content: String,
    idd: String
})

const mostrarAlerta = async (missatge: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: missatge,
        buttons: ['Ok']
    })

    await alert.present();
}



const updateInventari = () => {
    emit('updateRebost', props.idd)
}

const borrarInventari = (inventariId: any) => {
    deleteRebost(inventariId)
        .then((result) => {
            mostrarAlerta(`L'inventari s'ha esborrat correctament`)
            emit('deleteRebost', null)
        })
        .catch((err) => {
            mostrarAlerta(`Hi hagut un error esborrant l'inventari amb id ${inventariId}`)
        });
}
</script>
<style></style>