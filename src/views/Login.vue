<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>

          <ion-col>
            <ion-title class="ion-text-center">Login</ion-title>
            <ion-text v-if="loginError" color="danger">{{ loginError }}</ion-text>
          </ion-col>

        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="8">
            <ion-list>
              <ion-item>
                <ion-input 
                label="Correu electrònic" 
                type="email" 
                labelPlacement="floating"
                error-text="Correu electrònic inválid" 
                v-model="state.email" 
                :color="emailColor">
              </ion-input>
              </ion-item>
              <ion-item>
                <ion-input label="Contrasenya" type="password" labelPlacement="floating"
                  v-model="state.password" :color="passwordColor"></ion-input>
              </ion-item>
              <ion-item>
                <ion-button type="submit" expand="block" @click="login">Login</ion-button>
              </ion-item>
            </ion-list>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonLabel, IonRow, IonCol, IonList, IonItem, IonInput, IonButton, IonText, alertController } from '@ionic/vue';

import { useLoginStore } from '../store/loginStore';
import { storeToRefs } from 'pinia';
import { ref, reactive, onMounted, computed } from 'vue';
import { doLogin,doTest } from '../APIService/index';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import { useRouter } from 'vue-router';

const router = useRouter();
//Store
const store = useLoginStore();
const { userId, token } = storeToRefs(store);
const { setToken, setUserId } = store;

const loginError=ref('');

const state = reactive({
  email: '',
  password: ''
})

const emailColor = computed(() => {
  if (v$.value.email.$invalid) {
    return 'danger'
  }
  return 'primary'
})

const passwordColor = computed(() => {
  if (v$.value.password.$invalid) {
    return 'danger'
  }
  return 'primary'
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) }
}

const v$ = useVuelidate(rules, state);

const presentAlert = async (prompt:string)=>{
  const alert = await alertController.create({
    header:'Missatge del sistema',
    message:prompt,
    buttons:['Exit']
  })
  await alert.present()
}

const login = async () => {
  // const valid = await v$.value.$validate();
  const valid=true
  doTest().then((result) => {
    presentAlert(result.data)
  }).catch((err) => {
    presentAlert(err)
  });
  if (valid) {
    doLogin(state.email, state.password).then(res => {
      if(res.status==200){
        setToken(res.data.token);
        setUserId(res.data.user_id)
        loginError.value = '';
        router.push('/tabs/tab3');
      }else{
        loginError.value=res.data.message
        presentAlert(res.data.message)
      }
    }).catch((err) => {
      loginError.value=err.response.data.message
      presentAlert(err.response.data.message)
    })
  }
}

</script>

<style>
ion-button {
  width: 100%;
}
</style>
