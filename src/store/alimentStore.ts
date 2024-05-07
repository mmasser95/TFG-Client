import { Ref, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { Aliment } from '@/types';

import { getAllAliments } from '@/APIService';

export const useAlimentStore = defineStore('Aliments', () => {
  const aliments: Ref<Aliment[] | null> = ref(null);

  const setAliments = () => {
    getAllAliments()
      .then((res) => {
        aliments.value = res.data.aliments;
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };

  const getAllNoms = computed(() => {
    return aliments.value?.map((val, idx, arr) => val.nom);
  });

  return {
    aliments,
    setAliments,
    getAllNoms,
  };
});
