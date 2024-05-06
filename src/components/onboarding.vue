<template>
    <VOnboardingWrapper ref="wrapper" :steps="steps">
        <template #default="{ previous, next, step, exit, isFirst, isLast, index }">
            <VOnboardingStep>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>
                            {{ step.content.title }}
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        {{ step.content.description }}
                        <div class="myContainer">
                            <ion-buttons>
                                <div v-if="!isFirst">
                                    <ion-button color="secondary" @click="previous">Anterior</ion-button>
                                </div>
                                <div v-if="!isLast">
                                    <ion-button color="primary" @click="next">Següent</ion-button>
                                </div>
                                <div v-if="isLast">
                                    <ion-button @click="next" color="danger">Acabar</ion-button>
                                </div>
                            </ion-buttons>
                        </div>
                    </ion-card-content>
                </ion-card>
            </VOnboardingStep>
        </template>
    </VOnboardingWrapper>
    <div><button id="foo">Welcome</button></div>
</template>
<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons } from '@ionic/vue';
import { ref } from 'vue'
import { VOnboardingWrapper, useVOnboarding, VOnboardingStep, StepEntity } from 'v-onboarding'
const emit = defineEmits(['startOnboarding'])
const props = defineProps<{
    steps: StepEntity[]|any[]
}>()

const wrapper = ref(null)
const { start, goToStep, finish } = useVOnboarding(wrapper)


emit('startOnboarding', { start, goToStep, finish })
</script>
<style scoped>
.myContainer{
    width:100%;
    max-width:250px;
    display: flex;

}
</style>