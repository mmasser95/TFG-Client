<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-title class="ion-text-center">
                            Nova Oferta
                        </ion-title>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8">
                        <ion-list>
                            <ion-item>
                                <ion-input label="Nom" labelPlacement="floating" v-model="state.nom"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Descripció" labelPlacement="floating"
                                    v-model="state.descripcio"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input type="number" label="Preu" labelPlacement="floating"
                                    v-model="state.preu"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input type="text" label="Establiment" labelPlacement="floating" v-model="state.establiment"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-select>
                                    <ion-select-option>EUR</ion-select-option>
                                    <ion-select-option>USD</ion-select-option>
                                    <ion-select-option>JPY</ion-select-option>
                                    <ion-select-option>BTC</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <ion-item>
                                <ion-button expand="block" @click="doNewOferta">Guardar</ion-button>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, minValue, numeric } from '@vuelidate/validators'
import { newOferta } from '@/APIService'

const state = reactive({
    nom: '',
    descripcio: '',
    preu: 0.0,
    establiment:''
})

const rules = {
    nom: { required, minLength: minLength(3) },
    descripcio: { required, minLength: minLength(20) },
    preu: { required, minValue: minValue(0), numeric },
    establiment: { required }
}

const v$ = useVuelidate(rules, state);

const doNewOferta = () => {
    if (!v$.value.$invalid) {
        newOferta(state)
        .then(
            res=>{
                console.log(res.data.ofertaSaved)
            }
        )
        .catch(
            err=>{
                console.log(err.response.data.message)
            }
        );
    }
}

</script>
<style></style>