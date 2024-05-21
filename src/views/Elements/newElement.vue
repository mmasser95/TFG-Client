<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="cancel">
                    <ion-icon :icon="close" slot="icon-only"></ion-icon></ion-button>
            </ion-buttons>
            <ion-title v-if="!element" class="ion-text-center">Crear element</ion-title>
            <ion-title v-if="element" class="ion-text-center">Editar element</ion-title>
            <ion-buttons slot="end">
                
                <ion-button color="primary" @click="confirm">
                    <ion-icon :icon="checkmark" slot="icon-only"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <form @submit.prevent="confirm">
            <ion-grid>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <div class="input-container">
                            <ion-item>
                                <ion-select @ion-change="categoriaChange" label="Categoria" @ion-blur="v$.categoria.$touch"
                                    :label-placement="labelPlacement" v-model="info.categoria">
                                    <ion-select-option v-for="(i, k) in categories" :key='k' :value="i">{{ i
                                        }}</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <ErrorMessage v-if="v$.categoria.$error && v$.categoria.required.$invalid"
                                message="La categoria de l'aliment és obligatòria" />
                        </div>

                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <ion-select label="Aliment" v-if="false" :label-placement="labelPlacement" @ion-blur="v$.aliment.$touch"
                            v-model="info.aliment">
                            <ion-select-option v-for="(i, k) in aliments" :key="k" :value="i._id">{{ i.nom
                                }}</ion-select-option>
                        </ion-select>
                        <div class="input-container">
                            <ion-item :disabled="buttonDisabled" :button="true" :detail="false"
                                @click="openCercadorAliments">
                                <ion-label v-if="!info.aliment">Aliment</ion-label>
                                <ion-label v-if="info.aliment">{{ getNomOfIdAliment(info.aliment) }}</ion-label>
                            </ion-item>
                            <ErrorMessage v-if="v$.aliment.$error && v$.aliment.required.$invalid"
                                message="L'aliment és obligatòri" />
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <div class="input-container">
                            <ion-item>
                                <ion-input type="date" label="Data de compra" :label-placement="labelPlacement" @ion-blur="v$.data_compra.$touch"
                                    v-model="info.data_compra"></ion-input>
                            </ion-item>
                            <ErrorMessage v-if="v$.data_compra.$error && v$.data_compra.required.$invalid"
                                message="La data de compra és obligatòria" />
                        </div>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <div class="input-container">
                            <ion-item>
                                <ion-input type="date" label="Data de caducitat" :label-placement="labelPlacement" @ion-blur="v$.data_caducitat.$touch"
                                    v-model="info.data_caducitat"></ion-input>
                            </ion-item>
                            <ErrorMessage v-if="v$.data_caducitat.$error && v$.data_caducitat.required.$invalid"
                                message="La data de caducitat és obligatòria" />
                            <ErrorMessage v-if="v$.data_caducitat.$error && v$.data_caducitat.posterior.$invalid"
                                message="La data de caducitat ha de ser posterior a avui" />
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" sizeXl="6">
                        <div class="input-container">
                            <ion-item>
                                <ion-input label="Quantitat" type="number" v-model="info.quantitat" @ion-blur="v$.quantitat.$touch"
                                    :label-placement="labelPlacement"></ion-input>
                            </ion-item>
                            <ErrorMessage v-if="v$.quantitat.$error && v$.quantitat.required.$invalid"
                                message="La quantitat és obligatòria" />
                            <ErrorMessage v-if="v$.quantitat.$error && v$.quantitat.numeric.$invalid"
                                message="La quantitat ha de ser un nombre" />
                            <ErrorMessage v-if="v$.quantitat.$error && v$.quantitat.minValue.$invalid"
                                message="La quantitat ha de ser major que 1" />
                        </div>
                    </ion-col>
                    <ion-col size="12" sizeXl="6">
                        <div class="input-container">
                            <ion-item>
                                <ion-select label="Unitat" :label-placement="labelPlacement" @ion-blur="v$.q_unitat.$touch" v-model="info.q_unitat">
                                    <ion-select-option v-for="(i, k) in unitats_quantitat" :value="i" :key="k">{{ i
                                        }}</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <ErrorMessage v-if="v$.q_unitat.$error && v$.q_unitat.notEmpty.$invalid"
                                message="La unitat de la quantitat és obligatòria" />
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-button class="ion-hide" type="submit"></ion-button>
        </form>
    </ion-content>
</template>
<script setup lang="ts">
import { IonLabel, IonHeader, IonContent, IonGrid, IonRow, IonCol, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, modalController, IonSelect, IonSelectOption } from '@ionic/vue';
import { Ref, ref, computed, reactive, defineProps, onMounted, } from 'vue';
import { checkmark,close } from 'ionicons/icons';
import { getArticleCategories, getAllAlimentsByTipus } from '../../APIService/aliments';
import { createElement, putElement } from '../../APIService/elements';
import cercadorAliments from '../../components/cercadorAliments.vue';
import ErrorMessage from '../../components/ErrorMessage.vue';
import { Aliment, Element } from '../../types';
import { numeric, required, minValue } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {isAfter} from 'date-fns/isAfter'
const openCercadorAliments = async () => {
    const modal = await modalController.create({
        component: cercadorAliments,
        componentProps: {
            title: 'Cercar aliments',
            items: aliments.value
        }
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm')
        info.aliment = data

}

const buttonDisabled = computed(() => info.categoria == "")

const props = defineProps<{
    element?: Element,
    rebostId?: string
}>()

const labelPlacement = 'floating'

const info = reactive({
    categoria: '',
    aliment: '',
    data_compra: '',
    data_caducitat: '',
    quantitat: 0,
    q_unitat: ''
})

const rules = {
    categoria: { required },
    aliment: { required },
    data_compra: { required },
    data_caducitat: { required,posterior:(v)=>isAfter(v,Date.now()) },
    quantitat: { required, numeric, minValue: minValue(1) },
    q_unitat: { required,notEmpty:(v)=>v!="" }
}

const v$ = useVuelidate(rules, info)

const aliments: Ref<Aliment[] | undefined> = ref([]);

const getNomOfIdAliment = (alimentId: any) => {
    if (aliments.value) {
        if (aliments.value.length > 0)
            return aliments.value?.filter((element) => element._id == alimentId)[0].nom
    }
    return ""
}

const categories = ref([])
const unitats_quantitat = ref(['kg', 'g', 'l', 'unitats'])

const categoriaChange = () => {
    info.aliment = ""
    fillAliments()
}

const getCategories = () => {
    getArticleCategories((err: any, data: any) => {
        if (err) return
        categories.value = data.tipus
    })

}

const fillAliments = () => {
    getAllAlimentsByTipus(info.categoria, (err: any, data: any) => {
        if (err) return
        aliments.value = data.aliments
    });
}

const fillElementOnUpdate = () => {
    if (props.element) {
        console.log('props.element.aliment :>> ', props.element.aliment?._id);
        info.categoria = props.element.aliment ? props.element.aliment.tipus : ''
        info.aliment = props.element.aliment != undefined ? props.element.aliment._id : ''
        info.data_compra = props.element.data_compra.split('T')[0]
        info.data_caducitat = props.element.data_caducitat.split('T')[0]
        info.q_unitat = props.element.q_unitat
        info.quantitat = props.element.quantitat
    } fillAliments()
}

const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = async () => {
    const valid =await v$.value.$validate()
    if(valid){
        if(props.element)
        putElement(props.rebostId, props.element._id, info, (err: any, data: any) => {
            if (err) return
            modalController.dismiss(null, 'confirm')
        })
        else
        createElement(props.rebostId, info, (err: any, data: any) => {
            if (err) return
            modalController.dismiss(null, 'confirm')        
        })
    }
    
}

onMounted(() => {
    getCategories()
    fillElementOnUpdate()
})

</script>
<style></style>