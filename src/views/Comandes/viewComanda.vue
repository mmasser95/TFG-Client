<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="secondary" @click="modalController.dismiss(null, 'back')">
                    <ion-icon :icon="arrowBack"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center ion-activatable">Veure comanda
                <ion-icon color="tertiary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
            </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="container ion-activatable" v-if="userType == 'client'">
            <div class="container-2 ">
                Establiment: {{comanda.establimentId.nom}}
            </div>
            <div class="container-2">
                Correu: {{comanda.establimentId.correu}}
            </div>
            <div class="container-2">
                
            </div>
        </div>
        <div class="container ion-activatable" v-else>
            <div class="container-2">
                Usuari: {{comanda.userId.nom}} {{comanda.userId.cognoms}}
            </div>
            <div class="container-2">
                Correu: {{ comanda.userId.correu }}
            </div>
            <div class="container-2"></div>
        </div>
        <div class="container comentari ion-activatable">
            <comentariComponent :comandaId="comanda._id"/>
        </div>
        <onboarding :steps="onBoardingViewComandaSteps" @start-onboarding="startOnboarding"></onboarding>
    </ion-content>
    
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import comentariComponent from '../../components/comentariComponent.vue';
import { onMounted,nextTick,ref,Ref } from 'vue';
import { arrowBack,informationCircle } from 'ionicons/icons';
import { Comanda } from '../../types';
import { useLoginStore } from '../../store/loginStore';
import { storeToRefs } from 'pinia'
import onboarding from '../../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';
const startOnboarding = (element: any) => {
    onboardingElement.value = element
}
const onBoardingViewComandaSteps: Ref<StepEntity[] | any[]> = ref([])
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)
const { userType } = storeToRefs(useLoginStore())

const props = defineProps<{
    comanda: Comanda
}>()
onMounted(async()=>{
    await nextTick()
    if (useLoginStore().userType == "client")
    onBoardingViewComandaSteps.value = [{
            attachTo: {
                element: ".container-2"
            },
            content: {
                title: "Informació de la comanda",
                description: "Aquí podràs veure informació sobre la comanda"
            },
            options: {
                popper: {
                    placement: 'bottom'
                }
            }
        },{
            attachTo: {
                element: ".comentari"
            },
            content: {
                title: "Deixar un comentari",
                description: "Aquí podras deixar un comentari sobre la comanda a l'establiment"
            },
            options: {
                popper: {
                    placement: 'bottom'
                }
            }
        },]
    else
    onBoardingViewComandaSteps.value = [{
            attachTo: {
                element: ".container2"
            },
            content: {
                title: "Informació de la comanda",
                description: "Aquí podràs veure informació sobre la comanda"
            },
            options: {
                popper: {
                    placement: 'bottom'
                }
            }
        },{
            attachTo: {
                element: ".comentari"
            },
            content: {
                title: "Comentari fet pel client",
                description: "Aquí podràs veure el comentari deixat pel client"
            },
            options: {
                popper: {
                    placement: 'bottom'
                }
            }
        },]
})
</script>
<style scoped>
.container{
    display: flex;
    gap:15px;
    flex-flow:column wrap;
    padding:16px
}
</style>