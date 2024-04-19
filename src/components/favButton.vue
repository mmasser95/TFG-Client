<template>
    <div>
        <ion-button size="small" v-if="isFav(establimentId)" @click.stop="removeFav(establimentId)" shape="round">
            <ion-icon slot="icon-only" color="danger" :icon="heart"></ion-icon>
        </ion-button>
        <ion-button size="small" v-if="!isFav(establimentId)" @click.stop="addFav(establimentId)" shape="round">
            <ion-icon slot="icon-only" color="danger" :icon="heartOutline"></ion-icon>
        </ion-button>
    </div>

</template>
<script setup lang="ts">
import { IonIcon, IonButton, IonContent } from '@ionic/vue';
import { defineProps } from 'vue';
import { heart, heartOutline, heartCircle } from 'ionicons/icons';
import { useFavStore } from '../store/favStore';
const { addFav, isFav, removeFav } = useFavStore()
const props = defineProps<{
    establimentId: string
}>()
</script>
<style></style>