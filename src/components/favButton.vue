<template>
    <ion-item v-if="isFav(establimentId)" @click.stop="removeFav(establimentId)" :button="true">
        <ion-icon color="danger" size="64" :icon="heart"></ion-icon>
    </ion-item>
    <ion-item v-if="!isFav(establimentId)" @click.stop="addFav(establimentId)" :button="true">
        <ion-icon color="danger" size="64" :icon="heartOutline"></ion-icon>
    </ion-item >
</template>
<script setup lang="ts">
import { IonIcon, IonItem } from '@ionic/vue';
import { defineProps } from 'vue';
import { heart, heartOutline, heartCircle } from 'ionicons/icons';
import { useFavStore } from '../store/favStore';
const { addFav, isFav, removeFav } = useFavStore()
const props=defineProps<{
    establimentId:string
}>()
console.log(isFav('hola'))
</script>
<style></style>