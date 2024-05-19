<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel">Cancel</ion-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Canviar contrasenya</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="confirm">Confirma</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size="12" sizeXl="8">
                    <form @submit.prevent="confirm">
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Contrasenya actual" :label-placement="labelPlacement" @ion-blur="v$.oldC.$touch"
                                            type="password" v-model="state.oldC"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.oldC.$error && v$.oldC.required.$invalid"
                                        message="Contrasenya actual obligatoria" />
                                    <ErrorMessage v-if="v$.oldC.$error && v$.oldC.minLength.$invalid"
                                        message="La contrasenya actual és de com a minim 8 caràcters" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Contrasenya nova" :label-placement="labelPlacement" @ion-blur="v$.newC.$touch"
                                            type="password" v-model="state.newC"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.newC.$error && v$.newC.required.$invalid"
                                        message="La contrasenya nova és obligatòria" />
                                    <ErrorMessage v-if="v$.newC.$error && v$.newC.minLength.$invalid"
                                        message="La nova contrasenya ha de ser de com a minim 8 caràcters" />
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div class="input-container">
                                    <ion-item>
                                        <ion-input label="Repeteix la contrasenya" :label-placement="labelPlacement" @ion-blur="v$.rnewC.$touch"
                                            type="password" v-model="state.rnewC"></ion-input>
                                    </ion-item>
                                    <ErrorMessage v-if="v$.rnewC.$error && v$.rnewC.required.$invalid"
                                        message="La nova contrasenya és obligactòria" />
                                    <ErrorMessage v-if="v$.rnewC.$error && v$.rnewC.sameAs.$invalid"
                                        message="Aquest camp ha de coincidir amb la nova contrasenya" />
                                </div>
                            </ion-col>
                        </ion-row>
                    </form>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonItem, IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonGrid, IonRow, IonCol, modalController, IonInput } from '@ionic/vue'
import { reactive, computed } from 'vue'
import ErrorMessage from '../../components/ErrorMessage.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators';
import { canviarContrasenya } from '../../APIService/utils'
import { showAlert } from '../../composables/loader'
const cancel = () => modalController.dismiss(null, 'cancel')
const confirm = async () => {
    const valid = await v$.value.$validate()
    if (valid) {
        canviarContrasenya(state.oldC, state.newC, state.rnewC, async (err: any, data: any) => {
            if (err) return
            let alert = await showAlert("Contrasenya canviada correctament")
            alert.present()
        })
        modalController.dismiss(null, 'confirm')
    }
}
const labelPlacement = "floating"
const state = reactive({
    oldC: '',
    newC: '',
    rnewC: ''
})
const newComp = computed(() => state.newC)
const rules = {
    oldC: { required, minLength: minLength(8) },
    newC: { required, minLength: minLength(8) },
    rnewC: { required, minLength: minLength(8), sameAs: sameAs(newComp) }
}
const v$ = useVuelidate(rules, state)



</script>
<style scoped></style>