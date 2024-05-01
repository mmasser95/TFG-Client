<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <img src="/logo.PNG?url" alt="Logo">
            <ion-text v-if="loginError" color="danger">{{ loginError }}</ion-text>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
            <form @submit.prevent="login">
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input label="Correu electrònic" @ion-blur="v$.correu.$touch" type="email"
                      labelPlacement="floating" v-model="state.correu"></ion-input>
                  </ion-item>
                  <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                    message="Aquest camp és obligatori" />
                  <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                    message="El correu electrònic no és valid" />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input label="Contrasenya" @ion-blur="v$.contrasenya.$touch" type="password"
                      labelPlacement="floating" v-model="state.contrasenya"></ion-input>
                  </ion-item>
                  <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.required.$invalid"
                    message="Aquest camp és obligatori" />
                  <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.minLength.$invalid"
                    message="La contrasenya ha de contenir minim 8 caràcters" />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col></ion-col>
                <ion-col size="12" sizeMd="6"><ion-button type="submit" expand="block">Login</ion-button></ion-col>
                <ion-col></ion-col>
              </ion-row>
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
            <p class="ion-text-center">Si vols colaborar com a establiment <a
                @click="operModalRegistreEstabliment">link</a></p>
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
import { doLogin, dosignIn, registreEstabliment } from '../APIService/index';

import Registre from './Registre.vue'
import RegistreEstabliment from './RegistreEstabliment.vue';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import { useRouter } from 'vue-router';

import { showLoading } from '../composables/loader';

import ErrorMessage from '../components/ErrorMessage.vue';

import { useFavStore } from '../store/favStore'

import { useAlimentStore } from '../store/alimentStore'

const router = useRouter();
//Store
const store = useLoginStore();
const { userId, token } = storeToRefs(store);
const { setToken, setUserId, setUserType } = store;

const { setLoginFavs } = useFavStore()

const { setAliments } = useAlimentStore()

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
  correu: { required, email, autoDirty: true },
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
  const valid = await v$.value.$validate();
  //const valid = true
  if (valid) {
    const loader = await showLoading("Iniciant sessió")
    loader.present()
    doLogin(state.correu, state.contrasenya).then(res => {
      if (res.status == 200) {
        setToken(res.data.token);
        setUserId(res.data.userId)
        setUserType(res.data.userType)
        setAliments()
        loginError.value = '';
        if (res.data.userType == 'client') {
          setLoginFavs()
          router.push('/tabs/tab1');
        }
        else
          router.push('/tabs/tab5')
      } else {
        loginError.value = res.data.message
        presentAlert(res.data.message)
      }
    }).catch((err) => {
      loginError.value = err.response.data.message
      presentAlert(err.response.data.message)
    }).finally(() => {
      loader.dismiss(null, 'cancel')
    })
  }
}

const operModalRegistre = async () => {
  const modal = await modalController.create({
    component: Registre,
    initialBreakpoint: 1,
    breakpoints: [0, 0.33, 0.66, 1]
  })
  modal.present();

  const { data, role } = await modal.onWillDismiss();
  if (role == 'confirm') {
    let myForm = data
    const loader = await showLoading('Enviant informació de registre')
    loader.present()
    dosignIn(myForm)
      .then((res) => {
        presentAlert("T'has registrat al sistema correctament")
      }).catch((err) => {
        presentAlert(err);
      }).finally(() => {
        loader.dismiss(null, 'cancel')
      });
  }

}
const operModalRegistreEstabliment = async () => {
  const modal = await modalController.create({
    component: RegistreEstabliment,
    initialBreakpoint: 1,
    breakpoints: [0, 0.33, 0.66, 1]
  })
  modal.present();

  const { data, role } = await modal.onWillDismiss();
  if (role == 'confirm') {
    const loader = await showLoading("Enviant informació de registre de l'establiment")
    loader.present()
    registreEstabliment(data)
      .then((res) => {
        presentAlert("T'has registrat al sistema correctament")
      }).catch((err) => {
        presentAlert(err);
      }).finally(() => {
        loader.dismiss(null, 'cancel')
      });
  }

}
</script>

<style></style>
