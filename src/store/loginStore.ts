import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
  const userId = ref('');
  const token = ref('');
  const userType = ref('');

  const loggedIn = computed(() => {
    return userId.value !== '' && token.value !== '';
  });

  function setToken(tkn: string) {
    token.value = tkn;
  }

  function setUserId(id: string) {
    userId.value = id;
  }
  function setUserType(type: string) {
    userType.value = type;
  }
  
  return {
    userId,
    token,
    setToken,
    loggedIn,
    setUserId,
    userType,
    setUserType,
  };
});
