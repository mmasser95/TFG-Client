<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                Nom: {{ element.aliment?.nom }}
            </ion-col>
            <ion-col>Tipus: {{ element.aliment?.tipus }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Data compra: {{ element.data_compra }}</ion-col>
            <ion-col>Data caducitat: {{ element.data_caducitat }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Quantitat:{{ element.quantitat }} {{ element.q_unitat }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>

            </ion-col>
        </ion-row>
    </ion-grid>
    <ion-buttons>
        <ion-button expand="block">
            <ion-icon :icon="pencil"></ion-icon>
        </ion-button>
        <ion-button @click="createConfirmationAlert('Estas segur que vols eliminar-lo del rebost?', estasSegur)">
            <ion-icon :icon="trash"
                ></ion-icon>
        </ion-button>
    </ion-buttons>
</template>
<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, alertController } from '@ionic/vue';
import { showAlert, showLoading } from '../composables/loader';
import { pencil, trash } from 'ionicons/icons';
import { deleteElement } from '../APIService';
interface Aliment {
    _id: string,
    nom: string,
    tipus: string
}

interface Element {
    _id: string,
    quantitat: number,
    q_unitat: string,
    data_compra: string,
    data_caducitat: string,
    aliment?: Aliment
}
const props = defineProps<{
    element: Element,
    rebostId: String
}>();

const emit = defineEmits(['updateElement', 'deleteElement'])

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
    deleteElement(props.rebostId, elementId).then(async (res) => {
        let alert = await showAlert("Element eliminat correctament")
        alert.present()
        emit('deleteElement',null)
    }).catch(async (err) => {
        let alert = await showAlert("Hi ha hagut un error amb la solicitud")
        alert.present()
    }).finally(() => loader.dismiss(null, 'cancel'));
}
</script>
<style></style>