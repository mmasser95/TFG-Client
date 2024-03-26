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
            <form @submit.prevent="login">
              <ion-item>
                <ion-input label="Correu electrònic" type="email" labelPlacement="floating"
                  error-text="Correu electrònic inválid" v-model="state.correu" :color="emailColor">
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-input label="Contrasenya" type="password" labelPlacement="floating" v-model="state.contrasenya"
                  :color="passwordColor"></ion-input>
              </ion-item>
              <ion-item>
                <ion-button type="submit" expand="block">Login</ion-button>
              </ion-item>
            </form>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="ion-text-center">
              Si no tens compte, segueix <a @click="operModalRegistre">link</a>
            </p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="ion-text-center">Si vols colaborar com a establiment <a @click="operModalRegistreEstabliment">link</a></p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonLabel, IonRow, IonCol, IonList, IonItem, IonInput, IonButton, IonText, alertController, modalController } from '@ionic/vue';

import { useLoginStore } from '../store/loginStore';
import { storeToRefs } from 'pinia';
import { ref, reactive, onMounted, computed } from 'vue';
import { doLogin, dosignIn } from '../APIService/index';

import Registre from './Registre.vue'
import RegistreEstabliment from './RegistreEstabliment.vue';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import { useRouter } from 'vue-router';

const router = useRouter();
//Store
const store = useLoginStore();
const { userId, token } = storeToRefs(store);
const { setToken, setUserId } = store;

const loginError = ref('');

const state = reactive({
  correu: '',
  contrasenya: ''
})

const emailColor = computed(() => {
  if (v$.value.correu.$invalid) {
    return 'danger'
  }
  return 'primary'
})

const passwordColor = computed(() => {
  if (v$.value.contrasenya.$invalid) {
    return 'danger'
  }
  return 'primary'
})

const rules = {
  correu: { required, email },
  contrasenya: { required, minLength: minLength(8) }
}

const v$ = useVuelidate(rules, state);

const presentAlert = async (prompt: string) => {
  const alert = await alertController.create({
    header: 'Missatge del sistema',
    message: prompt,
    buttons: ['Exit']
  })
  await alert.present()
}

const login = async () => {
  // const valid = await v$.value.$validate();
  const valid = true
  if (valid) {
    doLogin(state.correu, state.contrasenya).then(res => {
      if (res.status == 200) {
        setToken(res.data.token);
        setUserId(res.data.user_id)
        loginError.value = '';
        router.push('/tabs/tab3');
      } else {
        loginError.value = res.data.message
        presentAlert(res.data.message)
      }
    }).catch((err) => {
      loginError.value = err.response.data.message
      presentAlert(err.response.data.message)
    })
  }
}

const operModalRegistre=async()=>{
  const modal=await modalController.create({
    component:Registre,
    initialBreakpoint:0.75,
    breakpoints:[0,0.25,0.5,0.75]
  })
  modal.present();

  const {data,role}=await modal.onWillDismiss();
  if (role=='confirm'){
    dosignIn(data)
        .then((res) => {
            presentAlert("T'has registrat al sistema correctament")
        }).catch((err) => {
            presentAlert(err);
        });
  }

}
const operModalRegistreEstabliment=async()=>{
  const modal=await modalController.create({
    component:RegistreEstabliment,
    initialBreakpoint:0.75,
    breakpoints:[0,0.25,0.5,0.75]
  })
  modal.present();

  const {data,role}=await modal.onWillDismiss();
  if (role=='confirm'){
    dosignIn(data)
        .then((res) => {
            presentAlert("T'has registrat al sistema correctament")
        }).catch((err) => {
            presentAlert(err);
        });
  }

}
</script>

<style>
ion-button {
  width: 100%;
}
</style>
