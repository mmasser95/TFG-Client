<template>
    <ion-card class="ion-activatable">
        <ion-ripple-effect></ion-ripple-effect>
        <ion-card-header>
            <ion-card-title>{{ aliment.nom }}</ion-card-title>
            <ion-card-subtitle>{{ aliment.tipus }} </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <div class="myContainer">
                    <div class="input-container">
                        <ion-item>
                            <ion-input :label-placement="labelPlacement" label="Data de compra" type="date"
                                v-model="data_compra"></ion-input>
                        </ion-item>
                    </div>
                    <div class="input-container">
                        <ion-item>
                            <ion-input type="date" v-model="data_caducitat" :label-placement="labelPlacement"
                                label="Data de caducitat"></ion-input>
                        </ion-item>
                    </div>
                    
                
                <div class="myContainerQuantitat">
                    <ion-input type="number" label="Quantitat" :label-placement="labelPlacement"
                        v-model="quantitat"></ion-input>
                    <ion-select label="Unitat" :label-placement="labelPlacement" v-model="unitat">
                        <ion-select-option value="unitats">unitats</ion-select-option>
                        <ion-select-option value="l">l</ion-select-option>
                        <ion-select-option value="kg">kg</ion-select-option>
                        <ion-select-option value="g">g</ion-select-option>
                    </ion-select>
                </div>
                <div class="myContainerBtn">
                    <ion-buttons>
                        <ion-button @click="deleteAliment"><ion-icon :icon="trash"></ion-icon></ion-button>
                    </ion-buttons>
                </div>
            </div>
        </ion-card-content>
    </ion-card>
    <!--<ion-modal :keep-contents-mounted="true">
        <ion-datetime @ionChange="dateTimeCompraChange" :id="`datetime.compra.${aliment._id}`" presentation="date"
            :value="data_compra_iso" :show-default-buttons="true"></ion-datetime>

    </ion-modal>
    <ion-modal :keep-contents-mounted="true">
        <ion-datetime @ionChange="dateTimeCaducitatChange" :id="`datetime.caducitat.${aliment._id}`" presentation="date"
            :value="data_caducitat_calc" :show-default-buttons="true"></ion-datetime></ion-modal>-->
</template>
<script setup lang="ts">
import { IonItem, IonCard, IonCardContent, IonInput, IonCardHeader, IonCardTitle, IonModal, IonDatetime, IonCardSubtitle, IonRippleEffect, modalController, IonDatetimeButton, IonButton, IonButtons, IonIcon, IonSelect, IonSelectOption } from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import { pencil, trash } from 'ionicons/icons';
import { Aliment } from '../types'
import { addDays } from 'date-fns/addDays';
import { addWeeks } from 'date-fns/addWeeks'
import { addMonths } from 'date-fns/addMonths'
import { format } from 'date-fns/format'
import { formatRelative } from 'date-fns/formatRelative'
import { formatISO } from 'date-fns/formatISO'
import { parseISO } from 'date-fns/parseISO'

import { useScanStore } from '../store/scanStore';

import { useDebounceFn } from '@vueuse/core';

const { addItem, updateItem, deleteItem } = useScanStore()

const orderedElements=computed(()=>{})

const labelPlacement = "floating"

const props = defineProps<{
    aliment: Aliment
}>()

const quantitat = ref(1)
const unitat = ref('unitats')

const emit = defineEmits(['updateAliment', 'deleteAliment'])


const data_compra = ref(format(Date.now(),"yyyy-MM-dd"))
const data_compra_iso = computed(() => formatISO(Date.now()))

const data_caducitat_calc = computed(() => {
    let data
    if (props.aliment.temps_defecte_conservacio) {
        if (props.aliment.t_unitat == "dies") {
            console.log('dies ', props.aliment.t_unitat);
            data = addDays(Date.now(), props.aliment.temps_defecte_conservacio)
        }
        else if (props.aliment.t_unitat == "setmanes")
            data = addWeeks(Date.now(), props.aliment.temps_defecte_conservacio)
        else if (props.aliment.t_unitat == "mesos")
            data = addMonths(Date.now(), props.aliment.temps_defecte_conservacio)
        else
            data = Date.now()
    } else
        data = Date.now()
    return format(data,"yyyy-MM-dd")
})
const data_caducitat = ref(data_caducitat_calc.value)



const updateAliment = useDebounceFn(() => {
    updateItem(props.aliment._id, {
        aliment: props.aliment._id,
        data_compra: data_compra.value,
        data_caducitat: data_caducitat.value,
        quantitat: quantitat.value,
        q_unitat: unitat.value
    })
}, 1000)

const deleteAliment = () => {
    deleteItem(props.aliment._id)
    emit("deleteAliment", props.aliment)
}

const dateTimeCompraChange = (event: any) => {
    console.log('event.detail.value :>> ', event.detail.value);
    console.log('parseISO() :>> ', parseISO(event.detail.value));
    data_compra.value = event.detail.value
    updateAliment()
}
const dateTimeCaducitatChange = (event: any) => {
    console.log('event.detail.value :>> ', event.detail.value);
    console.log('parseISO() :>> ', parseISO(event.detail.value));
    data_caducitat.value = event.detail.value
    updateAliment()
}

onMounted(() => {
    addItem({
        aliment: props.aliment._id,
        data_compra: data_compra.value,
        data_caducitat: data_caducitat.value,
        quantitat: quantitat.value,
        q_unitat: unitat.value
    })
    
})

</script>
<style scoped>
.myContainer {
    display: flex;
    flex-flow: column wrap;
}

.myContainerBtn {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
}

.myContainerQuantitat {
    display: flex;
}

ion-card {
    border-radius: 10px;
}
</style>