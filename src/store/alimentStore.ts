import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { Aliment } from '@/types';

export const useAlimentStore = defineStore('Aliments', () => {
  const aliments: Ref<Aliment[] | null> = ref(null);
  
  return {
    aliments,
  };
});
