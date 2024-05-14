<template>
    <ion-card class="ion-activatable myCard">
        <ion-ripple-effect></ion-ripple-effect>
        <ion-card-header>
            <ion-card-subtitle>
                <ion-text>Comentari fet fa: {{ dataRelativa }}</ion-text>
            </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="container">
            <div class="container-comentari">
                <ion-text>{{ avaluacio.avaluacio.comentari }}</ion-text>
            </div>
            <div class="container2">
                <div class="container-avaluacio">
                    <ion-text>Qualitat: </ion-text>
                    <star-rating :starSize="24" :disableClick="true" v-model="qualitat"></star-rating>
                    <ion-text>{{ qualitat }}</ion-text>
                </div>
                <div class="container-avaluacio">
                    <ion-text>Quantitat: </ion-text>
                    <star-rating :starSize="24" :disableClick="true" v-model="quantitat"></star-rating>
                    <ion-text>{{ quantitat }}</ion-text>
                </div>
            </div>
        </ion-card-content>
    </ion-card>
</template>
<script lang="ts" setup>
import { IonCard, IonRippleEffect, IonText, IonBadge, IonTitle, IonCardTitle, IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardHeader, IonCardContent, IonThumbnail, IonImg, IonIcon, IonChip } from '@ionic/vue'
import { ref, computed } from 'vue'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { ca } from 'date-fns/locale'
const props = defineProps<{
    avaluacio:any
}>()
const qualitat = ref(props.avaluacio.avaluacio.qualitat)
const quantitat = ref(props.avaluacio.avaluacio.quantitat)
const dataRelativa = computed(() => formatDistanceToNow((props.avaluacio.avaluacio.data_creacio), { locale: ca }))

console.log('props.avaluacio :>> ', props.avaluacio);
</script>
<style scoped>
.myCard {
    border-radius: 10px;
}

.container {
    display: flex;
    flex-flow: column wrap;
}
.container2{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap:15px;
}
.container-avaluacio {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap:7px;
}

.container-comentari {
    display: flex;
    flex-flow: row wrap;
}
</style>