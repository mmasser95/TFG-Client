<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <ion-title class="ion-text-center">Inventari</ion-title>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col></ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon, IonTitle, IonText } from '@ionic/vue';
import { getInventari } from '../../APIService/';
import { ref, reactive, computed, onMounted, defineProps } from 'vue';

const props = defineProps({ 'inventari_id': String });

onMounted(() => {
    if (props.inventari_id) {
        getInventari(props.inventari_id).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
});
</script>
<style></style>