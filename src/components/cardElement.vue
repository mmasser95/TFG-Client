<template>
   
    <ion-card class="ion-activatable myCard">
        <ion-ripple-effect></ion-ripple-effect>
        <div class="myBtns">
            <ion-buttons class="myRowContainer myCenter">
                <ion-button @click="updateElement" expand="full">
                    <ion-icon color="warning" :icon="pencil"></ion-icon>
                </ion-button>
                <ion-button
                    @click="createConfirmationAlert('Estas segur que vols eliminar-lo del rebost?', estasSegur)">
                    <ion-icon color="danger" :icon="trash"></ion-icon>
                </ion-button>
            </ion-buttons>
        </div>
        <ion-card-header>
            <ion-card-title>{{ element.aliment?.nom }}</ion-card-title>
            <ion-card-subtitle> {{ element.aliment?.tipus }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>

            <div class="container1">
                <div class="container2">
                    <ion-text> Data compra: {{ dataCompraAgo }} </ion-text>
                    <ion-text> Data caducitat: {{ dataCaducitatRelative }} </ion-text>
                </div>
                <div class="container3">
                    <div>
                        <div class="item">{{ quantitatElement }} {{ element.q_unitat }}</div>
                    </div>

                </div>
            </div>
        </ion-card-content>
        <div class="myRowContainer">
            <div class="myColContainer myCenter">

                <div class="myRowContainer myCenter">
                    <div class="item">
                        <!--<ion-input @ion-change="canviarQuantitat" type="number" v-model="quantitatElement"></ion-input>-->

                    </div>

                </div>
            </div>
        </div>
    </ion-card>
</template>
<script setup lang="ts">
import { IonTitle, IonRippleEffect, IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, alertController } from '@ionic/vue';
import { computed, ref } from 'vue';
import { showAlert, showLoading } from '../composables/loader';
import { pencil, trash } from 'ionicons/icons';
import { deleteElement } from '../APIService/elements';
import { ca } from 'date-fns/locale'
import { differenceInHours } from 'date-fns/differenceInHours'
import { formatDistanceToNow} from 'date-fns/formatDistanceToNow'
import { Element } from '../types'
import { useDebounceFn } from '@vueuse/core';

const props = defineProps<{
    element: Element,
    rebostId: String
}>();

const emit = defineEmits(['updateElement', 'deleteElement'])

const quantitatElement = ref(props.element.quantitat)

const dataCompraAgo = computed(() => {
    if (props.element) {
        if (Math.abs(differenceInHours(Date.now(), props.element.data_compra)) < 24)
            return "Avui"
        return formatDistanceToNow(props.element.data_compra, { addSuffix: true, locale: ca })
    }

})
const dataCaducitatRelative = computed(() => {
    if (props.element) {
        if (Math.abs(differenceInHours(Date.now(), props.element.data_caducitat)) < 24)
            return "Avui"
        return formatDistanceToNow(props.element.data_caducitat, { addSuffix: true, locale: ca })
    }
})

const createConfirmationAlert = async (message: string, myHandler: any) => {
    let alert = await alertController.create({
        header: "Missatge del sistema",
        message,
        buttons: [{
            text: 'Si',
            htmlAttributes: {
                'aria-label': 'Si'
            },
            handler: myHandler
        },
        {
            text: 'No',
            htmlAttributes: {
                'aria-label': 'No'
            }
        }]
    })
    alert.present()
}

const estasSegur = async () => {
    await createConfirmationAlert("Recorda que aquesta acció no es pot desfer. Estas segur?", eliminarElement)
}

const eliminarElement = async () => {
    let elementId = props.element._id;
    let loader = await showLoading("Eliminant element")
    loader.present()
    deleteElement(props.rebostId, elementId, async (err: any, data: any) => {
        loader.dismiss()
        if (err) return
        let alert = await showAlert("Element eliminat correctament")
        alert.present()
        emit('deleteElement', null)
    })
}


const updateElement = () => {
    emit('updateElement', { ...props })
}

const canviarQuantitat = useDebounceFn(() => {

}, 1000)

</script>
<style scoped>

.container1 {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
}

.container2 {
    display: flex;
    flex-flow: column wrap;
}

.container3 {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
}

.rootElement {
    margin: 10px;
    border-radius: 10px
}

ion-card {
    padding: 10px;
}
ion-input {
    max-width: 50px;
    margin: 5px;
}
.myCard{
    position:relative;
}
.myBtns{
    position:absolute;
    right:18px;
    top:30px;
    z-index:1;
}
</style>