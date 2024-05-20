<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title id="config" class="ion-text-center">Configuració
                    <ion-icon color="primary" @click="onboardingElement?.start()" :icon="informationCircle"></ion-icon>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <img id="logo" src="/logo.PNG?url" alt="Logotip de FlyFood">
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-list>
                            <!--ion-item on es realitza un for per a crear totes les opcions de l'usuari-->
                            <ion-item class="ion-activatable" v-for="(item, k) in opcionsUser" :key="k"
                                @click="item.modalToShow" v-if="userType == 'client'">
                                <ion-ripple-effect></ion-ripple-effect>
                                <div>
                                    <ion-icon :icon="item.icon" slot="start"></ion-icon>
                                    {{ item.label }}
                                </div>
                            </ion-item>
                            <!--ion-item on es realitza un for per a crear totes les opcions de l'establiment-->
                            <ion-item class="ion-activatable" v-for="(item, k) in opcionsEstabliment" :key="k"
                                @click="item.modalToShow" v-if="userType == 'establiment'">
                                <ion-ripple-effect></ion-ripple-effect>
                                <ion-icon :icon="item.icon" slot="start"></ion-icon>
                                {{ item.label }}
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
    <onboarding :steps="onBoardingConfiguracioSteps" @start-onboarding="startOnboarding"></onboarding>
</template>
<script lang="ts" setup>

import { IonPage, IonToolbar, IonHeader, IonRippleEffect, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonTitle, IonIcon, IonLabel, modalController, alertController } from '@ionic/vue';
import { personCircle, image, eye, key, lockClosed, helpBuoy, exit, ban, documentText, informationCircle } from 'ionicons/icons'
//Vistes que es mostraran com a modals
import configuracioVista from './Configuracio/configuracioVista.vue';
import configuracióPerfil from './Configuracio/configuracióPerfil.vue';
import canviarFotoPerfil from './Configuracio/canviarImatges.vue'
import canviarContrasenya from './Configuracio/canviarContrasenya.vue'
//Store de login
import { useLoginStore } from '../store/loginStore';
//Store de firebase
import { useFirebaseStore } from '../store/firebaseStore'
//Funcionalitats del router i les store
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
//Crides a la API
import { deleteUser, deleteFirebaseToken } from '../APIService/utils';
import { deleteEstabliment } from '../APIService/establiments';
//Funcionalitats de Vue
import { onMounted, ref, Ref, nextTick } from 'vue';
//Component de l'onboarding
import onboarding from '../components/onboarding.vue';
import { StepEntity } from 'v-onboarding';


//Inicialització de variables
const store = useLoginStore()
const router = useRouter()
const { setToken, setUserId, setUserType } = store
const { userType, userId } = storeToRefs(store)

const onBoardingConfiguracioSteps: Ref<StepEntity[] | any[]> = ref([])
const onboardingElement = ref<{ start: Function, finish: Function, goToStep: Function } | null>(null)

//Funció per a que pugui inicialitzar-se l'onboarding
const startOnboarding = (element: any) => {
    onboardingElement.value = element
}

const { myToken } = storeToRefs(useFirebaseStore())

//Funció per a mostrar el modal del formulari de configuració del perfil
const modalConfiguracioPerfil = async () => {
    const modal = await modalController.create({
        component: configuracióPerfil,
        initialBreakpoint: 1,
        breakpoints: [0, 0.66, 1]
    })
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        //console.log('Falta fer la petició a la API')
    }
}
//Funció per a mostrar el modal del formulari de configuració de la vista
const modalConfiguracioVista = async () => {
    const modal = await modalController.create({
        component: configuracioVista,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        localStorage.setItem('theme', data.theme)
    }
}

//Funció per a mostrar el modal del formulari de canviar la contrasenya
const modalCanviarContrasenya = async () => {
    const modal = await modalController.create({
        component: canviarContrasenya,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present()
}
//Funció per a mostrar el modal per a canviar la foto de perfil en els establiments
const modalCanviarFotoPerfil = async () => {
    const modal = await modalController.create({
        component: canviarFotoPerfil,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present()
}
//Funció per a mostrar l'alerta per a confirmar poder sortir de la sessió actual
const alertSortirSessio = async () => {
    const alert = await alertController.create({
        header: "Sortir?",
        message: "Estas segur?",
        buttons: [
            {
                text: 'Si',
                htmlAttributes: {
                    'aria-label': 'Si',
                },
                handler: () => {
                    //Aquesta funció handler, permet definir les accions que es produiran
                    //quan es premi el botó en qüestio. Si no es defineix cap acció, l'alerta desapareix.
                    //En aquest cas, s'envia una petició a la API per a desvincular el dispositiu de les notificacions de l'usuari el qual esta sortint la sessió
                    deleteFirebaseToken(myToken.value, (err: any) => {
                        if (err) return
                        //Finalment es reinicien les variables on es guarda la informació d'inici de sessió
                        setToken('')
                        setUserId('')
                        setUserType('')
                        localStorage.setItem('token', '')
                        //Es redirecciona a l'usuari
                        router.push('/login')
                    })
                }
            },
            {
                text: 'No',
                htmlAttributes: {
                    'aria-label': 'No',
                },
            }
        ],
    })
    alert.present()
}

//Funció que dona el primer avís si un usuari prèm sobre l'opció d'eliminar compte
const alertEliminarCompte1 = async () => {
    const alert = await alertController.create({
        header: `Eliminar el compte?`,
        message: "Estas segur?",
        buttons: [
            {
                text: 'Si',
                htmlAttributes: {
                    'aria-label': 'Si',
                },
                handler: () => {
                    //En cas que l'usuari premi si, li apareixerà un segon avís per a confirmar l'acció
                    alertEliminarCompte2()
                }
            },
            {
                text: 'No',
                htmlAttributes: {
                    'aria-label': 'No',
                },
            }
        ],
    })
    alert.present()
}
//Funcio per a mostrar el segon avís per a eliminar el compte
const alertEliminarCompte2 = async () => {
    const alert = await alertController.create({
        header: "Eliminar el compte!",
        message: "Aquesta acció no es podrà desfer si prems Si. N'estas completament segur?",
        buttons: [
            {
                text: 'Si',
                htmlAttributes: {
                    'aria-label': 'Si',
                },
                handler: () => {
                    //Si al primer avís es prem que si i en aquest segon avís també, 
                    //s'inicialitza el procediment per a eliminar el compte i tancar sessió.
                    //S'adapta la funció per a que funcioni tant en establiments com clients.
                    if (userType.value == 'client') {
                        deleteUser((err: any) => {
                            if (err) return
                            setToken('')
                            setUserId('')
                            setUserType('')
                            router.push('/login')

                        })

                    } else {
                        deleteEstabliment((err: any) => {
                            if (err) return
                            setToken('')
                            setUserId('')
                            setUserType('')
                            router.push('/login')
                        })

                    }
                }
            },
            {
                text: 'No',
                htmlAttributes: {
                    'aria-label': 'No',
                },
            }
        ],
    })
    alert.present()
}

//Llista d'objectes que simbolitzen les opcions visibles per a l'usuari de tipus client.
//Aquesta variable s'utilitza al v-for, per a generar la plantilla necessària per a mostrar el menú de configuració de l'usuari
const opcionsUser = [
    {
        label: "Configuració del perfil",
        icon: personCircle,
        modalToShow: modalConfiguracioPerfil,
    },
    {
        label: "Canviar contrasenya",
        icon: key,
        modalToShow: modalCanviarContrasenya
    },
    {
        label: "Configuració de la vista",
        icon: eye,
        modalToShow: modalConfiguracioVista,
    },
    {
        label: "Comandes",
        icon: documentText,
        modalToShow: () => router.push('/tabs/tab6')
    },
    {
        label: "Politica Privacitat",
        icon: lockClosed
    },
    {
        label: "Ajuda",
        icon: informationCircle,
        modalToShow: () => { onboardingElement.value?.start() },
    },
    {
        label: 'Eliminar compte',
        icon: ban,
        modalToShow: alertEliminarCompte1
    },
    {
        label: "Sortir de la sessió",
        icon: exit,
        modalToShow: alertSortirSessio,
    }

]
//Llista d'opcions visibles per als establiments
const opcionsEstabliment = [
    {
        label: "Configuració del perfil",
        icon: personCircle,
        modalToShow: modalConfiguracioPerfil,
    },
    {
        label: "Canviar contrasenya",
        icon: key,
        modalToShow: modalCanviarContrasenya
    },
    {
        label: "Configuració de la vista",
        icon: eye,
        modalToShow: modalConfiguracioVista,
    },
    {
        label: "Canviar foto perfil",
        icon: image,
        modalToShow: modalCanviarFotoPerfil
    },
    {
        label: "Politica Privacitat",
        icon: lockClosed
    },
    {
        label: "Ajuda",
        icon: informationCircle,
        modalToShow: () => { onboardingElement.value?.start() }
    },
    {
        label: 'Eliminar compte',
        icon: ban,
        modalToShow: alertEliminarCompte1
    },
    {
        label: "Sortir de la sessió",
        icon: exit,
        modalToShow: alertSortirSessio,
    }

]

//Aquí es configuren les passes que seguirà l'onboarding per a mostrar l'ajuda.
onMounted(() => {
    onBoardingConfiguracioSteps.value = [{
        attachTo: {
            element: "#config"
        },
        content: {
            title: "Ajuda",
            description: "Per a accedir a informació més especifica desde qualsevol vista, prém sobre les icones d'info"
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    },
    {
        attachTo: {
            element: "#logo"
        },
        content: {
            title: "Ajuda",
            description: "Si necessites més ajuda, pots escriure un correu a mmasser95@uoc.edu"
        },
        options: {
            popper: {
                placement: 'bottom'
            }
        }
    },]


})

</script>
<style></style>