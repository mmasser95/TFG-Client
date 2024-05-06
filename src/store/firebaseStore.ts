import { ref, Ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useFirebaseStore = defineStore('firebase', () => {
  const myToken = ref('');
  return {
    myToken,
  };
});
