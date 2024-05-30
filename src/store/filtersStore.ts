import { ref, Ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useFiltresStore = defineStore('filtres', () => {
  const preu = reactive({
    lower: 0,
    upper: 25,
  });
  const horari = reactive({
    lower: 24,
    upper: 40,
  });
  const filtres = reactive({
    supermercat: false,
    restaurant: false,
    fleca: false,
    peixateria: false,
    carnisseria: false,
    fruiteria_verduleria: false,
  });

  const quantitatMinima:Ref<number>=ref(0)
  const qualitatMinima:Ref<number>=ref(0)

  const generarHores = () => {
    let result: [string] = [''];
    result.pop();
    for (let i = 0; i < 24; i++) {
      let str = '';
      if (i < 10) str = '0';
      str += i.toString();
      result.push(str + ':00');
      result.push(str + ':30');
    }
    return result;
  };
  return {
    preu,
    horari,
    filtres,
    quantitatMinima,
    qualitatMinima,
    generarHores,
  };
});
