<template>
    <form @submit.prevent="confirm">
        <div class="container">
            <div class="item">
                <ion-label>Qualitat: </ion-label>
                <star-rating v-model="comentariState.qualitat"></star-rating>
                {{ comentariState.qualitat }}
            </div>
            <div class="item">
                <ion-label>Quantitat: </ion-label>
                <star-rating v-model="comentariState.quantitat" :inactive-color="inactiveColorStars()"></star-rating>
                {{ comentariState.quantitat }}
            </div>
        </div>
        <ion-grid>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                    <ion-item>
                        <ion-textarea v-model="comentariState.comentari"
                            placeholder="Escriure un comentari..."></ion-textarea>
                    </ion-item>
                </ion-col>
                    <div class="buttonContainer">
                        <ion-button type="submit">
                            <ion-icon slot="icon-only" :icon="pencil"></ion-icon>
                        </ion-button>
                    </div>
            </ion-row>
        </ion-grid>
    </form>
</template>
<script setup lang="ts">
import { IonTextarea, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonIcon,IonItem } from '@ionic/vue';
import { pencil } from 'ionicons/icons';
import { usePreferredColorScheme } from '@vueuse/core'

const preferredColor = usePreferredColorScheme()

const inactiveColorStars = () => {
    if (preferredColor.value == "dark")
        return '#FFF'
    return '#000'
}

import { Ref, ref } from 'vue';
const comentariState: Ref<{
    quantitat: number,
    qualitat: number,
    comentari: string
}> = ref({
    quantitat: 0,
    qualitat: 0,
    comentari: ''
})

const confirm = () => {

}
</script>
<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

.item {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 12px;
    margin:5px
}
.buttonContainer{
    display:flex;
    flex-flow:row wrap;
    align-items: center;
    
}
</style>