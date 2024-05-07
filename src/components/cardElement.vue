<template>
    <!--<ion-grid>
        <ion-row>
            <ion-col>
                Nom: {{ element.aliment?.nom }}
            </ion-col>
            <ion-col>Tipus: {{ element.aliment?.tipus }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Data compra: {{ dataCompraAgo }}</ion-col>
            <ion-col>Data caducitat: {{ dataCaducitatRelative }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>Quantitat:{{ element.quantitat }} {{ element.q_unitat }}</ion-col>
        </ion-row>
        <ion-row>
            <ion-col>

            </ion-col>
        </ion-row>
    </ion-grid>-->
    <div class="rootElement">
        <div class="myRowContainer">
            <div class="myColContainer">
                <ion-title>
                    {{ element.aliment?.nom }}
                </ion-title>
                <ion-text> {{ element.aliment?.tipus }}</ion-text>
                <ion-text> Data compra: {{ dataCompraAgo }} </ion-text>
                <ion-text> Data caducitat: {{ dataCaducitatRelative }} </ion-text>
            </div>
            <div class="myColContainer myCenter">
                <ion-buttons class="myRowContainer myCenter">
                    <ion-button @click="updateElement" expand="full">
                        <ion-icon :icon="pencil"></ion-icon>
                    </ion-button>
                    <ion-button
                        @click="createConfirmationAlert('Estas segur que vols eliminar-lo del rebost?', estasSegur)">
                        <ion-icon :icon="trash"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <div class="myRowContainer myCenter">
                    <ion-input @ion-change="canviarQuantitat" type="number" v-model="quantitatElement"></ion-input>{{ element.q_unitat }}
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { IonTitle, IonText, IonInput, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, alertController } from '@ionic/vue';
import { computed, ref } from 'vue';
import { showAlert, showLoading } from '../composables/loader';
import { pencil, trash } from 'ionicons/icons';
import { deleteElement } from '../APIService';
import { ca } from 'date-fns/locale'
import { formatDistanceToNow, differenceInHours } from 'date-fns'
import { Element } from '../types'
import { useDebounceFn } from '@vueuse/core';

const props = defineProps<{
    element: Element,
    rebostId: String
}>();

const emit = defineEmits(['updateElement', 'deleteElement'])

const quantitatElement = ref(props.element.quantitat)

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
        emit('deleteElement', null)
    }).catch(async (err) => {
        let alert = await showAlert("Hi ha hagut un error amb la solicitud")
        alert.present()
    }).finally(() => loader.dismiss(null, 'cancel'));
}

const dataCompraAgo = computed(() => {
    if (props.element) {
        if (Math.abs(differenceInHours(Date.now(), props.element.data_compra)) < 24)
            return "Avui"
        return formatDistanceToNow(props.element.data_compra, { addSuffix: true, locale: ca })
    }

})
const dataCaducitatRelative = computed(() => {
    if (props.element){
        if (Math.abs(differenceInHours(Date.now(), props.element.data_caducitat)) < 24)
            return "Avui"
        return formatDistanceToNow(props.element.data_caducitat, { addSuffix: true, locale: ca })
    }
})

const updateElement = () => {
    emit('updateElement', { ...props })
}

const canviarQuantitat=useDebounceFn(()=>{

},1000)

</script>
<style scoped>
.myRowContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    -webkit-justify-content: space-evenly;
}

.myColContainer {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    -webkit-justify-content: space-evenly;
}

.myCenter {
    justify-content: center;
    -webkit-justify-content: center;
}

.rootElement {
    margin: 10px;
    padding: 10px;
    /*background-image: linear-gradient(to left bottom, #70995c, #3e9466, #008e78);*/
    /*background-image: linear-gradient(to left top, #ffaebc, #e68b9a, #cd6979, #b44759, #99203b);*/
    border-radius: 5px
}

ion-input {
    max-width: 50px;
    margin: 5px;
}
</style>