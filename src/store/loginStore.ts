import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
       const userId = ref('');
       const token = ref('');

       const loggedIn = computed(() => {
              return userId.value !== '' && token.value !== '';
       })

       function setToken(tkn: string) {
              token.value = tkn;
       }

       function setUserId(id: string) {
              userId.value = id;
       }
       return {
              userId,
              token,
              setToken,
              loggedIn,
              setUserId
       }
})
