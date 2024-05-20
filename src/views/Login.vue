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
                    <ion-input id="input-correu" label="Correu electrònic" @ion-blur="v$.correu.$touch" type="email"
                      labelPlacement="floating" v-model="state.correu"></ion-input>
                  </ion-item>
                  <ErrorMessage v-if="v$.correu.$error && v$.correu.required.$invalid"
                    message="El correu és obligatori" />
                  <ErrorMessage v-if="v$.correu.$error && v$.correu.email.$invalid"
                    message="El correu electrònic no és valid" />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input id="input-contrasenya" label="Contrasenya" @ion-blur="v$.contrasenya.$touch"
                      type="password" labelPlacement="floating" v-model="state.contrasenya"></ion-input>
                  </ion-item>
                  <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.required.$invalid"
                    message="La contrasenya és obligatoria" />
                  <ErrorMessage v-if="v$.contrasenya.$error && v$.contrasenya.minLength.$invalid"
                    message="La contrasenya ha de contenir minim 8 caràcters" />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col></ion-col>
                <ion-col size="12" sizeMd="6"><ion-button id="btn-login" type="submit"
                    expand="block">Login</ion-button></ion-col>
                <ion-col></ion-col>
              </ion-row>
            </form>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeMd="6">
            <div class="googleContainer">
              <ion-text>Iniciar sessió amb Google, únicament per a clients:</ion-text>
              <ion-button id="googleBtn" @click="myGoogleSignin">
                <ion-icon :icon="logoGoogle" slot="start"></ion-icon>
                Google Login</ion-button>
            </div>
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
import { IonPage, IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonGrid, IonLabel, IonRow, IonCol, IonList, IonItem, IonInput, IonButton, IonText, alertController, modalController } from '@ionic/vue';
import { logoGoogle } from "ionicons/icons"
import { useLoginStore } from '../store/loginStore';
import { storeToRefs } from 'pinia';
import { ref, reactive, onMounted, computed } from 'vue';
import { doLogin, dosignIn, sendFirebaseToken, googleLogin } from '../APIService/utils';
import { registreEstabliment } from '../APIService/establiments';
import Registre from './Registre.vue'
import RegistreEstabliment from './RegistreEstabliment.vue';

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import { useRouter } from 'vue-router';

import { showLoading, showAlert } from '../composables/loader';

import ErrorMessage from '../components/ErrorMessage.vue';

import { useFavStore } from '../store/favStore'

import { useAlimentStore } from '../store/alimentStore'
import { useFirebaseStore } from '../store/firebaseStore'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
//Router de Vue
const router = useRouter();
//Store de pinia
const store = useLoginStore();
const { userId, token } = storeToRefs(store);
const { setToken, setUserId, setUserType } = store;

const { setLoginFavs } = useFavStore()

const { setAliments } = useAlimentStore()
const { myToken } = storeToRefs(useFirebaseStore());

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
  if (valid) {
    const loader = await showLoading("Iniciant sessió")
    loader.present()
    doLogin(state.correu, state.contrasenya, (err: any, data: any) => {
      loader.dismiss()
      if (err) return true
      setToken(data.token);
      localStorage.setItem('token', data.token)
      setUserId(data.userId)
      setUserType(data.userType)
      setAliments()
      if (data.userType == 'client') {
        setLoginFavs()
        router.push('/tabs/tab1');
      }
      else
        router.push('/tabs/tab5')
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
    dosignIn(myForm, (err: any, data: any) => {
      loader.dismiss(null, 'cancel')
      if (err) return
      presentAlert("T'has registrat al sistema correctament")
    })
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
    registreEstabliment(data, (err: any, data: any) => {
      loader.dismiss()
      if (err) return
      presentAlert("T'has registrat al sistema correctament")
    })
  }

}

const handleLoginSuccess = (credential: string) => {
  googleLogin(credential, (err: any, data: any) => {
    if (err) return true
    setToken(data.token);
    localStorage.setItem('token', data.token)
    setUserId(data.userId)
    setUserType(data.userType)
    setAliments()
    loginError.value = '';
    if (data.userType == 'client') {
      setLoginFavs()
      router.push('/tabs/tab1');
    }
  })
};


const myGoogleSignin = async () => {
  try {
    let token = await GoogleAuth.signIn()
    console.log(token)
    let alert = await showAlert(`S'ha aconseguit iniciar sessio a la plataforma amb el token ${token.authentication.idToken}`)
    alert.present()
    handleLoginSuccess(token.authentication.idToken)
  } catch (err) {
    let alert = await showAlert(`S'ha produit l'error següent quan s'intentava iniciar sessió ${err}`)
    alert.present()
  }
}

onMounted(async () => {
  try {
    GoogleAuth.initialize({
      clientId: "981593687954-d0h9henugkvditar81b2jdmuo7o1rgum.apps.googleusercontent.com",
      scopes: ['profile', 'email']
    });

    let alert = await showAlert(`Inicialitzat correctament`)
    alert.present()
  } catch (err) {
    let alert = await showAlert(`S'ha produit l'error següent quan s'intentava inicialitzar el Google Auth ${err}. A continuació s'intenta inicialitzar el GoogleAuthenticator sense configuració predeterminada`)
    alert.present()
    console.log(err)
    try {
      GoogleAuth.initialize()
    } catch (err2) {
      let alert = await showAlert(`S'ha produit l'error següent quan s'intentava inicialitzar el Google Auth sense configuració ${err2}.`)
      alert.present()

    }
  }

});

</script>

<style scoped>
.googleContainer {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items:center;
  gap:10px;
}
#googleBtn{
  max-width:200px
}
</style>
