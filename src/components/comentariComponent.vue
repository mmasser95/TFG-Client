<template>
    <form @submit.prevent="confirm">
        <div class="container">
            <div class="item">
                <ion-label>Qualitat: </ion-label>
                <star-rating :inactive-color="inactiveColorStars()" :disableClick="isDisabled"
                    v-model="comentariState.qualitat"></star-rating>
                {{ comentariState.qualitat }}
            </div>
            <div class="item">
                <ion-label>Quantitat: </ion-label>
                <star-rating v-model="comentariState.quantitat" :disableClick="isDisabled"
                    :inactive-color="inactiveColorStars()"></star-rating>
                {{ comentariState.quantitat }}
            </div>
        </div>
        <ion-grid>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="8">
                    <ion-item>
                        <ion-textarea :disabled="isDisabled" v-model="comentariState.comentari"
                            placeholder="Escriure un comentari..."></ion-textarea>
                    </ion-item>
                </ion-col>
                <div class="buttonContainer">
                    <ion-button type="submit" :disabled="isDisabled" @click="confirm">
                        <ion-icon slot="icon-only" :icon="pencil"></ion-icon>
                    </ion-button>
                </div>
            </ion-row>
        </ion-grid>
    </form>
</template>
<script setup lang="ts">
import { IonTextarea, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonItem } from '@ionic/vue';

import { pencil } from 'ionicons/icons';
import { Ref, ref, onMounted, computed } from 'vue';
import { getAvaluacio, createAvaluacio } from '../APIService/avaluacions'
import { showAlert } from '../composables/loader';
import { useLoginStore } from '../store/loginStore';

const isDisabled = computed(() => useLoginStore().userType == "establiment")

const inactiveColorStars = () => {
    if (localStorage.getItem('vueuse-color-scheme') == "dark")
        return '#FFF'
    return '#000'
}
const props = defineProps<{
    comandaId: string
}>()
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
    console.log(isDisabled.value)
    if (!isDisabled.value)
        createAvaluacio(props.comandaId, { ...comentariState.value }, async (err, data) => {
            if (err) return
            let alert = await showAlert("S'ha guardat el vostre comentari")
            alert.present()
        })
}

onMounted(() => {
    getAvaluacio(props.comandaId, (err: any, data: any) => {
        if (err) return
        console.log(data)
        if (data.avaluacio.avaluacio) {
            comentariState.value.quantitat = data.avaluacio.avaluacio.quantitat
            comentariState.value.qualitat = data.avaluacio.avaluacio.qualitat
            comentariState.value.comentari = data.avaluacio.avaluacio.comentari
        }
    })
})

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
    margin: 5px
}

.buttonContainer {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

}
</style>