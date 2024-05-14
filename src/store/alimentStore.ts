import { Ref, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { Aliment } from '@/types';

import { getAllAliments } from '@/APIService/aliments';

export const useAlimentStore = defineStore('Aliments', () => {
  const aliments: Ref<Aliment[] | null> = ref(null);

  const setAliments = () => {
    getAllAliments((err:any,data:any)=>{
      if(err)return
      aliments.value = data.aliments;
    })
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
