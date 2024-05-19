import { defineStore } from 'pinia';
import { ref, Ref, computed } from 'vue';
import { StepEntity } from 'v-onboarding';
export const useGeneralOnboarding = defineStore('generalOnboarding', () => {
  const onBoardingConfiguracioSteps: Ref<StepEntity[] | any[]> = ref([]);
  const onboardingElement = ref<{
    start: Function;
    finish: Function;
    goToStep: Function;
  } | null>(null);
  const startOnboarding = (element: any) => {
    onboardingElement.value = element;
  };
  return { onBoardingConfiguracioSteps, onboardingElement, startOnboarding };
});
