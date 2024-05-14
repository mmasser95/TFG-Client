<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center">Configuració</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <img src="/logo.PNG?url" alt="Logotip de FlyFood">
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="4" sizeLg="6" sizeMd="8" sizeSm="10">
                        <ion-list>
                            <ion-item v-for="(item, k) in opcionsUser" :key="k" @click="item.modalToShow"
                                v-if="userType == 'client'">
                                <ion-icon :icon="item.icon" slot="start"></ion-icon>
                                {{ item.label }}
                            </ion-item>
                            <ion-item v-for="(item, k) in opcionsEstabliment" :key="k" @click="item.modalToShow"
                                v-if="userType == 'establiment'">
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
</template>
<script lang="ts" setup>
import { IonPage, IonToolbar, IonHeader, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonTitle, IonIcon, IonLabel, modalController, alertController } from '@ionic/vue';
import { personCircle, image, eye, key, lockClosed, helpBuoy, exit, ban, documentText } from 'ionicons/icons'
import configuracioVista from './Configuracio/configuracioVista.vue';
import configuracióPerfil from './Configuracio/configuracióPerfil.vue';
import canviarFotoPerfil from './Configuracio/canviarImatges.vue'
import canviarContrasenya from './Configuracio/canviarContrasenya.vue'
import { useLoginStore } from '../store/loginStore';
import { useFirebaseStore } from '../store/firebaseStore'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { deleteUser, deleteFirebaseToken } from '../APIService/utils';
import { deleteEstabliment } from '../APIService/establiments';
import { onMounted } from 'vue';
const store = useLoginStore()
const router = useRouter()
const { setToken, setUserId, setUserType } = store
const { userType } = storeToRefs(store)

const { myToken } = storeToRefs(useFirebaseStore())

onMounted(() => {
    console.log('userType.value :>> ', userType);
})

const modalConfiguracioPerfil = async () => {
    const modal = await modalController.create({
        component: configuracióPerfil,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        console.log('Falta fer la petició a la API')
    }
}
const modalConfiguracioVista = async () => {
    const modal = await modalController.create({
        component: configuracioVista,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
        localStorage.setItem('idioma', data.idioma)
        localStorage.setItem('theme', data.theme)
    }
}

const modalCanviarContrasenya = async () => {
    const modal = await modalController.create({
        component: canviarContrasenya,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present()
}

const modalCanviarFotoPerfil = async () => {
    const modal = await modalController.create({
        component: canviarFotoPerfil,
        initialBreakpoint: 0.66,
        breakpoints: [0, 0.33, 0.66, 1]
    })
    modal.present()

}

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
                    deleteFirebaseToken(myToken.value, (err: any) => {
                        if (err) return
                        setToken('')
                        setUserId('')
                        setUserType('')
                        localStorage.setItem('token', '')
                        router.push('/login')
                    })
                    /*deleteFirebaseToken(myToken.value).then((res) => {

                    }).catch((err) => {

                    }).finally(() => {

                        setToken('')
                        setUserId('')
                        setUserType('')
                        localStorage.setItem('token', '')
                        router.push('/login')
                    });*/

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
                    if (userType.value == 'user') {
                        deleteUser((err: any) => {
                            if (err) return
                            setToken('')
                            setUserId('')
                            setUserType('')
                            router.push('/login')

                        })
                        /*deleteUser().then((result) => {
                            if (result.data) {
                                setToken('')
                                setUserId('')
                                setUserType('')
                                router.push('/login')
                            }
                        }).catch((err) => {

                        });*/
                    } else {
                        deleteEstabliment((err: any) => {
                            if (err) return
                            setToken('')
                            setUserId('')
                            setUserType('')
                            router.push('/login')
                        })
                        /*deleteEstabliment().then((result) => {
                            if (result.data) {
                                setToken('')
                                setUserId('')
                                setUserType('')
                                router.push('/login')

                            }).catch((err) => {

                            });*/
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
        icon: helpBuoy
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
        icon: helpBuoy
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
</script>
<style></style>