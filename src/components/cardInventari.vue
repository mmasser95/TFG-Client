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

        <ion-button :router-link="`/inventari/${idd}`">Entrar</ion-button>
        <ion-button :router-link="`/admin/inventari/${idd}`">Gestionar</ion-button>
    </ion-card>
</template>
<script setup lang="ts">
import { IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue'
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    content: String,
    idd:String
})
</script>
<style></style>