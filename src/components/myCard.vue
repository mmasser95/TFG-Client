<template>
    <ion-card>
        <ion-img :alt="`Imatge del negoci ${title}`" :src="image" />
        <ion-thumbnail >
            <img :alt="`Imatge del negoci ${title}`" :src="image" />
        </ion-thumbnail>
        <ion-card-header>
            <ion-card-title>{{ title }}</ion-card-title>
            <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>{{ text }}</ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonThumbnail, IonImg } from '@ionic/vue'
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    subtitle: String,
    text: String,
    image: String,

})
</script>