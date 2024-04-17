<template>
    <ion-card :router-link="`/rebost/${idd}`">
        <ion-card-header>
            <ion-card-title>{{ title }}</ion-card-title>
            <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-text>
                {{ content }}
            </ion-text>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="4" class="">
                        <ion-button expand="block" click.stop="updateInventari">
                            <ion-icon :icon="pencilSharp"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="4" class="">
                        <ion-button expand="block" @click.stop="createConfirmationAlert('Estas segur que vols eliminar aquest rebost i el seu contingut?',estasSegur)">
                            <ion-icon :icon="trashBinSharp"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

        </ion-card-content>

    </ion-card>
</template>
<script setup lang="ts">
import { IonText, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonButton, alertController, IonCol, IonRow, IonGrid, IonCardSubtitle } from '@ionic/vue'
import { boat, pencilSharp, pencil, trashBinSharp } from 'ionicons/icons'
import { defineProps } from 'vue';
import { deleteRebost } from '@/APIService';
import { useRouter } from 'vue-router';
const router = useRouter()
const emit = defineEmits(['updateRebost', 'deleteRebost'])

const createConfirmationAlert = async (message: string, myHandler: any) => {
    let alert = await alertController.create({
        header: "Missatge del sistema",
        message,
        buttons: [{
            text: 'Si',
            htmlAttributes: {
                'aria-label': 'Si'
            },
            handler: myHandler
        },
        {
            text: 'No',
            htmlAttributes: {
                'aria-label': 'No'
            }
        }]
    })
    alert.present()
}

const estasSegur = async () => {
    await createConfirmationAlert("Recorda que aquesta acció no es pot desfer. Estas segur?", borrarInventari)
}

const props = defineProps({
    title: String,
    subtitle: String,
    content: String,
    idd: String
})

const goToRebost = () => {
    router.push(``)
}

const mostrarAlerta = async (missatge: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: missatge,
        buttons: ['Ok']
    })

    await alert.present();
}



const updateInventari = () => {
    emit('updateRebost', props.idd)
}

const borrarInventari = () => {
    let inventariId=props.idd
    deleteRebost(inventariId)
        .then((result) => {
            mostrarAlerta(`L'inventari s'ha esborrat correctament`)
            emit('deleteRebost', null)
        })
        .catch((err) => {
            mostrarAlerta(`Hi hagut un error esborrant l'inventari amb id ${inventariId}`)
        });
}
</script>
<style></style>